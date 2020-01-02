import express from "express";

const app = express();

app.use(express.urlencoded());
app.use(express.static("/"));

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

  const shell = require("shelljs");
  shell.exec(
    `./generate-metadata.sh ${entityId} https://${entityId}/auth/adfs`
  );

  const appRoot = require("app-root-path");

  const file = appRoot + `/${entityId}.xml`;
  res.redirect(file);
  res.sendFile(file);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
