import { useState, useEffect } from 'react' // useState = remember things, useEffect = do something after the page shows (like loading from the API)
import { CARDS } from '../data/cards' // Patrick's list of the 22 Major Arcana cards
import { READINGS } from '../data/readings' // our own short meaning + question for each card
import './Page4.scss' // styles for this page

// Page 4: Card result + journal (matches the prototype)
// Shows today's card (drawn on Page 3). The journal line is saved in localStorage by App.

// Props from App.jsx:
// - cardId: the id of the drawn card, e.g. "ar17" for The Star
// - collected / total: cards in the album after this draw, e.g. 13 of 22
// - savedText: today's journal line if it was saved before ('' if not)
// - onSaveJournal: App saves the line in localStorage
function Page4({ cardId, collected, total, savedText, onSaveJournal }) {
  const card = CARDS.find((c) => c.id === cardId) // the drawn card (name + number)
  const reading = READINGS[card.id] // this card's short meaning + question
  const albumComplete = collected === total // true when all 22 cards are collected

  const [entry, setEntry] = useState(savedText) // the journal box starts with the saved line, if any
  const [saved, setSaved] = useState(savedText !== '') // already saved earlier today?
  const [error, setError] = useState('') // message when the box is empty

  // "Read more about this card"
  const [moreOpen, setMoreOpen] = useState(false) // is the Read more section open?
  const [traditional, setTraditional] = useState(null) // the card's details from the tarot API
  const [apiFailed, setApiFailed] = useState(false) // true if the API could not be reached

  // Load the traditional meaning from the tarot API, but only when "Read more" is opened
  useEffect(() => {
    if (!moreOpen || traditional || apiFailed) return // closed, already loaded, or failed: do nothing

    let cancelled = false // becomes true if the player leaves the page before the answer arrives

    async function loadTraditional() {
      try {
        const response = await fetch(`https://tarotapi.dev/api/v1/cards/${cardId}`) // ask the API for this one card
        if (!response.ok) throw new Error('API error') // e.g. the API server has a problem
        const data = await response.json() // turn the answer into a JavaScript object
        if (!cancelled) setTraditional(data.card) // save it, so the page shows it
      } catch {
        if (!cancelled) setApiFailed(true) // no internet or API problem: show a friendly message
      }
    }

    loadTraditional()
    return () => {
      cancelled = true // clean-up: ignore a late answer
    }
  }, [moreOpen, cardId, traditional, apiFailed]) // run again when one of these changes

  // Runs when the player clicks "Save to journal"
  function handleSave(event) {
    event.preventDefault() // stops the browser from reloading the page
    if (entry.trim() === '') {
      setError('Write a few words first.') // empty box: show a friendly message
      return
    }
    setError('')
    onSaveJournal(entry.trim()) // App saves it in localStorage
    setSaved(true) // button shows "Saved ✓"
  }

  return (
    <section className="result">
      {/* Celebration when the album is complete (22 / 22) */}
      {albumComplete && (
        <div className="result__celebrate" role="status">
          <div className="result__stars" aria-hidden="true">
            <span>✦</span>
            <span>★</span>
            <span>✦</span>
            <span>★</span>
            <span>✦</span>
          </div>
          <p className="result__celebrate-title">Album complete!</p>
          <p className="result__celebrate-text">
            You collected all {total} cards. That's {total} calm moments just for you. 🌟
          </p>
        </div>
      )}

      {/* Reward badge, top right */}
      <p className="result__badge">
        New card · {collected} / {total}
      </p>

      {/* The turned-over card */}
      <div className="result__card">
        {/* The real card picture from public/cards, e.g. /cards/ar17.jpg (Rider-Waite, 1909, public domain) */}
        <img
          className="result__image"
          src={`/cards/${card.id}.jpg`}
          alt={`${card.numeral} ${card.name} tarot card`} // read aloud by screen readers
        />
      </div>

      {/* Our short, simple meaning (gold) */}
      <p className="result__short">{reading.short}</p>

      {/* The parenting question (plum box) */}
      <div className="result__box">
        <p className="result__label">Pause and think</p>
        <p className="result__question">{reading.question}</p>
      </div>

      {/* Journal: one line about today */}
      <form className="result__journal" onSubmit={handleSave}>
        <label className="result__hidden" htmlFor="journal-entry">
          Your journal
        </label>
        <input
          id="journal-entry"
          className="result__input"
          type="text"
          maxLength="200" // keep it to one short line
          placeholder="Write one line…"
          value={entry}
          onChange={(event) => {
            setEntry(event.target.value) // remember what is typed
            setSaved(false) // typing again = not saved yet
            setError('')
          }}
        />
        {error && <p className="result__error">{error}</p>}
        <button className="result__save" type="submit">
          {saved ? 'Saved ✓' : 'Save to journal'}
        </button>
      </form>

      {/* Read more: opens and closes when tapped */}
      <details
        className="result__more"
        onToggle={(event) => setMoreOpen(event.currentTarget.open)} // remember if it is open
      >
        <summary className="result__more-title">Read more about this card</summary>

        {/* Part 1: our own longer text, easy English */}
        <p className="result__more-text">{reading.more}</p>

        {/* Part 2: the traditional meaning, loaded from the tarot API */}
        <h3 className="result__more-heading">Traditional meaning</h3>

        {traditional && (
          <>
            <p className="result__more-text">{traditional.meaning_up}</p>
            <h3 className="result__more-heading">The picture on the card</h3>
            <p className="result__more-text result__more-text--old">{traditional.desc}</p>
            <p className="result__source">From the classic Rider-Waite tarot book (1910), via tarotapi.dev</p>
          </>
        )}

        {!traditional && !apiFailed && <p className="result__more-text">Loading…</p>}

        {apiFailed && (
          <p className="result__more-text">
            Couldn't load the traditional meaning. Check your internet and{' '}
            <button className="result__retry" onClick={() => setApiFailed(false)}>
              try again
            </button>
            .
          </p>
        )}
      </details>
    </section>
  )
}

export default Page4
