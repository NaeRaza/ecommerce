import { useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import storage from "@/firebase/Config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useSession } from "next-auth/react";


export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  imageUrl: existingImageUrl,
}) {
  const {data : session} = useSession();

  console.log('User session:', session);

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(existingImageUrl || "");
  console.log("image test :", uploadedImageUrl)

  const saveProduct = async (event) => {
    event.preventDefault();
    const data = { title, description, price, imageUrl: uploadedImageUrl };
    console.log(data)


    if (_id) {
      //update
      try {
        const response = await axios.put("/api/products", { ...data, _id });
        console.log('Update response:', response.data); // Assurez-vous que la mise à jour s'est bien passée
      } catch (error) {
        console.error('Update error:', error);
      }
    } 
    
    else 
    
    {
      try {
        const response = await axios.post("/api/products", data);
        console.log('Create response:', response.data); // Assurez-vous que la création s'est bien passée
      } catch (error) {
        console.error('Create error:', error);
      }
    }
    setGoToProducts(!goToProducts);
  };

  if (goToProducts) {
    router.push("/products");
    return null;
  }

  async function uploadImage(event) {
    const files = event.target.files;
  
    if (files?.length > 0) {
      
      const data = new FormData();
  
      for (const file of files) {
        const ext = file.name.split('.').pop()
        const newFileName = Date.now() + ('.') + ext
        const storageRef = ref(storage, `images/${newFileName}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        // Mettez à jour l'état avec l'URL de l'image téléchargée
        setUploadedImageUrl(imageUrl);
  
        const imageId = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        data.append('file', imageUrl);
  
        console.log('Image URL:', imageUrl);
        console.log('Image ID:', imageId);
      }
  
      //const res = await axios.post('/api/upload', data);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })


      console.log(res);
    } else {
      console.log('Utilisateur non connecté ou pas de fichiers sélectionnés');
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
        <label className="w-24 h-24 flex text-sm gap-1 cursor-pointer text-gray-500 mb-2 rounded-lg items-center justify-center bg-gray-200">
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
        {uploadedImageUrl && ( // Afficher l'image ici si uploadedImageUrl n'est pas vide
        <img src={uploadedImageUrl} alt="Uploaded Image" className="w-24 h-24 flex rounded-md"/>
      )}
      
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
