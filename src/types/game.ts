export interface Gauges {
  finances: number; // 💰 Finances (0-100)
  mental: number;   // 🧠 Santé Mentale / Calme (0-100)
  time: number;     // ⏳ Temps Libre (0-100)
  passion: number;  // 🔥 Passion / Sens (0-100)
}

export interface ChoiceImpact {
  finances: number;
  mental: number;
  time: number;
  passion: number;
}

export interface DayChoice {
  id: string;
  label: string;
  tag: string; // ex: "Rentabilité", "Équilibre", "Audace"
  consequence: string; // Feedback immédiat sans filtre après le clic
  impact: ChoiceImpact;
}

export interface DayEvent {
  dayNumber: 1 | 2 | 3 | 4 | 5;
  dayName: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi';
  timeContext: string; // ex: "08h42 · Coworking République"
  title: string;
  narrative: string;
  isUnexpected2035?: boolean;
  unexpectedHeadline?: string;
  choices: [DayChoice, DayChoice, DayChoice];
}

export interface RealLifeFranceSheet {
  salaryJunior: string; // ex: "2 100 € à 2 600 € net / mois"
  salarySenior: string; // ex: "3 800 € à 6 500 € net / mois (selon missions)"
  status2035: string;   // ex: "Très recherché si tu maîtrises l'architecture & l'IA"
  darkSides: [string, string]; // Les 2 vrais points noirs du métier
  trueJoys: [string, string];  // Les 2 vrais kiffs du métier
  pathways: {
    route: string; // ex: "BUT Informatique / BTS SIO"
    duration: string; // ex: "2 à 3 ans"
    realityTip: string; // ex: "L'alternance dès la 2e année vaut de l'or sur ton CV."
  }[];
  unfilteredVerdict: string;
}

export interface JobScenario {
  id: string;
  title: string;
  category: string;
  tagline: string;
  context2035: string;
  initialGauges: Gauges;
  days: [DayEvent, DayEvent, DayEvent, DayEvent, DayEvent];
  realLifeSheet: RealLifeFranceSheet;
  isOfflinePreset?: boolean;
}

export interface DecisionLog {
  dayNumber: number;
  dayName: string;
  dayTitle: string;
  choiceLabel: string;
  consequence: string;
  impact: ChoiceImpact;
  wasUnexpected2035?: boolean;
}
