import { Product } from "@/lib/models/Product";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import mongoose from "mongoose";

export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect();

    if(method === 'POST'){

        const {title, description, price} = req.body;

        const newProduct = await Product.create({
            title,
            description,
            price
        })


        res.json('post');
    }
}