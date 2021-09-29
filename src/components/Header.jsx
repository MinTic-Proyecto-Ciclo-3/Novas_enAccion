import logo from 'media/logo.png';

const Header = () => {
  return (
    <header className='bg-green-200'>
      <ul className='flex space-x-px'>
        <li>
          <img src={logo} alt='imagen' className='w-14' />
        </li>
        <li>
          <button className='botonGenerico mainButton'>HOME</button>
        </li>
        <li>
          <div className='buscar'>
            <input placeholder='Buscar' />
            <i className='fas fa-search botonGenerico iconoBusqueda'></i>
          </div>
        </li>
        <li>
          <button className='botonGenerico secondaryButton'>Login</button>
        </li>
        <li>
          <button className='botonGenerico mainButton'>Registro</button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
