import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { nanoid } from 'nanoid';

const Usuarios = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
    const [usuarios, setUsuarios] = useState([]);
    const [nuevaConsulta, setNuevaConsulta] = useState(true);

    useEffect(()=>{
        const obtenerUsuarios = async () =>{
            const options = {method: 'GET', url: 'http://localhost:5000/usuarios'};
    
        await axios
        .request(options)
        .then(function (response) {
        console.log(response.data);
        setUsuarios(response.data);
        }).catch(function (error) {
        console.error(error);
        });}; 
        if (nuevaConsulta){
            obtenerUsuarios();
            setNuevaConsulta(false);
        }
    }, [nuevaConsulta]);

    useEffect(() => {

    if (mostrarTabla){
      setNuevaConsulta(true);
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
        {mostrarTabla ? (<TablaUsuarios setNuevaConsulta={setNuevaConsulta} listausuarios={usuarios}/>) :
         (<FormularioUsuarios
            funcionMostrarTabla={setMostrarTabla} 
            listausuarios = {usuarios}
            funcionAgregarUsuario={setUsuarios} />)}
        <ToastContainer position="bottom-center" autoClose={5000}/>
    </div>
    )    
}

const FilaUsuario = ({usuarios, setNuevaConsulta})=>{
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
            url: 'http://localhost:5000/usuarios/editar',
            headers: {'Content-Type': 'application/json'},
            data: {...infoNuevoUsuario, id:usuarios._id}
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Usuario actualizado');
            setNuevaConsulta(true);
          }).catch(function (error) {
            console.error(error);
            toast.error('Error actualizando usuario');
          });
    };

    const eliminarUsuario = () =>{
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/usuarios/eliminar',
            headers: {'Content-Type': 'application/json'},
            data: {id: usuarios._id}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Usuario eliminado');
            setNuevaConsulta(true);
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
            onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario, tipo: e.target.value})}/></td>
            <td><input type='text' 
            value={infoNuevoUsuario.estado}
            onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario, estado: e.target.value})}/></td>
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
                        <button>
                        <i onClick={()=> 
                            actualizarUsuario()
                            }                      
                        className='fas fa-check text-green-700 mx-2 hover:text-green-500'/>
                        </button>
                        <i 
                          className='fas fa-trash text-red-700 mx-2 hover:text-red-500'  />
                           </>                        
                        ) : (
                        <div className='flex justify-around'>
                        
                        <i onClick={()=> setEdit(!edit)}
                        className='fas fa-pencil-alt text-yellow-700 mx-2 hover:text-yellow-500'/>
                        
                        <i onClick={()=>eliminarUsuario()}
                        className='fas fa-trash text-red-700 mx-2 hover:text-red-500'  />
                         
                         </div>
                        )}
                    </div>
            </td>
        </tr>
    );    
}

const TablaUsuarios = ({listausuarios, setNuevaConsulta}) => {

    const form = useRef(null);
    useEffect(()=>{
        console.log('Listado de usuarios',listausuarios);
    }, [listausuarios]);

    return( 
        <div className='flex items-center justify-center w-full'>
        <form ref={form} className='w-full'>
        <table className='tabla w-full'>
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
                return <FilaUsuario key={nanoid()} setNuevaConsulta={setNuevaConsulta} usuarios={usuarios} />;
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

    const options = {
        method: 'POST',
        url: 'http://localhost:5000/usuarios/nuevo',
        headers: {'Content-Type': 'application/json'},
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
                <option disabled>Seleccione una opción</option>
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