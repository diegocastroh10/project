import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings} from './components';
import { Administrador, Pedidos, Productos, Area, Finanzas, Stacked, Calendario, Tareas, Clientes, Prueba, Editor, Empleados} from './pages';

import { useStateContext } from './contexts/ContextProvider';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

let token = "";
let isLogin = false;
if (localStorage.getItem('token')){
  token = localStorage.getItem('token');
  isLogin = true;
}

console.log(token);

const App = () => {
  const { activeMenu } = useStateContext();
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('token')){
      const token_ = localStorage.getItem('token');
      setToken(token_)
      setIsLogin(true);
    }
  });

  if(!isLogin) {
    return(
        <Prueba setToken={setToken} setIsLogin={setIsLogin} />
    )
  }
  else {

    return (
        <div>
          <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
              <div className="fixed right-4 bottom-4" style={{zindex: '1000'}}>
                <TooltipComponent content="Configuración" position="Top">
                  <button type='button' className='text-3xl p-3 hover:drop-shadow-1x hover:bg-light-gray'
                          style={{background: 'red', borderRadius: '50%'}}>
                    <FiSettings />
                  </button>
                </TooltipComponent>
              </div>
              {activeMenu ? (
                  <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                    <Sidebar />
                  </div>
              ) : (
                  <div className='w-0 dark:bg'>
                    <Sidebar />
                  </div>
              )}
              <div className={
                activeMenu ? 'dark:bg-main-bg bg-main-bg min-h-screen md:ml-72 w-full'
                    : 'dark:bg-main-bg bg-main-bg min-h-screen md:ml-72 w-full flex-2'
              }>
                <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                  <Navbar />
                </div>


                <div>
                  <Routes>
                    {/*Pages*/}
                    <Route path='/productos' element={<Productos />} />
                    <Route path='/empleados' element={<Empleados />} />
                    <Route path='/clientes' element={<Clientes />} />
                    <Route path='/editor' element={<Editor />} />
                    {/*Dashboard*/}
                    <Route path='/' element={<Administrador />} />
                    <Route path='/administrador' element={<Administrador />} />
                    <Route path='/pedidos' element={<Pedidos />} />
                    {/*Apps*/}
                    <Route path='/calendario' element={<Calendario />} />
                    <Route path='/tareas' element={<Tareas />} />

                    {/*Charts*/}
                    <Route path='/area' element={<Area />} />
                    <Route path='/finanzas' element={<Finanzas />} />
                    <Route path='/stacked' element={<Stacked />} />

                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </div>
    )
  }
}

export default App

// Example POST method implementation:
async function helloWorld(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

helloWorld('http://192.168.0.15:3001', { answer: 42 })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });


/*

const user = {
  "email": "mc@libertador.cl",
  "password": "mys3cr3tp4ssw0rd"
}

async function login(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
login('http://192.168.0.15:3001/administrators/authenticate', user)
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
*/


