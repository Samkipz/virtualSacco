import Navbar from "../ui/navbar/page"



const layout = ({children}) => {
  return (
    <div>
        <div>
            <Navbar/>
            <div>{children}</div>
        </div>
    </div>
  )
}

export default layout