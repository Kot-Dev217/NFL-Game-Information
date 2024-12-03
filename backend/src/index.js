import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import multer from 'multer';
// import models, { connectDb } from './models';
// import routes from './routes';
const app = express();

app.use(cors());
app.use(express.json());
// Increase the payload size limit
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB file size limit
  },
});

// app.use('/player', routes.player);
app.listen(process.env.PORT, '0.0.0.0',  () =>
  console.log(`NFL App listening on port ${process.env.PORT}!`),
);
// connectDb().then(async () => {
// });
