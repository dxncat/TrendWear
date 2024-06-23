import React from 'react'

function MensajeError({ mensaje }) {
  return (
    <p className="block text-sm font-medium leading-6 text-red-900">
        {mensaje}
    </p>
  )
}

export default MensajeError