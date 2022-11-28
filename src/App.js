import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings} from './components';
import { Administrador, Pedidos, Productos, Area, Finanzas, Stacked, Calendario, Tareas, Clientes, Prueba, Editor, Empleados} from './pages';

import { useStateContext } from './contexts/ContextProvider';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { activeMenu } = useStateContext();


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
              <Route path='/prueba' element={<Prueba />} />

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

export default App