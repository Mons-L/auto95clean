import {createRouter, expressWrapper} from "next-connect";
import auth from "../../../../middlewares/auth";


const router = createRouter()

router
    .use(auth)
    .post(expressWrapper((req, res, next) => {
        req.logout(err => {
            if(err)
                return next(err)
            return res.status(204).send()
        })
    }))

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});