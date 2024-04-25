import express from 'express';
import cors from 'cors';
import database from './utils/Storage.mjs'
import 'dotenv/config';

// routes
import UploadRoute from './routes/upload.mjs';
import InfoRoute from './routes/files.mjs';
import ViewerRoute from './routes/view.mjs';

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', ViewerRoute);
app.use('/upload', UploadRoute);
app.use('/info', InfoRoute);

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: 500,
        message: "Whoops! An unexpected error occurred!",
        error: err.message
    })
})

app.listen(process.env.PORT || 3000, () => {
    database.createTable();
    console.log("Server listening on port " + (process.env.PORT || 3000))
})