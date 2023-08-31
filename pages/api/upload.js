import multiparty from "multiparty";

export default function handle(req, res) {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        console.log(files)

        res.json("Ok");
    });
}

export const config = {
    api: { bodyParser: false }
}
