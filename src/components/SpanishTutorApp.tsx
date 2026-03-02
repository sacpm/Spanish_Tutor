import { useState } from 'react';
import { cardSets, type CardSet } from '../data/vocabulary';
import FlashcardDeck from './FlashcardDeck';

export default function SpanishTutorApp() {
  const [activeSet, setActiveSet] = useState<CardSet | null>(null);

  if (activeSet) {
    return <FlashcardDeck cardSet={activeSet} onBack={() => setActiveSet(null)} />;
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <div className="star-row">⭐ ⭐ ⭐</div>
        <h1 className="welcome-title">
          ¡Hola, <span className="name-highlight">Gavi</span>!
        </h1>
        <p className="welcome-subtitle">Let's learn some Spanish today! 🎉</p>
        <p className="welcome-prompt">Pick a card set to get started:</p>
      </div>

      <div className="set-grid">
        {cardSets.map((set) => (
          <button
            key={set.id}
            className="set-card"
            style={{ '--set-color': set.color } as React.CSSProperties}
            onClick={() => setActiveSet(set)}
          >
            <span className="set-emoji">{set.emoji}</span>
            <span className="set-title">{set.title}</span>
            <span className="set-count">{set.cards.length} words</span>
          </button>
        ))}
      </div>
    </div>
  );
}
