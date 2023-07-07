import apiHandler from "../apiHandler";
import global from "../pagesPath";
import useSWR from "swr";

export default {
    async protectUserRoute(context, redirectTo, getProps) {
        try {
            await apiHandler.loggedIn()
            console.log("user route not redirected")
            if (getProps)
                return {
                    props: getProps
                }

            return {
                props: {},
            }
        }
        catch (err) {
            console.log("user route redirected")
            return {
                props: {},
            }
        }
    },
    async protectAuthenticationRoute(context, redirectTo, getProps){
        try {
            await apiHandler.loggedIn()
            console.log("auth route redirected")
            return {
                redirect: {
                    destination: redirectTo ?? global.CLIENT_DASHBOARD_PAGE_PATH,
                    permanent: false
                }
            }
        }
        catch (err) {
            console.log("auth route not redirected")
            if (getProps)
                return {
                    props: getProps
                }
            return {
                props: {},
            }
        }
    },

    async protectedRoute() {
        try {
            await apiHandler.loggedIn()
            console.log("user route not redirected")

        }
        catch (err) {
            console.log("user route redirected")
            return {
                props: {},
            }
        }
    },
}