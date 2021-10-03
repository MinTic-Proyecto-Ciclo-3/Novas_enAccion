import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Ventas');
  const [colorBoton, setColorBoton] = useState('indigo');
  
    useEffect(() => {
      const obtenerVentas = async () => {
        const options = { method: 'GET', url: 'https://vast-waters-45728.herokuapp.com/vehicle/' };
        await axios
          .request(options)
          .then(function (response) {
            setVentas(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      };
  
      //obtener lista de ventas desde el backend
      if (mostrarTabla) {
        obtenerVentas();
      }
    }, [mostrarTabla]);
  
    useEffect(() => {
      if (mostrarTabla) {
        setTextoBoton('Crear Nueva Venta');
        setColorBoton('indigo');
      } else {
        setTextoBoton('Mostrar Todos las ventas');
        setColorBoton('green');
      }
    }, [mostrarTabla]);
    return (
      <div className='flex h-full w-full flex-col items-center justify-start p-8'>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Página de administración de ventas
          </h2>
          <button
            onClick={() => {
              setMostrarTabla(!mostrarTabla);
            }}
            className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
          >
            {textoBoton}
          </button>
        </div>
        {mostrarTabla ? (
          <TablaVentas listaVentas={ventas} />
        ) : (
          <FormularioCreacionVentas
            setMostrarTabla={setMostrarTabla}
            listaVentas={ventas}
            setVentas={setVentas}
          />
        )}
        <ToastContainer position='bottom-center' autoClose={5000} />
      </div>
    );
  };
  
  const TablaVentas = ({ listaVentas }) => {
    useEffect(() => {
      console.log('este es el listado de ventas en el componente de tabla', listaVentas);
    }, [listaVentas]);
    return (
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold text-gray-800'>Todos los productos</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre de la venta</th>
              <th>Marca del venta</th>
              <th>Modelo del venta</th>
              <th>Metodo de pago</th>
            </tr>
          </thead>
          <tbody>
            {listaVentas.map((ventas) => {
              return (
                <tr>
                  <td>{ventas.name}</td>
                  <td>{ventas.brand}</td>
                  <td>{ventas.model}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
    const form = useRef(null);
  
    const submitForm = async (e) => {
      e.preventDefault();
      const fd = new FormData(form.current);
  
      const nuevaVentas = {};
      fd.forEach((value, key) => {
        nuevaVentas[key] = value;
      });
  
      const options = {
        method: 'POST',
        url: 'https://vast-waters-45728.herokuapp.com/vehicle/create',
        headers: { 'Content-Type': 'application/json' },
        data: { name: nuevaVentas.name, brand: nuevaVentas.brand, model: nuevaVentas.model },
      };
  
      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          toast.success('Venta agregado con éxito');
        })
        .catch(function (error) {
          console.error(error);
          toast.error('Error creando una venta');
        });
  
      setMostrarTabla(true);
    };
  
    return (
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold text-gray-800'>Crear nueva venta</h2>
        <form ref={form} onSubmit={submitForm} className='flex flex-col'>
          <label className='flex flex-col' htmlFor='nombre'>
            Nombre de la venta
            <input
              name='name'
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              placeholder='Corolla'
              required
            />
          </label>
          <label className='flex flex-col' htmlFor='marca'>
            Marca de la venta
            <select
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              name='brand'
              required
              defaultValue={0}
            >
              <option disabled value={0}>
                Seleccione una opción
              </option>
              <option>Camiseta</option>
              <option>Camisa</option>
              <option>Pantalon</option>
              <option>Pantaloneta</option>
              <option>Esqueleto</option>
            </select>
          </label>
          <label className='flex flex-col' htmlFor='modelo'>
            Modelo de la venta
            <input
              name='model'
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              min={2020}
              max={2021}
              placeholder='2014'
              required
            />
          </label>
  
          <button
            type='submit'
            className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
          >
            Guardar venta
          </button>
        </form>
      </div>
    );
  };
  
  export default Ventas;
  