import React from 'react'
import { Link } from 'react-router-dom'

function Servicios() {
  return (
    <>
    <h1>Servicios</h1>
            <hr />
    <div style={{ width: '85%', margin: '0 auto' }}>
        <h1> Servicios </h1>
        <h3>servicio mecánico, laminado y pintura, refacciones, accesorios*, servicios financieros y seguros a clientes particulares, empresas e instituciones, así como desarrollos inmobiliarios*. Trabajamos con marcas que ofrecen productos y servicios de reconocida calidad, confiabilidad y seguridad. El Cliente es la prioridad de nuestra organización y le brindamos asesoría integral de nuestros productos y servicios, así como herramientas financieras que se adaptan a las necesidades particulares.</h3>
        <hr />
        <li><Link to= "/"> <button>Inicio </button>  </Link></li>
         </div>
    </>
  )
}

export default Servicios