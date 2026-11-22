import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY non configurée sur le serveur.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.post('/api/generate-job', async (req, res) => {
  try {
    const { jobTitle } = req.body as { jobTitle?: string };
    if (!jobTitle || typeof jobTitle !== 'string' || !jobTitle.trim()) {
      return res.status(400).json({ error: 'Veuillez indiquer un nom de métier.' });
    }

    const cleanJob = jobTitle.trim().slice(0, 80);
    const ai = getGenAIClient();

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Génère un scénario RPG textuel complet sur 5 jours (Lundi à Vendredi) en l'an 2035 en France pour le métier : "${cleanJob}".
Le joueur est un lycéen projeté en 2035 dans la vraie vie de ce métier, sans langue de bois ni ton moralisateur ou scolaire (style BitLife / Reigns : direct, concret, lucide, légèrement complice).
Règles obligatoires :
- 5 jours exactement : Jour 1 (Lundi), Jour 2 (Mardi), Jour 3 (Mercredi), Jour 4 (Jeudi), Jour 5 (Vendredi).
- Au Jour 3 (Mercredi), isUnexpected2035 doit être true avec un unexpectedHeadline percutant (ex: "ÉVÉNEMENT IMPRÉVU 2035 · ...") décrivant un choc réaliste de 2035 (IA, climat, panne, opportunité internationale, réforme).
- Chaque jour propose exactement 3 choix tactiques réalistes avec des impacts variés entre -22 et +24 sur finances, mental, time, passion.
- En fin de partie, remplis realLifeSheet avec les vrais salaires nets mensuels en France (débutant vs confirmé), les 2 vrais points noirs du métier, les 2 vrais kiffs, et 3 voies d'accès concrètes en France (BTS/BUT, Université/Écoles, Alternance/Terrain).`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            tagline: { type: Type.STRING },
            context2035: { type: Type.STRING },
            initialGauges: {
              type: Type.OBJECT,
              properties: {
                finances: { type: Type.INTEGER },
                mental: { type: Type.INTEGER },
                time: { type: Type.INTEGER },
                passion: { type: Type.INTEGER },
              },
              required: ['finances', 'mental', 'time', 'passion'],
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  dayName: { type: Type.STRING },
                  timeContext: { type: Type.STRING },
                  title: { type: Type.STRING },
                  narrative: { type: Type.STRING },
                  isUnexpected2035: { type: Type.BOOLEAN },
                  unexpectedHeadline: { type: Type.STRING },
                  choices: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        label: { type: Type.STRING },
                        tag: { type: Type.STRING },
                        consequence: { type: Type.STRING },
                        impact: {
                          type: Type.OBJECT,
                          properties: {
                            finances: { type: Type.INTEGER },
                            mental: { type: Type.INTEGER },
                            time: { type: Type.INTEGER },
                            passion: { type: Type.INTEGER },
                          },
                          required: ['finances', 'mental', 'time', 'passion'],
                        },
                      },
                      required: ['id', 'label', 'tag', 'consequence', 'impact'],
                    },
                  },
                },
                required: ['dayNumber', 'dayName', 'timeContext', 'title', 'narrative', 'choices'],
              },
            },
            realLifeSheet: {
              type: Type.OBJECT,
              properties: {
                salaryJunior: { type: Type.STRING },
                salarySenior: { type: Type.STRING },
                status2035: { type: Type.STRING },
                darkSides: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                trueJoys: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                pathways: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      route: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      realityTip: { type: Type.STRING },
                    },
                    required: ['route', 'duration', 'realityTip'],
                  },
                },
                unfilteredVerdict: { type: Type.STRING },
              },
              required: [
                'salaryJunior',
                'salarySenior',
                'status2035',
                'darkSides',
                'trueJoys',
                'pathways',
                'unfilteredVerdict',
              ],
            },
          },
          required: ['title', 'category', 'tagline', 'context2035', 'initialGauges', 'days', 'realLifeSheet'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      return res.status(502).json({ error: 'Réponse vide du modèle Gemini.' });
    }

    const parsed = JSON.parse(text);
    return res.json({
      id: `ai-${Date.now()}`,
      ...parsed,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erreur lors de la génération du métier.';
    console.error('Error in /api/generate-job:', errMsg);
    return res.status(500).json({ error: errMsg });
  }
});

async function startServer() {
  const PORT = 3000;
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
