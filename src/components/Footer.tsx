import { Link } from 'react-router-dom'
import { ADDRESS, copy, EMAIL, FACEBOOK, INSTAGRAM, MAPS_URL, PHONE, PHONE_TEL, TIKTOK } from '../data/content'
import { useLang } from '../context/Language'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Logo variant="gold" />
          <p className="footer-blurb">{t(copy.footer.blurb)}</p>
        </div>
        <div>
          <h3>{t(copy.nav.menu)}</h3>
          <Link to="/menu">{t(copy.cta.menu)}</Link>
          <Link to="/story">{t(copy.nav.story)}</Link>
          <Link to="/gallery">{t(copy.nav.gallery)}</Link>
          <Link to="/reserve">{t(copy.cta.book)}</Link>
        </div>
        <div>
          <h3>{t(copy.hoursLabel)}</h3>
          <p>
            {t(copy.hours.shop)}
            <br />
            {t(copy.hours.shopTime)}
          </p>
          <p>
            {t(copy.hours.lunch)} {t(copy.hours.lunchTime)}
            <br />
            {t(copy.hours.dinner)} {t(copy.hours.dinnerTime)}
          </p>
          <p className="muted">{t(copy.hours.closed)}</p>
        </div>
        <div>
          <h3>{t(copy.visit.title)}</h3>
          <a href={MAPS_URL} target="_blank" rel="noreferrer">
            {ADDRESS}
          </a>
          <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="socials">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={TIKTOK} target="_blank" rel="noreferrer">
              TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Lakaaz Lamer</span>
        <span>{t(copy.footer.rights)}</span>
      </div>
    </footer>
  )
}
