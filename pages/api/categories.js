import { Category } from "@/lib/models/Category";

export default async function handle(req, res){
    const {method} = req; 

    if(method === "POST"){
        const {name} = req.body
        const CategoryDoc =  await Category.create({name})
        res.json(CategoryDoc)
    }
}