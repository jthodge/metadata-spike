import express from "express";
// import { idText } from "typescript";
// import shelljs from "shelljs";

const app = express();

app.use(express.urlencoded());

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    message: "Generate Federated XML Metadata",
    title: "Metadata Spike"
  });
});

app.post("/generate", (req: any, res: any) => {
  const entityId = req.body.entityId;
  // const entityIdWithoutDomain = `${entityId}`.replace(".com", "");

  const shell = require("shelljs");
  shell.exec(
    `./generate-metadata.sh ${entityId} https://${entityId}/auth/adfs`
  );

  const file = `./${entityId}.xml`;
  res.download(file);

  // res.send(`https://workos.com/${entityIdWithoutDomain}/saml/metadata`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
