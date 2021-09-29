import { Link } from 'react-router-dom';

function CardCamisas({ camisa, imagen }) {
  return (
    <li className='breedCard'>
      <Link to=''>
        <div className='contenedorImagen'>
          <img src={imagen} alt={camisa} />
        </div>
      </Link>
      <span className='breedTitle'>{camisa}</span>
    </li>
  );
}

export default CardCamisas;
