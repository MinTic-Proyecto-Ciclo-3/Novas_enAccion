import CardCamisas from "components/CardCamisas";

function Index() {
  return (
    <section>
      <h1 className='titulopresentacion'>NUESTROS CUATRO MODELOS BASICOS</h1>
      <ul className='breedCardContainer'>
        <CardCamisas camisa='Camiseta Azul' imagen='https://us.123rf.com/450wm/kchung/kchung1409/kchung140900505/31763441-azul-t-shirt-plantilla-aisladas-sobre-fondo-blanco.jpg?ver=6' />
        <CardCamisas camisa='Camiseta Blanca' imagen='https://http2.mlstatic.com/D_NQ_NP_846553-MCO31006759038_062019-O.jpg' />
        <CardCamisas camisa='Camiseta Negra' imagen='https://static.dafiti.com.co/p/banana-republic-6770-2113721-1-product.jpg' />
        <CardCamisas camisa='Camiseta Roja' imagen= 'https://cdn.lookastic.es/camiseta-roja/fruit-of-the-loom-original-876101.jpg' />
       </ul>
    </section>
  );
}

export default Index;
