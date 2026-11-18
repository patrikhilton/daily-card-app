import './Page3.css'

function Page3() {
  return (
    <section className="page3">
      <div className="page3-greeting">
        <h2>Good morning!</h2>
        <p className="page3-date">Wednesday 18 November</p>
      </div>

      <div className="page3-draw">
        <div className="page3-card-back">★</div>
        <button className="page3-button">Draw today's card</button>
        <p className="page3-hint">One card a day</p>
      </div>

      <div className="page3-stats">
        <p className="page3-box">8 of 22 cards collected</p>
        <p className="page3-box">Streak: 3 days</p>
      </div>
    </section>
  )
}

export default Page3
