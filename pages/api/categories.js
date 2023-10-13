import { Category } from "@/lib/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res){
    const {method} = req;
    
    await mongooseConnect()

    if(method === "GET"){
        if(req.query?.id){
            res.json(await Category.findOne({_id: req.query.id}))
        } else{
            res.json(await Category.find())
        }
    }

    if(method === "POST"){
        const {name} = req.body
        const CategoryDoc =  await Category.create({name})
        res.json(CategoryDoc)
    }
}