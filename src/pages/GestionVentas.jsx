import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ventasBackend = [
  {
    IDventa:15266,
    Cant:10,
    PrecioUni:5000,
    Fecha:'1-6-2020',
    IDcliente:1192654199,
    nameCliente:'Camilo',
    Monto:50000,
    nameVendedor:'Luis',
    Estado:'Completada',
  },

  {
    IDventa:17542,
    Cant:5,
    PrecioUni:20000,
    Fecha:'9-12-2020',
    IDcliente:1194652847,
    nameCliente:'Santiago',
    Monto:100000,
    nameVendedor:'Gabriela',
    Estado:'En proceso',
  },

  {
    IDventa:19562,
    Cant:20,
    PrecioUni:1000,
    Fecha:'28-4-2019',
    IDcliente:1526453278,
    nameCliente:'Andrea',
    Monto:20000,
    nameVendedor:'Laura',
    Estado:'Cancelada',
  },

  {
    IDventa:16456,
    Cant:50,
    PrecioUni:15000,
    Fecha:'28-1-2011',
    IDcliente:1326541265,
    nameCliente:'Alejadandro',
    Monto:750000,
    nameVendedor:'Luis',
    Estado:'Completada',
  },

  {
    IDventa:12486,
    Cant:100,
    PrecioUni:5000,
    Fecha:'5-9-2017',
    IDcliente:1326541265,
    nameCliente:'Liliana',
    Monto:500000,
    nameVendedor:'Gabriel',
    Estado:'Completada',
  },

];

const Venta = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [venta, setVenta] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Nuevo registro');

  useEffect(() => {
    
    setVenta(ventasBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Nuevo registro');
    } else {
      setTextoBoton('Mostrar todas la ventas');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold m-4'>
          Página de gestion de ventas
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className='mx-5 px-4 py-3 bg-blue-500 text-white hover:bg-blue-45'
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <Tabla listaVentas={venta} />
      ) : (
        <NuevoReg
          setMostrarTabla={setMostrarTabla}
          listaVentas={venta}
          setVenta={setVenta}
        />)}
         <ToastContainer position="bottom-center" autoClose={5000}/>
    </div>
  );
};

const Tabla = ({listaVentas}) => {
  useEffect(() => {
    console.log('este es el listado de vehiculos en el componente de tabla', listaVentas);
  }, [listaVentas]);
  return (
      <div className='flex flex-col items-center justify-center w-full' >
          <h2 className='text-2xl font-extrabold text-gray-800' >Todas la ventas</h2>
          <table className="tabla">
              <thead>
                  <th>ID Venta</th>
                  <th>Cantidad de productos</th>
                  <th>Precio de unidad</th>
                  <th>Fecha de compra</th>
                  <th>ID de cliente</th>
                  <th>Nombre de cliente</th>
                  <th>Monto de compra</th>
                  <th>Nombre del vendedor</th>
                  <th>Estado de la venta</th>
                  <th>Acciones</th>
                  
              </thead>
              <tbody>
                  {listaVentas.map((venta)=>{
                      return(
                          <tr>
                              <td>{venta.IDventa}</td>
                              <td>{venta.Cant}</td>
                              <td>{venta.PrecioUni}</td>
                              <td>{venta.Fecha}</td>
                              <td>{venta.IDcliente}</td>
                              <td>{venta.nameCliente}</td>
                              <td>{venta.Monto}</td>
                              <td>{venta.nameVendedor}</td>
                              <td>{venta.Estado}</td>
                              <td className='flex'><button className='mx-2 px-3 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'> Editar </button>
                              <button className='mx-2 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'> Eliminar </button></td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
      </div>
  );
}

const NuevoReg = ({setMostrarTabla, listaVentas, setVenta}) => {
  const form = useRef(null);

  const submitForm = (e) => {
  e.preventDefault();
  const fd = new FormData(form.current);
  
  const nuevaVenta = {};
  fd.forEach((value, key) => {
    nuevaVenta[key] = value;
  });
  
  toast.success('Usuario agregado');
  setMostrarTabla(true);
  setVenta([...listaVentas, nuevaVenta]);
  
};

  return(
      <div className='flex flex-col justify-center' >
          <h2 className='text-2xl font-extrabold text-gray-800 m-3' >Registrar nueva venta</h2>
          <form ref={form} onSubmit={submitForm} className='flex flex-col' >
              <label className='' htmlFor="IDventa">
              Identificacion de la venta
              <input 
                  name="IDventa"
                  className=""
                  type="number" 
                  min={0}
                  max={99999}
                  placeholder="12345"
                  required
              />
              </label>

              <label className='' htmlFor="Cant">
              Cantidad de productos
              <input 
                  name="Cant"
                  className=""
                  type="number" 
                  min={0}
                  max={99999}
                  placeholder="10"
                  required
              />
              </label>

              <label className='' htmlFor="PrecioUni">
              Precio de unidad
              <input 
                  name="PrecioUni"
                  className=""
                  type="number" 
                  min={0}
                  max={99999}
                  placeholder="10"
                  required
              />
              </label>

              <label className='' htmlFor="Fecha">
              Fecha de compra
              <input 
                  name="Fecha"
                  className=""
                  type="date" 
                  min='1-1-2000'
                  max='6-10-2021'
                  placeholder="5/9/2021"
                  required
              />
              </label>

              <label className='' htmlFor="IDclinte">
                  Identificacion del cliente
                  <input 
                  name="IDcliente"
                  type="number" 
                  min={0}
                  max={9999999999}
                  placeholder="1123456789"
                  required
                  />
              </label>

              <label className='' htmlFor="nameCliente">
                  Nombre del cliente
                  <input 
                  name="nameCliente"
                  type="text" 
                  placeholder="Santiago"
                  required
                  />
              </label>

              <label className='' htmlFor="Monto">
              Monto total de compra
                  <input 
                  name="Monto"
                  type="number" 
                  min={1}
                  placeholder="100000"
                  required
                  />
              </label>

              <label className='' htmlFor="nameVendedor">
                  Nombre del vendedor
                  <input 
                  name="nameVendedor"
                  type="text" 
                  placeholder="Luis"
                  required
                  />
              </label>

              <label className='' htmlFor="Estado">
                  Estado de la venta
                  <select 
                  name="Estado" 
                  required
                  defaultValue={0}
                  >
                      <option disabled value={0}>
                          Seleccione una opcion
                      </option>
                      <option>Completada</option>
                      <option>En proceso</option>
                      <option>Cancelada</option>
                  </select>
              </label>
              <button
              type='submit'
              // className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
              >
              Guardar venta
              </button>
          </form>
      </div>
  );
}

  export default Venta;