import React, { useState } from 'react';
import {
  RotateCcw,
  Share2,
  Check,
  Compass,
  TrendingUp,
  AlertTriangle,
  Flame,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { DecisionLog, Gauges, JobScenario } from '../types/game';

interface FinalReportProps {
  scenario: JobScenario;
  finalGauges: Gauges;
  decisionLogs: DecisionLog[];
  onTryAnotherJob: () => void;
  onReplaySameJob: () => void;
}

export function computeCompatibilityAndArchetype(gauges: Gauges) {
  const { finances, mental, time, passion } = gauges;
  // Score pondéré valorisant la passion, la santé mentale et l'équilibre global
  const lowest = Math.min(finances, mental, time, passion);
  const penalty = lowest < 20 ? 12 : lowest < 35 ? 5 : 0;
  const rawScore = Math.round(passion * 0.34 + mental * 0.26 + finances * 0.22 + time * 0.18 - penalty);
  const score = Math.max(18, Math.min(98, rawScore));

  if (mental < 25) {
    return {
      score,
      archetype: 'Le Sprinteur au bord du Burn-out',
      summary:
        'Tu as tout donné, souvent au détriment de tes nerfs et de ton sommeil. Le métier t’attire, mais attention : sur 10 ans, ce rythme ne pardonne pas si tu n’apprends pas à dire non.',
    };
  }
  if (passion >= 80 && mental >= 55) {
    return {
      score,
      archetype: 'Le Passionné Lucide',
      summary:
        'Tu as trouvé le point d’équilibre rare : tu kiffes le terrain et la technique, tout en posant un cadre pro pour ne pas te faire dévorer. Ce métier a clairement du potentiel pour toi.',
    };
  }
  if (finances >= 78 && time < 40) {
    return {
      score,
      archetype: 'Le Stratège Rentable',
      summary:
        'Ton compte en banque affiche complet en 2035, mais ton agenda perso ressemble à un désert. Tu sais négocier et encaisser la pression, pense juste à garder du temps pour vivre.',
    };
  }
  if (time >= 72 && mental >= 70) {
    return {
      score,
      archetype: 'L’Équilibriste Zen',
      summary:
        'Ta priorité est claire : travailler pour vivre, et jamais l’inverse. Tu sais protéger ta tranquillité d’esprit même quand tout le monde panique autour de toi.',
    };
  }
  if (passion < 45) {
    return {
      score,
      archetype: 'Le Pragmatique Sceptique',
      summary:
        'Tu as survécu à la semaine, mais sans l’étincelle. Et c’est une excellente nouvelle : mieux vaut découvrir maintenant en 5 minutes que ce quotidien ne te fait pas vibrer plutôt qu’après 5 ans d’études !',
    };
  }

  return {
    score,
    archetype: 'Le Pro Tout-Terrain',
    summary:
      'Tu as géré les urgences, l’imprévu de 2035 et les corvées avec sang-froid. Tes 4 jauges montrent que tu as les épaules pour encaisser la réalité de ce métier.',
  };
}

export const FinalReport: React.FC<FinalReportProps> = ({
  scenario,
  finalGauges,
  decisionLogs,
  onTryAnotherJob,
  onReplaySameJob,
}) => {
  const [copied, setCopied] = useState(false);
  const { score, archetype, summary } = computeCompatibilityAndArchetype(finalGauges);
  const { realLifeSheet } = scenario;

  const handleShare = async () => {
    const shareText = [
      `Vie en 2035 (${scenario.title}) — Mon Bilan Sans Filtre :`,
      `Compatibilité : ${score}% · Profil : ${archetype}`,
      `💰 Finances : ${finalGauges.finances}% | 🧠 Mental : ${finalGauges.mental}% | ⏳ Temps : ${finalGauges.time}% | 🔥 Passion : ${finalGauges.passion}%`,
      `Teste ton futur métier en 5 jours sur Vie en 2035 (Alphabette.eu)`,
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Mon bilan Vie en 2035 : ${scenario.title}`,
          text: shareText,
        });
        return;
      }
    } catch {
      // fallback to clipboard
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. CARTE SCORE DE COMPATIBILITÉ & PROFIL */}
      <section className="rounded-3xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <span>Vendredi 19h00 · Fin de ta semaine en 2035</span>
              <span aria-hidden="true">·</span>
              <span>{scenario.title}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white big-scale-title">
              Profil : {archetype}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed big-scale-text">
              {summary}
            </p>
          </div>

          {/* Bloc Score Tabulaire */}
          <div className="shrink-0 rounded-2xl bg-slate-50 dark:bg-[#0b101b] border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col items-center justify-center min-w-[180px]">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Compatibilité Métier
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono-num text-indigo-600 dark:text-indigo-400 my-1">
              {score}%
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {score >= 75
                ? 'Terrain très favorable'
                : score >= 55
                ? 'Compatible sous conditions'
                : 'À reconsidérer lucidement'}
            </span>
          </div>
        </div>

        {/* Boutons d'action principaux */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onTryAnotherJob}
            className="min-h-[46px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Tester un autre métier</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="min-h-[46px] px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm sm:text-base flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bilan copié dans le presse-papiers !</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 shrink-0" />
                <span>Partager mon bilan</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReplaySameJob}
            className="min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0d1320] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base flex items-center gap-2 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>Rejouer ce métier autrement</span>
          </button>
        </div>
      </section>

      {/* 2. FICHE : LA VRAIE VIE DE CE MÉTIER EN FRANCE (VÉRITÉ SANS FILTRE) */}
      <section className="rounded-3xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400">
            Bilan Vérité Sans Filtre · Réalité Terrain en France
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white big-scale-title">
            La Vraie Vie de {scenario.title} en France
          </h2>
        </div>

        {/* Salaires réels Débutant vs Confirmé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-50 dark:bg-[#0d1320] border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Salaire réel Débutant (France)
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-num text-emerald-600 dark:text-emerald-400 mt-1">
              {realLifeSheet.salaryJunior}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-[#0d1320] border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Salaire Confirmé (5–10 ans)
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-num text-indigo-600 dark:text-indigo-400 mt-1">
              {realLifeSheet.salarySenior}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-[#0d1320] border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
              <span>Horizon 2035</span>
            </div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1 leading-snug">
              {realLifeSheet.status2035}
            </p>
          </div>
        </div>

        {/* Les 2 vrais points noirs vs Les 2 vrais kiffs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Les 2 vrais points noirs */}
          <div className="rounded-2xl bg-rose-500/5 border border-rose-500/25 p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3>Les 2 vrais points noirs du métier</h3>
            </div>
            <ol className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed big-scale-text">
              {realLifeSheet.darkSides.slice(0, 2).map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono-num font-bold text-rose-600 dark:text-rose-400 shrink-0">
                    0{i + 1}.
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Les 2 vrais kiffs */}
          <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/25 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <Flame className="w-5 h-5 shrink-0" />
              <h3>Les 2 vrais kiffs au quotidien</h3>
            </div>
            <ol className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed big-scale-text">
              {realLifeSheet.trueJoys.slice(0, 2).map((joy, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono-num font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    0{i + 1}.
                  </span>
                  <span>{joy}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Voies d'accès concrètes en France */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
            <GraduationCap className="w-5 h-5 text-indigo-500 shrink-0" />
            <h3>Les voies d’accès concrètes en France (BTS, BUT, Fac, Alternance, Autodidacte)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {realLifeSheet.pathways.map((pw, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 dark:bg-[#0d1320] border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="text-xs font-mono-num font-semibold text-indigo-600 dark:text-indigo-400">
                    Voie 0{idx + 1} · {pw.duration}
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                    {pw.route}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white">Conseil terrain :</strong>{' '}
                  {pw.realityTip}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Le Verdict sans langue de bois */}
        <div className="rounded-2xl bg-indigo-500/5 border border-indigo-500/25 p-5">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
            Le mot de la fin (sans langue de bois)
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed big-scale-text">
            {realLifeSheet.unfilteredVerdict}
          </p>
        </div>
      </section>

      {/* 3. JOURNAL DE TES 5 JOURS (LUNDI -> VENDREDI) */}
      <section className="rounded-3xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
          <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
          <h3>Journal de tes décisions (Lundi → Vendredi)</h3>
        </div>

        <div className="divide-y divide-slate-200/70 dark:divide-slate-800">
          {decisionLogs.map((log) => (
            <div key={log.dayNumber} className="py-4 first:pt-1 last:pb-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2 font-medium">
                  <span className="font-mono-num font-bold text-slate-900 dark:text-white">
                    Jour {log.dayNumber} · {log.dayName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{log.dayTitle}</span>
                  {log.wasUnexpected2035 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">
                        Choc 2035
                      </span>
                    </>
                  )}
                </div>

                {/* Variations des jauges ce jour-là */}
                <div className="flex items-center gap-3 font-mono-num text-xs">
                  {log.impact.finances !== 0 && (
                    <span>
                      💰 {log.impact.finances > 0 ? `+${log.impact.finances}` : log.impact.finances}
                    </span>
                  )}
                  {log.impact.mental !== 0 && (
                    <span>
                      🧠 {log.impact.mental > 0 ? `+${log.impact.mental}` : log.impact.mental}
                    </span>
                  )}
                  {log.impact.time !== 0 && (
                    <span>
                      ⏳ {log.impact.time > 0 ? `+${log.impact.time}` : log.impact.time}
                    </span>
                  )}
                  {log.impact.passion !== 0 && (
                    <span>
                      🔥 {log.impact.passion > 0 ? `+${log.impact.passion}` : log.impact.passion}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-300">
                Choix : « {log.choiceLabel} »
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {log.consequence}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
