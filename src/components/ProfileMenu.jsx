import { useState } from 'react' // lets the component remember things, e.g. "is the menu open?"
import './ProfileMenu.scss' // styles for the profile button and menu

// Profile button (top right, next to "Tarot 22") with a small menu.
// It lives in its own file so every page can use it.
// Props from App.jsx:
// - username: shown on the button (written in one place only)
// - onLogout: runs when "Log out" is clicked (Tharanga's login part logs the user out)
function ProfileMenu({ username, onLogout }) {
  const initial = username[0].toUpperCase() // first letter, e.g. "Q"

  // Is the menu open? Starts closed (false).
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="profile">
      <button
        className="profile__button"
        onClick={() => setMenuOpen(!menuOpen)} // click = open, click again = close
        aria-haspopup="menu" // tells screen readers this opens a menu
        aria-expanded={menuOpen} // tells screen readers if it is open
      >
        <span className="profile__avatar">{initial}</span>
        <span className="profile__name">{username}</span>
        <span className="profile__chevron">{menuOpen ? '▲' : '▼'}</span>
      </button>

      {/* The menu only shows when menuOpen is true */}
      {menuOpen && (
        <ul className="profile__menu" role="menu">
          <li>
            {/* Later: open the profile page */}
            <button className="profile__item" role="menuitem" onClick={() => setMenuOpen(false)}>
              👤 My profile
            </button>
          </li>
          <li>
            {/* Closes the menu, then logs out (App passes Tharanga's handleLogout) */}
            <button
              className="profile__item"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false)
                onLogout()
              }}
            >
              🚪 Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ProfileMenu
