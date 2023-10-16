import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios
      .get("/api/categories")
      .then((response) => setCategories(response.data));
  }

  async function saveCategory(event) {
    event.preventDefault();
    const data = {name, parentCategory}
    if (editCategory){
      await axios.put("/api/categories", data)
    }else {
      await axios.post("/api/categories", data);
    }
    
    setName("");
    fetchCategories();
  }

  function editCategory (categorie) {
    setEditedCategory(categorie)
    setName(categorie.name)
    setParentCategory(categorie.parent?._id)
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <select 
          className="mb-0" 
          value={parentCategory}
          onChange={ev => setParentCategory(ev.currentTarget.value)}
          >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((categorie, index) => (
              <option key={index} value={categorie._id}>
                {categorie.name}
              </option>
            ))}
        </select>
        <button className="btn-primary py-1" type="submit">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((categorie, index) => (
              <tr key={index}>
                <td>{categorie.name}</td>
                <td>{categorie?.parent?.name}</td>
                <td>
                  <button onClick={()=> editCategory (categorie)} className="btn-primary mr-1">Edit</button>
                  <button className="btn-primary">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
