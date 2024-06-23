import React, { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import MensajeError from './MensajeError'

function Registro() {

    const [nickname, setNickname] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [confirmContraseña, setConfirmContraseña] = useState('')
    const [pic, setPic] = useState('')
    const [correo, setCorreo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [numero, setNumero] = useState()
    const [esTienda, setEsTienda] = useState(false)
    const [desactivado, setDesactivado] = useState(false)
    const [mensajeError, setMensajeError] = useState('')
    const [, setToken] = useContext(UserContext)

    const submitRegistro = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, contraseña, pic, correo, direccion, numero, es_tienda: esTienda, desactivado })
        }

        console.log(requestOptions)

        const response = await fetch('http://localhost:8000/register', requestOptions)
        const data = await response.json()

        if (!response.ok) {
            setMensajeError(data.detail)
        } else {
            setToken(data.access_token)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (contraseña === confirmContraseña) {
            submitRegistro()
        } else {
            setMensajeError('Las contraseñas no coinciden')
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre de Usuario
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Enlace imagen de perfil
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={pic}
                                onChange={(e) => setPic(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Correo Electrónico
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Direccion
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Número de Teléfono
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirmar Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={confirmContraseña}
                                onChange={(e) => setConfirmContraseña(e.target.value)}
                            />
                        </div>
                    </div>

                    <MensajeError mensaje={mensajeError}/>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Regístrate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registro