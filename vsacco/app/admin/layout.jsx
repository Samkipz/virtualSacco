import Navbar from "../ui/navbar/page"
import Sidebar from "../ui/sidebar/page"


const layout = ({children}) => {
  return (
    <div>
        <div><Sidebar/></div>
        <div>
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

export default layout