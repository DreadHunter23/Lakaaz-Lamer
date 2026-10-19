import { useMemo, useState } from 'react'
import { copy, EXTRAS, IMAGES, MENU, type MenuTag } from '../data/content'
import { useLang } from '../context/Language'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

const TAG_ORDER: MenuTag[] = ['veg', 'lunch', 'share', 'kids', 'mp']

export function Menu() {
  const { t } = useLang()
  const [active, setActive] = useState('all')
  const cats = useMemo(() => [{ id: 'all', title: copy.menuPage.all }, ...MENU.map((c) => ({ id: c.id, title: c.title }))], [])
  const shown = active === 'all' ? MENU : MENU.filter((c) => c.id === active)

  return (
    <main>
      <PageHero kicker={t(copy.menuPage.kicker)} title={t(copy.menuPage.title)} sub={t(copy.menuPage.sub)} image={IMAGES.platter} focal="50% 72%" />

      <section className="section">
        <div className="wrap">
          <div className="filters" role="tablist" aria-label="Menu categories">
            {cats.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active === cat.id}
                className={active === cat.id ? 'is-active' : ''}
                onClick={() => setActive(cat.id)}
              >
                {t(cat.title)}
              </button>
            ))}
          </div>

          <div className="menu-board">
            {shown.map((category, i) => (
              <Reveal key={category.id} delay={Math.min(i * 70, 280)}>
                <section className="menu-cat" id={category.id}>
                  <h2>{t(category.title)}</h2>
                  <ul>
                    {category.items.map((item) => (
                      <li key={item.name.en}>
                        <div>
                          <h3>
                            {t(item.name)}
                            {item.tags?.map((tag) => (
                              <em key={tag} className={`tag tag--${tag}`}>
                                {t(copy.tags[tag])}
                              </em>
                            ))}
                          </h3>
                          <p>{t(item.desc)}</p>
                        </div>
                        <strong>{item.price}</strong>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal>
          <aside className="extras">
            <h2>{t(copy.menuPage.extras)}</h2>
            <ul>
              {EXTRAS.map((item) => (
                <li key={item.en}>
                  <span>{t(item)}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="muted">
              {TAG_ORDER.map((tag) => t(copy.tags[tag])).join(' · ')}
            </p>
          </aside>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
