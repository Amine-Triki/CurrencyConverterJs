import './Footer.css'
import { Link } from "react-router-dom";
let year = new Date().getFullYear() ;

const Footer = () => {
  return (
    
    <>
      <footer className="footer py-3 "style={{ backgroundColor: '#b388ff' }}  >
        <p id="Rights" className="container text-center mb-0">2025 -- {`${year} © Amine Triki || All Rights Reserved`}  </p>
    </footer>
    </>
  )
}

export default Footer
