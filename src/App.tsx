import React, { useState, useEffect, useCallback } from 'react';
import {
  Shuffle,
  Play,
  ArrowRight,
  Zap,
  Sparkles,
  Briefcase,
  CheckCircle2,
  Loader2,
  Clock,
} from 'lucide-react';
import { AlphabetteHeader } from './components/AlphabetteHeader';
import { GaugesBar } from './components/GaugesBar';
import { FinalReport, computeCompatibilityAndArchetype } from './components/FinalReport';
import {
  OFFLINE_SCENARIOS,
  QUICK_JOB_SUGGESTIONS,
  findScenarioByQuery,
  buildLocalCustomScenario,
} from './data/scenarios';
import { ChoiceImpact, DayChoice, DecisionLog, Gauges, JobScenario } from './types/game';

type GameScreen = 'HOME' | 'LOADING' | 'PLAYING' | 'REPORT';

function clampGauge(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function playTactileTone(type: 'choice' | 'next' | 'finish') {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'choice') {
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'next') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.1);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.start(now);
      osc.stop(now + 0.11);
    } else {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {
    // Ignore audio context restrictions
  }
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('alphabette_theme_dark');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [bigMode, setBigMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('alphabette_big_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [simpleMode, setSimpleMode] = useState<boolean>(false);

  const [screen, setScreen] = useState<GameScreen>('HOME');
  const [customJobInput, setCustomJobInput] = useState<string>('');
  const [loadingJobTitle, setLoadingJobTitle] = useState<string>('');

  const [activeScenario, setActiveScenario] = useState<JobScenario>(OFFLINE_SCENARIOS[0]);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [gauges, setGauges] = useState<Gauges>(OFFLINE_SCENARIOS[0].initialGauges);
  const [lastImpact, setLastImpact] = useState<ChoiceImpact | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<DayChoice | null>(null);
  const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('alphabette_theme_dark', String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('alphabette_big_mode', String(bigMode));
    } catch {
      // ignore
    }
  }, [bigMode]);

  const startWithScenario = useCallback((scenario: JobScenario) => {
    setActiveScenario(scenario);
    setCurrentDayIndex(0);
    setGauges({ ...scenario.initialGauges });
    setLastImpact(null);
    setSelectedChoice(null);
    setDecisionLogs([]);
    setScreen('PLAYING');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const launchJobByName = async (rawJobName: string) => {
    const trimmed = rawJobName.trim();
    if (!trimmed) return;

    // 1. Vérifier si un scénario hors-ligne complet correspond
    const matchedOffline = findScenarioByQuery(trimmed);
    if (matchedOffline) {
      startWithScenario(matchedOffline);
      return;
    }

    // 2. Sinon, appeler l'API serveur Gemini pour générer les 5 jours sur-mesure en 2035
    setLoadingJobTitle(trimmed);
    setScreen('LOADING');

    try {
      const response = await fetch('/api/generate-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle: trimmed }),
      });

      if (response.ok) {
        const data = (await response.json()) as JobScenario;
        if (data && Array.isArray(data.days) && data.days.length >= 5 && data.realLifeSheet) {
          startWithScenario(data);
          return;
        }
      }
    } catch {
      // Repli automatique sur le générateur local hors-ligne
    }

    const fallback = buildLocalCustomScenario(trimmed);
    startWithScenario(fallback);
  };

  const handleRandomJob = () => {
    const randomPick =
      QUICK_JOB_SUGGESTIONS[Math.floor(Math.random() * QUICK_JOB_SUGGESTIONS.length)];
    setCustomJobInput(randomPick);
    launchJobByName(randomPick);
  };

  const handleSelectChoice = (choice: DayChoice) => {
    if (selectedChoice) return;
    playTactileTone('choice');

    const currentDay = activeScenario.days[currentDayIndex];
    setSelectedChoice(choice);
    setLastImpact(choice.impact);

    setGauges((prev) => ({
      finances: clampGauge(prev.finances + choice.impact.finances),
      mental: clampGauge(prev.mental + choice.impact.mental),
      time: clampGauge(prev.time + choice.impact.time),
      passion: clampGauge(prev.passion + choice.impact.passion),
    }));

    setDecisionLogs((prev) => [
      ...prev,
      {
        dayNumber: currentDay.dayNumber,
        dayName: currentDay.dayName,
        dayTitle: currentDay.title,
        choiceLabel: choice.label,
        consequence: choice.consequence,
        impact: choice.impact,
        wasUnexpected2035: currentDay.isUnexpected2035,
      },
    ]);
  };

  const handleAdvanceDay = () => {
    if (currentDayIndex < activeScenario.days.length - 1) {
      playTactileTone('next');
      setCurrentDayIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setLastImpact(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      playTactileTone('finish');
      setScreen('REPORT');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetHome = () => {
    setScreen('HOME');
    setSelectedChoice(null);
    setLastImpact(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTextToRead = useCallback((): string => {
    if (screen === 'HOME') {
      return 'Bienvenue sur Vie en 2035, une expérience Alphabette. Vis 5 journées types du lundi au vendredi dans la peau du métier de ton choix, loin des brochures d’orientation ennuyeuses. Choisis un métier ou lance un métier au hasard.';
    }
    if (screen === 'PLAYING') {
      const day = activeScenario.days[currentDayIndex];
      const choicesText = day.choices
        .map((c, idx) => `Choix ${idx + 1} : ${c.label}.`)
        .join(' ');
      if (selectedChoice) {
        return `${day.dayName}, ${day.title}. Tu as choisi : ${selectedChoice.label}. Conséquence : ${selectedChoice.consequence}`;
      }
      return `Métier : ${activeScenario.title}. Jour ${day.dayNumber} sur 5, ${day.dayName}. ${
        day.isUnexpected2035 && day.unexpectedHeadline ? day.unexpectedHeadline + '. ' : ''
      }${day.title}. ${day.narrative} ${choicesText}`;
    }
    if (screen === 'REPORT') {
      const { score, archetype, summary } = computeCompatibilityAndArchetype(gauges);
      return `Bilan Vérité sans filtre pour le métier de ${activeScenario.title}. Score de compatibilité : ${score} pourcent. Ton profil : ${archetype}. ${summary} Verdict terrain : ${activeScenario.realLifeSheet.unfilteredVerdict}`;
    }
    return 'Génération de ta semaine en 2035 en cours.';
  }, [screen, activeScenario, currentDayIndex, selectedChoice, gauges]);

  const currentDay = activeScenario.days[currentDayIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      {/* EN-TÊTE OBLIGATOIRE : DOUBLE BARRE ALPHABETTE (Dimensions px fixes isolées du mode BIG) */}
      <AlphabetteHeader
        bigMode={bigMode}
        onToggleBigMode={() => setBigMode((prev) => !prev)}
        simpleMode={simpleMode}
        onToggleSimpleMode={() => setSimpleMode((prev) => !prev)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onResetHome={handleResetHome}
        showBackButton={screen !== 'HOME'}
        getTextToRead={getTextToRead}
      />

      {/* CONTENU PRINCIPAL (S'adapte au mode BIG sans déformer la double barre) */}
      <main
        className={`flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ${
          bigMode ? 'alphabette-big-mode' : ''
        }`}
      >
        {/* ÉCRAN 1 : ACCUEIL & CHOIX DU MÉTIER */}
        {screen === 'HOME' && (
          <div className="space-y-8 sm:space-y-10">
            {/* Hero / Recherche de métier libre ou guidée */}
            <section className="rounded-3xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  <span>Simulation Orientation Sans Filtre</span>
                  <span aria-hidden="true">·</span>
                  <span>5 Jours (Lundi → Vendredi)</span>
                  <span aria-hidden="true">·</span>
                  <span>Horizon 2035</span>
                </div>

                <h1
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white big-scale-title"
                  style={{ textWrap: 'balance' }}
                >
                  Teste ton futur métier en 5 jours, loin des brochures papier glacé.
                </h1>

                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed big-scale-text">
                  On te projette en 2035 du lundi matin au vendredi soir. Clients relous, urgences à 3h du matin, outils IA qui bousculent tout, vrais salaires en France : chaque décision impacte tes 4 jauges de vie.
                </p>
              </div>

              {/* Barre de saisie libre + Bouton Métier au hasard */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  launchJobByName(customJobInput);
                }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={customJobInput}
                    onChange={(e) => setCustomJobInput(e.target.value)}
                    placeholder="Tape n'importe quel métier (ex: Monteur vidéo, Kiné, Architecte, Pâtissier, Pilote de drone...)"
                    aria-label="Tape le métier que tu veux tester"
                    className="w-full min-h-[52px] px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#0b101b] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base focus:outline-2 focus:outline-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="submit"
                    disabled={!customJobInput.trim()}
                    className="min-h-[52px] flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-45 disabled:pointer-events-none text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-white shrink-0" />
                    <span>Vivre mes 5 jours</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRandomJob}
                    className="min-h-[52px] px-4 sm:px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                    title="Choisir un métier au hasard"
                  >
                    <Shuffle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Métier au hasard</span>
                  </button>
                </div>
              </form>

              {/* Idées rapides cliquables */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2.5">
                  Idées rapides à lancer en un clic :
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    'Architecte Bioclimatique',
                    'Chef Pâtissier',
                    'Pilote de Drone Civil',
                    'Infirmier·ère aux Urgences',
                    'Vétérinaire Rural',
                    'Ingénieur Cybersécurité',
                    'Avocat Pénaliste',
                    'Game Designer',
                  ].map((jobName) => (
                    <button
                      key={jobName}
                      type="button"
                      onClick={() => {
                        setCustomJobInput(jobName);
                        launchJobByName(jobName);
                      }}
                      className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0d1320] hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {jobName}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Scénarios Complets Hors-Ligne (100% instantanés) */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white big-scale-title">
                    Scénarios phares prêts à jouer (100 % hors-ligne)
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Écrits au scalpel avec de vrais retours du terrain, jouables instantanément sans connexion.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {OFFLINE_SCENARIOS.map((scen) => (
                  <article
                    key={scen.id}
                    className="rounded-2xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 p-5 sm:p-6 flex flex-col justify-between gap-5 transition-colors shadow-2xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>
                          {scen.category} · 5 Jours · Scénario Complet
                        </span>
                        <span className="font-mono-num font-semibold text-emerald-600 dark:text-emerald-400">
                          Prêt
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white big-scale-title">
                        {scen.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed big-scale-text">
                        {scen.tagline}
                      </p>

                      {!simpleMode && (
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                          {scen.context2035}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono-num">
                        Débutant : {scen.realLifeSheet.salaryJunior.split('(')[0].trim()}
                      </div>

                      <button
                        type="button"
                        onClick={() => startWithScenario(scen)}
                        className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Jouer ce métier</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Règles du jeu : Les 4 jauges de vie */}
            {!simpleMode && (
              <section className="rounded-2xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      💰 01. Finances
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Ton salaire net, tes primes ou tes factures clients… moins l’URSSAF et les imprévus.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      🧠 02. Santé Mentale
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Ta charge mentale et ta résistance au stress. Si elle tombe à zéro, c’est le burn-out.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      ⏳ 03. Temps Libre
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Le temps qu’il te reste pour tes amis, ton sport, tes passions et ton sommeil.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      🔥 04. Passion & Sens
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      La fierté de ce que tu accomplis et l’envie de te lever le lundi matin.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ÉCRAN 2 : CHARGEMENT / GÉNÉRATION IA 2035 */}
        {screen === 'LOADING' && (
          <div className="min-h-[55vh] flex flex-col items-center justify-center text-center p-6">
            <div className="rounded-3xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 p-8 sm:p-10 max-w-lg w-full space-y-5 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
                <Loader2 className="w-7 h-7 animate-spin" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono-num font-semibold text-indigo-600 dark:text-indigo-400">
                  Projection Temporelle · Horizon 2035
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Préparation de tes 5 jours comme {loadingJobTitle}…
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Construction des dilemmes terrain, de l’imprévu technologique de 2035 et de la fiche vérité des salaires et études en France.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ÉCRAN 3 : BOUCLE DE JEU SUR 5 JOURS (LUNDI -> VENDREDI) */}
        {screen === 'PLAYING' && currentDay && (
          <div className="space-y-5 sm:space-y-6">
            {/* 4 Jauges de vie permanentes en haut */}
            <GaugesBar
              gauges={gauges}
              lastImpact={lastImpact}
              dayNumber={currentDay.dayNumber}
              jobTitle={activeScenario.title}
            />

            {/* Grille principale : Situation du jour + Choix tactiles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Colonne Gauche (7 cols) : Récit du jour & Événement Imprévu 2035 */}
              <section className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-xs">
                {/* Bandeau Événement Imprévu 2035 (Jour 3 ou 4) */}
                {currentDay.isUnexpected2035 && (
                  <div
                    role="alert"
                    className="rounded-2xl bg-amber-500/10 border border-amber-500/40 p-4 flex items-start gap-3 text-amber-800 dark:text-amber-300"
                  >
                    <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm font-bold leading-snug">
                      {currentDay.unexpectedHeadline ||
                        'ÉVÉNEMENT IMPRÉVU DE 2035 · Changement brutal sur le terrain'}
                    </div>
                  </div>
                )}

                {/* Métadonnées du jour (sans pilules statiques) */}
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono-num">
                    JOUR {currentDay.dayNumber}/5 · {currentDay.dayName.toUpperCase()}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{currentDay.timeContext}</span>
                  </span>
                </div>

                {/* Titre de la situation */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight big-scale-title">
                  {currentDay.title}
                </h1>

                {/* Récit de la situation */}
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed big-scale-text">
                  {currentDay.narrative}
                </p>

                {/* Rappel du contexte 2035 du métier */}
                {!simpleMode && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-slate-700 dark:text-slate-300">
                        Réalité 2035 :
                      </strong>{' '}
                      {activeScenario.context2035}
                    </p>
                  </div>
                )}
              </section>

              {/* Colonne Droite (5 cols) : 3 Cartes de Choix Tactiles + Feedback immédiat */}
              <section className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {selectedChoice
                      ? 'Conséquence directe de ton choix'
                      : 'Que décides-tu de faire ? (3 choix possibles)'}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentDay.choices.map((choice, idx) => {
                    const isPicked = selectedChoice?.id === choice.id;
                    const isOther = selectedChoice !== null && !isPicked;

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        disabled={selectedChoice !== null}
                        onClick={() => handleSelectChoice(choice)}
                        className={`w-full text-left rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                          isPicked
                            ? 'bg-indigo-600/10 dark:bg-indigo-500/15 border-indigo-500 ring-1 ring-indigo-500'
                            : isOther
                            ? 'bg-white/50 dark:bg-[#121927]/40 border-slate-200/50 dark:border-slate-800/50 opacity-50'
                            : 'bg-white dark:bg-[#121927] hover:bg-slate-50 dark:hover:bg-[#182235] border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/70 active:scale-[0.99]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                          <span className="font-mono-num font-bold text-indigo-600 dark:text-indigo-400">
                            Option 0{idx + 1} · {choice.tag}
                          </span>
                          {isPicked && (
                            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-300 font-bold">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Choisi</span>
                            </span>
                          )}
                        </div>

                        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug big-scale-choice">
                          {choice.label}
                        </div>

                        {/* Affichage des impacts une fois le choix effectué */}
                        {selectedChoice !== null && (
                          <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center gap-3 text-xs font-mono-num">
                            <span
                              className={
                                choice.impact.finances >= 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }
                            >
                              💰 {choice.impact.finances >= 0 ? `+${choice.impact.finances}` : choice.impact.finances}
                            </span>
                            <span
                              className={
                                choice.impact.mental >= 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }
                            >
                              🧠 {choice.impact.mental >= 0 ? `+${choice.impact.mental}` : choice.impact.mental}
                            </span>
                            <span
                              className={
                                choice.impact.time >= 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }
                            >
                              ⏳ {choice.impact.time >= 0 ? `+${choice.impact.time}` : choice.impact.time}
                            </span>
                            <span
                              className={
                                choice.impact.passion >= 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }
                            >
                              🔥 {choice.impact.passion >= 0 ? `+${choice.impact.passion}` : choice.impact.passion}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Carte de conséquence immédiate + Bouton Jour Suivant */}
                {selectedChoice && (
                  <div
                    role="region"
                    aria-live="polite"
                    className="rounded-2xl bg-slate-900 dark:bg-indigo-950/60 text-white border border-slate-800 dark:border-indigo-500/40 p-5 space-y-4 shadow-md"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                        <Sparkles className="w-4 h-4 shrink-0" />
                        <span>Ce qui se passe vraiment :</span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-100 leading-relaxed big-scale-text">
                        {selectedChoice.consequence}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdvanceDay}
                      className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>
                        {currentDayIndex < activeScenario.days.length - 1
                          ? `Passer au ${activeScenario.days[currentDayIndex + 1].dayName} (Jour ${
                              currentDayIndex + 2
                            }/5)`
                          : 'Découvrir mon Bilan « Vérité sans filtre »'}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* ÉCRAN 4 : BILAN VÉRITÉ SANS FILTRE EN FIN DE PARTIE */}
        {screen === 'REPORT' && (
          <FinalReport
            scenario={activeScenario}
            finalGauges={gauges}
            decisionLogs={decisionLogs}
            onTryAnotherJob={handleResetHome}
            onReplaySameJob={() => startWithScenario(activeScenario)}
          />
        )}
      </main>

      {/* PIED DE PAGE DISCRET ALPHABETTE */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 py-5 px-4 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 no-print">
        <p>
          Une expérience Tech for Good par{' '}
          <a
            href="https://alphabette.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-700 dark:text-slate-200 hover:underline"
          >
            Alphabette
          </a>{' '}
          — Teste d’autres applis sur{' '}
          <a
            href="https://alphabette.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            alphabette.eu
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
