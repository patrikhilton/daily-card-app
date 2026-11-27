import { CARDS } from "../data/cards";
import { fakeProgress } from "../data/fakeProgress";
import JournalEntry from "../components/JournalEntry";
import "./Page6.scss";

function Page6({ journal = fakeProgress.journal, onGoToDraw }) {
  const entries = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  const count = entries.length;
  const hasNoNotes = count > 0 && entries.every((entry) => !entry.text);

  return (
    <section className="journal">
      <h2 className="journal__title">My journal</h2>

      {count === 0 ? (
        <div className="journal__empty">
          <div className="journal__empty-card" aria-hidden="true">✦</div>
          <p className="journal__empty-title">Your journal is empty for now.</p>
          <p className="journal__empty-text">
            After you draw a card, write one line about your day. It will show up here.
          </p>
          {onGoToDraw && (
            <button type="button" className="journal__button" onClick={onGoToDraw}>
              Draw today's card
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="journal__count">
            {count} {count === 1 ? "entry" : "entries"}
          </p>

          {hasNoNotes && (
            <p className="journal__hint">Writing is optional. Even one word counts.</p>
          )}

          <ol className="journal__list">
            {entries.map((entry) => {
              const card = CARDS.find((c) => c.id === entry.cardId);

              return (
                <li key={entry.date}>
                  <JournalEntry entry={entry} card={card} />
                </li>
              );
            })}
          </ol>
        </>
      )}
    </section>
  );
}

export default Page6;