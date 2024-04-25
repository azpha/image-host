import { Router } from "express";
import database from '../utils/Storage.mjs'
import multer from "multer";
import path from 'path';

const router = Router();
const upload = multer({ dest: "./uploads"});

router.post('/', upload.single('content'), (req,res) => {
    database.query("INSERT INTO imageHostContent (hashName, originalName) VALUES (?, ?)", [
        req.file.filename,
        req.file.originalname
    ])

    return res.status(200).json({
        status: 200,
        message: "Successfully created URL",
        url: "/" + req.file.originalname
    })
})

export default router;