import { useState } from 'react'
import { copy, GALLERY, IMAGES, img } from '../data/content'
import { useLang } from '../context/Language'
import { PageHero } from '../components/PageHero'

const filters = [
  { id: 'all', en: 'All', fr: 'Tout' },
  { id: 'dishes', en: 'Dishes', fr: 'Plats' },
  { id: 'shop', en: 'Fish shop', fr: 'Poissonnerie' },
  { id: 'venue', en: 'The room', fr: 'La salle' },
] as const

export function Gallery() {
  const { t, lang } = useLang()
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const [active, setActive] = useState<string | null>(null)
  const items = GALLERY.filter((item) => filter === 'all' || item.cat === filter)

  return (
    <main>
      <PageHero kicker={t(copy.gallery.kicker)} title={t(copy.gallery.title)} sub={t(copy.gallery.sub)} image={IMAGES.interior} />
      <section className="section">
        <div className="wrap">
          <div className="filters">
            {filters.map((item) => (
              <button key={item.id} type="button" className={filter === item.id ? 'is-active' : ''} onClick={() => setFilter(item.id)}>
                {item[lang]}
              </button>
            ))}
          </div>
          <div className="masonry">
            {items.map((item) => (
              <button key={item.src} type="button" className="masonry__item" onClick={() => setActive(item.src)}>
                <img src={img(item.src, 900)} alt={item.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>
      {active ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <img src={img(active, 1800)} alt="" />
        </div>
      ) : null}
    </main>
  )
}
