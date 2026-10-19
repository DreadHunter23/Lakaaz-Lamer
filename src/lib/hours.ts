export type VenueStatus = {
  shopOpen: boolean
  restaurantOpen: boolean
  restaurantService: 'lunch' | 'dinner' | null
  isMonday: boolean
  label: { en: string; fr: string }
}

function mauritiusNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Indian/Mauritius',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const weekday = get('weekday')
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  return { weekday, minutes }
}

export function getVenueStatus(): VenueStatus {
  const { weekday, minutes } = mauritiusNow()
  const isMonday = weekday === 'Mon'
  const shopOpen = minutes >= 9 * 60 && minutes < 22 * 60
  const inLunch = minutes >= 12 * 60 && minutes < 15 * 60
  const inDinner = minutes >= 18 * 60 && minutes < 22 * 60
  const restaurantOpen = !isMonday && (inLunch || inDinner)

  let label: VenueStatus['label']
  if (restaurantOpen && inLunch) {
    label = { en: 'Kitchen is open for lunch until 15:00', fr: 'Cuisine ouverte pour le déjeuner jusqu’à 15:00' }
  } else if (restaurantOpen && inDinner) {
    label = { en: 'Kitchen is open for dinner until 22:00', fr: 'Cuisine ouverte pour le dîner jusqu’à 22:00' }
  } else if (isMonday && shopOpen) {
    label = { en: 'Fish shop open · restaurant closed Mondays', fr: 'Poissonnerie ouverte · restaurant fermé le lundi' }
  } else if (shopOpen && !isMonday && minutes < 12 * 60) {
    label = { en: 'Fish shop open · lunch from 12:00', fr: 'Poissonnerie ouverte · déjeuner dès 12:00' }
  } else if (shopOpen && !isMonday && minutes >= 15 * 60 && minutes < 18 * 60) {
    label = { en: 'Afternoon pause · dinner from 18:00', fr: 'Pause de l’après-midi · dîner dès 18:00' }
  } else {
    label = { en: 'Currently closed · fish shop from 09:00', fr: 'Actuellement fermé · poissonnerie dès 09:00' }
  }

  return {
    shopOpen,
    restaurantOpen,
    restaurantService: restaurantOpen ? (inLunch ? 'lunch' : 'dinner') : null,
    isMonday,
    label,
  }
}
