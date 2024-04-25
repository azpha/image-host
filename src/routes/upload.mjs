import { Router } from "express";
import SecretStuff from '../utils/Secret.mjs'
import database from '../utils/Storage.mjs'
import multer from "multer";
import crypto from 'crypto';

const router = Router();
const upload = multer({ dest: "./uploads"});

router.post('/', SecretStuff.checkSecret, upload.single('content'), (req,res) => {
    database.query("INSERT INTO imageHostContent (hashName, originalName, type) VALUES (?, ?, ?)", [
        req.file.filename,
        req.file.originalname,
        "image"
    ])

    return res.status(200).json({
        status: 200,
        message: "Successfully created URL",
        url: "/" + req.file.originalname
    })
})

router.post('/link', SecretStuff.checkSecret, (req,res) => {
    if (!req.query || !req.query.url) {
        return res.status(400).json({
            status: 400,
            message: "Missing required parameter"
        })
    }

    const linkId = crypto.randomBytes(2).toString('hex');
    database.query(
        "INSERT INTO imageHostContent (hashName, originalName, type, url) VALUES (?, ?, ?, ?)",
        [
            linkId,
            linkId,
            "link",
            req.query.url
        ]
    )

    return res.status(200).json({
        status: 200,
        message: "Successfully created URL",
        url: "/" + linkId
    })
})

export default router;