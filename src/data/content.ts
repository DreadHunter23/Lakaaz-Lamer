import { asset } from '../lib/asset'

export type Lang = 'en' | 'fr'

export const PHONE = '+230 5941 8059'
export const PHONE_TEL = '+23059418059'
export const WHATSAPP = '23059418059'
export const EMAIL = 'contact@lakaazlamer.com'
export const BOOKING_INBOX = 'mihirrgangadeen@gmail.com'
export const ADDRESS = 'Sottise Rd, Lifestyle Boulevard, Grand Baie'
export const MAPS_URL = 'https://maps.app.goo.gl/Qqso5xr76ZcxZQMdA'
export const MAPS_EMBED =
  'https://maps.google.com/maps?q=Lifestyle%20Boulevard%20Sottise%20Rd%20Grand%20Baie%20Mauritius&z=16&output=embed'
export const INSTAGRAM = 'https://www.instagram.com/lakaazlamer/'
export const FACEBOOK = 'https://www.facebook.com/lakaazlamerrestaurant/'
export const TIKTOK = 'https://www.tiktok.com/@lakaazlamer'

export const IMAGES = {
  platter: asset('photos/seafood-boat-platter.webp'),
  venue: asset('photos/venue.webp'),
  shop: asset('photos/fish-shop.webp'),
  tuna: asset('photos/tuna-tartare.webp'),
  grill: asset('photos/grilled-fish.webp'),
  prawns: asset('photos/fried-prawns.webp'),
  ice: asset('photos/fish-on-ice.webp'),
  market: asset('photos/catch-pile.webp'),
  chef: asset('photos/oven-fish.webp'),
  boat: asset('photos/fishing-boat.webp'),
  dining: asset('photos/table-setting.webp'),
  seared: asset('photos/seared-tuna.webp'),
  grillTable: asset('photos/grilled-fish-table.webp'),
  grillPlatter: asset('photos/grilled-fish-platter.webp'),
  hero: asset('photos/seafood-boat-platter.webp'),
  interior: asset('photos/table-setting.webp'),
  night: asset('photos/venue.webp'),
  family: asset('photos/catch-pile.webp'),
  ocean: asset('photos/fishing-boat.webp'),
  promo: asset('photos/seafood-boat-promo.jpg'),
}

export function img(src: string, w: number) {
  if (!src.includes('images.unsplash.com')) return src
  const base = src.split('?')[0]
  return `${base}?auto=format&fit=crop&w=${w}&q=80`
}

export type MenuTag = 'veg' | 'lunch' | 'share' | 'kids' | 'mp'

export type MenuItem = {
  name: { en: string; fr: string }
  desc: { en: string; fr: string }
  price: string
  tags?: MenuTag[]
}

export type MenuCategory = {
  id: string
  title: { en: string; fr: string }
  items: MenuItem[]
}

export const MENU: MenuCategory[] = [
  {
    id: 'tapas',
    title: { en: 'Tapas', fr: 'Tapas' },
    items: [
      {
        name: { en: 'Vegetarian Samosa', fr: 'Samosas végétariens' },
        desc: { en: 'Crisp pastry, spiced vegetables, tamarind dip · 6 pcs', fr: 'Pâte croustillante, légumes épicés, dip tamarin · 6 pcs' },
        price: 'Rs 300',
        tags: ['veg'],
      },
      {
        name: { en: 'Crispy Calamari', fr: 'Calamars croustillants' },
        desc: { en: 'Golden squid rings, chilli-lime dip · 6 pcs', fr: 'Anneaux d’encornet dorés, dip piment-citron vert · 6 pcs' },
        price: 'Rs 420',
      },
      {
        name: { en: 'Crispy Fish Bites', fr: 'Bouchées de poisson' },
        desc: { en: 'Bite-sized fried fish, tartare sauce · 6 pcs', fr: 'Morceaux de poisson frits, sauce tartare · 6 pcs' },
        price: 'Rs 500',
      },
    ],
  },
  {
    id: 'starters',
    title: { en: 'Starters', fr: 'Entrées' },
    items: [
      {
        name: { en: 'Mauritian Crab Soup', fr: 'Soupe de crabe mauricienne' },
        desc: { en: 'Creole crab broth with island spices', fr: 'Bouillon de crabe créole aux épices de l’île' },
        price: 'Rs 400',
      },
      {
        name: { en: 'Seafood Gratin', fr: 'Gratin de fruits de mer' },
        desc: { en: 'Mixed seafood in a creamy sauce, golden crust', fr: 'Fruits de mer, sauce crémeuse, croûte dorée' },
        price: 'Rs 575',
      },
    ],
  },
  {
    id: 'salads',
    title: { en: 'Salads', fr: 'Salades' },
    items: [
      {
        name: { en: 'Garden Salad', fr: 'Salade du jardin' },
        desc: { en: 'Mixed leaves, seasonal vegetables, house vinaigrette', fr: 'Mesclun, légumes de saison, vinaigrette maison' },
        price: 'Rs 275',
        tags: ['veg'],
      },
      {
        name: { en: 'Octopus Salad', fr: 'Salade d’ourite' },
        desc: { en: 'Local octopus, olive oil, lemon, herbs and avocado', fr: 'Ourite locale, huile d’olive, citron, herbes et avocat' },
        price: 'Rs 650',
      },
      {
        name: { en: 'Fresh Tuna Tartare', fr: 'Tartare de thon frais' },
        desc: { en: 'Knife-cut tuna with avocado', fr: 'Thon coupé au couteau, avocat' },
        price: 'Rs 650',
      },
    ],
  },
  {
    id: 'mains',
    title: { en: 'Main courses', fr: 'Plats' },
    items: [
      {
        name: { en: 'Fish & Chips', fr: 'Fish & chips' },
        desc: { en: 'Capitaine fillet, fries, tartare, green salad', fr: 'Filet de capitaine, frites, tartare, salade verte' },
        price: 'Rs 700',
        tags: ['lunch'],
      },
      {
        name: { en: 'Fish Burger', fr: 'Burger de poisson' },
        desc: { en: 'Grilled babone in brioche, cheese sauce, egg, avocado, onion · fries & salad', fr: 'Babone grillé en brioche, sauce fromage, œuf, avocat, oignon · frites & salade' },
        price: 'Rs 950',
        tags: ['lunch'],
      },
      {
        name: { en: 'Grilled Capitaine Fillet', fr: 'Filet de capitaine grillé' },
        desc: { en: 'Saffron rice or fries, seasonal vegetables. Lemon butter, garlic butter or rougaille', fr: 'Riz safrané ou frites, légumes. Beurre citron, beurre d’ail ou rougaille' },
        price: 'Rs 900',
      },
      {
        name: { en: 'Catch of the Day upgrade', fr: 'Supplément poisson du jour' },
        desc: { en: 'Replace capitaine with any available catch-of-the-day fillet', fr: 'Remplacez le capitaine par le filet du jour disponible' },
        price: '+ Rs 200',
      },
      {
        name: { en: 'Garlic Butter Prawns', fr: 'Crevettes au beurre d’ail' },
        desc: { en: 'Roasted prawns, saffron rice, garlic butter sauce', fr: 'Crevettes rôties, riz safrané, sauce au beurre d’ail' },
        price: 'Rs 900',
      },
      {
        name: { en: 'Grilled Lobster', fr: 'Homard grillé' },
        desc: { en: 'Creamy lemon sauce, sautéed rice, grilled vegetables · priced by weight', fr: 'Sauce citron, riz sauté, légumes grillés · au poids' },
        price: 'Rs 9 / g',
        tags: ['mp'],
      },
    ],
  },
  {
    id: 'specials',
    title: { en: 'Specialties', fr: 'Spécialités' },
    items: [
      {
        name: { en: 'Sizzling Seafood', fr: 'Fruits de mer sizzling' },
        desc: { en: 'Mixed seafood served on a sizzling hot plate', fr: 'Assortiment de fruits de mer sur plaque brûlante' },
        price: 'Rs 1,100',
      },
      {
        name: { en: 'Lakaaz Lamer Seafood Boat', fr: 'Bateau de fruits de mer' },
        desc: { en: 'Signature platter for two: capitaine, prawns, tiger prawns, octopus, calamari, mussels, fries, rice, lemon butter', fr: 'Plat signature pour deux : capitaine, crevettes, gambas, ourite, calamars, moules, frites, riz, beurre citron' },
        price: 'Rs 4,000',
        tags: ['share'],
      },
    ],
  },
  {
    id: 'land',
    title: { en: 'From the land', fr: 'De la terre' },
    items: [
      {
        name: { en: 'Grilled Chicken Thigh', fr: 'Cuisse de poulet grillée' },
        desc: { en: 'Herb-marinated, fries, seasonal vegetables, pepper sauce', fr: 'Marinée aux herbes, frites, légumes, sauce poivre' },
        price: 'Rs 700',
      },
      {
        name: { en: 'Pan-Seared Lamb Chops', fr: 'Côtelettes d’agneau' },
        desc: { en: 'Herb-crusted, seared to order, fries, vegetables, pepper sauce', fr: 'Croûte d’herbes, saisies à la commande, frites, légumes, sauce poivre' },
        price: 'Rs 1,350',
      },
    ],
  },
  {
    id: 'pasta',
    title: { en: 'Pasta', fr: 'Pâtes' },
    items: [
      {
        name: { en: 'Ratatouille Linguine', fr: 'Linguine ratatouille' },
        desc: { en: 'Provençal vegetable ragout on linguine', fr: 'Ragoût de légumes provençal, linguine' },
        price: 'Rs 400',
        tags: ['veg'],
      },
      {
        name: { en: 'Grilled Fish Linguine', fr: 'Linguine au poisson grillé' },
        desc: { en: 'Grilled fish, linguine, light sauce', fr: 'Poisson grillé, linguine, sauce légère' },
        price: 'Rs 900',
      },
      {
        name: { en: 'Creamy Seafood Linguine', fr: 'Linguine fruits de mer' },
        desc: { en: 'Mixed seafood in a creamy sauce', fr: 'Fruits de mer, sauce crémeuse' },
        price: 'Rs 1,250',
      },
    ],
  },
  {
    id: 'kids',
    title: { en: 'Kids', fr: 'Enfants' },
    items: [
      {
        name: { en: 'Mini Burger', fr: 'Mini burger' },
        desc: { en: 'Served with fries or rice', fr: 'Servi avec frites ou riz' },
        price: 'Rs 350',
        tags: ['kids'],
      },
      {
        name: { en: 'Grilled Fish', fr: 'Poisson grillé' },
        desc: { en: 'Served with fries or rice', fr: 'Servi avec frites ou riz' },
        price: 'Rs 350',
        tags: ['kids'],
      },
    ],
  },
  {
    id: 'desserts',
    title: { en: 'Desserts', fr: 'Desserts' },
    items: [
      {
        name: { en: 'Ice Cream Selection', fr: 'Glaces' },
        desc: { en: 'Ask for today’s flavours', fr: 'Parfums du jour' },
        price: 'Rs 300',
      },
      {
        name: { en: 'Sorbet', fr: 'Sorbet' },
        desc: { en: 'Ask for today’s flavours', fr: 'Parfums du jour' },
        price: 'Rs 300',
      },
      {
        name: { en: 'Crème Brûlée', fr: 'Crème brûlée' },
        desc: { en: 'Classic Bourbon vanilla', fr: 'Vanille Bourbon classique' },
        price: 'Rs 300',
      },
      {
        name: { en: 'Lemon Tart', fr: 'Tarte au citron' },
        desc: { en: 'Crisp pastry, tangy lemon cream', fr: 'Pâte croustillante, crème citron' },
        price: 'Rs 300',
      },
      {
        name: { en: 'Duo d’Amour — Façon Lakaaz', fr: 'Duo d’Amour — Façon Lakaaz' },
        desc: { en: 'Two textures, one shared plate', fr: 'Deux textures, un dessert à partager' },
        price: 'Rs 300',
        tags: ['share'],
      },
    ],
  },
  {
    id: 'drinks',
    title: { en: 'Drinks', fr: 'Boissons' },
    items: [
      {
        name: { en: 'Soft drinks', fr: 'Sodas' },
        desc: { en: 'Coca-Cola, Coca Zero, Sprite, Fanta Orange / Passion / Pineapple, Fuse Tea', fr: 'Coca-Cola, Coca Zero, Sprite, Fanta Orange / Passion / Ananas, Fuse Tea' },
        price: 'Rs 120',
      },
      {
        name: { en: 'Still / sparkling water', fr: 'Eaux plates / gazeuses' },
        desc: { en: 'From Rs 80 · 340 ml to 1 L', fr: 'Dès Rs 80 · 340 ml à 1 L' },
        price: 'Rs 80–150',
      },
      {
        name: { en: 'Juices', fr: 'Jus' },
        desc: { en: 'Orange, pineapple, grapefruit, apple, mango, peach, exotic blend', fr: 'Orange, ananas, pamplemousse, pomme, mangue, pêche, mélange exotique' },
        price: 'Rs 160',
      },
      {
        name: { en: 'Signature iced teas', fr: 'Thés glacés signature' },
        desc: { en: 'Peach, lemon, lychee, mango, passion fruit', fr: 'Pêche, citron, litchi, mangue, fruit de la passion' },
        price: 'Rs 250',
      },
      {
        name: { en: 'Tropical Heat', fr: 'Tropical Heat' },
        desc: { en: 'Passion fruit, lime, a spark of heat', fr: 'Fruit de la passion, citron vert, une pointe de piment' },
        price: 'Rs 400',
      },
      {
        name: { en: 'Lakaaz Lamer mocktail', fr: 'Mocktail Lakaaz Lamer' },
        desc: { en: 'Blue ocean, coconut, lime, pineapple', fr: 'Note océane, coco, citron vert, ananas' },
        price: 'Rs 400',
      },
      {
        name: { en: 'Coco Mango Crush', fr: 'Coco Mango Crush' },
        desc: { en: 'Mango, coconut, crushed ice', fr: 'Mangue, coco, glace pilée' },
        price: 'Rs 400',
      },
      {
        name: { en: 'Virgin mojitos', fr: 'Mojitos virgin' },
        desc: { en: 'Classic, passion, red fruits, Blue Hawaiian, Piña Colada', fr: 'Classique, passion, fruits rouges, Blue Hawaiian, Piña Colada' },
        price: 'Rs 350–375',
      },
      {
        name: { en: 'Coffee & infusions', fr: 'Cafés & infusions' },
        desc: { en: 'Espresso to cappuccino, mint, verbena, chamomile, linden, red fruits', fr: 'De l’espresso au cappuccino, menthe, verveine, camomille, tilleul, fruits rouges' },
        price: 'Rs 150–300',
      },
    ],
  },
]

export const EXTRAS = [
  { en: 'Salad', fr: 'Salade', price: 'Rs 160' },
  { en: 'Rice', fr: 'Riz', price: 'Rs 100' },
  { en: 'Saffron rice', fr: 'Riz safrané', price: 'Rs 100' },
  { en: 'Mash', fr: 'Purée', price: 'Rs 160' },
  { en: 'Fries', fr: 'Frites', price: 'Rs 125' },
]

export const copy = {
  nav: {
    home: { en: 'Home', fr: 'Accueil' },
    menu: { en: 'Menu', fr: 'Carte' },
    story: { en: 'Our story', fr: 'Notre histoire' },
    gallery: { en: 'Gallery', fr: 'Galerie' },
    reserve: { en: 'Reserve', fr: 'Réserver' },
  },
  cta: {
    book: { en: 'Book a table', fr: 'Réserver une table' },
    menu: { en: 'See the menu', fr: 'Voir la carte' },
    whatsapp: { en: 'WhatsApp us', fr: 'WhatsApp' },
    call: { en: 'Call now', fr: 'Appeler' },
    directions: { en: 'Get directions', fr: 'Itinéraire' },
    order: { en: 'Order for pickup', fr: 'Commander à emporter' },
  },
  hero: {
    kicker: { en: 'Grand Baie · House of the sea', fr: 'Grand Baie · La maison de la mer' },
    title: { en: 'From the counter to the plate, while the catch is still cold.', fr: 'Du comptoir à l’assiette, tant que la pêche est encore froide.' },
    sub: {
      en: 'A fish shop and a restaurant under one roof. Choose today’s catch, watch it filleted, then sit down to a meal cooked minutes later.',
      fr: 'Poissonnerie et restaurant sous le même toit. Choisissez le poisson du jour, voyez-le préparé, puis passez à table quelques minutes plus tard.',
    },
  },
  hoursLabel: { en: 'Hours', fr: 'Horaires' },
  openNow: { en: 'Open now', fr: 'Ouvert maintenant' },
  closedNow: { en: 'Closed right now', fr: 'Fermé pour le moment' },
  mondayNote: {
    en: 'Restaurant closed Mondays · fish shop still open from 9:00',
    fr: 'Restaurant fermé le lundi · poissonnerie ouverte dès 9:00',
  },
  hours: {
    shop: { en: 'Fish shop', fr: 'Poissonnerie' },
    shopTime: { en: '09:00 · seven days', fr: '09:00 · tous les jours' },
    lunch: { en: 'Lunch', fr: 'Déjeuner' },
    lunchTime: { en: '12:00 – 15:00', fr: '12:00 – 15:00' },
    dinner: { en: 'Dinner', fr: 'Dîner' },
    dinnerTime: { en: '18:00 – 22:00', fr: '18:00 – 22:00' },
    closed: { en: 'Restaurant closed Monday', fr: 'Restaurant fermé le lundi' },
  },
  welcome: {
    kicker: { en: 'The idea', fr: 'L’idée' },
    title: { en: 'See the fish. Choose it. Eat it.', fr: 'Voir le poisson. Le choisir. Le déguster.' },
    body: {
      en: 'Lakaaz Lamer is a Mauritian Creole name that simply means house of the sea. The shop and the dining room share the same ice, the same knives, and the same family that has been landing fish for two generations.',
      fr: 'Lakaaz Lamer, en créole mauricien, veut dire la maison de la mer. La poissonnerie et la salle partagent la même glace, les mêmes couteaux, et la même famille qui ramène le poisson depuis deux générations.',
    },
  },
  pillars: [
    {
      icon: 'fish',
      title: { en: 'Fish shop', fr: 'Poissonnerie' },
      body: {
        en: 'Daily catch on ice from 9:00. Take it home, or send it straight to the kitchen.',
        fr: 'Pêche du jour sur glace dès 9:00. À emporter, ou directement en cuisine.',
      },
    },
    {
      icon: 'catch',
      title: { en: 'Live cutting', fr: 'Découpe en direct' },
      body: {
        en: 'Your fish is cleaned, filleted and portioned at the counter — no mystery, no waiting overnight.',
        fr: 'Votre poisson est vidé, fileté et portionné au comptoir — sans mystère, sans attendre au lendemain.',
      },
    },
    {
      icon: 'prawn',
      title: { en: 'Live cooking', fr: 'Cuisine minute' },
      body: {
        en: 'Grill, lemon butter, garlic butter or Creole rougaille. The plate leaves the fire, not a holding tray.',
        fr: 'Grillade, beurre citron, beurre d’ail ou rougaille créole. L’assiette quitte le feu, pas un plateau de maintien.',
      },
    },
    {
      icon: 'table',
      title: { en: 'Dine in', fr: 'À table' },
      body: {
        en: 'A warm room at Lifestyle Boulevard for lunch, dinner, family plates and the seafood boat.',
        fr: 'Une salle chaleureuse à Lifestyle Boulevard pour le déjeuner, le dîner, les tables de famille et le bateau de fruits de mer.',
      },
    },
  ],
  featuredKicker: { en: 'On the table', fr: 'À table' },
  featuredTitle: { en: 'A menu that follows the tide', fr: 'Une carte qui suit la marée' },
  promo: {
    kicker: { en: 'On the table', fr: 'À table' },
    offer: { en: 'Order a seafood boat, get a free burger', fr: 'Un bateau, un burger offert' },
    body: {
      en: 'Share the house boat and a fish burger is on us. Ask for the offer when you sit down.',
      fr: 'Partagez le bateau signature, le fish burger est offert. Demandez l’offre à table.',
    },
    cta: { en: 'See the boat on the menu', fr: 'Voir le bateau sur la carte' },
    close: { en: 'Close offer', fr: 'Fermer l’offre' },
    badge: { en: 'Free burger', fr: 'Burger offert' },
    alt: {
      en: 'Order a Seafood Boat, get a free burger at Lakaaz Lamer',
      fr: 'Commandez un bateau de fruits de mer, un burger offert chez Lakaaz Lamer',
    },
  },
  featured: [
    {
      image: 'tuna',
      name: { en: 'Fresh tuna tartare', fr: 'Tartare de thon frais' },
      meta: { en: 'Starter · Rs 650', fr: 'Entrée · Rs 650' },
      desc: { en: 'Knife-cut tuna, avocado, a squeeze of lime. Simple because the fish does the work.', fr: 'Thon au couteau, avocat, un filet de citron vert. Simple, parce que le poisson fait le travail.' },
    },
    {
      image: 'prawns',
      name: { en: 'Garlic butter prawns', fr: 'Crevettes au beurre d’ail' },
      meta: { en: 'Main · Rs 900', fr: 'Plat · Rs 900' },
      desc: { en: 'Roasted in garlic butter, with saffron rice on the side.', fr: 'Rôties au beurre d’ail, riz safrané à côté.' },
    },
    {
      image: 'platter',
      name: { en: 'Seafood boat', fr: 'Bateau de fruits de mer' },
      meta: { en: 'For two · Rs 4,000', fr: 'Pour deux · Rs 4 000' },
      desc: { en: 'Capitaine, prawns, tiger prawns, octopus, calamari and mussels. The house signature.', fr: 'Capitaine, crevettes, gambas, ourite, calamars et moules. La signature de la maison.' },
    },
  ] as const,
  shop: {
    kicker: { en: 'Gian & Sons', fr: 'Gian & Sons' },
    title: { en: 'The fishery is not a backdrop. It is the kitchen’s first room.', fr: 'La poissonnerie n’est pas un décor. C’est la première pièce de la cuisine.' },
    body: {
      en: 'Behind Lakaaz Lamer is Gian & Sons, the family supply house that grew from Balee’s father — a fisherman — into the restaurant’s parent company. The same people who know the boats still choose what lands on the ice each morning.',
      fr: 'Derrière Lakaaz Lamer, Gian & Sons : la maison familiale née du père de Balee, pêcheur, devenue maison mère du restaurant. Ceux qui connaissent les bateaux choisissent encore ce qui arrive sur la glace chaque matin.',
    },
    points: [
      { en: 'Yellowfin, capitaine, babone and the day’s mixed catch', fr: 'Thon albacore, capitaine, babone et pêche mixte du jour' },
      { en: 'Oysters and sea urchin by the piece, larger orders on request', fr: 'Huîtres et oursins à la pièce, plus grandes commandes sur demande' },
      { en: 'Cleaned, filleted or whole — you decide at the counter', fr: 'Nettoyé, fileté ou entier — vous décidez au comptoir' },
    ],
  },
  visit: {
    kicker: { en: 'Visit', fr: 'Venir' },
    title: { en: 'Lifestyle Boulevard, Grand Baie', fr: 'Lifestyle Boulevard, Grand Baie' },
    body: {
      en: 'We are on Sottise Road, a short hop from the Grand Baie lagoon. Delivery and collection are available when you want the catch at home.',
      fr: 'Nous sommes sur Sottise Road, tout près du lagon de Grand Baie. Livraison et Click & Collect pour ramener la pêche à la maison.',
    },
    delivery: { en: 'We bring it fresh, to your door.', fr: 'On vous l’apporte, encore frais, jusqu’à chez vous.' },
  },
  menuPage: {
    kicker: { en: 'The card', fr: 'La carte' },
    title: { en: 'Always fresh. Never fixed.', fr: 'Toujours frais. Jamais figé.' },
    sub: {
      en: 'Prices in Mauritian rupees. Catch of the day changes with the boats. Lunch-only dishes are marked.',
      fr: 'Prix en roupies mauriciennes. Le poisson du jour suit les bateaux. Les plats du déjeuner sont indiqués.',
    },
    extras: { en: 'Sides', fr: 'Suppléments' },
    all: { en: 'All', fr: 'Tout' },
  },
  tags: {
    veg: { en: 'Vegetarian', fr: 'Végétarien' },
    lunch: { en: 'Lunch only', fr: 'Déjeuner seulement' },
    share: { en: 'To share', fr: 'À partager' },
    kids: { en: 'Kids', fr: 'Enfants' },
    mp: { en: 'Market price', fr: 'Prix du marché' },
  },
  story: {
    kicker: { en: 'Family', fr: 'Famille' },
    title: { en: 'A fisherman’s house, opened for guests.', fr: 'La maison d’un pêcheur, ouverte aux convives.' },
    lead: {
      en: 'The story starts at sea, not in a brand workshop. Balee’s father fished. Gian & Sons grew around that work: landing, selecting, supplying. Lakaaz Lamer is the public room of that private craft — a place to buy the catch, watch it prepared, and eat it the same day.',
      fr: 'L’histoire commence en mer, pas dans un atelier de marque. Le père de Balee pêchait. Gian & Sons s’est construit autour de ce geste : ramener, choisir, fournir. Lakaaz Lamer est la salle publique de ce métier privé — un lieu pour acheter la pêche, la voir préparée, et la manger le jour même.',
    },
    papa: {
      title: { en: 'Papa Balee', fr: 'Papa Balee' },
      body: {
        en: 'The thread that runs from the boat to this dining room. Years of fishing taught a simple rule: if you would not take it home, do not put it on the ice.',
        fr: 'Le fil qui relie le bateau à cette salle. Des années de pêche ont enseigné une règle simple : si vous ne l’emporteriez pas chez vous, ne le mettez pas sur la glace.',
      },
    },
    teamTitle: { en: 'The people behind the ice', fr: 'Les gens derrière la glace' },
    team: [
      {
        name: 'Balee Coonee',
        role: { en: 'Founder & direction', fr: 'Fondateur & direction' },
        bio: {
          en: 'Shapes the concept, the guest experience, and the link between Gian & Sons and the restaurant.',
          fr: 'Porte le concept, l’expérience des convives, et le lien entre Gian & Sons et le restaurant.',
        },
      },
      {
        name: 'Simla K.',
        role: { en: 'Operations', fr: 'Opérations' },
        bio: {
          en: 'Keeps the shop, the floor and the kitchen moving so a busy Grand Baie service stays calm.',
          fr: 'Fait tourner la poissonnerie, la salle et la cuisine pour qu’un service chargé à Grand Baie reste fluide.',
        },
      },
    ],
  },
  gallery: {
    kicker: { en: 'Atmosphere', fr: 'Ambiance' },
    title: { en: 'Ice, fire, and a table by the boulevard.', fr: 'La glace, le feu, et une table sur le boulevard.' },
    sub: {
      en: 'A look at the food, the room, and the work that happens before the plate arrives.',
      fr: 'Un aperçu des plats, de la salle, et du travail avant l’arrivée de l’assiette.',
    },
  },
  reserve: {
    kicker: { en: 'Reservations', fr: 'Réservations' },
    title: { en: 'Tell us when you are coming.', fr: 'Dites-nous quand vous venez.' },
    sub: {
      en: 'Pick a seating, leave your details, and we email the table request to the restaurant.',
      fr: 'Choisissez un service, laissez vos coordonnées, et nous envoyons la demande par email au restaurant.',
    },
    stepsIntro: { en: 'Book a table in a few simple steps', fr: 'Réservez une table en quelques étapes' },
    whenTitle: { en: 'When would you like your reservation?', fr: 'Quand souhaitez-vous venir ?' },
    detailsTitle: { en: 'Your details', fr: 'Vos coordonnées' },
    confirmTitle: { en: 'Confirm your reservation', fr: 'Confirmez votre réservation' },
    guests: { en: 'Number of guests', fr: 'Nombre de convives' },
    guestsUnit: { en: 'Guests', fr: 'Convives' },
    selectDate: { en: 'Select date', fr: 'Choisir la date' },
    selectTime: { en: 'Select time', fr: 'Choisir l’heure' },
    pickDateFirst: { en: 'Choose a date to see lunch and dinner seatings.', fr: 'Choisissez une date pour voir les services déjeuner et dîner.' },
    noSlots: { en: 'No seatings left this day. Try another date, or call us.', fr: 'Plus de service ce jour-là. Essayez une autre date, ou appelez-nous.' },
    partyNote: { en: 'Tables of 8 or more are easier to confirm by phone.', fr: 'Pour 8 convives ou plus, un appel confirme plus facilement la table.' },
    next: { en: 'Next', fr: 'Suivant' },
    back: { en: 'Back', fr: 'Retour' },
    contactTitle: { en: 'Contact information', fr: 'Coordonnées' },
    contactSub: { en: 'We’ll use this to confirm your reservation.', fr: 'Nous l’utiliserons pour confirmer votre réservation.' },
    fullName: { en: 'Full name', fr: 'Nom complet' },
    phone: { en: 'Phone number', fr: 'Numéro de téléphone' },
    email: { en: 'Email (optional)', fr: 'Email (facultatif)' },
    emailShort: { en: 'Email', fr: 'Email' },
    notes: { en: 'Occasion or notes', fr: 'Occasion ou notes' },
    notesOptional: { en: 'Special requests (optional)', fr: 'Demandes particulières (facultatif)' },
    notesPlaceholder: { en: 'Any special requests or notes…', fr: 'Allergie, occasion, demande particulière…' },
    summaryTitle: { en: 'Reservation summary', fr: 'Récapitulatif' },
    date: { en: 'Date', fr: 'Date' },
    time: { en: 'Time', fr: 'Heure' },
    confirmCta: { en: 'Confirm reservation', fr: 'Confirmer la réservation' },
    sending: { en: 'Sending…', fr: 'Envoi…' },
    emailNote: {
      en: 'Confirming emails the restaurant. Same-day lunch is often faster by phone:',
      fr: 'La confirmation envoie un email au restaurant. Pour un déjeuner le jour même, un appel est souvent plus rapide :',
    },
    sendError: {
      en: 'The email did not go through. Try again, or call the restaurant.',
      fr: 'L’email n’est pas parti. Réessayez, ou appelez le restaurant.',
    },
    activateInbox: {
      en: 'Check mihirrgangadeen@gmail.com for a one-time activation link, then confirm again. Later bookings will arrive automatically.',
      fr: 'Ouvrez mihirrgangadeen@gmail.com pour le lien d’activation unique, puis confirmez à nouveau. Les réservations suivantes arriveront ensuite automatiquement.',
    },
    sentTitle: { en: 'Your reservation request is on its way.', fr: 'Votre demande de réservation est partie.' },
    sentBody: {
      en: 'We emailed the restaurant. Keep your phone nearby — they will confirm the table.',
      fr: 'Nous avons envoyé un email au restaurant. Gardez votre téléphone à portée — ils confirmeront la table.',
    },
    another: { en: 'Make another booking', fr: 'Faire une autre réservation' },
    prevMonth: { en: 'Previous month', fr: 'Mois précédent' },
    nextMonth: { en: 'Next month', fr: 'Mois suivant' },
    lunchSlot: { en: 'Lunch', fr: 'Déjeuner' },
    dinnerSlot: { en: 'Dinner', fr: 'Dîner' },
  },
  footer: {
    blurb: {
      en: 'Fresh seafood restaurant & fish shop · Grand Baie, Mauritius',
      fr: 'Restaurant de fruits de mer & poissonnerie · Grand Baie, Maurice',
    },
    rights: { en: 'Concept redesign. Not the official live site.', fr: 'Refonte conceptuelle. Ce n’est pas le site officiel.' },
  },
}

export const GALLERY = [
  { src: IMAGES.platter, alt: 'Seafood boat platter at the table', cat: 'dishes' },
  { src: IMAGES.grill, alt: 'Whole grilled fish with lemon', cat: 'dishes' },
  { src: IMAGES.grillPlatter, alt: 'Grilled fish with salad', cat: 'dishes' },
  { src: IMAGES.grillTable, alt: 'Grilled fish served with fries', cat: 'dishes' },
  { src: IMAGES.tuna, alt: 'Fresh tuna tartare', cat: 'dishes' },
  { src: IMAGES.seared, alt: 'Sesame-crusted seared tuna', cat: 'dishes' },
  { src: IMAGES.prawns, alt: 'Crispy prawns', cat: 'dishes' },
  { src: IMAGES.shop, alt: 'Daily catch at the fish counter', cat: 'shop' },
  { src: IMAGES.ice, alt: 'Red snapper on ice', cat: 'shop' },
  { src: IMAGES.market, alt: 'The day’s catch at Gian & Sons', cat: 'shop' },
  { src: IMAGES.boat, alt: 'Landing fish at sea', cat: 'shop' },
  { src: IMAGES.chef, alt: 'Fish roasting in the kitchen oven', cat: 'venue' },
  { src: IMAGES.venue, alt: 'The dining room at Lakaaz Lamer', cat: 'venue' },
  { src: IMAGES.dining, alt: 'A table set for dinner', cat: 'venue' },
] as const
