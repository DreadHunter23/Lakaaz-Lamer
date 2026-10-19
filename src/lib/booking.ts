export const LUNCH_SLOTS = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'] as const
export const DINNER_SLOTS = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'] as const
export const MAX_GUESTS = 12
export const LARGE_PARTY = 8
export const BOOKING_HORIZON_DAYS = 90
export const LEAD_MINUTES = 45

type TzParts = {
  year: number
  month: number
  day: number
  weekday: number
  minutes: number
  ymd: string
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export function mauritiusNow(date = new Date()): TzParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Indian/Mauritius',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const year = Number(get('year'))
  const month = Number(get('month'))
  const day = Number(get('day'))
  return {
    year,
    month,
    day,
    weekday: WEEKDAY_INDEX[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    ymd: `${year}-${pad(month)}-${pad(day)}`,
  }
}

export function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function parseYmd(ymd: string) {
  const [year, month, day] = ymd.split('-').map(Number)
  return { year, month, day }
}

export function weekdayOf(ymd: string) {
  const { year, month, day } = parseYmd(ymd)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function isMonday(ymd: string) {
  return weekdayOf(ymd) === 1
}

export function addDays(ymd: string, days: number) {
  const { year, month, day } = parseYmd(ymd)
  const next = new Date(Date.UTC(year, month - 1, day + days))
  return `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}`
}

export function monthGrid(year: number, month: number) {
  const first = new Date(Date.UTC(year, month - 1, 1))
  const startPad = first.getUTCDay()
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const cells: { ymd: string; inMonth: boolean }[] = []
  for (let i = 0; i < startPad; i++) {
    const d = new Date(Date.UTC(year, month - 1, i - startPad + 1))
    cells.push({
      ymd: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
      inMonth: false,
    })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ ymd: `${year}-${pad(month)}-${pad(day)}`, inMonth: true })
  }
  while (cells.length % 7 !== 0) {
    const last = parseYmd(cells[cells.length - 1].ymd)
    const d = new Date(Date.UTC(last.year, last.month - 1, last.day + 1))
    cells.push({
      ymd: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
      inMonth: false,
    })
  }
  return cells
}

export function slotsForDate(ymd: string) {
  if (isMonday(ymd)) return { lunch: [] as string[], dinner: [] as string[] }
  const now = mauritiusNow()
  const horizon = addDays(now.ymd, BOOKING_HORIZON_DAYS)
  if (ymd < now.ymd || ymd > horizon) return { lunch: [] as string[], dinner: [] as string[] }

  const lunch = [...LUNCH_SLOTS]
  const dinner = [...DINNER_SLOTS]
  if (ymd !== now.ymd) return { lunch, dinner }

  const cutoff = now.minutes + LEAD_MINUTES
  return {
    lunch: lunch.filter((slot) => toMinutes(slot) >= cutoff),
    dinner: dinner.filter((slot) => toMinutes(slot) >= cutoff),
  }
}

export function hasSlots(ymd: string) {
  const { lunch, dinner } = slotsForDate(ymd)
  return lunch.length + dinner.length > 0
}

export function isBookable(ymd: string) {
  return hasSlots(ymd)
}

export function firstBookableDate() {
  const now = mauritiusNow()
  for (let i = 0; i <= BOOKING_HORIZON_DAYS; i++) {
    const ymd = addDays(now.ymd, i)
    if (isBookable(ymd)) return ymd
  }
  return now.ymd
}

export function formatLongDate(ymd: string, lang: 'en' | 'fr') {
  const { year, month, day } = parseYmd(ymd)
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-MU' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

export function formatMonthTitle(year: number, month: number, lang: 'en' | 'fr') {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-MU' : 'en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

export function shiftMonth(year: number, month: number, delta: number) {
  const d = new Date(Date.UTC(year, month - 1 + delta, 1))
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1 }
}

export function serviceWindow(time: string) {
  return toMinutes(time) < 16 * 60 ? 'lunch' : 'dinner'
}
