import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; /*uploading files*/
import helmet from "helmet"; /*It helps to protect Node. js Express apps from common security threats*/
import morgan from "morgan"; /*the process of logging requests to your application.*/
import path from "path";
import { fileURLToPath } from "url"; /*properly set the path when configuring directories*/

/*configurations*/

