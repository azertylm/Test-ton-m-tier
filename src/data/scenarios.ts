import { JobScenario } from '../types/game';

export const OFFLINE_SCENARIOS: JobScenario[] = [
  {
    id: 'dev-independant',
    title: 'Développeur Indépendant',
    category: 'Tech & Numérique',
    tagline: 'Pas de patron, un TJM qui fait rêver… mais l’URSSAF et les clients à 23h ne dorment jamais.',
    context2035:
      'En 2035, plus personne ne tape du code répétitif à la main : tu orchestres une flotte d’agents IA autonomes pour livrer des architectures complexes. La vraie valeur ? Comprendre le besoin réel du client et réparer ce que les IA cassent en production.',
    initialGauges: {
      finances: 55,
      mental: 65,
      time: 55,
      passion: 70,
    },
    isOfflinePreset: true,
    days: [
      {
        dayNumber: 1,
        dayName: 'Lundi',
        timeContext: '09h14 · Ton bureau (en jogging, café n°2)',
        title: 'Le client « urgent mais fauché »',
        narrative:
          'Un fondateur de start-up t’appelle en panique : son application de logistique plante avant une démo devant ses investisseurs demain matin. Il te propose un gros bonus si tu passes ta nuit dessus, mais son code ressemble à des spaghettis cuits en 2029.',
        choices: [
          {
            id: 'd1-c1',
            label: 'Facturer le tarif urgence nuit (+80 %) et foncer',
            tag: 'Cash Max',
            consequence:
              'Tu encaisses un virement express de 1 800 € pour 14 heures de galère. À 3h du matin, le bug est corrigé, mais tes yeux clignotent comme un routeur.',
            impact: { finances: 22, mental: -18, time: -20, passion: 4 },
          },
          {
            id: 'd1-c2',
            label: 'Proposer un patch propre en 4h sans y passer la nuit',
            tag: 'Cadre Pro',
            consequence:
              'Tu poses tes limites : un correctif chirurgical pour sécuriser sa démo, facturé au juste prix. Il râle 2 minutes puis accepte avec respect.',
            impact: { finances: 12, mental: 6, time: -5, passion: 10 },
          },
          {
            id: 'd1-c3',
            label: 'Refuser la mission bourbier et bosser sur ton propre projet',
            tag: 'Liberté',
            consequence:
              'Tu esquives une migraine certaine et avances sur ton propre outil open-source. Zéro euro rentré aujourd’hui, mais quel plaisir de coder proprement.',
            impact: { finances: -10, mental: 14, time: 12, passion: 18 },
          },
        ],
      },
      {
        dayNumber: 2,
        dayName: 'Mardi',
        timeContext: '14h30 · Visio avec un grand groupe',
        title: 'La réunion qui aurait pu être un e-mail',
        narrative:
          'Six managers débattent depuis 1h40 de la couleur d’un bouton alors que la base de données fuit de partout. Ils te demandent si tu peux aussi « refaire le design, gérer la cybersécurité et former l’équipe » pour le même budget.',
        choices: [
          {
            id: 'd2-c1',
            label: 'Dire oui à tout pour verrouiller le contrat de 6 mois',
            tag: 'Sécurité financière',
            consequence:
              'Contrat signé ! Ton banquier t’adore, mais tu viens de t’engager à faire le boulot de trois personnes différentes.',
            impact: { finances: 20, mental: -15, time: -16, passion: -12 },
          },
          {
            id: 'd2-c2',
            label: 'Recadrer en direct et chiffrer chaque tâche en avenant',
            tag: 'Franc-parler',
            consequence:
              'Silence glacial pendant 5 secondes… puis le directeur technique valide ton devis détaillé. Tu gagnes en crédibilité (et en tranquillité).',
            impact: { finances: 14, mental: 8, time: 0, passion: 12 },
          },
          {
            id: 'd2-c3',
            label: 'Couper ta caméra et coder en douce pendant qu’ils parlent',
            tag: 'Mode Ninja',
            consequence:
              'Tu boucles deux fonctionnalités pendant leur débat métaphysique. Efficace, mais tu commences à te demander à quoi sert ce cirque.',
            impact: { finances: 6, mental: 4, time: 10, passion: -8 },
          },
        ],
      },
      {
        dayNumber: 3,
        dayName: 'Mercredi',
        timeContext: '11h05 · Alerte Tech Mondiale',
        title: 'Mise à jour « DevCore-Omni 2035 »',
        isUnexpected2035: true,
        unexpectedHeadline: 'ÉVÉNEMENT IMPRÉVU 2035 · Un nouvel agent IA automatise 45 % de ton workflow habituel',
        narrative:
          'Coup de tonnerre ce matin : une nouvelle génération d’IA génère et déploie des microservices complets en 30 secondes pour 20 €/mois. Deux de tes petits clients t’envoient un message : « Du coup, on peut diviser tes tarifs par deux ? »',
        choices: [
          {
            id: 'd3-c1',
            label: 'Intégrer l’outil immédiatement et vendre de l’audit d’architecture',
            tag: 'Pivot Stratégique',
            consequence:
              'Tu passes ta journée à dompter la bête. Tu livres deux fois plus vite et factures désormais la responsabilité technique plutôt que les lignes de code.',
            impact: { finances: 16, mental: -8, time: 8, passion: 16 },
          },
          {
            id: 'd3-c2',
            label: 'Baisser tes prix pour garder tes clients coûte que coûte',
            tag: 'Défensif',
            consequence:
              'Tes clients restent, mais tu dois travailler deux fois plus pour gagner la même chose. Le piège classique du freelance qui brade son expertise.',
            impact: { finances: -8, mental: -14, time: -14, passion: -15 },
          },
          {
            id: 'd3-c3',
            label: 'Laisser partir les clients radins et te former à la sécurité IA',
            tag: 'Investissement',
            consequence:
              'Tu perds du chiffre ce mois-ci, mais tu te positionnes sur le créneau où personne ne fait confiance à une IA seule : la sécurité critique.',
            impact: { finances: -12, mental: 10, time: -4, passion: 20 },
          },
        ],
      },
      {
        dayNumber: 4,
        dayName: 'Jeudi',
        timeContext: '16h20 · Courrier URSSAF & Comptabilité',
        title: 'La douche froide administrative',
        narrative:
          'Tu avais oublié que sur 100 € facturés, tout n’est pas pour ta poche. Entre la régularisation des cotisations sociales, ta mutuelle, ton matériel et un client qui a 45 jours de retard de paiement, ta trésorerie tire la langue.',
        choices: [
          {
            id: 'd4-c1',
            label: 'Appeler le client mauvais payeur sans lâcher le combiné',
            tag: 'Fermeté',
            consequence:
              'Après 20 minutes de négociation ferme avec leur service compta, le virement de 3 400 € part enfin. Ce n’est pas ton métier préféré, mais c’est vital.',
            impact: { finances: 18, mental: -8, time: -6, passion: -4 },
          },
          {
            id: 'd4-c2',
            label: 'Déléguer à un comptable spécialisé (150 €/mois)',
            tag: 'Délégation',
            consequence:
              'Tu paies un pro qui optimise tes charges et relance les factures à ta place. Moins de cash immédiat, mais un poids énorme en moins sur les épaules.',
            impact: { finances: -6, mental: 16, time: 14, passion: 6 },
          },
          {
            id: 'd4-c3',
            label: 'Fermer l’onglet, aller courir et gérer ça la semaine prochaine',
            tag: 'Politique de l’autruche',
            consequence:
              'Ton footing te fait un bien fou, mais la pénalité de retard de 5 % vient de tomber à minuit.',
            impact: { finances: -15, mental: 6, time: 15, passion: 0 },
          },
        ],
      },
      {
        dayNumber: 5,
        dayName: 'Vendredi',
        timeContext: '17h45 · Mise en production du vendredi soir',
        title: 'La tentation du déploiement à 18h',
        narrative:
          'Tes potes t’attendent pour le week-end. Ton client principal insiste pour publier la nouvelle version de sa boutique maintenant, juste avant le pic du week-end. Règle n°1 des devs : on ne déploie jamais un vendredi soir.',
        choices: [
          {
            id: 'd5-c1',
            label: 'Refuser poliment et programmer la mise en ligne lundi à 9h',
            tag: 'Sagesse',
            consequence:
              'Le client bougonne un peu, mais ton week-end est 100 % serein. Lundi matin, tout passera crème avec l’équipe au complet.',
            impact: { finances: 0, mental: 15, time: 18, passion: 8 },
          },
          {
            id: 'd5-c2',
            label: 'Déployer à 18h pour faire plaisir au client',
            tag: 'Risque Maximum',
            consequence:
              'Bingo : le module de paiement plante à 20h15. Tu passes ton vendredi soir sur ton ordinateur portable dans un bar bruyant pendant que tes amis trinquent.',
            impact: { finances: 10, mental: -20, time: -22, passion: -12 },
          },
          {
            id: 'd5-c3',
            label: 'Activer un déploiement progressif sur 5 % des utilisateurs',
            tag: 'Ingénierie Pro',
            consequence:
              'Tu configures un coupe-circuit automatique en 45 minutes. Tu arrives un peu en retard à ta soirée, mais fier de ton architecture blindée.',
            impact: { finances: 12, mental: 6, time: -6, passion: 16 },
          },
        ],
      },
    ],
    realLifeSheet: {
      salaryJunior: '2 200 € à 2 900 € net / mois (salarié ou début freelance)',
      salarySenior: '4 200 € à 7 500 € net / mois (TJM 500–850 € après charges)',
      status2035: 'Toujours porteur pour les profils qui comprennent l’architecture, la sécurité et le produit (pas juste le copier-coller).',
      darkSides: [
        'L’instabilité des revenus en indépendant : il faut savoir vendre, relancer les factures et gérer l’isolement derrière l’écran.',
        'L’obsolescence permanente : si tu arrêtes d’apprendre pendant 18 mois, tes compétences perdent la moitié de leur valeur.',
      ],
      trueJoys: [
        'La liberté géographique et horaire réelle : personne ne contrôle à quelle heure tu commences tant que le travail est livré.',
        'Le plaisir intellectuel de construire des outils utilisés par des milliers de personnes en partant d’une page blanche.',
      ],
      pathways: [
        {
          route: 'BUT Informatique ou BTS SIO (souvent en alternance)',
          duration: '2 à 3 ans après le bac',
          realityTip: 'Voie ultra concrète : tu codes dès la première semaine et tu sors avec une vraie expérience pro.',
        },
        {
          route: 'École d’ingénieurs ou Master Informatique (Université)',
          duration: '5 ans après le bac',
          realityTip: 'Idéal pour viser l’architecture système, l’IA ou la cybersécurité avec des bases théoriques solides.',
        },
        {
          route: 'Écoles spécialisées / Autodidacte + Projets Open-Source',
          duration: '1 à 3 ans intensifs',
          realityTip: 'En freelance, ton portfolio GitHub et tes projets réels comptent dix fois plus que le nom de ton diplôme.',
        },
      ],
      unfilteredVerdict:
        'Si tu veux être freelance juste pour « travailler depuis la plage », oublie : le sable ruine les claviers. Mais si tu aimes résoudre des casse-têtes logiques et être maître de ton emploi du temps, c’est l’un des métiers les plus libres qui existent.',
    },
  },
  {
    id: 'pompier-professionnel',
    title: 'Pompier Professionnel',
    category: 'Secours & Terrain',
    tagline: 'On t’applaudit au défilé du 14 juillet, mais la vraie vie c’est 85 % de secours humain et des gardes de 24h qui testent tes nerfs.',
    context2035:
      'En 2035, les casernes sont équipées de drones thermiques autonomes et d’exosquelettes légers de désincarcération. Mais face à la détresse humaine, aux canicules de 44°C et aux décisions en 3 secondes dans la fumée, aucune machine ne remplace le sang-froid.',
    initialGauges: {
      finances: 48,
      mental: 65,
      time: 50,
      passion: 80,
    },
    isOfflinePreset: true,
    days: [
      {
        dayNumber: 1,
        dayName: 'Lundi',
        timeContext: '07h30 · Caserne Centre · Prise de garde 24h',
        title: 'Vérification du matériel et 4e appel de la matinée',
        narrative:
          'Contrairement aux séries américaines, tu ne passes pas ta journée à descendre la perche pour des incendies géants. Ce matin : trois malaises à domicile et un appel pour « urgence vitale » qui s’avère être un monsieur qui voulait juste qu’on lui ouvre sa porte.',
        choices: [
          {
            id: 'p1-c1',
            label: 'Garder ton calme, rassurer la personne et expliquer les vrais numéros',
            tag: 'Sang-froid',
            consequence:
              'Le monsieur s’excuse, honteux. Ton chef d’agrès apprécie ton calme olympien. C’est moins spectaculaire qu’un film, mais c’est le vrai métier.',
            impact: { finances: 4, mental: 8, time: -4, passion: 10 },
          },
          {
            id: 'p1-c2',
            label: 'Pousser un coup de gueule sur l’abus des numéros d’urgence',
            tag: 'Frustration',
            consequence:
              'Ça soulage sur le moment, mais la tension monte dans l’équipage et le rapport d’intervention te prend 30 minutes de paperasse en plus.',
            impact: { finances: 0, mental: -12, time: -8, passion: -6 },
          },
          {
            id: 'p1-c3',
            label: 'Enchaîner vite pour retourner t’entraîner au parcours sportif',
            tag: 'Endurance',
            consequence:
              'Tu évacues la frustration à la salle de sport de la caserne. Physiquement au top, même si la nuit s’annonce longue.',
            impact: { finances: 4, mental: 10, time: -6, passion: 8 },
          },
        ],
      },
      {
        dayNumber: 2,
        dayName: 'Mardi',
        timeContext: '03h18 · Nuit de garde · Rocade Sud',
        title: 'Sortie de route sous la pluie battante',
        narrative:
          'Le bip hurle dans ta chambre à 3h18 du matin. Ton cœur passe de 55 à 130 battements/minute en dix secondes. Sur place : un véhicule électrique accidenté, un conducteur conscient mais bloqué, et la batterie qui commence à chauffer dangereusement.',
        choices: [
          {
            id: 'p2-c1',
            label: 'Appliquer le protocole strict : sécurisation thermique avant extraction',
            tag: 'Maîtrise Technique',
            consequence:
              'Grâce à la lance haute pression et à ton sang-froid, le risque d’emballement thermique est neutralisé. La victime est extraite sans séquelle.',
            impact: { finances: 8, mental: 6, time: -10, passion: 20 },
          },
          {
            id: 'p2-c2',
            label: 'Tenter une extraction ultra-rapide avant l’arrivée du fourgon',
            tag: 'Adrénaline',
            consequence:
              'Tu sors la victime en un temps record, mais tu te froisses l’épaule et ton officier te rappelle que un pompier blessé, c’est une victime de plus.',
            impact: { finances: 6, mental: -14, time: -12, passion: 12 },
          },
          {
            id: 'p2-c3',
            label: 'Prendre le poste de soutien psychologique auprès du blessé',
            tag: 'Humain',
            consequence:
              'Pendant que tes collègues découpent la portière, tu maintiens la victime calme et lucide. Son regard de gratitude au camion vaut tous les discours.',
            impact: { finances: 6, mental: 10, time: -8, passion: 18 },
          },
        ],
      },
      {
        dayNumber: 3,
        dayName: 'Mercredi',
        timeContext: '15h40 · Dôme de chaleur 43°C · Périphérie urbaine',
        title: 'Alerte Rouge : Feu de végétation aux portes de la ville',
        isUnexpected2035: true,
        unexpectedHeadline: 'ÉVÉNEMENT IMPRÉVU 2035 · Canicule extrême & perte de signal des drones de reconnaissance',
        narrative:
          'Tu étais en repos aujourd’hui, mais le plan d’urgence climatique est déclenché : un feu de broussailles poussé par un vent à 70 km/h menace un lotissement. Les drones thermiques sont brouillés par la fumée dense. La caserne rappelle tous les effectifs disponibles.',
        choices: [
          {
            id: 'p3-c1',
            label: 'Annuler ton après-midi en famille et rejoindre le camion-citerne',
            tag: 'Devoir',
            consequence:
              'Six heures de lutte dans une fournaise sous 25 kg d’équipement. Le lotissement est sauvé. Tes proches comprennent, mais ton corps est rincé.',
            impact: { finances: 16, mental: -12, time: -22, passion: 22 },
          },
          {
            id: 'p3-c2',
            label: 'Prendre un poste de coordination au poste de commandement',
            tag: 'Tactique',
            consequence:
              'Tu gères la logistique en eau et la relève des équipes pendant 5 heures intenses. Moins exposé aux fumées, mais une pression mentale énorme.',
            impact: { finances: 12, mental: -8, time: -14, passion: 14 },
          },
          {
            id: 'p3-c3',
            label: 'Rester en astreinte de seconde relève pour la nuit',
            tag: 'Gestion de l’effort',
            consequence:
              'Tu préserves quelques heures de récupération avant de prendre la relève de minuit à 8h pour noyer les fumerolles.',
            impact: { finances: 10, mental: 4, time: -8, passion: 10 },
          },
        ],
      },
      {
        dayNumber: 4,
        dayName: 'Jeudi',
        timeContext: '11h00 · Retour au calme · Vie de caserne',
        title: 'L’après-coup émotionnel dont personne ne parle',
        narrative:
          'Après une intervention difficile hier soir, un jeune recrue de ta garde reste silencieux dans les vestiaires. Dans ce métier, l’humour de caserne sert souvent de carapace, mais accumuler les chocs sans en parler finit par laisser des traces.',
        choices: [
          {
            id: 'p4-c1',
            label: 'Prendre un café avec lui et débriefer franchement sans jugement',
            tag: 'Fraternité',
            consequence:
              'Il vide son sac et toi aussi. La cohésion de l’équipe fait toute la différence quand ça chauffe vraiment sur le terrain.',
            impact: { finances: 0, mental: 18, time: -4, passion: 14 },
          },
          {
            id: 'p4-c2',
            label: 'Demander l’activation de la cellule de soutien psychologique',
            tag: 'Prévention',
            consequence:
              'En 2035, ce n’est plus un tabou. Le débriefing collectif désamorce le stress post-traumatique de toute la garde.',
            impact: { finances: 0, mental: 20, time: -6, passion: 10 },
          },
          {
            id: 'p4-c3',
            label: 'Tout garder pour toi et enchaîner une garde supplémentaire payée',
            tag: 'Accumulation',
            consequence:
              'Ta fiche de paie grimpe grâce aux indemnités de garde, mais ton sommeil devient haché et tu deviens irritable chez toi.',
            impact: { finances: 18, mental: -20, time: -16, passion: -8 },
          },
        ],
      },
      {
        dayNumber: 5,
        dayName: 'Vendredi',
        timeContext: '16h00 · Fin de semaine · Choix de spécialisation',
        title: 'Évoluer ou s’user sur le terrain',
        narrative:
          'Ton chef de centre te convoque : un stage de spécialisation (GRIMP secours en milieu périlleux ou Sauvetage Aquatique / Drone) s’ouvre le mois prochain. Mais ça implique 3 semaines de formation physique et théorique intense loin de chez toi.',
        choices: [
          {
            id: 'p5-c1',
            label: 'Candidater au GRIMP (secours en hauteur & milieux extrêmes)',
            tag: 'Dépassement',
            consequence:
              'Tu es retenu ! Tes prochaines semaines seront sportives, mais tu accèdes aux interventions les plus techniques et stimulantes du métier.',
            impact: { finances: 10, mental: 6, time: -14, passion: 22 },
          },
          {
            id: 'p5-c2',
            label: 'Choisir la spécialité Télé-opérateur Drone & Risques Technologiques',
            tag: 'Futur 2035',
            consequence:
              'Excellent calcul : tu combines terrain et haute technologie, tout en préparant une évolution de carrière moins destructrice pour tes articulations.',
            impact: { finances: 12, mental: 12, time: -6, passion: 16 },
          },
          {
            id: 'p5-c3',
            label: 'Décliner pour cette année et profiter de tes jours de repos',
            tag: 'Vie Perso',
            consequence:
              'Avec le rythme des gardes de 24h, tu choisis de souffler et de retrouver tes proches ce week-end. Ton corps te dit merci.',
            impact: { finances: 0, mental: 16, time: 20, passion: 4 },
          },
        ],
      },
    ],
    realLifeSheet: {
      salaryJunior: '1 850 € à 2 250 € net / mois (primes de feu et gardes incluses)',
      salarySenior: '2 600 € à 3 600 € net / mois (sous-officier / officier + spécialités)',
      status2035: 'Métier indispensable et non délocalisable, en forte tension avec l’augmentation des risques climatiques et le secours à la personne.',
      darkSides: [
        'La fatigue nerveuse et physique : le bip qui sonne à 3h du matin brise les cycles de sommeil, et certaines interventions marquent à vie.',
        'La réalité statistique : plus de 80 % des sorties sont du secours à personne (malaises, accidents, détresse sociale), parfois face à de l’agressivité.',
      ],
      trueJoys: [
        'Un sens du métier imbattable : tu sais exactement pourquoi tu te lèves le matin, chaque garde a un impact concret sur des vies humaines.',
        'L’esprit de corps et le rythme des gardes (24h de garde suivies de 48h ou 72h de repos) qui offre de vraies plages de temps libre en semaine.',
      ],
      pathways: [
        {
          route: 'Concours de Caporal de Sapeurs-Pompiers Professionnels (SPP)',
          duration: 'Accessible dès 18 ans (niveau DNB / Bac conseillé) + 1 an de formation',
          realityTip: 'Le concours est très sélectif physiquement (Luc Léger, natation, parcours) et à l’oral : prépare-le 1 an à l’avance.',
        },
        {
          route: 'Devenir Sapeur-Pompier Volontaire (SPV) ou Jeune Sapeur-Pompier (JSP)',
          duration: 'En parallèle du lycée ou des études',
          realityTip: 'Le meilleur tremplin : 70 % des pompiers pros ont commencé comme volontaires et bénéficient du concours interne.',
        },
        {
          route: 'Brigade de Sapeurs-Pompiers de Paris (BSPP) ou Marins-Pompiers (BMPM)',
          duration: 'Statut militaire · Contrats de 3 à 5 ans renouvelables',
          realityTip: 'Recrutement continu toute l’année, formation d’excellence et opérationnalité ultra-rapide si tu as la condition physique.',
        },
      ],
      unfilteredVerdict:
        'On n’entre pas chez les pompiers pour le salaire ni pour jouer les héros de cinéma. On y entre parce qu’on déteste la routine de bureau, qu’on aime le sport, l’équipe, et qu’on veut être utile là où tout le monde recule.',
    },
  },
  {
    id: 'monteur-video',
    title: 'Monteur Vidéo & Réalisateur IA',
    category: 'Création & Médias',
    tagline: 'Faire ressentir une émotion en 0,4 seconde… ou recommencer 14 fois parce que le youtubeur veut « plus de peps ».',
    context2035:
      'En 2035, le dérushage et les sous-titres sont automatisés à 100 % en trois secondes. Ce qu’on achète chez toi, c’est le rythme narratif, la direction artistique, le sound design viscéral et la capacité à captiver un cerveau humain saturé.',
    initialGauges: {
      finances: 50,
      mental: 60,
      time: 50,
      passion: 75,
    },
    isOfflinePreset: true,
    days: [
      {
        dayNumber: 1,
        dayName: 'Lundi',
        timeContext: '10h00 · Timeline de 4 heures de rushs 8K',
        title: 'Le brief flou du créateur à 2 millions d’abonnés',
        narrative:
          'Ton client principal t’envoie 300 Go de rushs tournés en Islande avec un vocal de 12 secondes : « Fais un truc épique style documentaire Netflix mais avec le rythme TikTok, il me le faut pour mercredi midi. »',
        choices: [
          {
            id: 'm1-c1',
            label: 'Envoyer un montage test de 90 secondes avant de monter les 25 minutes',
            tag: 'Méthode Agile',
            consequence:
              'Bien vu : il adore l’étalonnage mais voulait une autre musique. Tu viens d’économiser 10 heures de modifications inutiles.',
            impact: { finances: 12, mental: 12, time: 6, passion: 10 },
          },
          {
            id: 'm1-c2',
            label: 'S’enfermer 16 heures dans le noir pour sortir une œuvre d’art d’un coup',
            tag: 'Perfectionniste',
            consequence:
              'Ton montage est sublime, mais il te demande de changer toute la structure narrative. Tu dois tout redécouper le cœur brisé.',
            impact: { finances: 8, mental: -18, time: -20, passion: -6 },
          },
          {
            id: 'm1-c3',
            label: 'Utiliser un preset automatique rapide et encaisser sans fioritures',
            tag: 'Rendement',
            consequence:
              'C’est propre mais générique. Le client valide faute de temps, mais tu sens que ta patte artistique s’endort.',
            impact: { finances: 14, mental: 4, time: 12, passion: -14 },
          },
        ],
      },
      {
        dayNumber: 2,
        dayName: 'Mardi',
        timeContext: '18h45 · Retours clients ("La V4_finale_def_bis")',
        title: 'La guerre des retours à la frame près',
        narrative:
          'Une marque sponsor de la vidéo demande 28 micro-modifications contradictoires : « Le logo doit être 40 % plus gros, mais sans faire publicitaire, et la musique plus calme mais plus dynamique. »',
        choices: [
          {
            id: 'm2-c1',
            label: 'Appliquer la clause du devis : au-delà de 2 allers-retours, c’est facturé',
            tag: 'Respect du contrat',
            consequence:
              'Miracle : dès que chaque retour supplémentaire coûte 250 €, l’équipe marketing réduit ses demandes de 28 à 3.',
            impact: { finances: 18, mental: 10, time: 4, passion: 8 },
          },
          {
            id: 'm2-c2',
            label: 'Proposer 2 versions A/B argumentées en expliquant la rétention d’audience',
            tag: 'Expert Storytelling',
            consequence:
              'Quand tu parles courbe de rétention et psychologie du spectateur, la marque te fait confiance et valide ta version créative.',
            impact: { finances: 12, mental: 6, time: -4, passion: 18 },
          },
          {
            id: 'm2-c3',
            label: 'S’exécuter en râlant jusqu’à 1h du matin',
            tag: 'Exécutant',
            consequence:
              'Le sponsor est content, mais la vidéo ressemble à un prospectus de supermarché et tu as mal aux cervicales.',
            impact: { finances: 8, mental: -16, time: -16, passion: -16 },
          },
        ],
      },
      {
        dayNumber: 3,
        dayName: 'Mercredi',
        timeContext: '13h15 · Studio · Nouvel outil de doublage & génération 2035',
        title: 'L’offre internationale inattendue',
        isUnexpected2035: true,
        unexpectedHeadline: 'ÉVÉNEMENT IMPRÉVU 2035 · Un studio américain repère ton showreel grâce au doublage neuronal',
        narrative:
          'Une chaîne documentaire internationale a vu ton dernier montage traduit automatiquement en 12 langues avec synchronisation labiale. Ils te proposent de monter leur série phare, payée en dollars (+50 %), mais avec des réunions à 21h heure française.',
        choices: [
          {
            id: 'm3-c1',
            label: 'Signer pour la saison complète et passer à la vitesse supérieure',
            tag: 'Ambition Globale',
            consequence:
              'Ton chiffre d’affaires décolle et ton nom apparaît au générique international. En revanche, tes soirées sont désormais calées sur le fuseau de Los Angeles.',
            impact: { finances: 26, mental: -12, time: -18, passion: 20 },
          },
          {
            id: 'm3-c2',
            label: 'Négocier un contrat sur 2 épisodes pilotes en communication asynchrone',
            tag: 'Équilibre malin',
            consequence:
              'Ils acceptent ! Tu livres tes montages via plateforme collaborative sans sacrifier tes soirées.',
            impact: { finances: 16, mental: 8, time: -4, passion: 16 },
          },
          {
            id: 'm3-c3',
            label: 'Décliner pour rester 100 % sur tes créateurs francophones habituels',
            tag: 'Zone de confort',
            consequence:
              'Aucun stress supplémentaire et tes soirées restent libres, mais tu laisses filer un sacré tremplin.',
            impact: { finances: 0, mental: 10, time: 12, passion: -6 },
          },
        ],
      },
      {
        dayNumber: 4,
        dayName: 'Jeudi',
        timeContext: '15h10 · Panne matérielle à 3h du rendu final',
        title: 'Le crash du disque SSD en plein export',
        narrative:
          'Sueur froide : ton projet principal refuse de s’ouvrir à cause d’un cache corrompu, trois heures avant la publication programmée. Ton client t’écrit : « Tout est bon pour 18h ? »',
        choices: [
          {
            id: 'm4-c1',
            label: 'Restaurer ta sauvegarde cloud automatique de 12h et refaire les 2 dernières heures',
            tag: 'Rigueur Pro',
            consequence:
              'Tu bénis ton système de double sauvegarde. Deux heures de sprint ultra-concentré et l’export part à 17h54.',
            impact: { finances: 8, mental: -6, time: -8, passion: 8 },
          },
          {
            id: 'm4-c2',
            label: 'Prévenir le client honnêtement et décaler la sortie à 20h',
            tag: 'Transparence',
            consequence:
              'Il préfère une vidéo impeccable à 20h qu’un export bâclé à 18h avec un bug audio. La confiance reste intacte.',
            impact: { finances: 4, mental: 6, time: -6, passion: 6 },
          },
          {
            id: 'm4-c3',
            label: 'Bricoler un export compressé à la va-vite sans vérifier le mixage son',
            tag: 'Précipitation',
            consequence:
              'La vidéo sort à l’heure… mais les 500 premiers commentaires signalent que la musique couvre la voix à la 4e minute. Aïe.',
            impact: { finances: -12, mental: -18, time: 4, passion: -16 },
          },
        ],
      },
      {
        dayNumber: 5,
        dayName: 'Vendredi',
        timeContext: '16h30 · Bilan de la semaine & Rétention',
        title: 'Le verdict des spectateurs',
        narrative:
          'Ta vidéo principale dépasse les 800 000 vues en 24h avec d’excellents commentaires sur la réalisation. Un festival de court-métrage local te propose aussi de monter un documentaire engagé ce week-end, très peu payé mais 100 % libre artistiquement.',
        choices: [
          {
            id: 'm5-c1',
            label: 'Accepter le docu engagé pour nourrir ta flamme de réalisateur',
            tag: 'Passion Pure',
            consequence:
              'Tu retrouves le plaisir brut du cinéma documentaire. Peu d’argent, moins de repos, mais une fierté immense.',
            impact: { finances: 2, mental: 6, time: -14, passion: 24 },
          },
          {
            id: 'm5-c2',
            label: 'Utiliser ce succès pour augmenter tes tarifs de 20 % auprès de tes clients',
            tag: 'Business',
            consequence:
              'Chiffres à l’appui, tes clients acceptent ta nouvelle grille tarifaire. Tu passes du statut d’exécutant à celui de partenaire clé.',
            impact: { finances: 20, mental: 10, time: 6, passion: 10 },
          },
          {
            id: 'm5-c3',
            label: 'Éteindre les écrans pendant 48h et aller voir de vrais paysages',
            tag: 'Déconnexion',
            consequence:
              'Tes yeux quittent enfin les courbes colorimétriques. Tu recharges ta créativité dans le monde réel.',
            impact: { finances: 0, mental: 20, time: 20, passion: 8 },
          },
        ],
      },
    ],
    realLifeSheet: {
      salaryJunior: '1 750 € à 2 200 € net / mois (salarié prod / intermittent / début freelance)',
      salarySenior: '3 200 € à 5 500 € net / mois (chef monteur, directeur créatif ou freelance établi)',
      status2035: 'Les monteurs « pousseurs de boutons » ont été remplacés par l’IA ; les vrais raconteurs d’histoires (storytellers) s’arrachent à prix d’or.',
      darkSides: [
        'La sédentarité extrême et les horaires à rallonge lors des rendus urgents (dos, yeux, poignets mis à rude épreuve).',
        'La concurrence mondiale féroce sur les montages basiques et la pression constante des algorithmes de rétention.',
      ],
      trueJoys: [
        'Le pouvoir magique du montage : transformer 4 heures de rushs chaotiques en une histoire qui donne des frissons.',
        'La variété des univers : travailler le lundi sur du sport extrême, le mercredi sur de la vulgarisation scientifique et le vendredi sur un court-métrage.',
      ],
      pathways: [
        {
          route: 'BTS Métiers de l’Audiovisuel (option Montage et Postproduction)',
          duration: '2 ans après le bac (public ou alternance)',
          realityTip: 'La formation publique de référence en France : gratuite, ultra reconnue par les boîtes de prod et les chaînes.',
        },
        {
          route: 'BUT MMI (Métiers du Multimédia et de l’Internet) ou écoles de cinéma',
          duration: '3 à 5 ans',
          realityTip: 'Polyvalent si tu veux aussi maîtriser le motion design, la prise de vue et la direction artistique.',
        },
        {
          route: 'Autodidacte avec Portfolio (DaVinci Resolve / Premiere / After Effects)',
          duration: '1 à 2 ans de pratique intensive',
          realityTip: 'Dans le web et chez les créateurs, personne ne te demandera ton diplôme : remonte 3 vidéos connues avec ton style et envoie-les.',
        },
      ],
      unfilteredVerdict:
        'Si tu détestes recommencer une séquence sur laquelle tu as passé 3 heures, ce métier va te rendre fou. Mais si tu as le sens du rythme, de la musique et du récit, tu ne verras jamais le temps passer.',
    },
  },
  {
    id: 'kinesitherapeute',
    title: 'Kinésithérapeute du Sport',
    category: 'Santé & Humain',
    tagline: 'Remettre les gens debout avec tes mains et ton cerveau… tout en gérant 18 patients par jour et la CPAM.',
    context2035:
      'En 2035, les capteurs biomécaniques connectés analysent chaque angle articulaire en temps réel. Mais quand un patient a peur de reposer le pied après une rupture des ligaments, c’est ton diagnostic clinique, ta pédagogie et ton énergie humaine qui font la guérison.',
    initialGauges: {
      finances: 58,
      mental: 65,
      time: 48,
      passion: 76,
    },
    isOfflinePreset: true,
    days: [
      {
        dayNumber: 1,
        dayName: 'Lundi',
        timeContext: '08h15 · Ton cabinet libéral · Salle de rééducation',
        title: 'Le marathon du lundi matin',
        narrative:
          'Sept patients s’enchaînent ce matin : une sportive pressée de reprendre le marathon trop tôt, un retraité adorable mais très bavard, et deux urgences de dos bloqué qui supplient pour un créneau entre midi et deux.',
        choices: [
          {
            id: 'k1-c1',
            label: 'Prendre un patient par demi-heure en individuel (qualité maximale)',
            tag: 'Éthique Soin',
            consequence:
              'Tes patients progressent vite et t’adorent. Tu gagnes un peu moins qu’en prenant 3 patients en même temps, mais tu es fier de ton travail.',
            impact: { finances: 10, mental: 10, time: 0, passion: 18 },
          },
          {
            id: 'k1-c2',
            label: 'Superviser 3 patients en parallèle sur le plateau technique + sauter la pause déj',
            tag: 'Rendement Max',
            consequence:
              'Grosse journée à 900 € de chiffre d’affaires, mais à 19h tu as la tête comme une citrouille et l’impression d’avoir travaillé à la chaîne.',
            impact: { finances: 22, mental: -18, time: -16, passion: -10 },
          },
          {
            id: 'k1-c3',
            label: 'Garder ta pause de 12h30 sacrée et proposer les urgences à ton associé',
            tag: 'Équilibre',
            consequence:
              'Tu manges au calme et fais 30 minutes de sport. Tu es frais et attentif pour tes patients de l’après-midi.',
            impact: { finances: 8, mental: 14, time: 10, passion: 8 },
          },
        ],
      },
      {
        dayNumber: 2,
        dayName: 'Mardi',
        timeContext: '14h00 · Bilan biomécanique d’un jeune espoir',
        title: 'Le patient qui croit que tu es magicien',
        narrative:
          'Un joueur de basket de 19 ans arrive avec une tendinite chronique. Il refuse de faire ses exercices de renforcement à la maison et veut uniquement « que tu le masses et que tu le fasses craquer » pour jouer son match samedi.',
        choices: [
          {
            id: 'k2-c1',
            label: 'Lui dire la vérité cash : sans exercices actifs, sa saison est finie dans 3 semaines',
            tag: 'Pédagogie Cash',
            consequence:
              'L’électrochoc fonctionne ! En lui montrant sa courbe de charge musculaire sur tablette, il comprend enfin et s’investit à 100 %.',
            impact: { finances: 10, mental: 8, time: 0, passion: 20 },
          },
          {
            id: 'k2-c2',
            label: 'Lui faire un massage passif pour éviter le conflit',
            tag: 'Facilité',
            consequence:
              'Il repart content sur le moment… mais reviendra blessé plus gravement dans quinze jours. Frustrant pour un vrai soignant.',
            impact: { finances: 10, mental: -8, time: 4, passion: -16 },
          },
          {
            id: 'k2-c3',
            label: 'Appeler son entraîneur pour adapter sa charge d’entraînement de la semaine',
            tag: 'Suivi Pro',
            consequence:
              'Le coach te remercie et te propose même de suivre toute l’équipe première la saison prochaine.',
            impact: { finances: 16, mental: 6, time: -8, passion: 18 },
          },
        ],
      },
      {
        dayNumber: 3,
        dayName: 'Mercredi',
        timeContext: '11h30 · Innovation Santé 2035',
        title: 'L’exosquelette de télé-rééducation à domicile',
        isUnexpected2035: true,
        unexpectedHeadline: 'ÉVÉNEMENT IMPRÉVU 2035 · La Sécu rembourse désormais le suivi kiné assisté par capteurs à domicile',
        narrative:
          'Une nouvelle réforme en 2035 permet de suivre tes patients à distance via des orthèses connectées entre deux séances au cabinet. Mais l’équipement coûte 6 000 € d’investissement initial et demande de repenser ton organisation.',
        choices: [
          {
            id: 'k3-c1',
            label: 'Investir dans 5 kits connectés pour suivre tes sportifs à distance',
            tag: 'Pionnier',
            consequence:
              'Investissement lourd aujourd’hui, mais tes patients respectent enfin leurs exercices quotidiens et ton cabinet devient la référence régionale.',
            impact: { finances: -8, mental: 6, time: 10, passion: 20 },
          },
          {
            id: 'k3-c2',
            label: 'Mutualiser l’achat avec 3 autres kinés du quartier',
            tag: 'Collectif',
            consequence:
              'Coût divisé par quatre et entraide sur le paramétrage. Intelligent et zéro stress financier.',
            impact: { finances: 10, mental: 12, time: 6, passion: 14 },
          },
          {
            id: 'k3-c3',
            label: 'Refuser la technologie et rester 100 % sur le soin manuel classique',
            tag: 'Tradition',
            consequence:
              'Tes patients âgés apprécient, mais plusieurs jeunes sportifs partent vers un centre plus équipé.',
            impact: { finances: -6, mental: 4, time: 4, passion: -6 },
          },
        ],
      },
      {
        dayNumber: 4,
        dayName: 'Jeudi',
        timeContext: '17h00 · Tournée à domicile & Paperasse',
        title: 'Les visites à domicile du jeudi après-midi',
        narrative:
          'Tu sors du cabinet pour trois visites à domicile chez des patients âgés qui ne peuvent plus se déplacer. Pour deux d’entre eux, tu es la seule personne à qui ils parlent de la journée. En rentrant, 45 minutes de télétransmissions CPAM et mutuelles t’attendent.',
        choices: [
          {
            id: 'k4-c1',
            label: 'Prendre le temps d’écouter tout en faisant travailler leur équilibre',
            tag: 'Humanité',
            consequence:
              'Tu rentres avec 30 minutes de retard, mais madame Moreau a retrouvé le sourire et réussit à marcher jusqu’à son balcon sans déambulateur.',
            impact: { finances: 8, mental: 12, time: -10, passion: 22 },
          },
          {
            id: 'k4-c2',
            label: 'Automatiser toute ta facturation avec un logiciel vocal pendant les trajets',
            tag: 'Organisation',
            consequence:
              'Tes bilans et facturations sont bouclés avant même de rentrer au cabinet. Ta soirée est 100 % libre.',
            impact: { finances: 12, mental: 14, time: 12, passion: 8 },
          },
          {
            id: 'k4-c3',
            label: 'Enchaîner au pas de course et faire ta compta à 22h devant la télé',
            tag: 'Surcharge',
            consequence:
              'Tu finis ta journée épuisé en pestant contre les rejets de mutuelles à 23h.',
            impact: { finances: 10, mental: -16, time: -16, passion: -8 },
          },
        ],
      },
      {
        dayNumber: 5,
        dayName: 'Vendredi',
        timeContext: '15h30 · Fin de semaine · Proposition d’un club pro',
        title: 'Le dilemme du vendredi',
        narrative:
          'Le club de rugby local te propose d’être le kiné officiel de l’équipe sur les déplacements du week-end. Ambiance vestiaire incroyable et prime intéressante, mais adieu un week-end sur deux.',
        choices: [
          {
            id: 'k5-c1',
            label: 'Négocier un roulement : 1 match sur 3 en binôme avec un confrère',
            tag: 'Compromis Idéal',
            consequence:
              'Tu vis l’adrénaline du terrain de haut niveau sans sacrifier tous tes week-ends.',
            impact: { finances: 14, mental: 12, time: -4, passion: 18 },
          },
          {
            id: 'k5-c2',
            label: 'Signer à 100 % pour tous les matchs de la saison',
            tag: 'Passion Sport',
            consequence:
              'Tu vis au rythme des victoires de l’équipe, mais tu enchaînes des semaines de 6 jours sans vraie coupure.',
            impact: { finances: 20, mental: -10, time: -20, passion: 18 },
          },
          {
            id: 'k5-c3',
            label: 'Finir ta semaine le vendredi à 16h et partir en week-end prolongé',
            tag: 'Liberté Libérale',
            consequence:
              'L’un des grands privilèges du libéral : tu organises ton planning sur 4 jours et demi et profites d’un long week-end.',
            impact: { finances: 0, mental: 18, time: 22, passion: 8 },
          },
        ],
      },
    ],
    realLifeSheet: {
      salaryJunior: '2 400 € à 3 200 € net / mois (assistant libéral ou salarié spécialisé)',
      salarySenior: '3 800 € à 6 000 € net / mois (titulaire cabinet libéral, après URSSAF/CARPIMKO et loyer)',
      status2035: 'Plein emploi absolu partout en France : tu choisis ta ville, ton quartier et tes horaires dès la sortie de l’école.',
      darkSides: [
        'La fatigue physique et relationnelle : être debout toute la journée et absorber la douleur ou le moral de 15 à 20 patients par jour demande une vraie hygiène de vie.',
        'La lourdeur administrative en libéral (cotisations URSSAF/CARPIMKO, gestion des impayés mutuelles, plafonnement des tarifs conventionnés).',
      ],
      trueJoys: [
        'Voir concrètement quelqu’un remarcher, reprendre son sport ou vivre sans douleur grâce à ton accompagnement.',
        'Une sécurité de l’emploi totale et la liberté d’organiser ton emploi du temps (beaucoup de kinés travaillent sur 4 jours ou 4 jours et demi).',
      ],
      pathways: [
        {
          route: '1 an d’université (PASS, L.AS ou Licence STAPS) + 4 ans en IFMK (Institut de Formation en Masso-Kinésithérapie)',
          duration: '5 ans après le bac (Diplôme d’État)',
          realityTip: 'La passerelle via STAPS est souvent plus concrète pour les profils sportifs que la voie médecine pure.',
        },
        {
          route: 'Études en Europe (Belgique, Espagne, Allemagne) puis reconnaissance du diplôme en France',
          duration: '4 à 5 ans',
          realityTip: 'Attention aux frais de scolarité dans les écoles privées (souvent 7 000 à 10 000 €/an) : vise les IFMK publics en priorité.',
        },
      ],
      unfilteredVerdict:
        'Oublie le cliché du « masseur » : un kiné moderne est un enquêteur du corps humain et un coach de rééducation. Si tu aimes le contact humain, le mouvement et l’autonomie, c’est une valeur sûre.',
    },
  },
];

export function findScenarioByQuery(query: string): JobScenario | undefined {
  const normalized = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (!normalized) return undefined;

  return OFFLINE_SCENARIOS.find((s) => {
    const titleNorm = s.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (titleNorm.includes(normalized) || normalized.includes(titleNorm)) return true;
    if (s.id === 'dev-independant' && (normalized.includes('dev') || normalized.includes('code') || normalized.includes('informat'))) return true;
    if (s.id === 'pompier-professionnel' && (normalized.includes('pompier') || normalized.includes('secours'))) return true;
    if (s.id === 'monteur-video' && (normalized.includes('monteur') || normalized.includes('video') || normalized.includes('cinema'))) return true;
    if (s.id === 'kinesitherapeute' && (normalized.includes('kine') || normalized.includes('sante') || normalized.includes('reeduc'))) return true;
    return false;
  });
}

export function buildLocalCustomScenario(rawTitle: string): JobScenario {
  const cleanTitle = rawTitle.trim() || 'Explorateur de Métier';
  const capitalized = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

  return {
    id: `custom-${Date.now()}`,
    title: capitalized,
    category: 'Simulation sur-mesure 2035',
    tagline: `La réalité du terrain en tant que ${capitalized} en 2035, loin des brochures papier glacé.`,
    context2035: `En 2035, le métier de ${capitalized} a profondément évolué avec les nouveaux outils numériques et les exigences écologiques. Les tâches répétitives sont assistées, mais la pression sur la qualité, l’humain et la prise de décision n’a jamais été aussi forte.`,
    initialGauges: {
      finances: 52,
      mental: 62,
      time: 52,
      passion: 72,
    },
    days: [
      {
        dayNumber: 1,
        dayName: 'Lundi',
        timeContext: '08h45 · Démarrage sur les chapeaux de roues',
        title: 'L’urgence du lundi matin',
        narrative: `À peine arrivé à ton poste de ${capitalized}, deux demandes prioritaires tombent en même temps : un dossier rentable mais ultra exigeant qui demande des heures supplémentaires, et une mission plus humaine où l’on compte vraiment sur ton expertise.`,
        choices: [
          {
            id: 'c1-1',
            label: 'Prendre les deux de front en sacrifiant ta soirée',
            tag: 'Surcharge & Cash',
            consequence:
              'Tu boucles tout avec brio et impressionnes tout le monde, mais tu rentres à 21h30 complètement vidé dès le lundi.',
            impact: { finances: 18, mental: -16, time: -18, passion: 6 },
          },
          {
            id: 'c1-2',
            label: 'Prioriser la mission qui a du sens et négocier le délai de l’autre',
            tag: 'Aplomb Pro',
            consequence:
              'Ton argumentation tient la route : on t’accorde 48h supplémentaires et tu fais un travail irréprochable.',
            impact: { finances: 10, mental: 10, time: 0, passion: 16 },
          },
          {
            id: 'c1-3',
            label: 'Choisir uniquement la mission la plus rentable et déléguer le reste',
            tag: 'Pragmatisme',
            consequence:
              'Financièrement très efficace, même si tu laisses la partie la plus intéressante du métier à un collègue.',
            impact: { finances: 16, mental: 6, time: 8, passion: -10 },
          },
        ],
      },
      {
        dayNumber: 2,
        dayName: 'Mardi',
        timeContext: '14h15 · Le clash entre la théorie et le terrain',
        title: 'Ce qu’on ne t’avait jamais appris à l’école',
        narrative: `En tant que ${capitalized}, tu fais face au grand classique du métier : un interlocuteur exige un résultat immédiat avec la moitié des moyens prévus, tout en t’expliquant comment faire ton travail.`,
        choices: [
          {
            id: 'c2-1',
            label: 'Poser tes limites techniques et expliquer clairement les risques',
            tag: 'Intégrité',
            consequence:
              'Moment de flottement, puis ton expertise s’impose. Tu évites une catastrophe annoncée.',
            impact: { finances: 10, mental: 12, time: 2, passion: 14 },
          },
          {
            id: 'c2-2',
            label: 'Bricoler une solution système D pour livrer coûte que coûte',
            tag: 'Système D',
            consequence:
              'Ça tient debout grâce à ton ingéniosité, mais le stress t’a coûté pas mal d’énergie nerveuse.',
            impact: { finances: 14, mental: -12, time: -8, passion: 6 },
          },
          {
            id: 'c2-3',
            label: 'Appliquer strictement la procédure standard sans faire de zèle',
            tag: 'Protection',
            consequence:
              'Tu es couvert et tu pars à l’heure pile, mais tu ressens une pointe de frustration face à l’inertie.',
            impact: { finances: 6, mental: 6, time: 12, passion: -12 },
          },
        ],
      },
      {
        dayNumber: 3,
        dayName: 'Mercredi',
        timeContext: '11h20 · Rupture technologique & Normes 2035',
        title: 'Le choc de 2035 dans ton secteur',
        isUnexpected2035: true,
        unexpectedHeadline: `ÉVÉNEMENT IMPRÉVU 2035 · Un nouvel assistant IA spécialisé bouscule le métier de ${capitalized}`,
        narrative: `Nouvelle secousse dans la profession : un système automatisé prend désormais en charge 40 % des opérations standards d’un ${capitalized}. Certains y voient une menace, d’autres un levier pour doubler leur valeur ajoutée.`,
        choices: [
          {
            id: 'c3-1',
            label: 'Maîtriser l’outil en 24h pour te concentrer sur la haute valeur humaine',
            tag: 'Adaptation 2035',
            consequence:
              'Tu gagnes 2 heures par jour sur les corvées répétitives et deviens la personne ressource de ton équipe.',
            impact: { finances: 16, mental: 6, time: 10, passion: 18 },
          },
          {
            id: 'c3-2',
            label: 'Miser sur le 100 % artisanal et l’accompagnement humain sur-mesure',
            tag: 'Authenticité',
            consequence:
              'Une clientèle fidèle cherche justement ce contact humain authentique que l’IA ne peut pas simuler.',
            impact: { finances: 8, mental: 12, time: -4, passion: 20 },
          },
          {
            id: 'c3-3',
            label: 'Subir le changement en continuant exactement comme avant',
            tag: 'Résistance',
            consequence:
              'Tu perds du temps sur des tâches désormais peu valorisées pendant que le secteur accélère.',
            impact: { finances: -12, mental: -14, time: -10, passion: -12 },
          },
        ],
      },
      {
        dayNumber: 4,
        dayName: 'Jeudi',
        timeContext: '16h40 · L’envers du décor administratif & relationnel',
        title: 'La face cachée que les influenceurs oublient de montrer',
        narrative: `Dans tout métier, il y a les 30 % de tâches ingrates : bilans réglementaires, gestion des imprévus logistiques ou tensions humaines à désamorcer en fin de journée.`,
        choices: [
          {
            id: 'c4-1',
            label: 'Créer une méthode carré pour boucler les corvées en 45 minutes',
            tag: 'Méthode',
            consequence:
              'La discipline paie : une fois la corvée expédiée proprement, tu retrouves ta liberté d’esprit.',
            impact: { finances: 10, mental: 10, time: 8, passion: 6 },
          },
          {
            id: 'c4-2',
            label: 'Accepter une mission bonus de dernière minute pour gonfler le mois',
            tag: 'Opportuniste',
            consequence:
              'La prime fait plaisir sur le compte en banque, mais la fatigue de la semaine commence à peser.',
            impact: { finances: 20, mental: -14, time: -16, passion: 4 },
          },
          {
            id: 'c4-3',
            label: 'Couper à 17h30 pour aller faire du sport et voir tes amis',
            tag: 'Respiration',
            consequence:
              'Tu laisses un dossier pour demain matin, mais ta santé mentale remonte en flèche.',
            impact: { finances: -4, mental: 18, time: 18, passion: 6 },
          },
        ],
      },
      {
        dayNumber: 5,
        dayName: 'Vendredi',
        timeContext: '17h00 · Le moment de vérité de la semaine',
        title: 'Pourquoi tu fais vraiment ce métier',
        narrative: `C’est vendredi soir. Le projet le plus complexe de ta semaine aboutit enfin, et on te propose déjà une évolution pour le trimestre prochain : plus de responsabilités et de revenus, ou plus d’autonomie sur tes projets de cœur.`,
        choices: [
          {
            id: 'c5-1',
            label: 'Viser l’autonomie et les projets à fort impact personnel',
            tag: 'Sens & Passion',
            consequence:
              'Tu termines la semaine avec le sentiment rare d’être exactement à ta place.',
            impact: { finances: 8, mental: 14, time: 6, passion: 22 },
          },
          {
            id: 'c5-2',
            label: 'Prendre la responsabilité supérieure pour accélérer ta carrière',
            tag: 'Ascension',
            consequence:
              'Un vrai saut financier et un nouveau statut, au prix d’une pression plus forte dès lundi prochain.',
            impact: { finances: 22, mental: -8, time: -12, passion: 12 },
          },
          {
            id: 'c5-3',
            label: 'Préserver ton rythme actuel et sanctuariser tes week-ends',
            tag: 'Sérénité',
            consequence:
              'Travailler pour vivre et non vivre pour travailler : tu fermes la porte avec le sourire.',
            impact: { finances: 4, mental: 18, time: 20, passion: 8 },
          },
        ],
      },
    ],
    realLifeSheet: {
      salaryJunior: '1 850 € à 2 450 € net / mois (début de carrière en France)',
      salarySenior: '3 100 € à 5 200 € net / mois (confirmé, spécialisé ou indépendant)',
      status2035: `En 2035, le métier de ${capitalized} valorise avant tout la capacité d’adaptation, le jugement humain et la maîtrise des outils augmentés.`,
      darkSides: [
        'Le décalage fréquent entre l’image idéalisée du métier sur les réseaux sociaux et la part incompressible de contraintes administratives, normatives ou relationnelles.',
        'La pression sur les délais et la nécessité de se former en continu pour ne pas se laisser distancer par les évolutions du secteur.',
      ],
      trueJoys: [
        'La fierté concrète du résultat accompli et la reconnaissance directe des personnes ou clients que tu aides au quotidien.',
        'La possibilité de te créer une spécialité rare qui te donne une vraie liberté de choix sur tes missions ou ton employeur.',
      ],
      pathways: [
        {
          route: 'Voie Courte & Terrain : BTS ou BUT spécialisé (souvent en alternance)',
          duration: '2 à 3 ans après le bac',
          realityTip: 'L’alternance te permet d’être payé pendant tes études et de vérifier très vite si le quotidien du métier te plaît.',
        },
        {
          route: 'Voie Approfondie : Licence Pro, Master Universitaire ou École spécialisée',
          duration: '3 à 5 ans après le bac',
          realityTip: 'Regarde toujours le taux d’insertion réel et privilégie les diplômes reconnus par l’État (RNCP / Grade Master).',
        },
        {
          route: 'Voie Pratique : Stages d’immersion (PMSMP), Bénévolat ou Projets concrets',
          duration: 'Dès le lycée / 1 semaine à 6 mois',
          realityTip: 'Contacte 3 professionnels sur LinkedIn ou dans ta ville pour passer une demi-journée avec eux : 9 sur 10 adorent partager la réalité de leur métier.',
        },
      ],
      unfilteredVerdict: `Le métier de ${capitalized} est fait pour toi si tu aimes résoudre de vrais problèmes sur le terrain plutôt que de réciter de la théorie. Le meilleur test : va observer un professionnel pendant une vraie journée chargée !`,
    },
  };
}

export const QUICK_JOB_SUGGESTIONS = [
  'Développeur Indépendant',
  'Pompier Professionnel',
  'Monteur Vidéo',
  'Kinésithérapeute',
  'Architecte Bioclimatique',
  'Chef Pâtissier',
  'Pilote de Drone Civil',
  'Infirmier·ère aux Urgences',
  'Vétérinaire Rural',
  'Ingénieur Cybersécurité',
  'Avocat Pénaliste',
  'Game Designer',
];
