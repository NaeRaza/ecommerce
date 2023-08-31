import { useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import storage from "@/firebase/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useSession } from "next-auth/react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const { data: session } = useSession(); 
  const auth = getAuth();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  // Vérifiez si l'utilisateur Firebase est connecté
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Utilisateur Firebase connecté');
    } else {
      console.log('Utilisateur Firebase non connecté');
    }
  });

  const saveProduct = async (event) => {
    event.preventDefault();
    const data = { title, description, price };

    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create

      await axios.post("/api/products", data);
    }
    setGoToProducts(!goToProducts);
  };

  if (goToProducts) {
    router.push("/products");
    return null;
  }

  console.log(useSession)

  async function uploadImage (event) {
    const files = event.target.files

    console.log("User state:", auth.currentUser);

  
    // Utilisez getSession pour vérifier si l'utilisateur est authentifié
  
    if (session && files?.length > 0) {
      // L'utilisateur est connecté et des fichiers ont été sélectionnés
      const data = new FormData();
  
      for (const file of files) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
  
        data.append('images', imageUrl);
      }
  
      const res = await axios.post('/api/upload', data);
      console.log(res);
    } else if (!session) {
      console.log('Utilisateur non connecté');
    }
  }
  

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24 flex text-sm gap-1 cursor-pointer text-gray-500 rounded-lg items-center justify-center bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>
          Upload
          </div>
          <input type="file" className="hidden" onChange={uploadImage} />
        </label>
        {!images?.length && <div>No photos in this product</div>}
      </div>

      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
