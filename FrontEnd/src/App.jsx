import { useState, useEffect } from "react"
import Header from "./components/Header"
import Registro from "./components/Registro"

function App() {
  const [mensaje, setMensaje] = useState('')

  const getMensajeBienvenida = async () => {
    const requestOptions = {
      method: 'GET',
      Headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch('http://localhost:8000/', requestOptions)
    const data = await response.json()

    if(!response.ok) {
      console.log('Error al obtener el mensaje de bienvenida')
    }else {
      setMensaje(data.Mensaje)
    }
  }

  useEffect(() => {
    getMensajeBienvenida()
  }
  , [])
  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {mensaje}
          </h2>
        </div>
      </div>
    </>
  )
}

export default App
