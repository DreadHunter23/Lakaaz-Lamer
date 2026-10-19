import { ADDRESS, copy, EMAIL, IMAGES, MAPS_URL, PHONE, PHONE_TEL } from '../data/content'
import { useLang } from '../context/Language'
import { PageHero } from '../components/PageHero'
import { BookingWizard } from '../components/BookingWizard'
import { Reveal } from '../components/Reveal'

export function Reserve() {
  const { t } = useLang()
  return (
    <main>
      <PageHero kicker={t(copy.reserve.kicker)} title={t(copy.reserve.title)} sub={t(copy.reserve.sub)} image={IMAGES.venue} focal="50% 40%" />
      <section className="section">
        <div className="wrap">
          <BookingWizard />
        </div>
      </section>
      <section className="visit">
        <div className="visit__map">
          <iframe title="Lakaaz Lamer on Google Maps" src="https://maps.google.com/maps?q=Lifestyle%20Boulevard%20Sottise%20Rd%20Grand%20Baie%20Mauritius&z=16&output=embed" loading="lazy" />
        </div>
        <Reveal className="visit__card">
          <p className="kicker">{t(copy.visit.kicker)}</p>
          <h2>{ADDRESS}</h2>
          <p>{t(copy.visit.body)}</p>
          <p className="muted">{t(copy.hours.closed)}</p>
          <a className="block-link" href={`tel:${PHONE_TEL}`}>
            {PHONE}
          </a>
          <a className="block-link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <a className="btn btn--ghost-dark" href={MAPS_URL} target="_blank" rel="noreferrer">
            {t(copy.cta.directions)}
          </a>
        </Reveal>
      </section>
    </main>
  )
}
