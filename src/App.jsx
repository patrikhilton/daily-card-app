import { useState, useEffect } from 'react' // useState = remember, useEffect = save after every change
import { CARDS } from './data/cards' // the 22 Major Arcana cards
import { loadProgress, saveProgress, dateKey, yesterdayKey } from './utils/storage' // localStorage helpers
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

  // The player's saved progress: album, today's draw, streak and journal.
  // Loaded once from localStorage when the app opens.
  const [progress, setProgress] = useState(() => loadProgress(username))

  // Save to localStorage every time the progress changes
  useEffect(() => {
    saveProgress(username, progress)
  }, [username, progress])

  const today = dateKey() // e.g. "2026-11-19"
  const drewToday = progress.lastDrawDate === today // only one draw per day
  const drawnId = drewToday ? progress.lastCardId : null // today's card, or null = show Page 3
  const collectedIds = progress.collectedIds // the album

  // The streak only counts if the last draw was today or yesterday; otherwise it is broken (0)
  const streakAlive = drewToday || progress.lastDrawDate === yesterdayKey()
  const streak = streakAlive ? progress.streak : 0

  // Draws a card the player doesn't have yet, so the album fills up in 22 draws
  function drawCard() {
    if (drewToday) return // already drew today: one card a day

    const newCards = CARDS.filter((c) => !collectedIds.includes(c.id)) // cards not in the album yet
    const choices = newCards.length > 0 ? newCards : CARDS // album full? then any card
    const randomIndex = Math.floor(Math.random() * choices.length) // a random position in the list
    const card = choices[randomIndex]

    setProgress({
      ...progress, // keep everything else (journal etc.)
      collectedIds: collectedIds.includes(card.id) ? collectedIds : [...collectedIds, card.id], // add new card
      lastDrawDate: today,
      lastCardId: card.id,
      streak: streak + 1, // yesterday too? then +1. Streak was broken? then 0 + 1 = 1
    })
  }

  // Saves today's journal line (replaces it if the player saves again)
  function saveJournal(text) {
    const otherEntries = progress.journal.filter((e) => !(e.date === today && e.cardId === drawnId))
    setProgress({
      ...progress,
      journal: [...otherEntries, { date: today, cardId: drawnId, text }],
    })
  }

  // Today's saved journal line, if there is one
  const todayEntry = progress.journal.find((e) => e.date === today && e.cardId === drawnId)

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
        {/* Page 3 or Page 4 in the same place. After today's draw, Page 4 shows (even after a refresh). */}
        {drawnId ? (
          <Page4
            key={drawnId} // a new card = a fresh Page 4
            cardId={drawnId}
            collected={collectedIds.length}
            total={CARDS.length}
            savedText={todayEntry ? todayEntry.text : ''}
            onSaveJournal={saveJournal}
          />
        ) : (
          <Page3
            username={username}
            collected={collectedIds.length}
            total={CARDS.length}
            streak={streak}
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