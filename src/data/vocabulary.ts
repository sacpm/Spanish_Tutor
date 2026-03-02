export interface VocabCard {
  spanish: string;
  english: string;
  emoji?: string;
}

export interface CardSet {
  id: string;
  title: string;
  emoji: string;
  color: string;
  cards: VocabCard[];
}

export const cardSets: CardSet[] = [
  {
    id: 'colors',
    title: 'Colors',
    emoji: '🎨',
    color: '#FF6B6B',
    cards: [
      { spanish: 'rojo', english: 'red', emoji: '🔴' },
      { spanish: 'azul', english: 'blue', emoji: '🔵' },
      { spanish: 'amarillo', english: 'yellow', emoji: '🟡' },
      { spanish: 'verde', english: 'green', emoji: '🟢' },
      { spanish: 'anaranjado', english: 'orange', emoji: '🟠' },
      { spanish: 'morado', english: 'purple', emoji: '🟣' },
      { spanish: 'rosado', english: 'pink', emoji: '🌸' },
      { spanish: 'blanco', english: 'white', emoji: '⬜' },
      { spanish: 'negro', english: 'black', emoji: '⬛' },
      { spanish: 'café', english: 'brown', emoji: '🟫' },
    ],
  },
  {
    id: 'months',
    title: 'Months',
    emoji: '📅',
    color: '#4ECDC4',
    cards: [
      { spanish: 'enero', english: 'January', emoji: '❄️' },
      { spanish: 'febrero', english: 'February', emoji: '💝' },
      { spanish: 'marzo', english: 'March', emoji: '🌱' },
      { spanish: 'abril', english: 'April', emoji: '🌧️' },
      { spanish: 'mayo', english: 'May', emoji: '🌸' },
      { spanish: 'junio', english: 'June', emoji: '☀️' },
      { spanish: 'julio', english: 'July', emoji: '🏖️' },
      { spanish: 'agosto', english: 'August', emoji: '🌻' },
      { spanish: 'septiembre', english: 'September', emoji: '🍂' },
      { spanish: 'octubre', english: 'October', emoji: '🎃' },
      { spanish: 'noviembre', english: 'November', emoji: '🍁' },
      { spanish: 'diciembre', english: 'December', emoji: '🎄' },
    ],
  },
  {
    id: 'seasons',
    title: 'Seasons',
    emoji: '🌍',
    color: '#45B7D1',
    cards: [
      { spanish: 'la primavera', english: 'spring', emoji: '🌷' },
      { spanish: 'el verano', english: 'summer', emoji: '☀️' },
      { spanish: 'el otoño', english: 'autumn', emoji: '🍂' },
      { spanish: 'el invierno', english: 'winter', emoji: '❄️' },
    ],
  },
];
