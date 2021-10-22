import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { nanoid } from 'nanoid';

const Venta = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [venta, setVenta] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Nuevo registro');

  const obtenerVenta = async () =>{
    const options = {method: 'GET', url: 'http://localhost:5000/api/ventas'};

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
          setVenta(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }; 
  
    useEffect(() => {

      if (mostrarTabla){
        obtenerVenta();
      }}, [mostrarTabla]);

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
          funcionMostrarTabla={setMostrarTabla}
          listaVentas={venta}
          setVenta={setVenta}
        />)}
         <ToastContainer position="bottom-center" autoClose={5000}/>
    </div>
  );
};

const FilaVenta =({ venta, setEjecutarConsulta}) =>{
  const [edit, setEdit] = useState(false);
  const [infoNuevaVenta, setinfoNuevaVenta] = useState({
    IDventa: venta.IDventa,
    Cant: venta.Cant,
    PrecioUni: venta.PrecioUni,
    Fecha: venta.Fecha,
    IDcliente: venta.IDcliente,
    nameCliente: venta.nameCliente,
    Monto: venta.Monto,
    nameVendedor: venta.nameVendedor,
    Estado: venta.Estado,
  });

  const actualizarVenta = async () => {
    console.log(infoNuevaVenta);
        const options = {
           method: 'PATCH',
           url: 'http://localhost:5000/api/ventas/:id',
           headers: {'Content-Type': 'application/json'},
         data: {...infoNuevaVenta, id:venta._id}
        };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Venta actualizado');
          }).catch(function (error) {
            console.error(error);
            toast.error('Error actualizando venta');
          });
  };

  const deleteVenta = async () => {
    const options = {
      method: 'DELETE',
      url: 'http://localhost:5000/api/ventas/:id',
      headers: {'Content-Type': 'application/json'},
      data: {id: venta._id}
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      toast.success('Venta eliminado');
    }).catch(function (error) {
      console.error(error);
      toast.error('Error eliminando venta');
    });
  };

  return(
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevaVenta.Cant}
              onChange={(e) => setinfoNuevaVenta({ ...infoNuevaVenta, Cant: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevaVenta.PrecioUni}
              onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, PrecioUni: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='date'
              value={infoNuevaVenta.Fecha}
              onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, Fecha: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevaVenta.IDcliente}
              onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, IDcliente: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.nameCliente}
              onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, nameCliente: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevaVenta.Monto}
              onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, Monto: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.nameVendedor}
              onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, nameVendedor: e.target.value })
              }
            />
          </td>
          <td>
            <select 
                name="Estado" 
                required
                value={infoNuevaVenta.Estado}
                onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, Estado: e.target.value })
              }
                >
                    <option disabled value={0}>
                        Seleccione una opcion
                    </option>
                    <option>Completada</option>
                    <option>En proceso</option>
                    <option>Cancelada</option>
            </select>

          <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='slect'
              value={infoNuevaVenta.Fecha}
              onChange={(e) =>
                setinfoNuevaVenta({ ...infoNuevaVenta, Fecha: e.target.value })
              }
            /> 
          </td>
        </>
      ) : (
        <>
          <td>{venta.IDventa}</td>
          <td>{venta.Cant}</td>
          <td>{venta.PrecioUni}</td>
          <td>{venta.Fecha}</td>
          <td>{venta.IDcliente}</td>
          <td>{venta.nameCliente}</td>
          <td>{venta.Monto}</td>
          <td>{venta.nameVendedor}</td>
          <td>{venta.Estado}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <button
                onClick={() => actualizarVenta()}
                type='submit'
                className='mx-2 px-3 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                >
                  Confirmar edicion
                </button>
              <button
                // onClick={() => setEdit(!edit)}
                className='mx-2 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              >
                Cancelar edición
              </button>
            </>
          ) : (
            <div className='flex justify-around'>
              <button className='mx-2 px-3 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
              onClick={() => setEdit(!edit)}
              type='button'
              > Editar </button>

              <button className='mx-2 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              onClick={() => deleteVenta()}
              type='submit'
              > Eliminar </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const Tabla = ({listaVentas}) => {

  const form = useRef(null);
  useEffect(() => {
    console.log('Listado de ventas', listaVentas);
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
                      <FilaVenta
                        key={nanoid()}
                        venta={venta}
                      />
                    );
                  })}
              </tbody>
          </table>
      </div>
  );
}

const NuevoReg = ({funcionMostrarTabla}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
  e.preventDefault();
  const fd = new FormData(form.current);
  
  const nuevaVenta = {};
  fd.forEach((value, key) => {
    nuevaVenta[key] = value;
  });
  
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/api/ventas',
    headers: {'Content-Type': 'application/json'},
    data: {
      IDventa: nuevaVenta.IDventa,
      Cant: nuevaVenta.Cant,
      PrecioUni: nuevaVenta.PrecioUni,
      Fecha: nuevaVenta.Fecha,
      IDcliente: nuevaVenta.IDcliente,
      nameCliente: nuevaVenta.nameCliente,
      Monto: nuevaVenta.Monto,
      nameVendedor: nuevaVenta.nameVendedor,
      Estado: nuevaVenta.Estado,
      }
    };
    
     await axios
       .request(options)
       .then(function (response) {
       console.log(response.data);
       toast.success('Venta agregada con exito');
       }).catch(function (error) {
         console.error(error);
         toast.error('Error creando la venta');
     });

funcionMostrarTabla(true);
  
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
                  min="2000-01-01"
                  max={new Date().toISOString().split("T")[0]}                                       
                  step="1"
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
              className='bg-gray-500'
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