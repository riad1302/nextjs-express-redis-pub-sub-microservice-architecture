"user strict";

import express from "express";
import cors from "cors";

import postRoutes from "./src/routes/index.js";

// environment variables
const expressPort = 5001;

//express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", postRoutes);

app.listen(expressPort, () => console.log(`served on port ${expressPort}`));

