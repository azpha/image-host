import { Router } from "express";
import SecretStuff from '../utils/Secret.mjs'
import database from '../utils/Storage.mjs'
import multer from "multer";

const router = Router();
const upload = multer({ dest: "./uploads"});

router.post('/', SecretStuff.checkSecret, upload.single('content'), (req,res) => {
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