import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import styles from './navbar.module.scss';
import { useState } from 'react';
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className={styles.navbarContainer}>
            <Logo></Logo>
            <div className={styles.hamberger} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? styles.menuOpen : ''}>
                <li> <NavLink to="/"> HOME </NavLink></li>
                <li> <NavLink to="/projects"> PROJECTS </NavLink></li>
                <li> <NavLink to="/notes"> NOTES </NavLink> </li>
                <li> <NavLink to="/contact"> CONTACT </NavLink> </li>
                <li> <NavLink to="/about"> ABOUT </NavLink> </li>
                <li> <NavLink to="/admin"> ADMIN </NavLink> </li>
                <li> <NavLink to="/login"> LOGIN </NavLink> </li>
            </ul>
        </nav>
    );
}
export default Navbar;
