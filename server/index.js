import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; /*used for uploading files*/
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js"

/*configurations*/
const __filename = fileURLToPath(import.meta.url); /*grab the file URL and use the modules*/
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors()); 
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); /*set the directory of where we keepp the assets*/

/*file storage, saves files if someone uploads a file in the website then it will say destination and it will saved in public/assets  */
const storage = multer.diskStorage({
    destinations: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), register);

/*routes*/
app.use("/auth", authRoutes);




/*TROUBLE HERE*/

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001; /*back up if original port doesnt work*/
mongoose
.connect("mongodb://localhost:27017/socialmedia")
.then(() => {
    app.listen(PORT, () => Console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));


