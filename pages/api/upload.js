import multiparty from "multiparty";

export default async function handle(req, res) {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files)=>{
        console.log("length : ", files.file.length)
        res.json("Ok")
    })
}

export const config = {
    api: {bodyParser: false}
}