
import { Link } from 'react-router-dom'

function NavBar() {
   

  return (
   <>
        <nav>
            <div className="logo">
                <h2>Easy Meet</h2>
            </div>
            <div className='nav-elements'>
                <Link to='/' className='active-bar' >Home</Link>
                <Link to='/about' >About</Link>
                <Link to='/contact' >Contact</Link>
                <Link to='/login' >Login</Link>
            </div>
        </nav>
   </>
  )
}

export default NavBar