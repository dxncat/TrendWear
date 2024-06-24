import React, { useContext, useState, createElement } from 'react'
import { NavLink } from 'react-router-dom'
import { FiShoppingCart, FiLogOut, FiMenu, FiX, FiGithub, FiBook, FiMail, FiGift, FiShoppingBag } from "react-icons/fi";
import { TokenContext } from '../context/TokenContext'
import Halloween from './svg/Halloween';
import clsx from 'clsx';


function Header({ pic }) {

  const [isSideMenuOpen, setMenu] = useState(false)
  const [token, setToken] = useContext(TokenContext)


  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const navlinks = [{ name: 'Catalogo', icon: FiBook }, { name: 'Tiendas', icon: FiShoppingBag }, { name: 'Ofertas', icon: FiGift }, { name: 'Halloween', icon: Halloween }, { name: 'Contacto', icon: FiMail }, { name: 'GitHub', icon: FiGithub }].map((link, index) => (
    <NavLink key={index} className='font-bold flex items-center hover:text-gray-400' to={`/${link.name.toLowerCase()}`}>{createElement(link.icon, { className: 'mr-3' })} {link.name}</NavLink>
  ))

  return (
    <nav className='flex justify-between px-8 items-center py-6 '>

      <section className='flex items-center gap-4'>
        <FiMenu className="text-3xl cursor-pointer lg:hidden" onClick={() => setMenu(true)} />
        <a href="/" className='text-4xl font-mono'>TrendWear</a>
      </section>

      {/* Solo para pantallas mobiles */}
      <div className={clsx('fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 translate-x-full transition-all', isSideMenuOpen && 'translate-x-0')} >
        <section className='text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex '>
          <FiX className='mt-0 mb-8 text-3xl cursor-pointer' onClick={() => setMenu(false)} />
          {navlinks}
        </section>
      </div>

      <section className='hidden lg:flex items-center gap-4'>
        {navlinks}
      </section>

      <section className='flex items-center gap-4'>
        {token && <a href="/cart" className='text-3xl'><FiShoppingCart /></a>}
        <NavLink to = {'/inicio'}><img height={50} width={50} className='rounded-full' src={pic} /></NavLink>
        {token && <button onClick={logout} className='text-3xl'><FiLogOut /></button>}
      </section>
    </nav>
  )
}

export default Header