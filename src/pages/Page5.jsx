import { CARDS } from "../data/cards";
import { fakeProgress } from "../data/fakeProgress";
import "./Page5.scss";

function Page5({ collectedIds = fakeProgress.collectedIds }) {
  const collected = new Set(collectedIds);

  return (
    <section className="album">
      <h2 className="album__title">My album</h2>
      <p className="album__count">
        {collected.size} / {CARDS.length} collected
      </p>

      <ul className="album__list">
        {CARDS.map((card) => {
          const isCollected = collected.has(card.id);

          return (
            <li
              key={card.id}
              className={isCollected ? "album__item album__item--collected" : "album__item"}
            >
              {card.numeral} – {card.name}
              {isCollected && " ✓"}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Page5;