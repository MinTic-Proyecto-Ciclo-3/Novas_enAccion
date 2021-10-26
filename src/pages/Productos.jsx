import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import axios from "axios";

const MasterProductos = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
    const [productos, setProductos] = useState([]);

    const getToken = () =>{
        return `Bearer ${localStorage.getItem('token')}`;
    }

    const obtenerProductos = async () =>{
        const options = {method: 'GET',
        url: 'https://mighty-hollows-54223.herokuapp.com/api/productos',
         headers: {
          Authorization: getToken()}};

    await axios
    .request(options)
    .then(function (response) {
    console.log(response.data);
    setProductos(response.data);
    }).catch(function (error) {
    console.error(error);
    });}; 
       
    useEffect(() => {

    if (mostrarTabla){
      obtenerProductos();
    }}, [mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla){
            setTextoBoton('Crear Nuevo Producto');
        } else{
            setTextoBoton('Mostras todos los productos');
        }
    }, [mostrarTabla]);

    return (
        <div className='flex flex-col h-screen w-full items-center justify-start bg-purple-white'>
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
                    setMostrarTabla={setMostrarTabla}
                    listaProductos = {productos}
                    setProductos={setProductos} 
                />)
            }
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>

    )
}

const TablaProductos = ({ listaProductos})=> {
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);
    const [busqueda, setBusqueda] = useState('');

    useEffect(()=>{
        console.log('busqueda', busqueda);
        setProductosFiltrados(
        listaProductos.filter(elemento=>{
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        }));
    }, [busqueda, listaProductos]);

    const form = useRef(null);

    return(
        <div className='flex flex-col items-center justify-center w-full'>
        <input placeholder='Buscar'
        onChange={(e)=> setBusqueda(e.target.value)}
        className='border border-gray-500 px-3 rounded-md self-center'  />
        <form ref={form} className='w-full'>
            <table className='tabla w-full'>
                <thead>
                    <tr>
                        <th className='pr-4 py-3'>Código producto</th>
                        <th className='pr-4 py-3' >Nombre producto</th>
                        <th className='pr-4 py-3'>Precio</th>
                        <th className='pr-4 py-3'>Cantidad disponible</th>
                        <th className='pr-4 py-3'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosFiltrados.map((productos)=>{
                        return <FilaProducto key={nanoid()} productos={productos} />;
                    })}
                </tbody>
            </table>
        </form>
        </div>
    );
};

const FilaProducto =({productos}) => {
    const [edit,setEdit] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
        codigo:productos.codigo,
        nombre:productos.nombre,
        precio:productos.precio,
        cantidad:productos.cantidad
    });

    const getToken = () =>{
        return `Bearer ${localStorage.getItem('token')}`;
    }

    const actualizarProducto = async () =>{
        console.log(infoNuevoProducto);
        const options = {
            method: 'PATCH',
            url: 'https://mighty-hollows-54223.herokuapp.com/api/productos/:id',
            headers: {'Content-Type': 'application/json', Authorization: getToken()},
            data: {...infoNuevoProducto, id:productos._id}
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Producto actualizado');
          }).catch(function (error) {
            console.error(error);
            toast.error('Error actualizando Producto');
          });
    };

    const eliminarProducto = () =>{
        const options = {
            method: 'DELETE',
            url: 'https://mighty-hollows-54223.herokuapp.com/api/productos/:id',
            headers: {'Content-Type': 'application/json', Authorization: getToken()},
            data: {id: productos._id}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Producto eliminado');
          }).catch(function (error) {
            console.error(error);
            toast.error('Error eliminando Producto');
          });
    }


    return(
        <tr>
            {edit? (
        <>
            <td>
                <input  
                type='text' 
                value={infoNuevoProducto.codigo}
                onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, codigo: (e).target.value})}
                />
                </td>
            <td>
                <input 
                className='border border-gray-400 mb-4 rounded-md' 
                type='text' 
                value={infoNuevoProducto.nombre}
                onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, nombre: (e).target.value})}
                />
                </td>
            <td>
                <input 
                className='border border-gray-400 mb-4 rounded-md' type='text' 
                value={infoNuevoProducto.precio}
                onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, precio: (e).target.value})}
                />
                </td>
            <td>
                <input 
                className='border border-gray-400 mb-4 rounded-md' type='text' 
                value={infoNuevoProducto.cantidad}
                onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, precio: (e).target.value})}
                />
                </td>
        </>     
            ) : (   
        <>
                <td>{productos.codigo} </td>
                <td>{productos.nombre} </td>
                <td>{productos.precio} </td>
                <td>{productos.cantidad} </td>
         </>
        )}
            <td>
                    <div className='flex w-full items-center justify-center text-center'>
                        {edit? (
                           <>
                        <button 
                        onClick={()=> 
                            actualizarProducto()
                            }   
                        type='submit'>
                        <i                    
                        className='fas fa-check text-green-700 mx-2 hover:text-green-500'/>
                        </button>
                        <button type='button'>
                        <i 
                          className='fas fa-trash text-red-700 mx-2 hover:text-red-500'  />
                          </button>
                           </>                        
                        ) : (
                        <div className='flex justify-around'>
                        <button 
                        onClick={()=> setEdit(!edit)}
                        type='button'>
                        <i 
                        className='fas fa-pencil-alt text-yellow-700 mx-2 hover:text-yellow-500'/>
                        </button>
                        <button 
                        onClick={()=>eliminarProducto()}
                        type='submit'>
                        <i 
                        className='fas fa-trash text-red-700 mx-2 hover:text-red-500'  />
                         </button>
                         </div>
                        )}
                    </div>
            </td>
        </tr>
    )
}

const AgregarProducto = ({
    setMostrarTabla, 
}) => {
    const form = useRef(null);
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
    
        const nuevoProducto = {};
        fd.forEach((value, key) => {
        nuevoProducto[key] = value;
        });

        const getToken = () =>{
            return `Bearer ${localStorage.getItem('token')}`;
        }
        const options = {
            method: 'POST',
            url: 'https://mighty-hollows-54223.herokuapp.com/api/productos',
            headers: {'Content-Type': 'application/json', Authorization: getToken()},
            data: {codigo: nuevoProducto.codigo,
                nombre: nuevoProducto.nombre,
                precio: nuevoProducto.precio,
                cantidad: nuevoProducto.cantidad},
            };
            
            await axios
            .request(options)
            .then(function (response) {
            console.log(response.data);
            toast.success('Producto agregado con exito');
            }).catch(function (error) {
            console.error(error);
            toast.error('Error creando producto');
            });

        setMostrarTabla(true);
    };

    return (
      // flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700
      <div className='flex flex-col justify-start items-center w-screen h-screen text-gray-700 font-semibold'>
        <form ref={form} onSubmit={submitForm} className='flex flex-col bg-white py-10 px-20 shadow-lg rounded-xl '>
          <h2 className='text-gray-900 text-2xl font-bold mb-5'  >Agregar producto</h2>
          <label className='flex flex-col items-center' htmlFor='codigo'>
            Código Producto
            <input className='border-gray-600 mb-4 rounded-md' 
            name='codigo' 
            type='number' 
            placeholder="7584"
            // value={codigo}
            // onChange={(e)=>{
            //     setCodigo(e.target.value);
            // }}
            required
            />
          </label>
          <label className='flex flex-col items-center' htmlFor='nombre'>
            Nombre Producto
            <input className='border border-gray-400 mb-4 rounded-md' 
            name='nombre'
            type='text'
            placeholder="Camiseta Azul"
            // value={nombreProducto}
            // onChange={(e)=>{
            //     setNombreProducto(e.target.value);
            // }}
            required
            />
          </label>
          <label className='flex flex-col items-center' htmlFor='precio'>
            Precio
            <input className='border border-gray-400 mb-4 rounded-md' 
            name='precio' 
            type='number' 
            placeholder="25000"
            // value={precio}
            // onChange={(e)=>{
            //     setPrecio(e.target.value);
            // }}
            required 
            />
          </label>
          <label className='flex flex-col items-center' htmlFor='cantidad'>
            Cantidad disponible
            <input className='border border-gray-400 mb-4 rounded-md' 
            name='cantidad' 
            type='number' 
            placeholder="575"
            // value={cantidadDisponible}
            // onChange={(e)=>{
            //     setCantidadDisponible(e.target.value);
            // }}
            required 
            />
          </label>
          <button
            type='submit'
            className='bg-indigo-400 text-white font-bold col-span-1 rounded-full p-2 my-3' 
            //onClick={enviarAlBackend}
          >Guardar</button>
        </form>
      </div>
    )
}
export default MasterProductos;