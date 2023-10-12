import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import storage from "@/firebase/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Spinners from "./Spinners";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  imageUrl: existingImageUrl,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const [uploadedImageUrls, setUploadedImageUrls] = useState(
    existingImageUrl || "" || []
  );

  const saveProduct = async (event) => {
    event.preventDefault();
    const data = {
      title,
      description,
      price,
      imageUrl: uploadedImageUrls || [],
    };

    if (_id) {
      //update
      try {
        const response = await axios.put("/api/products", { ...data, _id });
        console.log("Update response:", response.data); // Assurez-vous que la mise à jour s'est bien passée
      } catch (error) {
        console.error("Update error:", error);
      }
    } else {
      try {
        const response = await axios.post("/api/products", data);
        console.log("Create response:", response.data); // Assurez-vous que la création s'est bien passée
      } catch (error) {
        console.error("Create error:", error);
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
      setIsUploading(true);
      const data = new FormData();
      const newImageUrls = [];

      for (const file of files) {
        const ext = file.name.split(".").pop();
        const uniqueFileName =
          file.name + "-" + Date.now() + "-" + Math.random() + "." + ext;
        const storageRef = ref(storage, `images/${uniqueFileName}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        const uniqueImageUrl = imageUrl + `?cache=${Math.random()}`;
        newImageUrls.push(uniqueImageUrl);
      }

      // Mettez à jour l'état avec le tableau complet d'URLs d'images
      setUploadedImageUrls([...uploadedImageUrls, ...newImageUrls]);
      console.log("newImage : ", newImageUrls);
      setIsUploading(false);
      data.append("file", newImageUrls);
      event.target.value = null;
    } else {
      console.log("Sélection de fichier annulée");
    }
  }

  function updatedImageOrder(uploadedImageUrls) {
    setUploadedImageUrls(uploadedImageUrls);
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

      <div className="w-100 flex flex-wrap gap-1">
            <ReactSortable list={uploadedImageUrls} className="flex flex-wrap gap-1 mb-2" setList={updatedImageOrder}>
              {uploadedImageUrls?.length > 0 ? (
                uploadedImageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded Image ${index}`}
                    className="w-24 h-24 flex rounded-md mr-2 cursor-pointer"
                  />
                ))
              ) : (
                <div>No photos in this project</div>
              )}
            </ReactSortable>
          

          {isUploading && (
            <div className="flex justify-center items-center">
              <Spinners />
            </div>
          )}
        </div>
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
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImage} />
        </label>
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
