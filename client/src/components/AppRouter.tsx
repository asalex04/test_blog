import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {BLOG_ROUTE} from "../utils/consts";
import {useAppSelector} from "../hooks/redux";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.user)
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route
                path="*"
                element={<Navigate to={BLOG_ROUTE}/>}
            />
        </Routes>
    );
};

export default AppRouter;
