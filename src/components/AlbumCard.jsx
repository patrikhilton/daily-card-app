import "./AlbumCard.scss";

function AlbumCard({ card, isCollected }) {
  if (!isCollected) {
    return (
      <div className="album-card album-card--locked">
        <span className="album-card__lock" aria-hidden="true">🔒</span>
        <span className="album-card__numeral">{card.numeral}</span>
        <span className="sr-only">Card {card.numeral}, not found yet</span>
      </div>
    );
  }

  return (
    <div className="album-card album-card--collected">
      <span className="album-card__numeral">{card.numeral}</span>
      <span className="album-card__name">{card.name}</span>
    </div>
  );
}

export default AlbumCard;