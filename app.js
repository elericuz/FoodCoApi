import morgan from 'morgan';
import express from 'express';
import expressLayouts from 'express-ejs-layouts'
import cors from 'cors';
import requestIp from "request-ip";
import * as path from "path";
import {customMiddleware} from "./src/middlewares/custom.js";
import {fileURLToPath} from "url";
import {userInfo} from "./src/middlewares/userInfo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const rootDir = path.resolve(__dirname);

// App
const app = express();

// ejs as view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout-extractScripts', true);
app.set('layoutDir', process.cwd() + '/src/views');
app.set('views', process.cwd() + '/src/views');

// morgan to log
app.use(morgan('dev'));

//update the limit for json string
app.use(express.json({ limit: '10mb' }));

//urlencode
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// IP's client
app.use(requestIp.mw());

//CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir todos los orígenes
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// user info
app.use(userInfo)

// Other middlewares and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(customMiddleware);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import homeRoutes from './src/modules/home/routes/homeRoutes.js';
app.use('/', homeRoutes);

// error page
app.use((req, res) => {
    res.redirect('/404');
})

export default app;