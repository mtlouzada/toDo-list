import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todoRouters from "../routers/routers";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", todoRouters);

const PORT = 3015;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});