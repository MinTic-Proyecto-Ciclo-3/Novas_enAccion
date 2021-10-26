import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { nanoid } from 'nanoid';

const Usuarios = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
    const [usuarios, setUsuarios] = useState([]);
    
    const getToken = () =>{
        return `Bearer ${localStorage.getItem('token')}`;
    }

    const obtenerUsuarios = async () =>{
        const options = {
            method: 'GET',
            url: 'https://mighty-hollows-54223.herokuapp.com/usuarios/',
            headers: {
                Authorization: getToken()
            }
        };

    await axios
    .request(options)
    .then(function (response) {
    console.log(response.data);
    setUsuarios(response.data);
    }).catch(function (error) {
    console.error(error);
    });}; 
       
    useEffect(() => {

    if (mostrarTabla){
      obtenerUsuarios();
    }}, [mostrarTabla]);

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
        <button onClick={(e) =>{setMostrarTabla(!mostrarTabla)}}
        className='text-black bg-indigo-400 p-5 rounded-full w-28 m-2 ml-80'>
        {textoBoton}</button>
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

const FilaUsuario = ({usuarios})=>{
    const getToken = () =>{
        return `Bearer ${localStorage.getItem('token')}`;
    }

    const [edit,setEdit] = useState(false);
    const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
        nombre:usuarios.nombre,
        tipo:usuarios.tipo,
        estado:usuarios.estado
    });

    const actualizarUsuario = async () =>{
        console.log(infoNuevoUsuario);
        const options = {
            method: 'PATCH',
            url: 'https://mighty-hollows-54223.herokuapp.com/usuarios/editar/',
            headers: {'Content-Type': 'application/json', Authorization: getToken()},
            data: {...infoNuevoUsuario, id:usuarios._id}
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Usuario actualizado');
          }).catch(function (error) {
            console.error(error);
            toast.error('Error actualizando usuario');
          });
    };

    const eliminarUsuario = () =>{
        const options = {
            method: 'DELETE',
            url: 'https://mighty-hollows-54223.herokuapp.com/usuarios/eliminar/',
            headers: {'Content-Type': 'application/json',Authorization: getToken()},
            data: {id: usuarios._id}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Usuario eliminado');
          }).catch(function (error) {
            console.error(error);
            toast.error('Error eliminando usuario');
          });
    }

    return(
        <tr>
            {edit? (
        <>
            <td><input type='text' 
            value={infoNuevoUsuario.nombre}
            onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario, nombre: (e).target.value})}/></td>
            <td><input type='text' 
            value={infoNuevoUsuario.tipo}
            onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario, tipo: (e).target.value})}/></td>
            <td><input type='text' 
            value={infoNuevoUsuario.estado}
            onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario, estado: (e).target.value})}/></td>
        </> )
        : (   
        <>
                <td>{usuarios.nombre}</td>
                <td>{usuarios.tipo}</td>
                <td>{usuarios.estado}</td>
         </>
        )}
            <td>
                    <div className='flex w-full items-center justify-center text-center'>
                        {edit? (
                           <>
                        <button 
                        onClick={()=> 
                            actualizarUsuario()
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
                        onClick={()=>eliminarUsuario()}
                        type='submit'>
                        <i 
                        className='fas fa-trash text-red-700 mx-2 hover:text-red-500'  />
                         </button>
                         </div>
                        )}
                    </div>
            </td>
        </tr>
    );    
}

const TablaUsuarios = ({listausuarios}) => {
    const [usuariosFiltrados, setUsuariosFiltrados] = useState(listausuarios);
    const [busqueda, setBusqueda] = useState('');

    useEffect(()=>{
        console.log('busqueda', busqueda);
        setUsuariosFiltrados(
        listausuarios.filter(elemento=>{
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        }));
    }, [busqueda, listausuarios]);

    const form = useRef(null);
 

    return( 
        <div className='flex flex-col items-center justify-center w-full'>
        <input placeholder='Buscar'
        onChange={(e)=> setBusqueda(e.target.value)}
        className='border border-gray-500 px-3 rounded-md self-center'  />
        <form ref={form} className='w-full'>
        <table className='tabla w-full '>
        <thead>
            <tr>
                <th className='border bg-gray-200 border-gray-400 px-2'> Nombre de Usuario </th>
                <th className='border bg-gray-200 border-gray-400 px-2'> Tipo de Usuario </th>
                <th className='border bg-gray-200 border-gray-400 px-2'> Estado de Usuario </th>
                <th className='border bg-gray-200 border-gray-400 px-2'> Acciones </th>
            </tr>
        </thead>
        <tbody>
            {usuariosFiltrados.map((usuarios) => {
                return <FilaUsuario key={nanoid()} usuarios={usuarios} />;
            })}
        </tbody>
        </table>   
        </form>
    </div>
    );
};

const FormularioUsuarios = (
    {funcionMostrarTabla}) =>{

    const form = useRef(null);
    
    const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuario = {};
    fd.forEach((value, key) => {
    nuevoUsuario[key] = value;
        });

        const getToken = () =>{
            return `Bearer ${localStorage.getItem('token')}`;
        }

    const options = {
        method: 'POST',
        url: 'https://mighty-hollows-54223.herokuapp.com/usuarios/nuevo/',
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data: {nombre: nuevoUsuario.nombre,
            tipo: nuevoUsuario.tipo,
            estado: nuevoUsuario.estado},
        };
        
        await axios
        .request(options)
        .then(function (response) {
        console.log(response.data);
        toast.success('Usuario agregado con exito');
        }).catch(function (error) {
        console.error(error);
        toast.error('Error creando usuario');
        });

    funcionMostrarTabla(true);
    
    };
    return <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold'>Crear Nuevo Usuario</h2>
        <form ref={form} onSubmit={submitForm} className='flex flex-col justify-center items-center'>
            <input 
            required
                            
            className='bg-gray-100 border border-gray-300 px-2 rounded-lg m-2' 
            name='nombre'
            placeholder='nombre' type="text" />
            <select 
            required
                 
            className='bg-gray-100 border border-gray-300 px-2 rounded-lg m-2' 
            name='tipo'>
                <option >Seleccione una opción</option>
                <option >Administrador</option>
                <option >Vendedor</option>
                <option >Cliente</option>
            </select>
            <select
            required
            
                            
            className='bg-gray-100 border border-gray-300 px-2 rounded-lg m-2' 
            name="estado">
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