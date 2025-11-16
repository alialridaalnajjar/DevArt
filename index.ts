import express from "express";
import cors from "cors";
import registerRoute from "./routes/Register.route";

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", registerRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
