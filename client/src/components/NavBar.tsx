import React from 'react';
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {WRITE_ROUTE, LOGIN_ROUTE, BLOG_ROUTE} from "../utils/consts";
import {useNavigate, NavLink} from 'react-router-dom'
import {setIsAuth, setUser} from "../store/reducers/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

const NavBar = () => {
    const {isAuth} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    let navigate = useNavigate()

    const logout = () => {
        dispatch(setUser({}))
        dispatch(setIsAuth(false))
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={BLOG_ROUTE}>Мой блог</NavLink>
                {isAuth ?
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button
                            onClick={() => logout()}
                            variant={'outline-light'}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={'outline-light'}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;
