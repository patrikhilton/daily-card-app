import { useState, useEffect } from 'react' // useState = remember, useEffect = save after every change
import { CARDS } from './data/cards' // the 22 Major Arcana cards
import { loadProgress, saveProgress, emptyProgress, dateKey, yesterdayKey } from './utils/storage' // localStorage helpers
import Header from './components/Header'
import PageContainer from './components/PageContainer' // Tharanga's centred box for the login screen
import AuthScreen from './components/AuthScreen' // Tharanga's log in / sign up screen
import ProfileMenu from './components/ProfileMenu'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import ProfilePage from './pages/ProfilePage'
import './App.css'

// Tharanga's key: who is logged in is saved under this name in localStorage
const SESSION_STORAGE_KEY = 'tarot22:session'

function App() {
  // Tharanga's login: who is logged in ({ email, username }), or null = nobody.
  // If the page is refreshed, the session is loaded again from localStorage.
  const [currentUser, setCurrentUser] = useState(() => {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY)
    return savedSession ? JSON.parse(savedSession) : null
  })

  // The player's saved progress: album, today's draw, streak and journal.
  // Loaded from localStorage for the logged-in user (email = the team's primary key).
  const [progress, setProgress] = useState(() =>
    currentUser ? loadProgress(currentUser.email) : emptyProgress()
  )

  // Which page to show: false = home (draw / card / album / journal), true = the profile page on its own.
  // Later Patrik's router turns this into a real "/profile" page.
  const [showProfile, setShowProfile] = useState(false)

  // Tharanga's login: runs after a successful log in or sign up
  const handleLoginSuccess = (userData) => {
    const sessionUser = {
      email: userData.email,
      username: userData.username,
    }
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser)) // remember who is logged in
    setCurrentUser(sessionUser)
    setProgress(loadProgress(sessionUser.email)) // load THIS user's album, streak and journal
    setShowProfile(false) // start on the home page
  }

  // Tharanga's log out: forget the session and show the login screen again
  const handleLogout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    setCurrentUser(null)
    setProgress(emptyProgress()) // clear the screen; the user's progress stays saved in localStorage
    setShowProfile(false)
  }

  // Save to localStorage every time the progress changes (only when someone is logged in)
  useEffect(() => {
    if (currentUser) saveProgress(currentUser.email, progress)
  }, [currentUser, progress])

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

  // Nobody logged in: show Tharanga's login / sign up screen
  if (!currentUser) {
    return (
      <PageContainer>
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
      </PageContainer>
    )
  }

  // Logged in: show the game (this replaces Tharanga's temporary HomeScreen1)
  const { email, username } = currentUser // the real name and email from the login

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
          <ProfileMenu
            username={username}
            onOpenProfile={() => setShowProfile(true)}
            onLogout={handleLogout}
          />
        </div>
        {/* Thin line between the title row and the page */}
        <hr className="app-divider" />

        {showProfile ? (
          // The profile page on its own, instead of everything else
          <ProfilePage
            username={username}
            email={email}
            collected={collectedIds.length}
            total={CARDS.length}
            streak={streak}
            journalCount={progress.journal.length}
            onBack={() => setShowProfile(false)}
            onLogout={handleLogout}
          />
        ) : (
          <>
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
          </>
        )}
      </main>
    </>
  )
}

export default App
