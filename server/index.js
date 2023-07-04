import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import auth from "./routes/api/user.js";

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 5000;
app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb",
  })
);
app.use(Express.json());
app.use(cors());

//  routes

app.get("/", (req, res) => {
  res.send("server vishal");
});
// end point
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`connection success ${PORT}`);
});
