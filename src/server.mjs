import express from 'express';
import cors from 'cors';
import database from './utils/Storage.mjs'
import 'dotenv/config';

// routes
import UploadRoute from './routes/upload.mjs';
import InfoRoute from './routes/files.mjs';

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    return res.redirect("https://alexav.gg")
})

app.use('/upload', UploadRoute);
app.use('/info', InfoRoute);

app.listen(3000 || process.env.PORT, () => {
    database.createTable();
    console.log("Server listening")
})