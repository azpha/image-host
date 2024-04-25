import { Router } from 'express';
import { fileURLToPath } from 'url';
import database from '../utils/Storage.mjs';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req,res) => {
    return res.redirect("https://alexav.gg");
})

router.get('/:id', (req,res) => {
    database.select(
        "SELECT * FROM imageHostContent WHERE originalName = ? OR hashName = ?",
        [
            req.params.id
        ],
        (err, rows) => {
            console.log(err, rows)
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: "Whoops! An unexpected error occurred!"
                })
            } else if (rows.length > 0) {
                const imageData = rows[0];
                const filePath = path.join(fileURLToPath(path.dirname(import.meta.url)), '../../', 'uploads', imageData.hashName)

                if (fs.existsSync(filePath)) {
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: "An error occurred reading from the image"
                            })
                        } else {
                            res.contentType("png")
                            return res.send(data);
                        }
                    })
                } else {
                    return res.status(404).json({
                        status: 404,
                        message: "Content is missing from server!"
                    })
                }
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "No resource found with that name!"
                })
            }
        }
    )
})

export default router;