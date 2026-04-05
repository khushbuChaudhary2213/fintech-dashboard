import { useState } from "react";

function CardSlider() {
  const [index, setIndex] = useState(0);

  const cards = [
    { id: 1, color: "purple", amount: "₹147000" },
    { id: 2, color: "blue", amount: "₹82000" },
    { id: 3, color: "green", amount: "₹56000" },
    { id: 4, color: "purple", amount: "₹91000" },
    { id: 1, color: "purple", amount: "₹147000" },
    { id: 2, color: "blue", amount: "₹82000" },
    { id: 4, color: "purple", amount: "₹91000" },
    { id: 1, color: "purple", amount: "₹147000" },
    { id: 2, color: "blue", amount: "₹82000" },
  ];

  const visibleCards = 3;
  const maxIndex = cards.length - visibleCards;

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="slider-wrapper">
      <h3>My Cards</h3>

      <div className="slider-container">
        {/* LEFT BUTTON (hide at start) */}
        {index > 0 && (
          <button className="arrow left" onClick={prev}>
            ◀
          </button>
        )}

        {/* SLIDER */}
        <div className="slider-viewport">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${index * 270}px)`,
            }}
          >
            {cards.map((card) => (
              <div key={card.id} className={`card ${card.color}`}>
                {card.amount}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT BUTTON (hide at end) */}
        {index < maxIndex && (
          <button className="arrow right" onClick={next}>
            ▶
          </button>
        )}
      </div>
    </div>
  );
}

export default CardSlider;
