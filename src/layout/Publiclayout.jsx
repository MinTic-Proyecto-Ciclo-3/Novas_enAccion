import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Publiclayout = ({children}) => {
    
      return (
        <div className='flex flex-col'>
            <Navbar/>
            <main className='bg-yellow-200 h-screen'>
                {children}
            </main>
            <Footer/>     
        </div>
    )
}

export default Publiclayout;
