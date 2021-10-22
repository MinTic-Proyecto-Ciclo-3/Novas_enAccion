import React from 'react'
import { useEffect, useState, useRef } from 'react/cjs/react.development'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';

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
    const form = useRef(null);

    const mensajeEdicionExitosa=() =>{
        toast.success('Se han guardado las modificaciones');
    };

    const submitEdit = (e)=> {
        e.preventDefault();
        const fd = new FormData(form.current);
        console.log(e);

    };


    return(
        <div className='w-full mx-8'>
            <h2 className='text-gray-900 text-2xl font-bold mb-5 m-8'>Todos los productos</h2>
            <div className='flex justify-between bg-white border border-solid border-gray-500 p-1 rounded-md focus-within:border-purple-500 mx-8'>
                            <input className='border-0 outline-none' placeholder="Busque un producto..."/>
                            <i class="fas fa-search"></i>
            </div>
            <table className='tabla'>
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
                    {listaProductos.map((productos)=>{
                        return(
                            <FilaProducto key={nanoid()} productos={productos} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const FilaProducto =({productos}) => {
    const [edit, setEdit] = useState(false);

    const actualizarVehiculo = ()=> {
        console.log();
    }


    return(
        <tr>
            {edit ? (
                <>
                    <td>
                        <input className='border border-gray-400 mb-4 rounded-md' type='text' defaultValue={productos.codigo} disabled />
                    </td>
                    <td>
                        <input className='border border-gray-400 mb-4 rounded-md' type='text' defaultValue={productos.nombre}/>
                    </td>
                    <td>
                        <input className='border border-gray-400 mb-4 rounded-md' type='text' defaultValue={productos.precio}/>
                    </td>
                    <td>
                        <input className='border border-gray-400 mb-4 rounded-md' type='text' defaultValue={productos.cantidad}/>
                    </td>
                </>

            ) : (
                <>
                <td>{productos.codigo} </td>
                <td>{productos.nombre} </td>
                <td>{productos.precio} </td>
                <td>{productos.cantidad} </td>
                </>
            )
            }
            <td>
                <div className='flex w-full justify-around'>
                    
                    {edit ? (
                        <i 
                        onClick={()=> actualizarVehiculo()} 
                        className='fas fa-check text-green-700 hover:text-green-500' 
                        />
                    
                    ): (
                        <i 
                        onClick={()=> setEdit(!edit)} 
                        className="fas fa-edit hover:text-blue-500"
                        />
                    )

                    }
                    
                    <i className="fas fa-trash-alt hover:text-red-600"></i>
                </div>
            </td>
        </tr>

    )
}

const AgregarProducto = ({
    setMostrarTabla, 
    listaProductos,
    setProductos 
}) => {
    const form = useRef(null);
    // const [codigo, setCodigo] = useState();
    // const [nombreProducto, setNombreProducto] = useState('');
    // const [precio, setPrecio] = useState();
    // const [cantidadDisponible, setCantidadDisponible] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });
        setMostrarTabla(true);
        setProductos([...listaProductos,nuevoProducto ]);
        toast.success('Producto agregado exitosamente');
    };

    // const enviarAlBackend = () => {
    //     console.log('codigo', codigo, 'nombre', nombreProducto, 'precio', precio, 'cantidad disponible', cantidadDisponible);
    //     toast.success('Producto agregado exitosamente');
    //     funcionMostrarTabla(true);
    //     funcionParaAgregarProducto([...listaProductos, {codigo:codigo, nombre:nombreProducto, precio:precio, cantidad:cantidadDisponible}]);
    // };

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
