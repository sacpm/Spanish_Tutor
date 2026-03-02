import { useState, useCallback } from 'react';
import type { CardSet } from '../data/vocabulary';
import { useTTS } from '../hooks/useTTS';

interface Props {
  cardSet: CardSet;
  onBack: () => void;
}

export default function FlashcardDeck({ cardSet, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { speak, isSpeaking } = useTTS();

  const card = cardSet.cards[currentIndex];
  const total = cardSet.cards.length;

  const goNext = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i + 1) % total), 150);
  }, [total]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i - 1 + total) % total), 150);
  }, [total]);

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const handleSpeak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (flipped) {
        speak(card.english, 'en');
      } else {
        speak(card.spanish, 'es');
      }
    },
    [flipped, card, speak]
  );

  return (
    <div className="deck-container">
      <div className="deck-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h2>
          {cardSet.emoji} {cardSet.title}
        </h2>
        <span className="counter">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="card-scene" onClick={handleFlip}>
        <div className={`card ${flipped ? 'is-flipped' : ''}`}>
          <div className="card-face card-front">
            <div className="card-emoji">{card.emoji}</div>
            <div className="card-word spanish-word">{card.spanish}</div>
            <div className="card-lang-label">Spanish</div>
            <div className="flip-hint">tap to flip</div>
          </div>
          <div className="card-face card-back">
            <div className="card-emoji">{card.emoji}</div>
            <div className="card-word english-word">{card.english}</div>
            <div className="card-lang-label">English</div>
            <div className="flip-hint">tap to flip</div>
          </div>
        </div>
      </div>

      <div className="card-controls">
        <button
          className="speak-btn"
          onClick={handleSpeak}
          aria-label="Pronounce word"
          title="Hear pronunciation"
          disabled={isSpeaking}
        >
          {isSpeaking ? '🔊' : '🔈'} Listen
        </button>
      </div>

      <div className="nav-controls">
        <button className="nav-btn" onClick={goPrev}>
          ◀ Prev
        </button>
        <div className="dot-progress">
          {cardSet.cards.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setFlipped(false);
                setTimeout(() => setCurrentIndex(i), 150);
              }}
            />
          ))}
        </div>
        <button className="nav-btn" onClick={goNext}>
          Next ▶
        </button>
      </div>
    </div>
  );
}
