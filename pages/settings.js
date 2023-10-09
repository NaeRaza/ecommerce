import Layout from "@/components/Layout";
import { useState } from "react";


export default function Products() {

    const [clients, setClients] = useState([
        { id: 1, nom: "Hernat" },
        { id: 2, nom: "Ulrich" },
        { id: 3, nom: "Niaina" }
      ]);

    const [nouveauClient, setNouveauClient] = useState("")


    const handleChange = (e)=> {
        setNouveauClient(e.currentTarget.value)
    }

    const handleAdd = (client) => {
        const updatedClients = [...clients, client];

        setClients(updatedClients);
        console.log(updatedClients);
    }

    const handleDelete = (id) => {
        const updatedClients = [...clients];
        const index = updatedClients.findIndex((client) => client.id === id)

        updatedClients.splice(index, 1);

        setClients(updatedClients);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()

        const id = new Date().getTime()
        const nom = nouveauClient

        handleAdd({id, nom})
        setNouveauClient("")
      }

    return(
        <Layout>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ajouter client" onChange={handleChange} value={nouveauClient} />
                <button className="btn-red" >Ajouter</button>
            </form>
            <ul>
                {clients.map((client, index)=>(
                    <li key={index}>{client.nom} <button className="remove" onClick={handleDelete}>X</button></li>
                ) 
                )}
            </ul>
        </Layout>
    )
}