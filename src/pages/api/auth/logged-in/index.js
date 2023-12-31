import {createRouter, expressWrapper} from "next-connect";
import auth from "../../../../middlewares/auth";

const router = createRouter()

router
    .use(auth)
    .get(async (req, res, next) => {
        if(req.user)
            return res.status(200).json({
                data: { user: req.user },
                error: null
            })
        res.status(403).json({
            data: null,
            error: "Unauthorized"
        })
    })

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});