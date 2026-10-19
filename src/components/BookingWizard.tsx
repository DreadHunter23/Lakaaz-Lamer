import { useEffect, useMemo, useRef, useState } from 'react'
import { copy, PHONE, PHONE_TEL } from '../data/content'
import { sendBookingEmail } from '../lib/sendBooking'
import { useLang } from '../context/Language'
import {
  BOOKING_HORIZON_DAYS,
  DINNER_SLOTS,
  LARGE_PARTY,
  LUNCH_SLOTS,
  MAX_GUESTS,
  addDays,
  firstBookableDate,
  formatLongDate,
  formatMonthTitle,
  isBookable,
  isMonday,
  mauritiusNow,
  monthGrid,
  parseYmd,
  shiftMonth,
  slotsForDate,
} from '../lib/booking'

type Draft = {
  guests: number
  date: string
  time: string
  name: string
  phone: string
  email: string
  notes: string
}

const EMPTY: Draft = {
  guests: 2,
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
}

export function BookingWizard() {
  const { t, lang } = useLang()
  const today = mauritiusNow().ymd
  const maxDate = addDays(today, BOOKING_HORIZON_DAYS)
  const [step, setStep] = useState(1)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<'generic' | 'activation' | null>(null)
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const seed = parseYmd(firstBookableDate())
  const [view, setView] = useState({ year: seed.year, month: seed.month })

  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    document.querySelector('.book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step, sent])

  const cells = useMemo(() => monthGrid(view.year, view.month), [view])
  const slots = draft.date ? slotsForDate(draft.date) : { lunch: [], dinner: [] }
  const weekdays = lang === 'fr' ? ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  function patch(next: Partial<Draft>) {
    setDraft((prev) => ({ ...prev, ...next }))
  }

  function pickDate(ymd: string) {
    if (!isBookable(ymd)) return
    patch({ date: ymd, time: '' })
  }

  function canNext() {
    if (step === 1) return Boolean(draft.date && draft.time)
    if (step === 2) return draft.name.trim().length > 1 && draft.phone.trim().length >= 7
    return true
  }

  async function confirm() {
    if (sending) return
    setSending(true)
    setSendError(null)
    const result = await sendBookingEmail({
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
      date: formatLongDate(draft.date, lang),
      time: draft.time,
      guests: draft.guests,
      notes: draft.notes.trim(),
      lang,
    })
    setSending(false)
    if (result.ok) {
      setSent(true)
      return
    }
    setSendError(result.reason === 'activation' ? 'activation' : 'generic')
  }

  if (sent) {
    return (
      <div className="book">
        <Stepper step={3} done />
        <h2 className="book__title">{t(copy.reserve.sentTitle)}</h2>
        <p className="book__lede">{t(copy.reserve.sentBody)}</p>
        <article className="book__summary">
          <Summary draft={draft} />
        </article>
        <div className="book__nav">
          <button
            type="button"
            className="btn btn--ghost-dark"
            onClick={() => {
              setSent(false)
              setSendError(null)
              setStep(1)
              setDraft(EMPTY)
            }}
          >
            {t(copy.reserve.another)}
          </button>
          <a className="btn btn--gold" href={`tel:${PHONE_TEL}`}>
            {t(copy.cta.call)}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="book">
      <p className="book__eyebrow">{t(copy.reserve.stepsIntro)}</p>
      <Stepper step={step} />
      {step === 1 ? (
        <>
          <h2 className="book__title">{t(copy.reserve.whenTitle)}</h2>
          <article className="book__card book__card--guests">
            <h3>
              <PeopleIcon />
              {t(copy.reserve.guests)}
            </h3>
            <div className="book__stepper-field">
              <button type="button" aria-label="-" onClick={() => patch({ guests: Math.max(1, draft.guests - 1) })}>
                −
              </button>
              <input
                type="number"
                min={1}
                max={MAX_GUESTS}
                value={draft.guests}
                onChange={(e) => patch({ guests: Math.min(MAX_GUESTS, Math.max(1, Number(e.target.value) || 1)) })}
              />
              <span>{t(copy.reserve.guestsUnit)}</span>
              <button
                type="button"
                aria-label="+"
                onClick={() => patch({ guests: Math.min(MAX_GUESTS, draft.guests + 1) })}
              >
                +
              </button>
            </div>
            {draft.guests >= LARGE_PARTY ? <p className="book__hint">{t(copy.reserve.partyNote)}</p> : null}
          </article>

          <div className="book__split">
            <article className="book__card">
              <h3>
                <CalIcon />
                {t(copy.reserve.selectDate)}
              </h3>
              <div className="cal__nav">
                <button
                  type="button"
                  onClick={() => setView((v) => shiftMonth(v.year, v.month, -1))}
                  aria-label={t(copy.reserve.prevMonth)}
                >
                  ‹
                </button>
                <strong>{formatMonthTitle(view.year, view.month, lang)}</strong>
                <button
                  type="button"
                  onClick={() => setView((v) => shiftMonth(v.year, v.month, 1))}
                  aria-label={t(copy.reserve.nextMonth)}
                >
                  ›
                </button>
              </div>
              <div className="cal">
                {weekdays.map((d) => (
                  <span key={d} className="cal__dow">
                    {d}
                  </span>
                ))}
                {cells.map((cell) => {
                  const disabled = cell.ymd < today || cell.ymd > maxDate || !isBookable(cell.ymd)
                  const selected = draft.date === cell.ymd
                  const monday = isMonday(cell.ymd)
                  return (
                    <button
                      key={cell.ymd}
                      type="button"
                      disabled={disabled}
                      className={`cal__day${cell.inMonth ? '' : ' is-out'}${selected ? ' is-selected' : ''}${cell.ymd === today ? ' is-today' : ''}${monday ? ' is-closed' : ''}`}
                      onClick={() => pickDate(cell.ymd)}
                    >
                      {Number(cell.ymd.slice(-2))}
                    </button>
                  )
                })}
              </div>
              <p className="book__hint">{t(copy.hours.closed)}</p>
            </article>

            <article className="book__card">
              <h3>
                <ClockIcon />
                {t(copy.reserve.selectTime)}
              </h3>
              {draft.date ? (
                <p className="book__date-line">{formatLongDate(draft.date, lang)}</p>
              ) : (
                <p className="book__hint">{t(copy.reserve.pickDateFirst)}</p>
              )}
              {draft.date && !slots.lunch.length && !slots.dinner.length ? (
                <p className="book__hint">{t(copy.reserve.noSlots)}</p>
              ) : null}
              <SlotGroup label={t(copy.reserve.lunchSlot)} window="12:00 – 15:00" times={LUNCH_SLOTS} available={slots.lunch} value={draft.time} onPick={(time) => patch({ time })} />
              <SlotGroup label={t(copy.reserve.dinnerSlot)} window="18:00 – 22:00" times={DINNER_SLOTS} available={slots.dinner} value={draft.time} onPick={(time) => patch({ time })} />
            </article>
          </div>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <h2 className="book__title">{t(copy.reserve.detailsTitle)}</h2>
          <article className="book__card book__card--form">
            <h3>{t(copy.reserve.contactTitle)}</h3>
            <p className="book__hint">{t(copy.reserve.contactSub)}</p>
            <div className="book__form">
              <label>
                {t(copy.reserve.fullName)} *
                <input value={draft.name} onChange={(e) => patch({ name: e.target.value })} autoComplete="name" required />
              </label>
              <label>
                {t(copy.reserve.phone)} *
                <input value={draft.phone} onChange={(e) => patch({ phone: e.target.value })} autoComplete="tel" required />
              </label>
              <label className="full">
                {t(copy.reserve.email)}
                <input type="email" value={draft.email} onChange={(e) => patch({ email: e.target.value })} autoComplete="email" placeholder="you@email.com" />
              </label>
              <label className="full">
                {t(copy.reserve.notesOptional)}
                <textarea rows={4} value={draft.notes} onChange={(e) => patch({ notes: e.target.value })} placeholder={t(copy.reserve.notesPlaceholder)} />
              </label>
            </div>
          </article>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <h2 className="book__title">{t(copy.reserve.confirmTitle)}</h2>
          <article className="book__summary">
            <h3>
              <ForkIcon />
              {t(copy.reserve.summaryTitle)}
            </h3>
            <Summary draft={draft} />
          </article>
        </>
      ) : null}

      <div className="book__nav">
        {step > 1 ? (
          <button type="button" className="btn btn--ghost-dark" onClick={() => setStep((s) => s - 1)}>
            ‹ {t(copy.reserve.back)}
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button type="button" className="btn btn--gold" disabled={!canNext()} onClick={() => setStep((s) => s + 1)}>
            {t(copy.reserve.next)} ›
          </button>
        ) : (
          <button type="button" className="btn btn--gold" onClick={() => void confirm()} disabled={sending}>
            {sending ? t(copy.reserve.sending) : t(copy.reserve.confirmCta)}
          </button>
        )}
      </div>
      {sendError ? (
        <p className="book__error">{t(sendError === 'activation' ? copy.reserve.activateInbox : copy.reserve.sendError)}</p>
      ) : null}
      <p className="book__fine">
        {t(copy.reserve.emailNote)}{' '}
        <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
      </p>
    </div>
  )
}

function Stepper({ step, done = false }: { step: number; done?: boolean }) {
  return (
    <ol className="book-steps" aria-label="Progress">
      {[1, 2, 3].map((n) => {
        const complete = done || n < step
        const current = !done && n === step
        return (
          <li key={n} className={`${complete ? 'is-complete' : ''} ${current ? 'is-current' : ''}`}>
            <span>{complete ? '✓' : n}</span>
          </li>
        )
      })}
    </ol>
  )
}

function SlotGroup({
  label,
  window,
  times,
  available,
  value,
  onPick,
}: {
  label: string
  window: string
  times: readonly string[]
  available: string[]
  value: string
  onPick: (time: string) => void
}) {
  const open = times.filter((slot) => available.includes(slot))
  if (!open.length) return null
  return (
    <div className="slots">
      <p>
        {label}
        <small>{window}</small>
      </p>
      <div className="slots__grid">
        {open.map((time) => (
          <button
            key={time}
            type="button"
            className={value === time ? 'is-selected' : ''}
            onClick={() => onPick(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}

function Summary({ draft }: { draft: Draft }) {
  const { t, lang } = useLang()
  return (
    <dl className="book__dl">
      <div>
        <dt>{t(copy.reserve.guests)}</dt>
        <dd>
          {draft.guests} {t(copy.reserve.guestsUnit)}
        </dd>
      </div>
      <div>
        <dt>{t(copy.reserve.date)}</dt>
        <dd>{draft.date ? formatLongDate(draft.date, lang) : '—'}</dd>
      </div>
      <div>
        <dt>{t(copy.reserve.time)}</dt>
        <dd>{draft.time || '—'}</dd>
      </div>
      <div>
        <dt>{t(copy.reserve.fullName)}</dt>
        <dd>{draft.name}</dd>
      </div>
      <div>
        <dt>{t(copy.reserve.phone)}</dt>
        <dd>{draft.phone}</dd>
      </div>
      {draft.email ? (
        <div>
          <dt>{t(copy.reserve.emailShort)}</dt>
          <dd>{draft.email}</dd>
        </div>
      ) : null}
      {draft.notes ? (
        <div>
          <dt>{t(copy.reserve.notes)}</dt>
          <dd>{draft.notes}</dd>
        </div>
      ) : null}
    </dl>
  )
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 12Zm0 1.5c-3.1 0-7 1.6-7 4.2V19h14v-1.3c0-2.6-3.9-4.2-7-4.2Z" fill="currentColor" />
    </svg>
  )
}
function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2V3h-2v2H9V3Zm12 8H5v8h14Z" fill="currentColor" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm1 5h-2v6l5 3 .9-1.5L13 13Z" fill="currentColor" />
    </svg>
  )
}
function ForkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3v7a2 2 0 0 0 2 2v9h2V3h-2v6H9V3Zm8.5 0c-1.4 2.2-1.5 4.4-1.5 6.5V12h-1v9h2v-9h1V9.5c0-2.1.2-4.2 1.5-6.5Z" fill="currentColor" />
    </svg>
  )
}
