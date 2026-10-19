import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { copy, PHONE_TEL } from '../data/content'
import { useLang } from '../context/Language'
import { Logo } from './Logo'

const links = [
  { to: '/', key: 'home' as const },
  { to: '/menu', key: 'menu' as const },
  { to: '/story', key: 'story' as const },
  { to: '/gallery', key: 'gallery' as const },
  { to: '/reserve', key: 'reserve' as const },
]

export function Header() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled || open ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__bar">
        <Logo variant="gold" />
        <nav className="nav-desktop" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}>
              {t(copy.nav[link.key])}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <div className="lang" role="group" aria-label="Language">
            <button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>
              EN
            </button>
            <button type="button" className={lang === 'fr' ? 'is-active' : ''} onClick={() => setLang('fr')}>
              FR
            </button>
          </div>
          <a className="btn btn--gold btn--sm hide-mobile" href={`tel:${PHONE_TEL}`}>
            {t(copy.cta.call)}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={`nav-mobile ${open ? 'is-open' : ''}`}>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'}>
            {t(copy.nav[link.key])}
          </NavLink>
        ))}
        <a className="btn btn--gold" href={`tel:${PHONE_TEL}`}>
          {t(copy.cta.call)}
        </a>
      </div>
    </header>
  )
}
