import Auth from "./pages/Auth";
import {REGISTRATION_ROUTE, LOGIN_ROUTE, BLOG_ROUTE, WRITE_ROUTE} from './utils/consts'
import Blog from "./pages/Blog";
import PostPage from "./pages/PostPage";

export const authRoutes = [
    {
        path: WRITE_ROUTE,
        Component: Blog
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: BLOG_ROUTE,
        Component: Blog
    },
    {
        path: `/:id`,
        Component: PostPage
    }
]
