import { Link, useNavigate } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

 const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
    document.title = "Tienda de Juegos de Mesa | Productos";
   
    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos
    updateMetaTag('description', 'Explora el catálogo de juegos de mesa. Encuentra juegos históricos, clásicos, modernos y educativos.');
    updateMetaTag('keywords', 'juegos de mesa, juegos históricos, juegos clásicos, juegos modernos, juegos educativos');
    updateMetaTag('author', '@webmaster');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'Tienda de Juegos de Mesa', 'property');
    updateMetaTag('og:description', 'Explora el catálogo de juegos de mesa.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  }, []);

  const productosPorPagina = 6;


  const manejarEliminar = (producto) => {
    // Navegar a la página de confirmación de eliminación
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    // Navegar al formulario de edición
    navigate('/formulario-producto', { state: { producto } });
  };

    const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.categoria &&
        producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  // Cambiar de página
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };


  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ul id="lista-productos">
        {productos.map((producto) => (
          <ProductoItem
            key={producto.id}
            producto={producto}
            esAdmin={esAdmin}
            onEditar={() => manejarEditar(producto)}
            onEliminar={() => manejarEliminar(producto)}
            onAgregarCarrito={() => agregarAlCarrito(producto)}
          />
        ))}
      </ul>
      <CarritoCompras />
    </>
  );
}

const ProductoItem = ({ producto, esAdmin, onEditar, onEliminar, onAgregarCarrito }) => (
  <li>
    <h2>{producto.nombre}</h2>
    <p>Descripción: {producto.descripcion}</p>
    <img src={producto.avatar} alt={producto.nombre} width="80%" />
    <p><strong>Precio: ${producto.precio}</strong></p>
   
    <Link to={`/productos/${producto.id}`} state={{producto}}>
      <button>Más detalles</button>
    </Link>
   
    <button onClick={onAgregarCarrito}>Comprar</button>

    {/* BOTONES ADMIN - Agregar contenedor */}
    {esAdmin && (
      <div className="btn-admin-container">
        <hr/>
        <button onClick={onEditar} className="btn-editar">
          Editar
        </button>
        <button onClick={onEliminar} className="btn-eliminar">
          Eliminar
        </button>
      </div>
    )}
  </li>
);
