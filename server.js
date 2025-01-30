const express = require("express");
const config = require("./fonfuguration/config");
const userroter = require("./roter/user");
const productRouter = require("./roter/product");
const cors = require('cors');
const app = express();
const port = 5000;
config();
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());
app.use("/",userroter);
app.use('/product',productRouter);

app.listen(port,console.log("Server is running on port 5000"));