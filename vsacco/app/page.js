import styles from './page.module.css'
import Navbar from './ui/navbar/page'
import Brand from './ui/brand/page'
import HeroSlider from './ui/slider/page'

const Homepage = () => {
  return (
    <div className={styles}>
      <Navbar/>
      <HeroSlider/>
    </div>
  )
}

export default Homepage