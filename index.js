import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"

const app = express()

const PORT = 4000;

const handleListening = () => 
    console.log(`Listening on: http://localhost:${PORT}`);


const handleHome = (req, res) => {
    console.log(req);
    res.send('Hello from outside');
}

const handleProfile = (req, res) => res.send("handler!");

const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
}

const middleWare = (req, res, next) => {
    res.send('not happening');
}

app.use(cookieParser);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.get('/', handleHome);
app.get("/profile", handleProfile);
app.listen(4000, handleListening);

// app.get('/', function(req, res){
//     res.send('hello world')
// })