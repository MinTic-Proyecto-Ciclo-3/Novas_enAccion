import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const productosBackend = [
    {
        codigo: 1, 
        nombre: "camiseta gris",
        precio: 45000,
        cantidad: 420
    },
    {
        codigo: 2, 
        nombre: "camiseta verde",
        precio: 33000,
        cantidad: 780
    },
    {
        codigo: 3, 
        nombre: "camiseta negra",
        precio: 42000,
        cantidad: 150
    },
    {
        codigo: 4, 
        nombre: "camiseta azul",
        precio: 28000,
        cantidad: 532
    }
]

export const MasterProductos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
    const [productos, setProductos] = useState([]);

    //useEffect vacio para pedir información
    useEffect(()=> {
        //obtener lista de productos desde el backend
        setProductos(productosBackend);
    },[])

    useEffect(()=> {
        if(mostrarTabla) {
            setTextoBoton('Crear Nuevo Producto');
        } else {
            setTextoBoton('Mostrar Todos los Productos')
        }

    },[mostrarTabla]);

    return (
        <div className='flex flex-col h-screen w-full items-center justify-start bg-purple-50'>
            <div className='flex flex-col p-8'>
                <h2 className='text-3xl font-bold text-gray-800 p-2' >Página de administración de productos</h2>
                <button onClick={()=> {
                    setMostrarTabla(!mostrarTabla);
                }} 
                className='text-white bg-indigo-500 p-4 rounded-md' >{textoBoton}</button>
            </div>
            {
                mostrarTabla ? (<TablaProductos listaProductos={productos} />): 
                (<AgregarProducto 
                    funcionMostrarTabla={setMostrarTabla}
                    listaProductos = {productos}
                    funcionParaAgregarProducto={setProductos} 
                />)
            }
            <ToastContainer position='bottom-center' autoClose={5000} />

        </div>

    )
}

const TablaProductos = ({ listaProductos})=> {

    const mensajeEdicionExitosa=() =>{
        toast.success('Se han guardado las modificaciones');
    };


    return(
        <div className='flex flex-col items-center justify-center bg-white py-10 px-20 shadow-lg rounded-xl'>
            <h2 className='text-gray-900 text-2xl font-bold mb-5'>Todos los productos</h2>
            <div className='flex justify-between bg-white border border-solid border-gray-500 p-1 rounded-md focus-within:border-purple-500'>
                            <input className='border-0 outline-none' placeholder="Busque un producto..."/>
                            <i class="fas fa-search"></i>
                        </div>
            <table>
                <thead>
                    <tr>
                        <th className='pr-4 py-3'>Código producto</th>
                        <th className='pr-4 py-3' >Nombre producto</th>
                        <th className='pr-4 py-3'>Precio</th>
                        <th className='pr-4 py-3'>Cantidad disponible</th>
                    </tr>
                </thead>
                <tbody className='divide-y-4'>
                    {listaProductos.map((productos)=>{
                        return(
                            <tr>
                                <td>{productos.codigo} </td>
                                <td>{productos.nombre} </td>
                                <td>{productos.precio} </td>
                                <td>{productos.cantidad} </td>
                                <td className='flex'><button onClick={mensajeEdicionExitosa} className='mx-2 px-3 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'> Editar </button>
                                <button className='mx-2 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'> Eliminar </button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
const AgregarProducto = ({funcionMostrarTabla, listaProductos,funcionParaAgregarProducto }) => {
    
    const [codigo, setCodigo] = useState();
    const [nombreProducto, setNombreProducto] = useState('');
    const [precio, setPrecio] = useState();
    const [cantidadDisponible, setCantidadDisponible] = useState();

    const enviarAlBackend = () => {
        console.log('codigo', codigo, 'nombre', nombreProducto, 'precio', precio, 'cantidad disponible', cantidadDisponible);
        toast.success('Producto agregado exitosamente');
        funcionMostrarTabla(true);
        funcionParaAgregarProducto([...listaProductos, {codigo:codigo, nombre:nombreProducto, precio:precio, cantidad:cantidadDisponible}]);
    };

    return (
      // flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700
      <div className='flex flex-col justify-start items-center w-screen h-screen text-gray-700 font-semibold'>
        <form className='flex flex-col bg-white py-10 px-20 shadow-lg rounded-xl '>
          <h2 className='text-gray-900 text-2xl font-bold mb-5'  >Agregar producto</h2>
          <label className='flex flex-col items-center' htmlFor='codigoProducto'>
            Código Producto
            <input className='border border-gray-400 mb-4 rounded-md' 
            name='codigoProducto' 
            type='number' 
            placeholder="7584"
            value={codigo}
            onChange={(e)=>{
                setCodigo(e.target.value);
            }}
            required
            />
          </label>
          <label className='flex flex-col items-center' htmlFor='nombreProducto'>
            Nombre Producto
            <input className='border border-gray-400 mb-4 rounded-md' 
            name='nombreProducto' 
            placeholder="Camiseta Azul"
            value={nombreProducto}
            onChange={(e)=>{
                setNombreProducto(e.target.value);
            }}
            required
            />
          </label>
          <label className='flex flex-col items-center' htmlFor='precio'>
            Precio
            <input className='border border-gray-400 mb-4 rounded-md' 
            name='precio' 
            type='number' 
            placeholder="25000"
            value={precio}
            onChange={(e)=>{
                setPrecio(e.target.value);
            }}
            required 
            />
          </label>
          <label className='flex flex-col items-center' htmlFor='cantidad'>
            Cantidad disponible
            <input className='border border-gray-400 mb-4 rounded-md' 
            name='cantidad' 
            type='number' 
            placeholder="575"
            value={cantidadDisponible}
            onChange={(e)=>{
                setCantidadDisponible(e.target.value);
            }}
            required 
            />
          </label>
          <button
            type='submit'
            className='bg-indigo-400 text-white font-bold col-span-1 rounded-full p-2 my-3' 
            onClick={enviarAlBackend}
          >Guardar</button>
        </form>
      </div>
    )
}
export default MasterProductos;
