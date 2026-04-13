// src/components/AnimatedCard.tsx
// Framer Motion wrappers for animated article cards and page sections.
// Import these instead of plain div/article elements for animated layouts.
//
// Usage:
//   import { FadeInSection, StaggerGrid, AnimatedCard, SlideInAlert } from './AnimatedCard'

import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode, HTMLAttributes } from 'react'

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0 0 rgba(0,0,0,0)' },
  hover: { scale: 1.015, boxShadow: '0 8px 32px rgba(0,0,0,0.35)', transition: { duration: 0.2 } },
}

const slideFromTop = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.25 } },
}

// ── Components ────────────────────────────────────────────────────────────────

/** Fade + slide up on scroll entry. Wraps any section element. */
export function FadeInSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: fadeIn.hidden,
        visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Staggered grid container — children animate in sequence. */
export function StaggerGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

/** Individual animated card (use inside StaggerGrid or standalone). */
export function AnimatedCard({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <motion.article
      className={className}
      variants={fadeIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      // @ts-ignore — motion variants don't conflict
      custom={cardHover}
      whileHover={{ scale: 1.012, transition: { duration: 0.18 } }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      {children}
    </motion.article>
  )
}

/** Alert/banner that slides down from the top. Use with AnimatePresence. */
export function SlideInAlert({
  children,
  className,
  show,
}: {
  children: ReactNode
  className?: string
  show: boolean
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={className}
          variants={slideFromTop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Number counter animation (e.g. for stats, temperatures). */
export function AnimatedNumber({
  value,
  suffix = '',
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  return (
    <motion.span
      key={value}
      className={className}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {value}{suffix}
    </motion.span>
  )
}

/** Pulse badge for BREAKING / LIVE / ALERT indicators. */
export function PulseBadge({
  children,
  color = '#ef4444',
}: {
  children: ReactNode
  color?: string
}) {
  return (
    <span className="relative inline-flex items-center gap-1">
      <motion.span
        className="absolute -inset-1 rounded-full opacity-30"
        style={{ background: color }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <span className="relative z-10 font-bold text-xs px-2 py-0.5 rounded-full text-white"
        style={{ background: color }}>
        {children}
      </span>
    </span>
  )
}

/** Flip card for trivia — reveals back on click. */
export function FlipCard({
  front,
  back,
  className,
}: {
  front: ReactNode
  back: ReactNode
  className?: string
}) {
  const [flipped, setFlipped] = (require('react') as typeof import('react')).useState(false)

  return (
    <div
      className={`cursor-pointer select-none ${className ?? ''}`}
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div style={{ backfaceVisibility: 'hidden' }}>{front}</div>
        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
          }}
        >
          {back}
        </div>
      </motion.div>
      <p className="text-center text-xs text-gray-600 mt-1">
        {flipped ? 'Click to flip back' : 'Click to reveal'}
      </p>
    </div>
  )
}
