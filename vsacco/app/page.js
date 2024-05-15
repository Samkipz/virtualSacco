import styles from './page.module.css'
import Navbar from './ui/navbar/page'
import TrendingSlider from './ui/slider/page'

const Homepage = () => {
  return (
    <div className={styles}>
      <Navbar/>
      <TrendingSlider/>
    </div>
  )
}

export default Homepage