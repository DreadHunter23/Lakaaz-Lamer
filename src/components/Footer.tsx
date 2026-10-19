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
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href={TIKTOK} target="_blank" rel="noreferrer" aria-label="TikTok">
              <TikTokIcon />
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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.26-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.67-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.26 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 6 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07Z"
      />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v8.75c-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72v4.44c-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36V.02Z"
      />
    </svg>
  )
}
