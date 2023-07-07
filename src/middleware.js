import {check, validationResult} from "express-validator";
import nextConnect from "next-connect";
import {redirect} from "next/dist/server/api-utils";
import { NextResponse } from 'next/server'

/*const initValidation = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))
        const errors = validationResult(req)

        if(errors.isEmpty())
            return next()

        res.status(422).json({ errors: errors.array() })
    }
}

const put = middleware => nextConnect().put(middleware);
const post = middleware => nextConnect().post(middleware);
const deleteRequest = middleware => nextConnect().delete(middleware)

const handler = nextConnect()*/

export async function middleware(req){
    /*const user = req.user

    const {pathname} = req.nextUrl.pathname
    console.log("eeeeeexeeeec")
    console.log(user)
    console.log(pathname)

    console.log(req.nextUrl.pathname)
    if(!user && !req.nextUrl.pathname.startsWith("/authentication")){
        console.log("ici")
        console.log("fini")
        return NextResponse.redirect(new URL('/authentication'))
    }


    if(user && pathname === '/authentication'){
        console.log("pas ici")
        return NextResponse.redirect(new URL('/client/dashboard', req.url))
    }*/



}

//export { initValidation, put, post, deleteRequest, check }
/*
export const config = {
    matcher: ['/authentication', '/dashboard', '/admin/dashboard']
}*/

//const auth = nextConnect()

//export default auth