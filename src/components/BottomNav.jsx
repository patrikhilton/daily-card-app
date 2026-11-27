import { NavLink } from "react-router-dom";
import "./BottomNav.scss";

function navClass({ isActive }) {
  return isActive ? "bottom-nav__link bottom-nav__link--active" : "bottom-nav__link";
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      <NavLink to="/home" className={navClass}>
        <span className="bottom-nav__icon" aria-hidden="true">✦</span>
        Draw
      </NavLink>

      <NavLink to="/album" className={navClass}>
        <span className="bottom-nav__icon" aria-hidden="true">▦</span>
        Album
      </NavLink>

      <NavLink to="/journal" className={navClass}>
        <span className="bottom-nav__icon" aria-hidden="true">✎</span>
        Journal
      </NavLink>
    </nav>
  );
}

export default BottomNav;