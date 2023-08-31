import multiparty from "multiparty";

export default function handle(req, res) {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (files && files.image && files.image.length > 0) {
            console.log("Number of uploaded files:", files.image.length);
        } else {
            console.log("No files uploaded.");
        }

        return res.json("Ok");
    });
}

export const config = {
    api: { bodyParser: false }
}
