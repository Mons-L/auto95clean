import {createRouter, expressWrapper} from "next-connect";
import passport from "../lib/passport";
//import session from "../lib/session";
import session from "express-session";


const auth = createRouter()

auth
    .use(expressWrapper(
        session({
            name: process.env.COOKIE_NAME,
            secret: process.env.COOKIE_SECRET,
            credentials: true,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.ENVIRONNEMENT === "production",
                httpOnly: true,
                sameSite: process.env.ENVIRONNEMENT === "production",
                maxAge: 86400000
            }
        })
    ))
    .use(expressWrapper(passport.initialize()))
    .use(expressWrapper(passport.session()))

export default auth