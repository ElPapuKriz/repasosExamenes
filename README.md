# Repasa — Asistente de examenes con IA

Convierte tus apuntes (PDF, DOCX, PPTX) en un quiz de repaso personalizado, con preguntas
abiertas y cerradas, corrección al instante y estadísticas de tu evolución.

---

## 1. Instalación

### 1.1 Paquetes a instalar

Desde la raíz de tu proyecto (asumo que usas **Vite**, que es el setup estándar hoy para
"React + TSX + Tailwind"; si en realidad usas Next.js o Create React App, avísame y ajusto
las instrucciones):

```bash
npm install zustand lucide-react motion recharts mammoth pdfjs-dist jszip react-router-dom
```

Qué hace cada uno:

| Paquete | Para qué |
|---|---|
| `zustand` | Estado global simple (sesión de subida + biblioteca persistida en localStorage) |
| `lucide-react` | Iconos |
| `motion` | Animaciones (antes se llamaba `framer-motion`; el paquete se renombró, la API es igual) |
| `recharts` | Gráfico de evolución de puntajes |
| `mammoth` | Extraer texto de archivos `.docx` |
| `pdfjs-dist` | Extraer texto de archivos `.pdf` |
| `jszip` | Extraer texto de archivos `.pptx` (un pptx es un zip de XML) |
| `react-router-dom` | Rutas — si ya lo tienes instalado, no hace falta reinstalarlo |

Si tu proyecto ya usa React Router v7 con el paquete unificado `react-router` en lugar de
`react-router-dom`, solo cambia los imports `from 'react-router-dom'` por
`from 'react-router'` en los archivos de `components/layout` y `pages` — el resto del código
no cambia.

### 1.2 Conectar la IA (Puter.js, sin API keys)

Agrega este script en el `<head>` de tu `index.html`:

```html
<script src="https://js.puter.com/v2/"></script>
```

Con eso ya tienes acceso a modelos de OpenAI, Claude, Gemini y más de 400 modelos, **sin
crear cuenta, sin pegar ninguna API key y sin backend**. Cada usuario final paga su propio
uso a través de su cuenta de Puter (se le pedirá iniciar sesión con Puter la primera vez que
la app llame a la IA) — así que a ti como desarrollador no te cuesta nada correr la app, ni
tienes que rotar keys nunca. Es exactamente lo que buscabas.

### 1.3 Tailwind — agrega esto a tu `tailwind.config`

```ts
theme: {
  extend: {
    colors: {
      bg: '#F6F4FB',
      ink: '#23213B',
      primary: {
        DEFAULT: '#6C63FF',
        dark: '#4B3FE0',
      },
      'accent-warm': '#FFB84D',
      success: '#34C77B',
      danger: '#FF6B81',
    },
    fontFamily: {
      display: ['Fredoka', 'sans-serif'],
      body: ['"Plus Jakarta Sans"', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },
    boxShadow: {
      soft: '0 8px 30px -12px rgba(35, 33, 59, 0.18)',
    },
  },
},
```

### 1.4 Copiar los archivos

Copia toda la carpeta `src/` de este entregable dentro de tu `src/` actual (fusiona, no
reemplaces si ya tienes archivos con el mismo nombre). Luego, tu `main.tsx` debe quedar así
de simple:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`App.tsx` ya incluye el `BrowserRouter`, así que no lo envuelvas de nuevo en `main.tsx`.

---

## 2. Cómo está organizado el código

```
src/
  types/quiz.types.ts       → todas las formas de datos (Question, Quiz, Attempt, Config)
  lib/ai/                   → prompts + adaptador de Puter.js (fácil de cambiar de IA)
  lib/parsing/              → un parser por formato (pdf, docx, pptx) + un dispatcher
  lib/utils/                → helpers pequeños y puros (cn, ids, matemática del quiz)
  store/                    → useSessionStore (subida en curso) y useLibraryStore (persistido)
  hooks/                    → la lógica de cada pantalla, separada de la UI
  components/               → un componente = una responsabilidad, sin lógica de negocio
  pages/                    → arman componentes + hooks para cada ruta
  App.tsx                   → rutas
```

La idea detrás de esta separación: si mañana quieres cambiar de Puter.js a otra IA, tocas
**solo** `lib/ai/`. Si quieres cambiar de localStorage a un backend real, tocas **solo**
`store/useLibraryStore.ts`. Ningún componente de UI sabe de dónde viene la IA ni dónde se
guardan los datos.

### El flujo

`/` (subir archivos) → `/configurar` (título + cantidad + balance abierta/cerrada + tiempo)
→ se genera el quiz y se guarda automáticamente en la biblioteca → `/quiz/:id` (resolver) →
`/resultados/:attemptId` (puntaje + revisión) → `/biblioteca` y `/estadisticas` en cualquier
momento.

### El elemento visual de firma

Cada tarjeta (`Card.tsx`) tiene una pestañita de color arriba a la izquierda, como una ficha
de estudio (index card). Se repite en la zona de subida, en cada pregunta, en los resultados
y en la biblioteca — es el hilo visual que conecta "tus apuntes se convierten en fichas de
repaso" en toda la app.

---

## 3. Ideas para seguir mejorando

En orden de impacto que le veo para un asistente de examenes:

1. **Repetición espaciada (spaced repetition):** guardar qué preguntas fallaste y
   priorizarlas en el siguiente quiz del mismo tema (algoritmo tipo Leitner o SM-2).
2. **Modo flashcards:** antes del quiz, un paso opcional de repaso rápido tipo tarjeta con
   pregunta/respuesta, sin calificar, solo para memorizar.
3. **Dificultad adaptativa:** si el usuario acierta varias seguidas, la siguiente pregunta
   sube de dificultad (esto lo puede decidir la misma IA con el historial de respuestas).
4. **Racha de estudio (streaks) y logros:** motivación tipo Duolingo — días seguidos
   repasando, insignias por temas dominados.
5. **Modo oscuro:** con los tokens de color ya centralizados en Tailwind, es una extensión
   directa (agregar variantes `dark:`).
6. **Exportar resultados a PDF** o compartir el puntaje con un link.
7. **Preguntas con imágenes:** si detectas diagramas o gráficos en el PDF/PPTX, extraerlos
   (con `pdfjs-dist` ya se pueden sacar imágenes de página) y generar preguntas sobre ellos.
8. **Accesibilidad de entrada:** dictado por voz para las preguntas abiertas (Web Speech
   API), útil para quien prefiere hablar la respuesta.
9. **Comparar dos intentos del mismo quiz** lado a lado, para ver qué mejoró exactamente.
10. **Recordatorios de repaso:** notificación o recordatorio en el calendario según la curva
    del olvido, usando la fecha del último intento guardado.

Si quieres, en un siguiente paso puedo construir cualquiera de estas — la que más valor le
daría a tu caso de uso real es probablemente **repetición espaciada**, porque es el único
punto que realmente mejora qué tan bien retienes el contenido, no solo qué tan bonito se ve.

---

## 4. Supuestos que hice (corrígeme si alguno está mal)

- Que tu proyecto usa **Vite** (afecta cómo se resuelve el worker de `pdfjs-dist` y cómo se
  importan los estilos).
- Que usas **Tailwind v3** con `tailwind.config.ts/js` clásico (si ya migraste a Tailwind v4
  con `@theme` en CSS, dime y te paso los tokens en ese formato en vez del `extend`).
- Que tu router está instalado como `react-router-dom` (ver nota de la sección 1.1 si en
  realidad es el paquete unificado `react-router` v7).

Cualquier cosa que no encaje con tu setup real, dímelo y lo ajusto.
