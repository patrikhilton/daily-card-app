// Saving the player's progress in the browser with localStorage.
// localStorage keeps text even after a refresh or closing the browser (on this computer only).
// Each user gets their own entry, keyed by their email (the team's primary key),
// e.g. "tarot22:progress:qiqi@example.com". (Tharanga's login saves the session under "tarot22:session".)

const PREFIX = 'tarot22:progress:'

// What a brand-new player starts with (also used by App when nobody is logged in)
export function emptyProgress() {
  return {
    collectedIds: [], // album: ids of collected cards, e.g. ["ar17", "ar03"]
    lastDrawDate: null, // the day of the last draw, e.g. "2026-11-19"
    lastCardId: null, // the card drawn that day, e.g. "ar17"
    streak: 0, // days in a row with a draw
    journal: [], // entries like { date: "2026-11-19", cardId: "ar17", text: "..." }
  }
}

// Reads a user's progress. If nothing is saved yet (or it can't be read), starts empty.
export function loadProgress(email) {
  try {
    const text = localStorage.getItem(PREFIX + email) // saved text, or null
    if (!text) return emptyProgress()
    return { ...emptyProgress(), ...JSON.parse(text) } // JSON.parse turns the text back into an object
  } catch {
    return emptyProgress() // e.g. storage blocked in a private window
  }
}

// Saves a user's progress. JSON.stringify turns the object into text, because localStorage only stores text.
export function saveProgress(email, progress) {
  try {
    localStorage.setItem(PREFIX + email, JSON.stringify(progress))
  } catch {
    // storage full or blocked: the game still works, it just isn't saved
  }
}

// Today's date as "YYYY-MM-DD" in the player's own time zone, e.g. "2026-11-19"
export function dateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // months start at 0, so add 1
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Yesterday's date as "YYYY-MM-DD" (used for the streak)
export function yesterdayKey() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return dateKey(date)
}
