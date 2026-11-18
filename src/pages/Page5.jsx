import { CARDS } from "../data/cards";
import "./Page5.scss";

function Page5() {
  return (
    <section className="album">
      <h2 className="album__title">My album</h2>

      <ul className="album__list">
        {CARDS.map((card) => (
          <li key={card.id} className="album__item">
            {card.numeral} – {card.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Page5;