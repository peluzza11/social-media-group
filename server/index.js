import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; /*used for uploading files*/
import helmet from "helmet";
import morgan from "morgan";
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
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
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
const upload = multer({ storage }); /*anytime we need to upload a file we will be using the upload variable*/

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), register); /*this will upload a picture locally into the public/assets folder and its called a middleware because its in between and occurs before the actual logic "register" of saving our user innto the database*/

/*routes*/
app.use("/auth", authRoutes);




/*TROUBLE HERE*/

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001; /*back up if original port doesnt work*/
mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => Console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));


