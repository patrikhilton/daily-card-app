import { CARDS } from "../data/cards";
import { fakeProgress } from "../data/fakeProgress";
import "./Page5.scss";
import AlbumCard from "../components/AlbumCard";

function Page5({ collectedIds = fakeProgress.collectedIds }) {
  const collected = new Set(collectedIds);

  return (
    <section className="album">
      <h2 className="album__title">My album</h2>
      <p className="album__count">
        {collected.size} / {CARDS.length} collected
      </p>

      <ul className="album__list">
        {CARDS.map((card) => (
          <li key={card.id}>
            <AlbumCard card={card} isCollected={collected.has(card.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Page5;