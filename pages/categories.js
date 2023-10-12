import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";

export default function Categories() {
  const [name, setName] = useState("");

  async function saveCategory(event) {
    event.preventDefault()
    await axios.post("/api/categories", {name})
    setName("")
    }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
        <button className="btn-primary py-1" type="submit">
          Save
        </button>
      </form>
    </Layout>
  );
}
