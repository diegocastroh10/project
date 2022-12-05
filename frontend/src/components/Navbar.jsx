import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line,RiLogoutBoxFill } from 'react-icons/ri';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile} from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { Pedidos } from '../pages';

const NavButton = ({ title, customFunc, icon, color, dotColor}) => ( 
  <TooltipComponent content={title} position='BottomCenter'>
    <button type="button" onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray right-2"  
    >
      <span style={{ background: dotColor}}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setisClicked, handleClick, screenSize, setScreenSize } = useStateContext();


  useEffect( () => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize)

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect ( () => {
    if(screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  },[screenSize]);

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton 
        title='Menu' 
        customFunc={() => setActiveMenu((preActiveMenu) => !preActiveMenu)} 
        color='red' 
        icon={<AiOutlineMenu /> } />

      {/* botones NavBar*/}

      <div className='flex'>
        <NavButton 
          title='Pedidos' 
          customFunc={() => this.handleClick('pedidos')} 
          color='red' 
          icon={<FiShoppingBag /> } 
        />

        <NavButton 
          title='Chat' 
          dotColor='#03C9D7'
          customFunc={() => this.handleClick('chat')} 
          color='red' 
          icon={<BsChatLeft /> } 
        />

        <NavButton 
          title='Notificaciones' 
          dotColor='#03C9D7'
          customFunc={() => this.handleClick('notification')} 
          color='red' 
          icon={<RiNotification3Line /> } 
        />

        <NavButton 
          title='Cerrar Sesión' 
          dotColor='#03C9D7'
          href="http://127.0.0.1:3000"
          customFunc={() =>localStorage.removeItem('token')} 
          color='red' 
          icon={<RiLogoutBoxFill /> } 
        />  

        <TooltipComponent
        content='Profile' 
        position='BottomCenter'
        >
        <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
          onClick={() => this.handleClick ('userProfile')}
        >
          <img className='rounded-full w-8 h-8'
          src={avatar} 
          />

          <p>
            <span className='text-gray-400 text-14'>Perfil</span> {' '}
            <span className='text-gray-400 font-bold m1-1 text-14'>admin</span>
          </p>

          <MdKeyboardArrowDown className='text-gray-400 text-14' />

        </div>
        </TooltipComponent> 

        {isClicked.pedidos && <Pedidos />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar