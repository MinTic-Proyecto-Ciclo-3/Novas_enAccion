import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const usuariosBackend = [
    {
        nombre:'santiago',
        tipo:'vendedor',
        estado:'autorizado'},
        
    {   nombre:'jose',
        tipo:'vendedor',
        estado:'no autorizado'
        },
    {   nombre:'angie',
        tipo:'admin',
        estado:'pendiente'
        },
    {   nombre:'natalia',
        tipo:'admin',
        estado:'autorizado'
    }        
]

const Usuarios = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setUsuarios(usuariosBackend);
    }, []);

    useEffect(() => {
        if (mostrarTabla){
            setTextoBoton('Crear Nuevo Usuario');
        } else{
            setTextoBoton('Mostras todos los usuarios');
        }
    }, [mostrarTabla]);

    return (
    <div  className='flex h-full w-full flex-col items-center'>
    <div className='flex flex-col justify-center w-full items-center'>    
        <h2 className='text-2xl font-extrabold'>Master de Usuarios</h2>
        <button onClick={(e) =>{setMostrarTabla(!mostrarTabla)}} className='text-black bg-indigo-400 p-5 rounded-full w-28 m-2 ml-80'> {textoBoton}</button>
    </div>
        {mostrarTabla ? (<TablaUsuarios listausuarios={usuarios}/>) :
         (<FormularioUsuarios
            funcionMostrarTabla={setMostrarTabla} 
            listausuarios = {usuarios}
            funcionAgregarUsuario={setUsuarios} />)}
        <ToastContainer position="bottom-center" autoClose={5000}/>
    </div>
    )    
}

    const TablaUsuarios = ({listausuarios}) => {
        useEffect(()=>{
            console.log('Listado de usuarios',listausuarios);
        }, [listausuarios]);
        return <div>
           <table className='tabla'>
            <thead>
                <tr>
                    <th className='border bg-gray-200 border-gray-400 px-2'> Nombre de Usuario </th>
                    <th className='border bg-gray-200 border-gray-400 px-2'> Tipo de Usuario </th>
                    <th className='border bg-gray-200 border-gray-400 px-2'> Estado de Usuario </th>
                    <th className='border bg-gray-200 border-gray-400 px-2'> Acciones </th>
                </tr>
            </thead>
            <tbody>
                {listausuarios.map((usuarios) => {
                    return (
                        <tr>
                        <td>{usuarios.nombre}</td>
                        <td>{usuarios.tipo}</td>
                        <td>{usuarios.estado}</td>
                        <td><button className='mx-2 px-3 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'> Editar </button>
                        <button className='mx-2 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'> Eliminar </button></td>
                         
                    </tr>
                    )
                })}
               
            </tbody>

           </table>   
        </div>
    }

    const FormularioUsuarios = (
        {funcionMostrarTabla,listausuarios,funcionAgregarUsuario,  
        }) =>{

        const form = useRef(null);
      
        const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoUsuario = {};
        fd.forEach((value, key) => {
        nuevoUsuario[key] = value;
            });
        funcionMostrarTabla(true);
        toast.success('Usuario agregado');
        funcionAgregarUsuario([...listausuarios, nuevoUsuario]);
        };
        return <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold'>Crear Nuevo Usuario</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col justify-center items-center'>
                <input 
                required
                               
                className='bg-gray-100 border border-gray-300 px-2 rounded-lg m-2' name='nombre' placeholder='nombre' type="text" />
                <select 
                required
                
               
                className='bg-gray-100 border border-gray-300 px-2 rounded-lg m-2' name='tipo'>
                    <option disabled>Seleccione una opción</option>
                    <option>Administrador</option>
                    <option>Vendedor</option>
                    <option>Cliente</option>
                </select>
                <select
                required
                             
                className='bg-gray-100 border border-gray-300 px-2 rounded-lg m-2' name="estado">
                    <option disabled>Seleccione una opción</option>
                    <option>Autorizado</option>
                    <option>No Autorizado</option>
                    <option>Pendiente</option>
                </select> 
                <button 
                type='submit'
                className='bg-green-300 p-1 m-2 rounded-lg'>Guardar Usuario</button>
            </form>
            
        </div>
    }

export default Usuarios;