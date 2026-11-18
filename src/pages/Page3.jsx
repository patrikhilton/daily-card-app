import './Page3.scss' // connects the style file to this page. Without it, Page 3 has no colours or layout.

function Page3() {
  return (
    <section className="draw">
      <div className="draw__greeting">
        <h2 className="draw__title">Good morning!</h2>
        <p className="draw__date">Wednesday 18 November</p>
      </div>

      <div className="draw__deck">
        <div className="draw__card-back">★</div>
        <button className="draw__button">Draw today's card</button>
        <p className="draw__hint">One card a day</p>
      </div>

      <div className="draw__stats">
        <p className="draw__box">8 of 22 cards collected</p>
        <p className="draw__box">Streak: 3 days</p>
      </div>
    </section>
  )
}

export default Page3
