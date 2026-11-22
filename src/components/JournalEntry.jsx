import { formatDate } from "../utils/dates";
import "./JournalEntry.scss";

function JournalEntry({ entry, card }) {
  return (
    <article className="journal-entry">
      <div className="journal-entry__badge" aria-hidden="true">
        {card ? card.numeral : "?"}
      </div>

      <div className="journal-entry__body">
        <p className="journal-entry__meta">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          {" · "}
          <span className="journal-entry__card">
            {card ? card.name : entry.cardId}
          </span>
        </p>

        {entry.text ? (
          <p className="journal-entry__text">{entry.text}</p>
        ) : (
          <p className="journal-entry__text journal-entry__text--empty">
            No note this day
          </p>
        )}
      </div>
    </article>
  );
}

export default JournalEntry;