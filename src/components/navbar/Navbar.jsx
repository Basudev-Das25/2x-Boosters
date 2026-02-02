import MagneticButton from '../common/MagneticButton';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* logo */}
                <div className="nav-logo">
                    <span>2X</span>
                </div>

                {/* links */}
                <ul className='nav-links'>
                    <li><MagneticButton href="#hero">Home</MagneticButton></li>
                    <li><MagneticButton href="#team">Team</MagneticButton></li>
                    <li><MagneticButton href="#creators">Creators</MagneticButton></li>
                    <li><MagneticButton href="#contact">Contact</MagneticButton></li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar;