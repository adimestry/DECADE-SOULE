# Decade Soul: A Bauhaus Quiz

![Decade Soul Banner](https://images.unsplash.com/photo-1510519133417-c0573dc0bdad?auto=format&fit=crop&q=80&w=2070)

**Decade Soul** is an avant-garde personality assessment that reveals the chronological frequency of your spirit. Inspired by the **Bauhaus** movement, this quiz combines modern structural aesthetics with cutting-edge AI analysis to map your preferences, desires, and sensory cravings to a specific decade from the 20th or early 21st century.

## ✨ Features

- **Geometric Journey**: A 10-question immersion designed with Bauhaus principles—form follows function, and every choice matters.
- **AI-Powered Soul Mapping**: Utilizes Google's **Gemini 1.5 Flash** to analyze your quiz results, providing a deep cultural breakdown of your "Decade Soul."
- **Generative Design**: Each result state dynamically updates the application's color palette and typography to reflect your decade.
- **Era-Specific Soundscapes**: Accompanies your result with a thematic soundtrack (1920s Jazz, 60s Psych-Rock, 80s Synth, etc.).
- **High-Performance UI**: Built with React 19, Tailwind CSS 4, and Framer Motion for buttery-smooth transitions and bold, expressive layouts.

## 🎨 Bauhaus Aesthetic

The application is built on a "strict-yet-vibrant" design system:
- **Primary Palette**: Red (`#D02020`), Blue (`#1040C0`), and Yellow (`#F0C020`).
- **Typography**: Bold, tight-tracked **Outfit** font, echoing the geometric precision of New Typography.
- **Layout**: Grid-based backgrounds, heavy borders, and shadow-casting blocks.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **AI Integration**: Google Generative AI (@google/genai)
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- A **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Environment Variables
Create a `.env` file in the root directory and add your API key:
```env
GEMINI_API_KEY="your_api_key_here"
```

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## 🧠 Behind the Logic

The quiz answers are fed into a structured prompt that asks Gemini to consider:
1. **Sensory Preferences** (Sound, Sight, Texture)
2. **Technological Affinity** (Analog precision vs. Digital borderless)
3. **Philosophical Outlook** (Optimism, Rebellion, Logical Structure)

The AI then synthesizes these points into a comprehensive report including a personalized title, era description, and cultural references (icons like The Beatles, pop art, or space-age designers).

---

Created with ⬛ 🔴 🔵 at Google AI Studio Build.
