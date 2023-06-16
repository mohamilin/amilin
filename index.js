import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import infografisRoute from "./routes/infografisRoute.js";
import userRoute from "./routes/userRoute.js";
import donasiRoute from "./routes/donasiRoute.js";
import artikelRoute from "./routes/artikelRoute.js";
import aksiRoute from "./routes/aksiRoute.js";
import komentarRoute from "./routes/komentarRoute.js";
import kontribusiRoute from "./routes/kontribusiRoute.js";
// import path  from 'path'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use(FileUpload());
// app.use(express.static("/tmp/images"));
app.use(express.static('public'))

// app.use(infografisRoute);
// app.use(userRoute);
// app.use(donasiRoute);
// app.use(artikelRoute);
// app.use(aksiRoute);
// app.use(komentarRoute);
// app.use(kontribusiRoute);
app.get('/', (req, res) => {
  res.send('Hello Guys!')
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
