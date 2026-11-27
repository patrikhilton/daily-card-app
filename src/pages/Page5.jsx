import { useEffect, useState } from "react";
import { CARDS } from "../data/cards";
import { fakeProgress } from "../data/fakeProgress";
import { formatDate } from "../utils/dates";
import AlbumCard from "../components/AlbumCard";
import StreakChip from "../components/StreakChip";
import "./Page5.scss";

function Page5({
  streak = fakeProgress.streak,
  collectedIds = fakeProgress.collectedIds,
  journal = fakeProgress.journal,
  onGoToDraw,
}) {
  const [openCard, setOpenCard] = useState(null);

  const collected = new Set(collectedIds);
  const isEmpty = collected.size === 0;
  const isComplete = collected.size === CARDS.length;
  const openEntry = openCard
    ? journal.find((entry) => entry.cardId === openCard.id)
    : null;

  // Close the pop-up with the Esc key
  useEffect(() => {
    if (!openCard) return;

    function handleKey(event) {
      if (event.key === "Escape") setOpenCard(null);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openCard]);

  return (
    <section className="album">
      <h2 className="album__title">My album</h2>
      <p className="album__count">
        {collected.size} / {CARDS.length} collected
      </p>

      <StreakChip streak={streak} />

      {isEmpty && (
        <div className="album__message">
          <p>Your first card is waiting. Draw today's card to start your album.</p>
          {onGoToDraw && (
            <button type="button" className="album__button" onClick={onGoToDraw}>
              Draw today's card
            </button>
          )}
        </div>
      )}

      {isComplete && (
        <p className="album__message album__message--complete">
          Album complete! 22 days of calm minutes. 🌟
        </p>
      )}

      <ul className="album__list">
        {CARDS.map((card) => (
          <li key={card.id}>
            <AlbumCard
              card={card}
              isCollected={collected.has(card.id)}
              onOpen={() => setOpenCard(card)}
            />
          </li>
        ))}
      </ul>

      {openCard && (
        <div className="album__backdrop" onClick={() => setOpenCard(null)}>
          <div
            className="album__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="album-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="album__modal-numeral">{openCard.numeral}</p>
            <h3 id="album-modal-title" className="album__modal-title">
              {openCard.name}
            </h3>

            {openEntry && (
              <>
                <p className="album__modal-date">
                  You found this on {formatDate(openEntry.date)}
                </p>
                <p className="album__modal-text">
                  {openEntry.text || <em>No note this day</em>}
                </p>
              </>
            )}

            <button
              type="button"
              className="album__button"
              onClick={() => setOpenCard(null)}
              autoFocus
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Page5;