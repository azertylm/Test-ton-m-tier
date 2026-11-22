import React from 'react';
import { ChoiceImpact, Gauges } from '../types/game';

interface GaugesBarProps {
  gauges: Gauges;
  lastImpact: ChoiceImpact | null;
  dayNumber: number;
  jobTitle: string;
}

interface GaugeConfig {
  key: keyof Gauges;
  emoji: string;
  label: string;
  shortLabel: string;
  barClass: string;
  lowWarning: string;
}

const GAUGE_CONFIGS: GaugeConfig[] = [
  {
    key: 'finances',
    emoji: '💰',
    label: 'Finances',
    shortLabel: 'Finances',
    barClass: 'bg-emerald-500 dark:bg-emerald-400',
    lowWarning: 'Découvert proche',
  },
  {
    key: 'mental',
    emoji: '🧠',
    label: 'Santé Mentale',
    shortLabel: 'Mental',
    barClass: 'bg-sky-500 dark:bg-sky-400',
    lowWarning: 'Risque burn-out',
  },
  {
    key: 'time',
    emoji: '⏳',
    label: 'Temps Libre',
    shortLabel: 'Temps',
    barClass: 'bg-amber-500 dark:bg-amber-400',
    lowWarning: 'Vie perso sacrifiée',
  },
  {
    key: 'passion',
    emoji: '🔥',
    label: 'Passion / Sens',
    shortLabel: 'Passion',
    barClass: 'bg-rose-500 dark:bg-rose-400',
    lowWarning: 'Perte de sens',
  },
];

export const GaugesBar: React.FC<GaugesBarProps> = ({
  gauges,
  lastImpact,
  dayNumber,
  jobTitle,
}) => {
  return (
    <section
      aria-label="Jauges de vie en temps réel"
      className="w-full rounded-2xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800/90 p-4 sm:p-5 shadow-xs"
    >
      {/* En-tête de progression semaine */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white">{jobTitle}</span>
          <span aria-hidden="true">·</span>
          <span>Année 2035</span>
        </div>

        {/* Indicateur 5 jours L-M-M-J-V */}
        <div className="flex items-center gap-1.5" aria-label={`Jour ${dayNumber} sur 5`}>
          {['L', 'M', 'M', 'J', 'V'].map((letter, idx) => {
            const d = idx + 1;
            const isCurrent = d === dayNumber;
            const isDone = d < dayNumber;
            return (
              <div
                key={d}
                className={`w-6 h-6 rounded-md text-xs font-mono-num font-bold flex items-center justify-center transition-colors ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/50'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                }`}
              >
                {letter}
              </div>
            );
          })}
          <span className="ml-1 text-xs font-mono-num font-semibold text-slate-500 dark:text-slate-400">
            J{dayNumber}/5
          </span>
        </div>
      </div>

      {/* Grille des 4 jauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {GAUGE_CONFIGS.map((cfg) => {
          const val = Math.max(0, Math.min(100, gauges[cfg.key]));
          const delta = lastImpact ? lastImpact[cfg.key] : 0;
          const isLow = val <= 25;

          return (
            <div
              key={cfg.key}
              className={`rounded-xl p-3 border transition-colors ${
                isLow
                  ? 'bg-rose-500/5 border-rose-500/40'
                  : 'bg-slate-50/80 dark:bg-[#0d1320] border-slate-200/70 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  <span aria-hidden="true" className="mr-1.5">
                    {cfg.emoji}
                  </span>
                  {cfg.label}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {delta !== 0 && (
                    <span
                      className={`text-xs font-mono-num font-bold ${
                        delta > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                  <span
                    className={`text-sm font-mono-num font-bold ${
                      isLow
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {val}%
                  </span>
                </div>
              </div>

              {/* Barre de progression fluide */}
              <div
                className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
                role="progressbar"
                aria-valuenow={val}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={cfg.label}
              >
                <div
                  className={`h-full rounded-full transition-transform duration-200 origin-left ${
                    isLow ? 'bg-rose-500' : cfg.barClass
                  }`}
                  style={{ transform: `scaleX(${val / 100})` }}
                />
              </div>

              {/* État textuel non-hue-only */}
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>
                  {isLow
                    ? `Alerte : ${cfg.lowWarning}`
                    : val >= 75
                    ? 'Niveau élevé'
                    : 'Équilibre stable'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
