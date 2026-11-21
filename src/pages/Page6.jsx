import { CARDS } from "../data/cards";
import { fakeProgress } from "../data/fakeProgress";
import { formatDate } from "../utils/dates";
import "./Page6.scss";

function Page6({ journal = fakeProgress.journal }) {
  const entries = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="journal">
      <h2 className="journal__title">My journal</h2>

      <ol className="journal__list">
        {entries.map((entry) => {
          const card = CARDS.find((c) => c.id === entry.cardId);

          return (
            <li key={entry.date} className="journal__item">
              {formatDate(entry.date)} – {card ? card.name : entry.cardId}: {entry.text}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Page6;