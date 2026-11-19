import './Page3.scss' // connects the style file to this page. Without it, Page 3 has no colours or layout.

// Props from App.jsx:
// - username: the player's name (written in one place only)
// - collected / total: cards in the album, e.g. 12 of 22 (App keeps the album)
// - streak: days in a row with a draw (saved in localStorage)
// - onDraw: runs when a card or the Draw button is clicked, and App then shows Page 4
function Page3({ username, collected, total, streak, onDraw }) {
  const left = total - collected // cards still to find
  const percent = (collected / total) * 100 // how full the progress bar is
  const dayWord = streak === 1 ? 'day' : 'days' // "1 day" but "3 days"
  // The profile button moved to components/ProfileMenu.jsx (top right, next to "Tarot 22")

  // Today's real date, e.g. "Thursday 19 November 2026"
  const now = new Date()
  const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' }) // "Thursday"
  const month = now.toLocaleDateString('en-GB', { month: 'long' }) // "November"
  const dateText = `${weekday} ${now.getDate()} ${month} ${now.getFullYear()}`

  return (
    <section className="draw">
      <div className="draw__greeting">
        <h2 className="draw__title">
          Good morning, <span className="draw__username">{username}</span>!
        </h2>
        <p className="draw__date">{dateText}</p>
      </div>

      {/* Cards, button and hint: in the middle, above the album */}
      <div className="draw__deck">
        {/* Instruction: tells the player what to do */}
        <p className="draw__instruction">
          Take a slow breath and think about your day.
          <br />
          Then pick the card that calls to you.
        </p>
        <div className="draw__cards">
          {/* Each card is a button, so it can be clicked or chosen with the keyboard */}
          <button className="draw__card-back" onClick={onDraw} aria-label="Pick card 1">★</button>
          <button className="draw__card-back" onClick={onDraw} aria-label="Pick card 2">★</button>
          <button className="draw__card-back" onClick={onDraw} aria-label="Pick card 3">★</button>
        </div>
        <button className="draw__button" onClick={onDraw}>Draw today's card</button>
        <p className="draw__hint">You can draw one new card each day</p>
      </div>

      <div className="draw__stats">
        <div className="draw__box">
          <p className="draw__album-text">Album {collected} / {total}</p>
          {/* Progress bar: the gold part grows as the album fills */}
          <div className="draw__progress">
            <div className="draw__progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
          <p className="draw__album-left">{left} new cards left to find</p>
        </div>
        <div className="draw__box">
          {/* No streak yet (or it was broken): invite the player to start one */}
          {streak === 0 ? (
            <>
              <p className="draw__streak-text">🔥 Start your streak</p>
              <p className="draw__streak-hint">Draw a card today, and come back tomorrow</p>
            </>
          ) : (
            <>
              <p className="draw__streak-text">🔥 {streak} {dayWord} in a row</p>
              <p className="draw__streak-hint">Draw today to keep your streak</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Page3
