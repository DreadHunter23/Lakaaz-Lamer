import { BOOKING_INBOX } from '../data/content'

export type BookingPayload = {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: number
  notes: string
  lang: 'en' | 'fr'
}

export type SendBookingResult = { ok: true } | { ok: false; reason: 'activation' | 'network' }

export async function sendBookingEmail(payload: BookingPayload): Promise<SendBookingResult> {
  const subject = `Lakaaz Lamer reservation — ${payload.guests} guests · ${payload.date} · ${payload.time}`
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(BOOKING_INBOX)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        _honey: '',
        ...(payload.email.trim() ? { _replyto: payload.email.trim(), GuestEmail: payload.email.trim() } : {}),
        GuestName: payload.name,
        Phone: payload.phone,
        Date: payload.date,
        Time: payload.time,
        Guests: String(payload.guests),
        Notes: payload.notes.trim() || '—',
        Language: payload.lang === 'fr' ? 'Français' : 'English',
        Venue: 'Lakaaz Lamer · Sottise Rd, Lifestyle Boulevard, Grand Baie',
      }),
    })

    const data = (await response.json().catch(() => null)) as { success?: string | boolean; message?: string } | null
    const message = (data?.message || '').toLowerCase()
    if (message.includes('activation')) return { ok: false, reason: 'activation' }
    const ok = data?.success === true || data?.success === 'true'
    if (!response.ok || !ok) return { ok: false, reason: 'network' }
    return { ok: true }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
