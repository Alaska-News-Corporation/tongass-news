// src/components/AlaskaHistoryWidget.tsx
// Interactive Alaska History & Trivia sidebar widget
// Shows "On This Day in Alaska History" + cycling trivia facts
// Props:
//   siteSlug — identifies the site for region-specific content
//   accentColor — CSS color string for brand theming
//   mode — 'sidebar' (compact) | 'full' (expanded with quiz)

import { useState, useEffect, useCallback } from 'react'
import {
  alaskaHistory,
  getOnThisDayEntries,
  getRandomTrivia,
  type AlaskaHistoryEntry,
  type HistoryRegion,
} from '../data/alaskaHistory'

// Map site slugs to their primary region
const SITE_REGIONS: Record<string, HistoryRegion> = {
  'kenai-news':              'kenai',
  'anchorage-chronicle':     'anchorage',
  'tongass-news':            'southeast',
  'alcan-news':              'interior',
  'chugach-news':            'valdez',
  'alaska-gold-news':        'nome',
  'alaska-fires':            'statewide',
  'alaska-newspage':         'statewide',
  'alaska-news-corporation': 'statewide',
}

const CATEGORY_LABELS: Record<string, string> = {
  'gold-rush':      '⛏ Gold Rush',
  'native-history': '🦅 Native History',
  'statehood':      '⭐ Statehood',
  'exploration':    '🧭 Exploration',
  'disaster':       '⚡ Disaster',
  'wildlife':       '🐻 Wildlife',
  'industry':       '🛢 Industry',
  'military':       '🎖 Military',
  'culture':        '🌌 Culture',
}

interface Props {
  siteSlug: string
  accentColor?: string
  mode?: 'sidebar' | 'full'
}

interface QuizState {
  entry: AlaskaHistoryEntry
  question: string
  options: string[]
  correctIndex: number
  answered: number | null
}

function buildQuiz(entry: AlaskaHistoryEntry): QuizState {
  const correctYear = Math.abs(entry.year)
  // Two plausible wrong years
  const offset1 = entry.year > 0 ? entry.year - (8 + Math.floor(Math.random() * 15)) : entry.year + 1000
  const offset2 = entry.year > 0 ? entry.year + (5 + Math.floor(Math.random() * 12)) : entry.year + 5000
  const options = [String(correctYear), String(Math.abs(offset1)), String(Math.abs(offset2))]
    .sort(() => Math.random() - 0.5)
  return {
    entry,
    question: `When did "${entry.title}" occur?`,
    options,
    correctIndex: options.indexOf(String(correctYear)),
    answered: null,
  }
}

export default function AlaskaHistoryWidget({ siteSlug, accentColor = '#2563eb', mode = 'sidebar' }: Props) {
  const region = SITE_REGIONS[siteSlug] ?? 'statewide'
  const [onThisDay, setOnThisDay] = useState<AlaskaHistoryEntry[]>([])
  const [triviaPool, setTriviaPool] = useState<AlaskaHistoryEntry[]>([])
  const [triviaIndex, setTriviaIndex] = useState(0)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [triviaVisible, setTriviaVisible] = useState(true)

  useEffect(() => {
    setOnThisDay(getOnThisDayEntries(new Date(), 2))
    setTriviaPool(getRandomTrivia(10, region))
  }, [region])

  // Auto-cycle trivia every 10 seconds
  useEffect(() => {
    if (triviaPool.length === 0) return
    const interval = setInterval(() => {
      setTriviaVisible(false)
      setTimeout(() => {
        setTriviaIndex(i => (i + 1) % triviaPool.length)
        setTriviaVisible(true)
      }, 400)
    }, 10000)
    return () => clearInterval(interval)
  }, [triviaPool])

  const currentTrivia = triviaPool[triviaIndex]

  const handleNextTrivia = useCallback(() => {
    setTriviaVisible(false)
    setTimeout(() => {
      setTriviaIndex(i => (i + 1) % triviaPool.length)
      setTriviaVisible(true)
    }, 300)
  }, [triviaPool.length])

  const handleStartQuiz = useCallback(() => {
    const entry = triviaPool[Math.floor(Math.random() * triviaPool.length)]
    if (entry) {
      setQuiz(buildQuiz(entry))
      setShowQuiz(true)
    }
  }, [triviaPool])

  const handleAnswer = (idx: number) => {
    if (!quiz || quiz.answered !== null) return
    setQuiz(q => q ? { ...q, answered: idx } : q)
  }

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  return (
    <div className="space-y-4">
      {/* ── On This Day ──────────────────────────────────────────── */}
      {onThisDay.length > 0 && (
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: `${accentColor}40`, background: 'rgba(0,0,0,0.4)' }}
        >
          <div
            className="px-4 py-2 flex items-center gap-2"
            style={{ background: `${accentColor}20`, borderBottom: `1px solid ${accentColor}30` }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
              📅 On This Day — {dateStr}
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {onThisDay.map(entry => (
              <div key={entry.id} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: `${accentColor}20`, color: accentColor }}
                  >
                    {CATEGORY_LABELS[entry.category] ?? entry.category} · {Math.abs(entry.year)}
                    {entry.year < 0 ? ' BCE' : ''}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1 leading-tight">{entry.title}</h4>
                <p
                  className={`text-gray-400 text-xs leading-relaxed transition-all duration-300 ${
                    expanded === entry.id ? '' : 'line-clamp-3'
                  }`}
                >
                  {entry.description}
                </p>
                <button
                  onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                  className="text-xs mt-1 hover:underline"
                  style={{ color: accentColor }}
                >
                  {expanded === entry.id ? 'Show less ↑' : 'Read more ↓'}
                </button>
                {expanded === entry.id && (
                  <div
                    className="mt-3 p-3 rounded-lg border text-xs italic text-gray-300"
                    style={{ borderColor: `${accentColor}30`, background: `${accentColor}10` }}
                  >
                    <span className="font-bold not-italic" style={{ color: accentColor }}>Did you know?</span>{' '}
                    {entry.trivia}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Trivia Carousel ─────────────────────────────────────── */}
      {currentTrivia && (
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: `${accentColor}40`, background: 'rgba(0,0,0,0.4)' }}
        >
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ background: `${accentColor}20`, borderBottom: `1px solid ${accentColor}30` }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
              🧠 Alaska Trivia
            </span>
            <button
              onClick={handleStartQuiz}
              className="text-xs font-medium px-2 py-0.5 rounded border transition-colors hover:opacity-80"
              style={{ borderColor: `${accentColor}60`, color: accentColor }}
            >
              Quiz Me
            </button>
          </div>

          <div
            className="p-4 transition-opacity duration-400"
            style={{ opacity: triviaVisible ? 1 : 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs px-2 py-0.5 rounded font-semibold"
                style={{ background: `${accentColor}20`, color: accentColor }}
              >
                {CATEGORY_LABELS[currentTrivia.category]} · {Math.abs(currentTrivia.year)}
                {currentTrivia.year < 0 ? ' BCE' : ''}
              </span>
            </div>
            <p className="text-white text-sm font-semibold mb-2 leading-tight">{currentTrivia.title}</p>
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{currentTrivia.trivia}</p>
          </div>

          <div className="px-4 pb-3 flex items-center justify-between">
            <span className="text-gray-600 text-xs">
              {triviaIndex + 1} / {triviaPool.length}
            </span>
            <button
              onClick={handleNextTrivia}
              className="text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: accentColor }}
            >
              Next fact →
            </button>
          </div>
        </div>
      )}

      {/* ── Quiz Modal ─────────────────────────────────────────── */}
      {showQuiz && quiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl"
            style={{ borderColor: `${accentColor}60`, background: '#0f1117' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                Alaska History Quiz
              </span>
              <button
                onClick={() => setShowQuiz(false)}
                className="text-gray-500 hover:text-white text-lg leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-gray-400 text-xs mb-1">{CATEGORY_LABELS[quiz.entry.category]}</p>
            <h3 className="text-white font-bold text-base mb-4 leading-tight">{quiz.question}</h3>

            <div className="space-y-2 mb-4">
              {quiz.options.map((opt, idx) => {
                const isCorrect = idx === quiz.correctIndex
                const isAnswered = quiz.answered !== null
                const isSelected = quiz.answered === idx
                let cls = 'w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all'
                if (!isAnswered) {
                  cls += ' border-gray-700 text-gray-300 hover:border-opacity-60'
                } else if (isCorrect) {
                  cls += ' border-green-500 bg-green-500/20 text-green-300'
                } else if (isSelected) {
                  cls += ' border-red-500 bg-red-500/20 text-red-300'
                } else {
                  cls += ' border-gray-700 text-gray-500'
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleAnswer(idx)}
                    style={!isAnswered ? { borderColor: `${accentColor}40` } : undefined}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {quiz.answered !== null && (
              <div>
                <p className={`text-sm font-bold mb-2 ${quiz.answered === quiz.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                  {quiz.answered === quiz.correctIndex ? '✓ Correct!' : '✗ Not quite.'}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{quiz.entry.trivia}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const entry = triviaPool[Math.floor(Math.random() * triviaPool.length)]
                      if (entry) setQuiz(buildQuiz(entry))
                    }}
                    className="flex-1 py-2 rounded-lg text-sm font-bold transition-colors"
                    style={{ background: accentColor, color: '#000' }}
                  >
                    Next Question
                  </button>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-4 py-2 rounded-lg text-sm border border-gray-700 text-gray-400 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
