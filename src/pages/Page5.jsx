import { CARDS } from "../data/cards";
import { fakeProgress } from "../data/fakeProgress";
import AlbumCard from "../components/AlbumCard";
import StreakChip from "../components/StreakChip";
import "./Page5.scss";

function Page5({
  streak = fakeProgress.streak,
  collectedIds = fakeProgress.collectedIds,
  journal = fakeProgress.journal,
}) {
  const collected = new Set(collectedIds);

  return (
    <section className="album">
      <h2 className="album__title">My album</h2>
      <p className="album__count">
        {collected.size} / {CARDS.length} collected
      </p>

      <StreakChip streak={streak} />

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