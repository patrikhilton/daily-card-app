import { useState } from "react";
import "./AlbumCard.scss";

function AlbumCard({ card, isCollected, onOpen }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!isCollected) {
    return (
      <div className="album-card album-card--locked">
        <span className="album-card__lock" aria-hidden="true">🔒</span>
        <span className="album-card__numeral">{card.numeral}</span>
        <span className="sr-only">Card {card.numeral}, not found yet</span>
      </div>
    );
  }

  const showImage = !imageFailed;

  return (
    <button
      type="button"
      className={`album-card album-card--collected${showImage ? " album-card--image" : ""}`}
      onClick={onOpen}
    >
      {showImage && (
        <img
          className="album-card__image"
          src={`/cards/${card.id}.jpg`}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      <span className="album-card__numeral">{card.numeral}</span>
      <span className="album-card__name">{card.name}</span>
    </button>
  );
}

export default AlbumCard;