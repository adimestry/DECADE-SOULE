/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Share2, ArrowRight } from 'lucide-react';
import { QUESTIONS, DECADE_MUSIC, Question, Option } from './constants';
import { analyzeQuizResults, DecadeResult } from './services/ai';
import { cn } from './lib/utils';
import ReactMarkdown from 'react-markdown';

type AppState = 'intro' | 'quiz' | 'analyzing' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; answer: string; color: string }[]>([]);
  const [result, setResult] = useState<DecadeResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startQuiz = () => setState('quiz');

  const handleAnswer = (option: Option) => {
    const newAnswers = [...answers, { 
      question: QUESTIONS[currentQuestion].text, 
      answer: option.text,
      color: option.color 
    }];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finalizeResults(newAnswers);
    }
  };

  const finalizeResults = async (finalAnswers: typeof answers) => {
    setState('analyzing');
    try {
      const gResult = await analyzeQuizResults(finalAnswers);
      setResult(gResult);
      setState('result');
    } catch (error) {
      console.error("AI Analysis failed:", error);
      // Fallback result for stability
      setResult({
        decade: '1960s',
        title: 'The Psychedelic Revolutionary',
        description: 'You are a child of the 60s, a time of radical change and experimental freedom.',
        cultural_refs: ['The Beatles', 'Woodstock', 'Pop Art'],
        why_you_match: 'Your answers reflect a desire for cultural disruption and communal energy.',
        colorScheme: { primary: '#D02020', accent: '#F0C020', bg: '#1040C0' }
      });
      setState('result');
    }
  };

  const resetQuiz = () => {
    setState('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (state === 'result' && result && audioRef.current) {
      audioRef.current.src = DECADE_MUSIC[result.decade] || DECADE_MUSIC['1920s'];
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      setIsPlaying(true);
    }
  }, [state, result]);

  return (
    <div className="min-h-screen bau-grid-bg relative font-sans selection:bg-bau-yellow selection:text-bau-black">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-bau-red rotate-45 transform-gpu" />
        <div className="absolute bottom-[20%] right-[-5%] w-[300px] h-[300px] bg-bau-blue rounded-full" />
        <div className="absolute top-[30%] right-[10%] w-[150px] h-[150px] bg-bau-yellow" />
      </div>

      <header className="relative z-10 p-6 flex justify-between items-center border-b-4 border-bau-black bg-bau-offwhite">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-bau-red" />
            <div className="w-6 h-6 bg-bau-yellow rounded-full" />
            <div className="w-6 h-6 bg-bau-blue" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">
            Decade<br/>Soul
          </h1>
        </div>
        {state === 'result' && (
          <button 
            onClick={toggleMusic}
            className="p-3 bg-bau-black text-bau-offwhite rounded-full hover:scale-110 active:scale-95 transition-transform shadow-[4px_4px_0px_#1040C0]"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        )}
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {state === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center md:text-left py-12 md:py-24"
            >
              <div className="mb-8">
                <span className="inline-block px-4 py-1 bg-bau-blue text-bau-offwhite font-bold text-sm mb-4">PERSONALITY X HISTORY</span>
                <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-bau-black mb-12">
                  WHICH <br/>
                  <span className="text-bau-red">DECADE</span> <br/>
                  ARE YOU?
                </h2>
                <p className="text-xl md:text-2xl font-bold max-w-2xl opacity-80 mb-12 leading-relaxed">
                  A 10-question Bauhaus-styled journey to reveal the chronological frequency of your spirit.
                </p>
              </div>
              <button onClick={startQuiz} className="bau-button group">
                Discover Your Decade
                <ArrowRight className="inline-block ml-4 transition-transform group-hover:translate-x-2" />
              </button>
            </motion.div>
          )}

          {state === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90 }}
              className="space-y-12"
            >
              {/* Progress Bar */}
              <div className="relative h-12 border-4 border-bau-black bg-white flex overflow-hidden">
                {QUESTIONS.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 border-r-2 last:border-r-0 border-bau-black transition-colors duration-500",
                      i < currentQuestion ? (i % 3 === 0 ? "bg-bau-red" : i % 3 === 1 ? "bg-bau-blue" : "bg-bau-yellow") : "bg-white",
                      i === currentQuestion && "bg-bau-offwhite animate-pulse"
                    )}
                  />
                ))}
              </div>

              <div className="space-y-8">
                <div className="bau-card bg-bau-black text-bau-offwhite">
                  <div className="absolute top-2 right-2 w-12 h-12 bg-bau-yellow rounded-full -mr-6 -mt-6" />
                  <span className="text-bau-yellow font-black text-2xl">0{currentQuestion + 1}</span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase mt-4 tracking-tight leading-tight">
                    {QUESTIONS[currentQuestion].text}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleAnswer(opt)}
                      className="bau-card group text-left flex flex-col justify-between min-h-[160px] cursor-pointer"
                    >
                      <div className={cn(
                        "absolute top-0 right-0 w-8 h-8",
                        opt.color === 'red' ? "bg-bau-red" : opt.color === 'blue' ? "bg-bau-blue" : "bg-bau-yellow"
                      )} />
                      <p className="text-xl font-bold group-hover:text-bau-blue transition-colors relative z-10">
                        {opt.text}
                      </p>
                      <div className="mt-4 flex justify-between items-end">
                        <span className="text-sm font-black opacity-30 select-none">OPTION_{opt.id.toUpperCase()}</span>
                        <div className="w-8 h-8 border-2 border-bau-black flex items-center justify-center group-hover:bg-bau-black group-hover:text-bau-offwhite transition-all">
                          {opt.id.toUpperCase()}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {state === 'analyzing' && (
            <motion.div 
              key="analyzing"
              className="fixed inset-0 z-50 bg-bau-black flex flex-col items-center justify-center space-y-12 text-bau-offwhite"
            >
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 border-w-[20px] border-bau-red rounded-full relative flex items-center justify-center"
              >
                <div className="w-32 h-32 bg-bau-blue rotate-45" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-12 bg-bau-yellow" />
              </motion.div>
              <h2 className="text-5xl font-black uppercase tracking-widest animate-pulse">
                Analyzing Soul Data...
              </h2>
            </motion.div>
          )}

          {state === 'result' && result && (
            <motion.div 
              key="result"
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(150% at 50% 50%)' }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              style={{ '--era-primary': result.colorScheme.primary, '--era-accent': result.colorScheme.accent, '--era-bg': result.colorScheme.bg } as any}
              className="space-y-16"
            >
              <div className="text-center relative py-12">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <span className="text-[15rem] md:text-[25rem] font-black leading-none select-none tracking-tighter uppercase">{result.decade}</span>
                </div>
                <span 
                  className="inline-block px-8 py-2 text-bau-offwhite font-black text-2xl uppercase mb-6 shadow-[8px_8px_0px_#121212]"
                  style={{ backgroundColor: result.colorScheme.primary }}
                >
                  The Reveal
                </span>
                <h2 className="text-7xl md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter mb-8 break-words px-4">
                  {result.decade}<br/>
                  <span style={{ color: result.colorScheme.accent }}>{result.title}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div className="bau-card bg-white">
                    <h3 
                      className="text-2xl font-black uppercase mb-4 border-b-4 border-bau-black inline-block"
                      style={{ color: result.colorScheme.primary }}
                    >
                      The Breakdown
                    </h3>
                    <p className="text-2xl font-bold leading-relaxed mb-6">
                      {result.description}
                    </p>
                    <div 
                      className="p-6 border-4 border-bau-black relative"
                      style={{ backgroundColor: result.colorScheme.bg, color: '#121212' }}
                    >
                       <span className="absolute -top-3 -right-3 bg-bau-black text-bau-offwhite px-2 py-1 text-xs font-black">WHY YOU?</span>
                       <p className="font-bold leading-snug italic">
                         "{result.why_you_match}"
                       </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {result.cultural_refs.map((ref, i) => (
                      <div key={i} className="bau-card text-center py-8">
                        <span className="text-sm font-black opacity-50 block mb-2 uppercase">ICON_0{i+1}</span>
                        <p className="text-xl font-black uppercase leading-tight">{ref}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div 
                    className="bau-card text-bau-offwhite min-h-[300px] flex flex-col justify-center items-center text-center"
                    style={{ backgroundColor: result.colorScheme.primary }}
                  >
                    <Share2 size={64} className="mb-6 animate-bounce" />
                    <h4 className="text-3xl font-black uppercase mb-4">Tell the World</h4>
                    <button 
                      onClick={() => {
                        const text = `I just found out my soul matches the ${result.decade}! I'm officially a "${result.title}". Take the quiz here: ${window.location.href}`;
                        if (navigator.share) {
                          navigator.share({ title: 'Decade Soul Quiz', text, url: window.location.href });
                        } else {
                          navigator.clipboard.writeText(text);
                          alert("Result copied to clipboard!");
                        }
                      }}
                      className="px-6 py-3 bg-white text-bau-black font-black uppercase border-2 border-bau-black shadow-[4px_4px_0px_#121212] hover:shadow-none translate-y-0 active:translate-y-1 transition-all"
                    >
                      Share Quiz
                    </button>
                  </div>

                  <button 
                    onClick={resetQuiz}
                    className="w-full flex items-center justify-center gap-4 py-6 text-bau-offwhite font-black uppercase border-4 border-bau-black shadow-[8px_8px_0px_#121212] hover:scale-[1.02] active:scale-95 transition-all"
                    style={{ backgroundColor: result.colorScheme.accent }}
                  >
                    <RotateCcw size={24} />
                    Retake Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="mt-24 p-12 border-t-4 border-bau-black flex flex-col md:flex-row justify-between items-center gap-8 bg-bau-offwhite relative z-10">
        <div className="text-center md:text-left space-y-4">
          <div>
            <p className="font-black text-sm uppercase opacity-50">EST. 1919 / BAUHAUS PROTOCOL</p>
            <p className="text-xs font-bold leading-tight max-w-xs mt-2 italic opacity-40">
              Form follows function. The chronology of the soul is non-linear but design-dependent.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Architects of this Soul</span>
            <div className="flex gap-4 font-black text-sm uppercase">
              <span className="opacity-40">Build by</span>
              <div className="group relative">
                <button className="hover:text-bau-red transition-colors cursor-pointer decoration-bau-red decoration-2 underline-offset-4 underline">Aditya</button>
                <div className="absolute bottom-full left-0 mb-4 hidden group-hover:block w-48 bau-card bg-white p-4 z-20 shadow-[4px_4px_0px_#D02020]">
                  <div className="space-y-2">
                    <a href="https://github.com/adimestry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-bau-red hover:text-white p-1 transition-colors">
                      <span className="text-[10px] bg-bau-black text-white px-1">GH</span> GitHub
                    </a>
                    <a href="https://www.instagram.com/aditya_mestry_x007/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-bau-red hover:text-white p-1 transition-colors">
                      <span className="text-[10px] bg-bau-black text-white px-1">IG</span> Instagram
                    </a>
                  </div>
                  <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-r-4 border-b-4 border-bau-black rotate-45" />
                </div>
              </div>
              <span className="opacity-40">and</span>
              <div className="group relative">
                <button className="hover:text-bau-blue transition-colors cursor-pointer decoration-bau-blue decoration-2 underline-offset-4 underline">Dhruv</button>
                <div className="absolute bottom-full left-0 mb-4 hidden group-hover:block w-48 bau-card bg-white p-4 z-20 shadow-[4px_4px_0px_#1040C0]">
                  <div className="space-y-2">
                    <a href="https://github.com/dhruvkasar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-bau-blue hover:text-white p-1 transition-colors">
                      <span className="text-[10px] bg-bau-black text-white px-1">GH</span> GitHub
                    </a>
                    <a href="https://www.instagram.com/dhruvvkasar/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:bg-bau-blue hover:text-white p-1 transition-colors">
                      <span className="text-[10px] bg-bau-black text-white px-1">IG</span> Instagram
                    </a>
                  </div>
                  <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-r-4 border-b-4 border-bau-black rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-bau-black" />
          <div className="w-12 h-12 bg-bau-red rounded-full" />
          <div className="w-12 h-12 bg-bau-blue" style={{ clipPath: 'circle(50% at 50% 50%)' }} />
          <div className="w-12 h-12 bg-bau-yellow" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>
      </footer>

      <audio ref={audioRef} loop />
    </div>
  );
}

