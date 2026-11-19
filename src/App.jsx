import { useState } from 'react' // lets App remember the drawn card and the album
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

  // The album: ids of the cards the player has collected.
  // Fake for now: the first 12 cards. Sprint 3: loaded from the saved user (localStorage).
  // To test the 22/22 celebration, change 12 to 21, draw a card, and the album is complete.
  const [collectedIds, setCollectedIds] = useState(CARDS.slice(0, 21).map((c) => c.id))

  // Draws a card the player doesn't have yet, so the album fills up in 22 draws
  function drawCard() {
    const newCards = CARDS.filter((c) => !collectedIds.includes(c.id)) // cards not in the album yet
    const choices = newCards.length > 0 ? newCards : CARDS // album full? then any card
    const randomIndex = Math.floor(Math.random() * choices.length) // a random position in the list
    const card = choices[randomIndex]

    setDrawnId(card.id)
    if (!collectedIds.includes(card.id)) {
      setCollectedIds([...collectedIds, card.id]) // add the new card to the album
    }
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
          <Page4
            cardId={drawnId}
            collected={collectedIds.length}
            total={CARDS.length}
            onBack={() => setDrawnId(null)}
          />
        ) : (
          <Page3
            username={username}
            collected={collectedIds.length}
            total={CARDS.length}
            onDraw={drawCard}
          />
        )}
        <Page5 />
        <Page6 />
      </main>
    </>
  )
}

export default App