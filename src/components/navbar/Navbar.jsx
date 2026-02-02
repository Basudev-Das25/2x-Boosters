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
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#team">Team</a></li>
                    <li><a href="#creators">Creators</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar;