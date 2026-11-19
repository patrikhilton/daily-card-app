import { useState } from 'react' // lets App remember "has the player drawn a card?"
import { CARDS } from './data/cards' // the 22 Major Arcana cards
import Header from './components/Header'
import ProfileMenu from './components/ProfileMenu'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'          
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import './App.css'

function App() {
  // Fake for now. Later: the logged-in user from Tharanga's login part.
  // Written once here, then given to the pages that need it (as a "prop").
  const username = 'Qiqi'

  // Which card was drawn? null = none yet, so Page 3 shows. A card id (e.g. "ar17") = Page 4 shows.
  const [drawnId, setDrawnId] = useState(null)

  // Picks one of the 22 cards at random (Sprint 2: only cards not yet in the album, plus the API)
  function drawCard() {
    const randomIndex = Math.floor(Math.random() * CARDS.length) // a number from 0 to 21
    setDrawnId(CARDS[randomIndex].id)
  }

  return (
    <>
      <Header />
      <main>
        {/* Title row: name + tagline on the left, profile on the right */}
        <div className="app-top">
          <div>
            <h1 className="app-title">Tarot 22</h1>
            <p className="app-tagline">One card. One minute. One calm reflection.</p>
          </div>
          <ProfileMenu username={username} />
        </div>
        {/* Thin line between the title row and the page */}
        <hr className="app-divider" />
        {/* Page 3 or Page 4 in the same place: picking a card switches to the result */}
        {drawnId ? (
          <Page4 cardId={drawnId} onBack={() => setDrawnId(null)} />
        ) : (
          <Page3 username={username} onDraw={drawCard} />
        )}
        <Page5 />
        <Page6 />
      </main>
    </>
  )
}

export default App