// routes/aksiRoutes.js
import express from "express";
import aksiRoute from "./aksiRoute.js";


const router = express.Router();


router.use('/aksi', aksiRoute)
export default router;
