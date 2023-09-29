import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if(method === "GET"){

    if(req.query?.id){
        res.json(await Product.findOne({_id: req.query.id}))
    } else{
        res.json(await Product.find())
    }
  }

  if (method === "POST") {
    const { title, description, price , imageUrl } = req.body;

    const newProduct = await Product.create({
      title,
      description,
      price,
      imageUrl
    });

    res.json(newProduct);
  }

  if(method === "PUT"){
    const { title, description, price, _id, imageUrl } = req.body;
    await Product.updateOne({_id}, {title, description, price, imageUrl})
    res.json({message: "Le produit a été bien modifié"})
  }

  if(method === "DELETE"){
    if(req.query?.id){
      await Product.deleteOne({_id: req.query?.id})
      res.json({message: "Le produit a été bien supprimé"})
    }
  }
}

