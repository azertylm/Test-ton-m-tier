import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutGrid,
  Crown,
  Heart,
  BarChart2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Star,
  X,
  ArrowLeft,
  Check,
} from 'lucide-react';

interface AlphabetteAppItem {
  id: string;
  name: string;
  desc: string;
  url: string;
  isNew?: boolean;
}

const ALPHABETTE_APPS: AlphabetteAppItem[] = [
  {
    id: 'vie-en-2035',
    name: 'Vie en 2035',
    desc: 'RPG textuel : vis 5 journées sans filtre dans le métier de ton choix.',
    url: 'https://alphabette.eu',
    isNew: true,
  },
  {
    id: 'info-perso',
    name: 'Info Perso',
    desc: 'Ton coffre-fort citoyen de fiches pratiques et démarches simplifiées.',
    url: 'https://alphabette.fr',
  },
  {
    id: 'boussole-orientation',
    name: 'Boussole Post-Bac',
    desc: 'Découvre les vraies voies d’accès (BTS, BUT, Alternance) sans jargon.',
    url: 'https://alphabette.eu',
    isNew: true,
  },
  {
    id: 'budget-clair',
    name: 'Budget Clair',
    desc: 'Simulateur de premier salaire net, loyer et aides jeunes en temps réel.',
    url: 'https://alphabette.eu',
    isNew: true,
  },
  {
    id: 'cv-sans-blabla',
    name: 'CV Sans Blabla',
    desc: 'Transforme tes expériences et passions en compétences concrètes.',
    url: 'https://alphabette.fr',
  },
  {
    id: 'decodeur-contrat',
    name: 'Décodeur de Contrat',
    desc: 'Traduit n’importe quel contrat (stage, alternance, bail) en français clair.',
    url: 'https://alphabette.eu',
    isNew: true,
  },
];

interface AlphabetteHeaderProps {
  bigMode: boolean;
  onToggleBigMode: () => void;
  simpleMode: boolean;
  onToggleSimpleMode: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onResetHome: () => void;
  showBackButton?: boolean;
  getTextToRead: () => string;
}

export const AlphabetteHeader: React.FC<AlphabetteHeaderProps> = ({
  bigMode,
  onToggleBigMode,
  simpleMode,
  onToggleSimpleMode,
  darkMode,
  onToggleDarkMode,
  onResetHome,
  showBackButton = false,
  getTextToRead,
}) => {
  const [activeModal, setActiveModal] = useState<
    null | 'apps' | 'new' | 'abonnement' | 'don' | 'install' | 'feedback' | 'lang'
  >(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    try {
      return localStorage.getItem('alphabette_pinned_vie2035') === 'true';
    } catch {
      return false;
    }
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alphabette_fav_apps');
      return saved ? JSON.parse(saved) : ['vie-en-2035'];
    } catch {
      return ['vie-en-2035'];
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'FR' | 'EN' | 'ES'>('FR');

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const toggleFavorite = (appId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId];
      try {
        localStorage.setItem('alphabette_fav_apps', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleTogglePin = () => {
    const next = !isPinned;
    setIsPinned(next);
    try {
      localStorage.setItem('alphabette_pinned_vie2035', String(next));
    } catch {
      // ignore
    }
    triggerToast(next ? '⭐ Application épinglée en favori !' : 'Épinglage retiré.');
    setMenuOpen(false);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      triggerToast('La synthèse vocale n’est pas disponible sur ce navigateur.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const text = getTextToRead();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleMenuSimpleMode = () => {
    onToggleSimpleMode();
    setMenuOpen(false);
    triggerToast(
      !simpleMode
        ? '🧘 Mode simple activé : affichage épuré et confort de lecture renforcé.'
        : 'Mode standard rétabli.'
    );
  };

  const handlePrint = () => {
    setMenuOpen(false);
    window.print();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full no-print select-none shadow-sm">
        {/* 1. BARRE SUPÉRIEURE (Top Bar Écosystème) */}
        <div className="bg-[#182334] dark:bg-[#0b1220] text-white h-[46px] sm:h-[50px] px-[10px] sm:px-[16px] flex items-center justify-between gap-[6px] flex-nowrap border-b border-white/10">
          {/* Bloc de gauche */}
          <div className="flex items-center gap-[6px] sm:gap-[10px] min-w-0 flex-nowrap">
            {/* 1. Logo + Nom (alphabette) */}
            <a
              href="https://alphabette.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[6px] sm:gap-[8px] shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400 rounded-[8px] py-[2px]"
              aria-label="Portail Alphabette.fr"
            >
              <span className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] rounded-full bg-[#3355d1] flex items-center justify-center text-white font-bold text-[15px] sm:text-[16px] leading-none shadow-inner">
                a
              </span>
              <span className="font-bold lowercase text-[15px] sm:text-[17px] tracking-tight text-white whitespace-nowrap">
                alphabette
              </span>
            </a>

            {/* 2. Bouton .eu */}
            <a
              href="https://alphabette.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-[12px] sm:text-[13px] font-semibold text-white shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400"
              aria-label="Laboratoire Alphabette.eu"
              title="Laboratoire Alphabette.eu"
            >
              .eu
            </a>

            {/* 3. Bouton « Toutes les applis » */}
            <button
              type="button"
              onClick={() => setActiveModal('apps')}
              aria-label="Toutes les applis de la suite Alphabette"
              className="w-[34px] h-[34px] sm:w-auto sm:h-[36px] sm:px-[10px] rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-[6px] text-white shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <LayoutGrid className="w-[17px] h-[17px] shrink-0" />
              <span className="hidden sm:inline text-[12.5px] font-medium whitespace-nowrap">
                Toutes les applis
              </span>
            </button>

            {/* 4. Bouton « NEW » */}
            <button
              type="button"
              onClick={() => setActiveModal('new')}
              aria-label="Nouveautés de la suite Alphabette"
              className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span className="rounded-[4px] bg-gradient-to-r from-sky-200 to-sky-400 text-[#0f172a] text-[9px] font-extrabold uppercase px-[4px] py-[1px] leading-tight tracking-tight">
                NEW
              </span>
            </button>
          </div>

          {/* Bloc de droite */}
          <div className="shrink-0">
            {/* 5. Bouton Abonnement */}
            <button
              type="button"
              onClick={() => setActiveModal('abonnement')}
              aria-label="Informations sur l'abonnement Alphabette"
              className="h-[34px] sm:h-[36px] px-[10px] sm:px-[14px] rounded-full bg-white/10 hover:bg-white/20 border-[1.5px] border-[#f59e0b] transition-colors flex items-center gap-[5px] cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <Crown className="w-[14px] h-[14px] text-[#f59e0b] shrink-0" />
              <span className="text-[12.5px] sm:text-[13.5px] font-bold text-[#fbbf24] whitespace-nowrap">
                Abonnement
              </span>
            </button>
          </div>
        </div>

        {/* 2. BARRE INFÉRIEURE (Barre d’Application & Accessibilité) */}
        <div className="bg-white dark:bg-[#0f172a] border-b border-[#e2e8f0] dark:border-[#334155] h-[54px] sm:h-[58px] px-[10px] sm:px-[16px] flex items-center justify-between gap-[6px] flex-nowrap transition-colors">
          {/* Bloc de gauche */}
          <div className="min-w-0 flex-1 flex items-center gap-[6px]">
            {showBackButton && (
              <button
                type="button"
                onClick={onResetHome}
                aria-label="Retour à l'accueil du choix de métier"
                className="w-[34px] h-[34px] rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <ArrowLeft className="w-[16px] h-[16px]" />
              </button>
            )}
            <button
              type="button"
              onClick={onResetHome}
              className="min-w-0 text-left flex flex-col justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500 rounded-[4px]"
              aria-label="Vie en 2035 - Retour à l'accueil"
            >
              <div className="flex items-center gap-[5px] min-w-0">
                <span className="font-bold text-[#3f51b5] dark:text-white text-[14.5px] sm:text-[20px] tracking-tight truncate leading-tight">
                  Vie en 2035
                </span>
                {isPinned && (
                  <Star
                    className="w-[13px] h-[13px] text-[#f59e0b] fill-[#f59e0b] shrink-0"
                    aria-label="Application épinglée"
                  />
                )}
              </div>
              <span className="text-[9px] sm:text-[10.5px] uppercase tracking-[0.04em] text-[#64748b] dark:text-slate-400 truncate leading-tight">
                5 JOURS DANS UN MÉTIER
              </span>
            </button>
          </div>

          {/* Bloc de droite : exactement les 5 boutons requis */}
          <div className="flex items-center gap-[4px] sm:gap-[7px] shrink-0">
            {/* 1. Bouton Don */}
            <button
              type="button"
              onClick={() => setActiveModal('don')}
              aria-label="Soutenir Alphabette par un don"
              className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[10px] sm:rounded-[11px] bg-[#db2777] hover:bg-[#be185d] transition-colors flex items-center justify-center text-white shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-500"
            >
              <Heart className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px] fill-white text-white" />
            </button>

            {/* 2. Bouton BIG */}
            <button
              type="button"
              onClick={onToggleBigMode}
              aria-pressed={bigMode}
              aria-label="Basculer le mode grand texte BIG"
              className={`h-[34px] sm:h-[38px] px-[8px] sm:px-[11px] rounded-[10px] sm:rounded-[11px] font-bold text-[12px] sm:text-[14px] flex items-center gap-[4px] shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                bigMode
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                  : 'bg-[#4338ca] hover:bg-[#3730a3] text-white'
              }`}
            >
              <span>BIG</span>
              <BarChart2 className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] shrink-0" />
            </button>

            {/* 3. Bouton Mode Nuit / Jour */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Passer en mode jour' : 'Passer en mode nuit'}
              className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 border border-[#e2e8f0] dark:border-[#334155] transition-colors flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              {darkMode ? (
                <Sun className="w-[17px] h-[17px] text-[#fbbf24]" />
              ) : (
                <Moon className="w-[17px] h-[17px] text-[#334155]" />
              )}
            </button>

            {/* 4. Bouton Lecture à haute voix */}
            <button
              type="button"
              onClick={handleToggleSpeech}
              aria-pressed={isSpeaking}
              aria-label={isSpeaking ? 'Arrêter la lecture à haute voix' : 'Lire le contenu à haute voix'}
              className={`w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full border transition-colors flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                isSpeaking
                  ? 'bg-[#047857] border-[#059669] text-white'
                  : 'bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 border-[#e2e8f0] dark:border-[#334155] text-[#334155] dark:text-slate-200'
              }`}
            >
              {isSpeaking ? (
                <VolumeX className="w-[17px] h-[17px]" />
              ) : (
                <Volume2 className="w-[17px] h-[17px]" />
              )}
            </button>

            {/* 5. Bouton Plus d’options (...) */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label="Plus d'options"
                className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 border border-[#e2e8f0] dark:border-[#334155] transition-colors flex items-center justify-center text-[#334155] dark:text-slate-200 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <MoreHorizontal className="w-[17px] h-[17px]" />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  aria-label="Options de l'application"
                  className="absolute right-0 mt-[8px] w-[260px] rounded-[14px] bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-xl py-[6px] z-50 text-[14px] text-slate-800 dark:text-slate-100"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleTogglePin}
                    className="w-full px-[14px] py-[10px] text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>⭐ Épingler cette appli</span>
                    {isPinned && <Check className="w-[15px] h-[15px] text-amber-500" />}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveModal('abonnement');
                    }}
                    className="w-full px-[14px] py-[10px] text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>👤 Mon inscription</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleMenuSimpleMode}
                    className="w-full px-[14px] py-[10px] text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>🧘 Mode simple</span>
                    {simpleMode && <Check className="w-[15px] h-[15px] text-emerald-500" />}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveModal('install');
                    }}
                    className="w-full px-[14px] py-[10px] text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>📱 Installer sur mon téléphone</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setFeedbackSent(false);
                      setActiveModal('feedback');
                    }}
                    className="w-full px-[14px] py-[10px] text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>💬 Donner mon avis</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handlePrint}
                    className="w-full px-[14px] py-[10px] text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>🖨️ Imprimer</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveModal('lang');
                    }}
                    className="w-full px-[14px] py-[10px] text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>🌐 Langue</span>
                    <span className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedLang}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notification Toast légère */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-[20px] right-[20px] z-50 max-w-[340px] bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 px-[16px] py-[12px] rounded-[12px] shadow-xl text-[14px] font-medium flex items-center gap-[10px] no-print"
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODALE : Toutes les applis */}
      {activeModal === 'apps' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-apps-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-[16px] no-print"
        >
          <div className="bg-white dark:bg-[#151e2e] border border-slate-200 dark:border-slate-700 rounded-[20px] max-w-[480px] w-full p-[20px] shadow-2xl">
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-200 dark:border-slate-800">
              <h2 id="modal-apps-title" className="text-[18px] font-bold text-slate-900 dark:text-white">
                Toutes les applis Alphabette
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fermer la fenêtre"
                className="w-[34px] h-[34px] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>
            <div className="py-[12px] space-y-[8px] max-h-[60vh] overflow-y-auto">
              {ALPHABETTE_APPS.map((app) => {
                const isFav = favorites.includes(app.id);
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between gap-[12px] p-[12px] rounded-[12px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70"
                  >
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 flex-1"
                    >
                      <div className="font-bold text-[15px] text-slate-900 dark:text-white flex items-center gap-[8px]">
                        <span>{app.name}</span>
                        {app.isNew && (
                          <span className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">
                            · Nouveau
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-slate-600 dark:text-slate-300 mt-[2px]">
                        {app.desc}
                      </p>
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(app.id)}
                      aria-label={isFav ? `Retirer ${app.name} des favoris` : `Ajouter ${app.name} aux favoris`}
                      className="w-[38px] h-[38px] rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-[20px] shrink-0 cursor-pointer"
                    >
                      {isFav ? '⭐' : '☆'}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="pt-[12px] border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-[18px] py-[9px] rounded-[10px] bg-slate-900 dark:bg-indigo-600 text-white text-[14px] font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : Nouveautés (NEW) */}
      {activeModal === 'new' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-new-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-[16px] no-print"
        >
          <div className="bg-white dark:bg-[#151e2e] border border-slate-200 dark:border-slate-700 rounded-[20px] max-w-[480px] w-full p-[20px] shadow-2xl">
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-200 dark:border-slate-800">
              <h2 id="modal-new-title" className="text-[18px] font-bold text-slate-900 dark:text-white">
                Nouveautés Alphabette
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fermer la fenêtre"
                className="w-[34px] h-[34px] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>
            <div className="py-[12px] space-y-[8px] max-h-[60vh] overflow-y-auto">
              {ALPHABETTE_APPS.filter((a) => a.isNew).map((app) => {
                const isFav = favorites.includes(app.id);
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between gap-[12px] p-[12px] rounded-[12px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[15px] text-slate-900 dark:text-white">
                        {app.name}
                      </div>
                      <p className="text-[13px] text-slate-600 dark:text-slate-300 mt-[2px]">
                        {app.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(app.id)}
                      aria-label={isFav ? `Retirer ${app.name} des favoris` : `Ajouter ${app.name} aux favoris`}
                      className="w-[38px] h-[38px] rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-[20px] shrink-0 cursor-pointer"
                    >
                      {isFav ? '⭐' : '☆'}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="pt-[12px] border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-[18px] py-[9px] rounded-[10px] bg-slate-900 dark:bg-indigo-600 text-white text-[14px] font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : Abonnement */}
      {activeModal === 'abonnement' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-abo-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-[16px] no-print"
        >
          <div className="bg-white dark:bg-[#151e2e] border border-amber-500/40 rounded-[20px] max-w-[460px] w-full p-[22px] shadow-2xl">
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-[8px]">
                <Crown className="w-[20px] h-[20px] text-[#f59e0b]" />
                <h2 id="modal-abo-title" className="text-[18px] font-bold text-slate-900 dark:text-white">
                  Abonnement Alphabette
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fermer la fenêtre"
                className="w-[34px] h-[34px] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>
            <div className="py-[16px] space-y-[12px] text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed">
              <p className="font-semibold text-slate-900 dark:text-white">
                Lancement de l’abonnement payant le 7 mai au tarif de 15 € / an pour une appli, ou 40 € / an pour toutes les applis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] pt-[6px]">
                <div className="p-[14px] rounded-[12px] bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                  <div className="text-[13px] text-slate-500 dark:text-slate-400">Formule 1 Appli</div>
                  <div className="text-[22px] font-bold text-slate-900 dark:text-white mt-[2px]">
                    15 € <span className="text-[13px] font-normal">/ an</span>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-300 mt-[4px]">
                    Accès complet à ton application préférée sans publicité.
                  </p>
                </div>
                <div className="p-[14px] rounded-[12px] bg-amber-500/10 border border-amber-500/40">
                  <div className="text-[13px] font-semibold text-amber-600 dark:text-amber-400">
                    Pass Écosystème Complet
                  </div>
                  <div className="text-[22px] font-bold text-slate-900 dark:text-white mt-[2px]">
                    40 € <span className="text-[13px] font-normal">/ an</span>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-300 mt-[4px]">
                    Accès illimité à toutes les applications Alphabette (.fr & .eu).
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-slate-500 dark:text-slate-400">
                Un compte unique (Single Sign-On) pour retrouver tes favoris et sauvegardes sur web et mobile.
              </p>
            </div>
            <div className="pt-[12px] border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-[18px] py-[9px] rounded-[10px] bg-slate-900 dark:bg-amber-500 dark:text-slate-950 text-white text-[14px] font-bold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : Don / Soutien */}
      {activeModal === 'don' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-don-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-[16px] no-print"
        >
          <div className="bg-white dark:bg-[#151e2e] border border-pink-500/30 rounded-[20px] max-w-[440px] w-full p-[22px] shadow-2xl">
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-[8px]">
                <Heart className="w-[20px] h-[20px] text-[#db2777] fill-[#db2777]" />
                <h2 id="modal-don-title" className="text-[18px] font-bold text-slate-900 dark:text-white">
                  Soutenir Alphabette
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fermer la fenêtre"
                className="w-[34px] h-[34px] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>
            <div className="py-[16px] space-y-[12px] text-[14.5px] text-slate-700 dark:text-slate-200 leading-relaxed">
              <p>
                Alphabette conçoit des outils numériques utiles, accessibles (WCAG AAA), sans revente de données ni algorithmes toxiques.
              </p>
              <p>
                Chaque coup de pouce finance l’hébergement souverain et la création de nouvelles applications d’intérêt citoyen.
              </p>
            </div>
            <div className="pt-[12px] border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-[10px]">
              <a
                href="https://alphabette.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-[16px] py-[9px] rounded-[10px] bg-[#db2777] hover:bg-[#be185d] text-white text-[14px] font-bold"
              >
                Soutenir sur alphabette.fr
              </a>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-[16px] py-[9px] rounded-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[14px] font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : Installer sur mon téléphone */}
      {activeModal === 'install' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-install-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-[16px] no-print"
        >
          <div className="bg-white dark:bg-[#151e2e] border border-slate-200 dark:border-slate-700 rounded-[20px] max-w-[440px] w-full p-[22px] shadow-2xl">
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-200 dark:border-slate-800">
              <h2 id="modal-install-title" className="text-[18px] font-bold text-slate-900 dark:text-white">
                📱 Installer sur mon téléphone
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fermer la fenêtre"
                className="w-[34px] h-[34px] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>
            <div className="py-[16px] space-y-[12px] text-[14px] text-slate-700 dark:text-slate-200">
              <div className="p-[12px] rounded-[12px] bg-slate-50 dark:bg-slate-800/70">
                <div className="font-bold text-slate-900 dark:text-white">Sur Android (Chrome / Firefox)</div>
                <p className="mt-[4px]">
                  Appuie sur le menu <strong>⋮</strong> en haut à droite du navigateur puis sélectionne <strong>« Ajouter à l’écran d’accueil »</strong>.
                </p>
              </div>
              <div className="p-[12px] rounded-[12px] bg-slate-50 dark:bg-slate-800/70">
                <div className="font-bold text-slate-900 dark:text-white">Sur iPhone / iPad (Safari)</div>
                <p className="mt-[4px]">
                  Appuie sur l’icône <strong>Partager</strong> en bas de l’écran puis choisis <strong>« Sur l’écran d’accueil »</strong>.
                </p>
              </div>
            </div>
            <div className="pt-[12px] border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-[18px] py-[9px] rounded-[10px] bg-slate-900 dark:bg-indigo-600 text-white text-[14px] font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : Donner mon avis */}
      {activeModal === 'feedback' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-feedback-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-[16px] no-print"
        >
          <div className="bg-white dark:bg-[#151e2e] border border-slate-200 dark:border-slate-700 rounded-[20px] max-w-[440px] w-full p-[22px] shadow-2xl">
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-200 dark:border-slate-800">
              <h2 id="modal-feedback-title" className="text-[18px] font-bold text-slate-900 dark:text-white">
                💬 Donner mon avis
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fermer la fenêtre"
                className="w-[34px] h-[34px] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>
            {feedbackSent ? (
              <div className="py-[20px] text-center space-y-[10px]">
                <p className="text-[16px] font-bold text-emerald-600 dark:text-emerald-400">
                  Merci pour ton retour !
                </p>
                <p className="text-[14px] text-slate-600 dark:text-slate-300">
                  Tes idées nous aident à rendre Vie en 2035 encore plus réaliste.
                </p>
              </div>
            ) : (
              <div className="py-[14px] space-y-[10px]">
                <label
                  htmlFor="alphabette-feedback-input"
                  className="block text-[13.5px] font-medium text-slate-700 dark:text-slate-300"
                >
                  Un métier à ajouter, un bug ou une suggestion ?
                </label>
                <textarea
                  id="alphabette-feedback-input"
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Écris ton message sans filtre..."
                  className="w-full rounded-[12px] border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-[12px] text-[14px] text-slate-900 dark:text-white focus:outline-2 focus:outline-indigo-500"
                />
              </div>
            )}
            <div className="pt-[12px] border-t border-slate-200 dark:border-slate-800 flex justify-end gap-[8px]">
              {!feedbackSent && (
                <button
                  type="button"
                  onClick={() => {
                    if (feedbackText.trim()) {
                      setFeedbackSent(true);
                      setFeedbackText('');
                    }
                  }}
                  className="px-[16px] py-[9px] rounded-[10px] bg-indigo-600 hover:bg-indigo-500 text-white text-[14px] font-semibold cursor-pointer"
                >
                  Envoyer
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-[16px] py-[9px] rounded-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[14px] font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : Langue */}
      {activeModal === 'lang' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-lang-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-[16px] no-print"
        >
          <div className="bg-white dark:bg-[#151e2e] border border-slate-200 dark:border-slate-700 rounded-[20px] max-w-[380px] w-full p-[22px] shadow-2xl">
            <div className="flex items-center justify-between pb-[12px] border-b border-slate-200 dark:border-slate-800">
              <h2 id="modal-lang-title" className="text-[18px] font-bold text-slate-900 dark:text-white">
                🌐 Langue de l’interface
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fermer la fenêtre"
                className="w-[34px] h-[34px] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>
            <div className="py-[14px] space-y-[8px]">
              {(['FR', 'EN', 'ES'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setSelectedLang(code);
                    setActiveModal(null);
                    triggerToast(`Langue active : ${code} (Scénarios France 2035)`);
                  }}
                  className={`w-full p-[12px] rounded-[12px] border flex items-center justify-between text-left cursor-pointer ${
                    selectedLang === code
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>
                    {code === 'FR' && 'Français (France · Référentiel Orientation)'}
                    {code === 'EN' && 'English (FR Career Reference)'}
                    {code === 'ES' && 'Español (Referencia Francia)'}
                  </span>
                  {selectedLang === code && <Check className="w-[16px] h-[16px]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
