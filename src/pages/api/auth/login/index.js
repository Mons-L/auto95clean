import {createRouter, expressWrapper} from "next-connect";
import passport from "../../../../lib/passport";
import auth from "../../../../middlewares/auth";

const router = createRouter()

router
    .use(auth)
    .post(expressWrapper(async (req, res, next) => {
        passport.authenticate('local', (err, user, failureDetails) => {
            if (err)
                return res.status(500).json({message: "Something went wrong authenticating user"});

            if (!user)
                return res.status(401).json(failureDetails);

            // Save user in session
            req.login(user, err => {
                if (err)
                    return res.status(500).json({message: "Session save went bad"});

                res.status(200).json(user.id);
            })
        })(req, res, next)
    }))

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});