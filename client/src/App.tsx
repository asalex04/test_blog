import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

import {check} from "./api/userAPI";
import {setIsAuth, setUser} from "./store/reducers/userSlice";
import {Spinner} from "react-bootstrap";
import {useAppDispatch} from "./hooks/redux";

function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                dispatch(setUser(true))
                dispatch(setIsAuth(true))
            }).finally(() => setLoading(false))
        }, 1000)

    }, [])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }
  return (
      <BrowserRouter>
          <NavBar />
          <AppRouter />
      </BrowserRouter>
  );
}

export default App;
