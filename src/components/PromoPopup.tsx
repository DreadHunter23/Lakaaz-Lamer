import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { copy, IMAGES } from '../data/content'
import { useLang } from '../context/Language'

export const PROMO_STORAGE_KEY = 'llm-promo-boat-burger'

type Props = {
  open: boolean
  onClose: () => void
}

export function PromoPopup({ open, onClose }: Props) {
  const { t } = useLang()

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="promo" role="dialog" aria-modal="true" aria-labelledby="promo-title" onClick={onClose}>
      <div className="promo__card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="promo__close" onClick={onClose} aria-label={t(copy.promo.close)}>
          ×
        </button>
        <img src={IMAGES.promo} alt={t(copy.promo.alt)} />
        <div className="promo__bar">
          <div>
            <p className="kicker kicker--light" id="promo-title">
              {t(copy.promo.kicker)}
            </p>
            <p className="promo__offer">{t(copy.promo.offer)}</p>
            <p className="promo__body">{t(copy.promo.body)}</p>
          </div>
          <Link className="btn btn--gold" to="/menu" onClick={onClose}>
            {t(copy.promo.cta)}
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  )
}
