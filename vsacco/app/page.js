import styles from './page.module.css'
import Footer from './ui/footer/page'
import Navbar from './ui/navbar/page'
import HeroSlider from './ui/slider/page'

const Homepage = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar/>
      <div className='flex h-fit'> 
        <HeroSlider/>
      </div>
      <div className='flex flex-col flex-grow'> 
        <Footer/>
      </div>
      
      
    </div>
  )
}

export default Homepage