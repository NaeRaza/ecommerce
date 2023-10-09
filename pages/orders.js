import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("")  

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    setSearch(event.currentTarget.value)
  }

  useEffect(()=> {
    const filtered = data.filter((user)=> {
        return user.name?.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredData(filtered)
    
  }, [search, data])

  return (
    <Layout>
      <p>
        <input type="text" onChange={handleChange} placeholder="Recherche" value={search} />
      </p>
      <ul>
          {filteredData.length === 0 ? (
            <li>Résultat non trouvé</li>
          ) : (
            filteredData.map((item)=> (
                <li key={item.id}>{item.name}</li>
            ))
          )}
        </ul>
    </Layout>
  );
}
