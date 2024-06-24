import { useState, useEffect, useContext } from "react"
import Header from "./components/Header"
import Registro from "./routes/Registro"
import InicioS from "./routes/InicioS"
import Home from "./routes/Home"
import { TokenContext } from "./context/TokenContext"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [mensaje, setMensaje] = useState('')
  const [token, setToken] = useContext(TokenContext)
  const [user, setUser] = useState('');
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

  useEffect(() => {
    if (token) {
      getUser()
    } else {
      setUser('')
      setPic('https://i.pinimg.com/564x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg')
    }
  }, [token])
  return (
    <BrowserRouter>
      <Header user={user} pic={pic} />
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/inicio' element={<InicioS />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
