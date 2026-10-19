import { copy, IMAGES } from '../data/content'
import { asset } from '../lib/asset'
import { useLang } from '../context/Language'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function Story() {
  const { t } = useLang()
  return (
    <main>
      <PageHero kicker={t(copy.story.kicker)} title={t(copy.story.title)} image={IMAGES.venue} focal="50% 40%" />

      <section className="section">
        <div className="wrap story-lead">
          <Reveal>
            <p className="display-p">{t(copy.story.lead)}</p>
          </Reveal>
        </div>
        <div className="wrap split">
          <Reveal>
            <img className="story-photo" src={IMAGES.market} alt="The day’s catch from Gian & Sons" />
          </Reveal>
          <Reveal delay={90}>
            <p className="kicker">Gian & Sons</p>
            <h2>{t(copy.shop.title)}</h2>
            <p className="body-copy">{t(copy.shop.body)}</p>
            <h3 className="papa">{t(copy.story.papa.title)}</h3>
            <p className="body-copy">{t(copy.story.papa.body)}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--navy">
        <div className="wrap">
          <Reveal>
            <p className="kicker kicker--light">{t(copy.story.teamTitle)}</p>
            <h2 className="light-title">{t(copy.story.teamTitle)}</h2>
          </Reveal>
          <div className="team-grid">
            {copy.story.team.map((person, i) => (
              <Reveal key={person.name} delay={i * 90}>
                <article className="team-card">
                  <span>0{i + 1}</span>
                  <h3>{person.name}</h3>
                  <small>{t(person.role)}</small>
                  <p>{t(person.bio)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap pillars">
          {copy.pillars.map((pillar, i) => (
            <Reveal key={pillar.title.en} delay={i * 70}>
              <article className="pillar">
                <img className="pillar__icon" src={asset(`brand/icons/${pillar.icon}.png`)} alt="" />
                <h3>{t(pillar.title)}</h3>
                <p>{t(pillar.body)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
