import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// routes
import submissionRoutes from "./routes/submissions.router";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.use("/submissions", submissionRoutes);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
