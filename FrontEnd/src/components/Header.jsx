import React, { useContext, useState, useEffect } from 'react'
import { FiShoppingCart, FiLogOut, FiMenu, FiX, FiGithub, FiBook, FiMail, FiGift, FiShoppingBag } from "react-icons/fi";
import { TokenContext } from '../context/TokenContext'
import Halloween from './svg/Halloween';
import clsx from 'clsx';


function Header() {

  const [isSideMenuOpen, setMenu] = useState(false)
  const [token, setToken] = useContext(TokenContext)
  const [user, setUser] = useState('Pepito');
  const [pic, setPic] = useState('https://i.pinimg.com/564x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg');

  const getUser = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const response = await fetch('http://localhost:8000/users/me', requestOptions)
    const data = await response.json()

    if (!response.ok) {
      console.log('Error al obtener el usuario')
    } else {
      setUser(data.nickname)
      setPic(data.pic)
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    setPic('https://i.pinimg.com/564x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg')
  }

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token])

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
          <a className='font-bold flex items-center' href="#"><FiBook className='mr-3' /> Catalogo</a>
          <a className='font-bold flex items-center' href="#"><FiShoppingBag className='mr-3' /> Tiendas</a>
          <a className='font-bold flex items-center' href="#"><FiGift className='mr-3' /> Ofertas</a>
          <a className='font-bold flex items-center' href="#"><Halloween className='mr-3' /> Halloween</a>
          <a className='font-bold flex items-center' href="#"><FiMail className='mr-3' /> Contacto</a>
          <a className='font-bold flex items-center' href="#"><FiGithub className='mr-3' /> GitHub</a>
        </section>
      </div>

      <section className='hidden lg:flex items-center gap-4'>
        <a className='font-bold flex items-center hover:text-gray-400' href="#"><FiBook className='mr-3' /> Catalogo</a>
        <a className='font-bold flex items-center hover:text-gray-400' href="#"><FiShoppingBag className='mr-3' /> Tiendas</a>
        <a className='font-bold flex items-center hover:text-gray-400' href="#"><FiGift className='mr-3' /> Ofertas</a>
        <a className='font-bold flex items-center hover:text-gray-400' href="#"><Halloween className='mr-3' /> Halloween</a>
        <a className='font-bold flex items-center hover:text-gray-400' href="#"><FiMail className='mr-3' /> Contacto</a>
        <a className='font-bold flex items-center hover:text-gray-400' href="#"><FiGithub className='mr-3' /> GitHub</a>
      </section>

      <section className='flex items-center gap-4'>
        {token && <a href="/cart" className='text-3xl'><FiShoppingCart /></a>}
        <img height={50} width={50} className='rounded-full' src={pic} />
        {token && <button onClick={logout} className='text-3xl'><FiLogOut /></button>}
      </section>
    </nav>
  )
}

export default Header