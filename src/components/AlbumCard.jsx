import "./AlbumCard.scss";

function AlbumCard({ card, isCollected, onOpen }) {
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
    <button
      type="button"
      className="album-card album-card--collected"
      onClick={onOpen}
    >
      <span className="album-card__numeral">{card.numeral}</span>
      <span className="album-card__name">{card.name}</span>
    </button>
  );
}

export default AlbumCard;