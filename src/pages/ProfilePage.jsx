import './ProfilePage.scss' // styles for this page

// Profile page: who is logged in, their progress, and Log out
// Props from App.jsx:
// - username, email: the logged-in user (later from Tharanga's login)
// - collected / total: cards in the album, e.g. 5 of 22
// - streak: days in a row with a draw
// - journalCount: how many journal lines the user has saved
// - onBack: goes back to the home page
// - onLogout: logs the user out (Tharanga's handleLogout)
function ProfilePage({ username, email, collected, total, streak, journalCount, onBack, onLogout }) {
  const initial = username[0].toUpperCase() // first letter for the avatar circle, e.g. "Q"
  const dayWord = streak === 1 ? 'day' : 'days' // "1 day" but "3 days"
  const entryWord = journalCount === 1 ? 'entry' : 'entries' // "1 entry" but "4 entries"

  return (
    <section className="profile-page">
      {/* Back to the home page */}
      <button className="profile-page__back" type="button" onClick={onBack}>
        ← Back
      </button>

      <h2 className="profile-page__title">My profile</h2>

      {/* Who you are */}
      <div className="profile-page__user">
        <span className="profile-page__avatar">{initial}</span>
        <p className="profile-page__name">{username}</p>
        <p className="profile-page__email">{email}</p>
      </div>

      {/* Your progress: 3 small boxes */}
      <div className="profile-page__stats">
        <div className="profile-page__stat">
          <p className="profile-page__number">
            {collected} / {total}
          </p>
          <p className="profile-page__label">cards in album</p>
        </div>

        <div className="profile-page__stat">
          <p className="profile-page__number">🔥 {streak}</p>
          <p className="profile-page__label">{dayWord} in a row</p>
        </div>

        <div className="profile-page__stat">
          <p className="profile-page__number">{journalCount}</p>
          <p className="profile-page__label">journal {entryWord}</p>
        </div>
      </div>

      {/* Log out */}
      <button className="profile-page__logout" type="button" onClick={onLogout}>
        🚪 Log out
      </button>
    </section>
  )
}

export default ProfilePage
