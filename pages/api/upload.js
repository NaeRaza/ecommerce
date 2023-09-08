import multiparty from "multiparty";

export default function handle(req, res) {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        
        res.json("Ok");
    });
}

export const config = {
    api: { bodyParser: false }
}
