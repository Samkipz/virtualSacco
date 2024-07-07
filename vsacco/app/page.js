import styles from './page.module.css'
import Footer from './ui/footer/page'
import Navbar from './ui/navbar/page'
import HeroSlider from './ui/slider/page'

const Homepage = () => {
  return (
    <div className={styles}>
      <Navbar/>
      <HeroSlider/>
      <Footer/>
    </div>
  )
}

export default Homepage