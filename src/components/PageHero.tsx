import type { ReactNode } from 'react'

export function PageHero({
  kicker,
  title,
  sub,
  image,
  focal = '50% 50%',
  children,
}: {
  kicker: string
  title: string
  sub?: string
  image: string
  focal?: string
  children?: ReactNode
}) {
  return (
    <section className="page-hero">
      <img src={image} alt="" style={{ objectPosition: focal }} />
      <div className="page-hero__shade" />
      <div className="wrap page-hero__copy">
        <p className="kicker kicker--light">{kicker}</p>
        <h1>{title}</h1>
        {sub ? <p className="lede">{sub}</p> : null}
        {children}
      </div>
    </section>
  )
}
