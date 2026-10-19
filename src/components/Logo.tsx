import { Link } from 'react-router-dom'

const SRC = {
  gold: '/brand/logo-gold.png',
  navy: '/brand/logo-navy.png',
  white: '/brand/logo-white.png',
} as const

export function Logo({
  variant = 'gold',
  compact = false,
}: {
  variant?: keyof typeof SRC
  compact?: boolean
}) {
  return (
    <Link
      to="/"
      className={`brand brand--${variant}${compact ? ' brand--compact' : ''}`}
      aria-label="Lakaaz Lamer home"
    >
      <img
        className="brand__logo"
        src={SRC[variant]}
        alt="Lakaaz Lamer · Fresh Seafood & Restaurant"
      />
    </Link>
  )
}
