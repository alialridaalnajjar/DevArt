import express from "express";
import cors from "cors";
import registerRoute from "./routes/Register.route";
import dataRoute from "./routes/Data.route";
import activityRoute from "./routes/Activity.route";
import videoRoute from "./routes/Video.route";
import docsRoute from "./routes/Docs.route";
import isNewRoute from "./routes/IsNew.route";
const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", registerRoute);
app.use("/api/profile", dataRoute);
app.use("/api/activity", activityRoute);
app.use("/api/video", videoRoute);
app.use("/api/docs", docsRoute);
app.use("/api/isNew", isNewRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
