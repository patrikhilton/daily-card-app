import './Page3.scss' // connects the style file to this page. Without it, Page 3 has no colours or layout.

function Page3() {
  // Fake numbers for now (Sprint 1). Later they come from the logged-in user.
  const collected = 12 // cards in the album
  const total = 22 // all Major Arcana cards
  const left = total - collected // cards still to find
  const percent = (collected / total) * 100 // how full the progress bar is
  const streak = 3 // days in a row the player drew a card
  const dayWord = streak === 1 ? 'day' : 'days' // "1 day" but "3 days"

  return (
    <section className="draw">
      <div className="draw__greeting">
        <h2 className="draw__title">Good morning!</h2>
        <p className="draw__date">Wednesday 18 November</p>
      </div>

      <div className="draw__deck">
        <div className="draw__cards">
          <div className="draw__card-back">★</div>
          <div className="draw__card-back">★</div>
          <div className="draw__card-back">★</div>
        </div>
        <button className="draw__button">Draw today's card</button>
        <p className="draw__hint">One card a day</p>
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
          <p className="draw__streak-text">🔥 {streak} {dayWord} in a row</p>
          <p className="draw__streak-hint">Draw today to keep your streak</p>
        </div>
      </div>
    </section>
  )
}

export default Page3
