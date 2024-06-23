import React, { useContext } from 'react'

import { UserContext } from '../context/userContext'

function Header({title}) {

    const [token, setToken] = useContext(UserContext)

    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

  return (
    <div>
        <h1>{title}</h1>
        {token && (<button onClick={logout}>Logout</button>)}
    </div>
  )
}

export default Header