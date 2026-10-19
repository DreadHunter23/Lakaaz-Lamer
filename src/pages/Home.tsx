import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ADDRESS, copy, IMAGES, MAPS_URL, PHONE, PHONE_TEL, img } from '../data/content'
import { useLang } from '../context/Language'
import { asset } from '../lib/asset'
import { getVenueStatus } from '../lib/hours'
import { PromoPopup, PROMO_STORAGE_KEY } from '../components/PromoPopup'
import { Reveal } from '../components/Reveal'

export function Home() {
  const { t } = useLang()
  const status = getVenueStatus()
  const tableRef = useRef<HTMLElement>(null)
  const [promoOpen, setPromoOpen] = useState(false)

  const closePromo = useCallback(() => {
    setPromoOpen(false)
    try {
      sessionStorage.setItem(PROMO_STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PROMO_STORAGE_KEY)) return
    } catch {
      /* ignore */
    }
    const el = tableRef.current
    if (!el) return
    let timer = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        timer = window.setTimeout(() => setPromoOpen(true), 650)
        io.disconnect()
      },
      { threshold: 0.28 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <main>
      <section className="hero">
        <img className="hero__img" src={IMAGES.platter} alt="Seafood boat platter at Lakaaz Lamer" style={{ objectPosition: '50% 72%' }} />
        <div className="hero__shade" />
        <div className="wrap hero__content">
          <p className="kicker kicker--light">{t(copy.hero.kicker)}</p>
          <h1>{t(copy.hero.title)}</h1>
          <p className="lede">{t(copy.hero.sub)}</p>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/reserve">
              {t(copy.cta.book)}
            </Link>
            <Link className="btn btn--ghost" to="/menu">
              {t(copy.cta.menu)}
            </Link>
          </div>
          <div className={`status-pill ${status.restaurantOpen || status.shopOpen ? 'is-open' : ''}`}>
            <span />
            {t(status.label)}
          </div>
        </div>
      </section>

      <section className="hours-strip">
        <div className="wrap hours-strip__grid">
          <article>
            <small>{t(copy.hours.shop)}</small>
            <strong>{t(copy.hours.shopTime)}</strong>
          </article>
          <article>
            <small>{t(copy.hours.lunch)}</small>
            <strong>{t(copy.hours.lunchTime)}</strong>
          </article>
          <article>
            <small>{t(copy.hours.dinner)}</small>
            <strong>{t(copy.hours.dinnerTime)}</strong>
          </article>
          <article>
            <small>{t(copy.hoursLabel)}</small>
            <strong>{t(copy.hours.closed)}</strong>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal>
            <p className="kicker">{t(copy.welcome.kicker)}</p>
            <h2>{t(copy.welcome.title)}</h2>
            <p className="body-copy">{t(copy.welcome.body)}</p>
            <Link className="text-link" to="/story">
              {t(copy.nav.story)} →
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="photo-stack">
              <img src={IMAGES.shop} alt="Fresh catch at the Lakaaz Lamer counter" />
              <img src={IMAGES.venue} alt="The dining room at Lakaaz Lamer" />
            </div>
          </Reveal>
        </div>
        <div className="wrap pillars">
          {copy.pillars.map((pillar, i) => (
            <Reveal key={pillar.title.en} delay={i * 80}>
              <article className="pillar">
                <img className="pillar__icon" src={asset(`brand/icons/${pillar.icon}.png`)} alt="" />
                <h3>{t(pillar.title)}</h3>
                <p>{t(pillar.body)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section ref={tableRef} id="on-the-table" className="section section--sand">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(copy.featuredKicker)}</p>
            <h2>{t(copy.featuredTitle)}</h2>
          </Reveal>
          <div className="feature-grid">
            {copy.featured.map((dish, i) => (
              <Reveal key={dish.name.en} delay={i * 90}>
                <article className={`dish-card${dish.image === 'platter' ? ' dish-card--offer' : ''}`}>
                  {dish.image === 'platter' ? (
                    <button type="button" className="dish-card__badge" onClick={() => setPromoOpen(true)}>
                      {t(copy.promo.badge)}
                    </button>
                  ) : null}
                  <Link to="/menu">
                    <img
                      src={img(IMAGES[dish.image], 1100)}
                      alt={t(dish.name)}
                      style={dish.image === 'platter' ? { objectPosition: '50% 70%' } : undefined}
                    />
                    <div>
                      <small>{t(dish.meta)}</small>
                      <h3>{t(dish.name)}</h3>
                      <p>{t(dish.desc)}</p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split--reverse">
          <Reveal>
            <div className="tall-photo">
              <img src={IMAGES.boat} alt="Landing the catch with Gian & Sons" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="kicker">{t(copy.shop.kicker)}</p>
            <h2>{t(copy.shop.title)}</h2>
            <p className="body-copy">{t(copy.shop.body)}</p>
            <ul className="tick-list">
              {copy.shop.points.map((point) => (
                <li key={point.en}>{t(point)}</li>
              ))}
            </ul>
            <Link className="btn btn--navy" to="/story">
              Gian & Sons
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="visit">
        <div className="visit__map">
          <iframe title="Lakaaz Lamer on Google Maps" src="https://maps.google.com/maps?q=Lifestyle%20Boulevard%20Sottise%20Rd%20Grand%20Baie%20Mauritius&z=16&output=embed" loading="lazy" />
        </div>
        <Reveal className="visit__card">
          <p className="kicker">{t(copy.visit.kicker)}</p>
          <h2>{t(copy.visit.title)}</h2>
          <p>{t(copy.visit.body)}</p>
          <p className="delivery-line">{t(copy.visit.delivery)}</p>
          <a className="block-link" href={MAPS_URL} target="_blank" rel="noreferrer">
            {ADDRESS}
          </a>
          <a className="block-link" href={`tel:${PHONE_TEL}`}>
            {PHONE}
          </a>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/reserve">
              {t(copy.cta.book)}
            </Link>
            <a className="btn btn--ghost-dark" href={MAPS_URL} target="_blank" rel="noreferrer">
              {t(copy.cta.directions)}
            </a>
          </div>
        </Reveal>
      </section>
      <PromoPopup open={promoOpen} onClose={closePromo} />
    </main>
  )
}
