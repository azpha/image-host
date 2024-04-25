import { Router } from "express";
import database from '../utils/Storage.mjs';

const router = Router();

router.get("/:name", (req,res) => {
    database.select(
        "SELECT * FROM imageHostContent WHERE originalName = ? OR hashName = ?", 
        [req.params.name],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: "Whoops! An unexpected error occurred!"
                })
            } else {
                if (rows.length <= 0) {
                    return res.status(404).json({
                        status: 404,
                        message: "No resource found with that name!"
                    })
                } else {
                    return res.status(200).json({
                        status: 200,
                        data: rows[0]
                    })
                }
            }
        }
    );
})

export default router;