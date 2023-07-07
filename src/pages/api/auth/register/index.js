import {createRouter, expressWrapper} from "next-connect";
import auth from "../../../../middlewares/auth";
const bcrypt = require('bcrypt')
const usersDB = require('../../../../database/users.db.service');
const CLIENT_ROLE = "CLIENT";

const router = createRouter()

router
    .use(auth)
    .put(expressWrapper(async (req, res) => {
        try{
            const {firstname, lastname, email, password, confirmPassword,  phone} = req.body
            if(password !== confirmPassword)
                return res.status(400).json({ message: "Password and confirm password are not identical." })

            const foundedUser = await usersDB.getUserByEmail(email)
            if(foundedUser)
                return res.status(400).json({ message: "A user already exists with the provided email." })

            const passwordHash = bcrypt.hashSync(password, 10)

            usersDB
                .insertUser(firstname, lastname, email, passwordHash, phone, CLIENT_ROLE)
                .then(userId => {
                    req.login( {id: userId}, err => {
                        if(err)
                            return res.status(500).json({message: "Login after registering went bad."});
                        return res.status(201).json(userId);
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: "Inserting new user went bad." })
                });
        }
        catch(err){
            const message = "[auth] " + err
            console.error(message);
            return res.status(500).json({
                data: null,
                error: { message: message }
            });
        }
    }))

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});