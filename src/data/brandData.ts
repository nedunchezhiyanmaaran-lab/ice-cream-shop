export interface Flavor {
  id: string;
  name: string;
  italianName: string;
  tagline: string;
  description: string;
  tastingNotes: string[];
  origin: string;
  dairyFree: boolean;
  vegan: boolean;
  glutenFree: boolean;
  nutFree: boolean;
  pairWith: string;
  image: string;
  accentColor: string;
  bgTone: string;
  badge?: string;
  pricePerScoop: number;
}

export interface MenuItem {
  id: string;
  name: string;
  italianName?: string;
  category: 'scoops' | 'pints' | 'sundaes' | 'waffles' | 'sorbets';
  price: number;
  description: string;
  image: string;
  badge?: string;
  dietary: {
    vegan?: boolean;
    dairyFree?: boolean;
    glutenFree?: boolean;
    nutFree?: boolean;
  };
  sizes?: { name: string; price: number }[];
}

export const SIGNATURE_FLAVORS: Flavor[] = [
  {
    id: 'sicilian-pistachio',
    name: 'Sicilian Bronte Pistachio',
    italianName: 'Pistacchio Verde di Bronte DOP',
    tagline: 'Vibrant, slow-roasted, deeply nutty with a velvety green hue.',
    description: 'Harvested exclusively every two years from volcanic slopes in Bronte, Sicily. Pure stone-ground paste infused into 24-hour aged sweet Jersey cream with zero artificial colorants.',
    tastingNotes: ['Toasted volcanic nut', 'Warm honey', 'Subtle sea salt', 'Buttery finish'],
    origin: 'Bronte, Sicily (DOP Protected)',
    dairyFree: false,
    vegan: false,
    glutenFree: true,
    nutFree: false,
    pairWith: 'Belgian Dark Chocolate or Fleur de Sel Caramel',
    image: '/images/veluto-pistachio.jpg',
    accentColor: '#D7E4B5',
    bgTone: '#F3F7EC',
    badge: 'House Signature',
    pricePerScoop: 5.50,
  },
  {
    id: 'belgian-dark-chocolate',
    name: 'Single-Origin Belgian Chocolate',
    italianName: 'Cioccolato Fondente 72%',
    tagline: 'Intense, bittersweet, deeply comforting with molten cocoa finish.',
    description: 'Crafted from 72% Criollo cocoa beans melted gently in copper pans with whole raw dairy. Dense, low-overrun texture that melts into pure liquid velvet on the tongue.',
    tastingNotes: ['Roasted cocoa nib', 'Dark cherry', 'Brown butter', 'Subtle oak smoke'],
    origin: 'Hand-selected Belgian Fairtrade Cocoa',
    dairyFree: false,
    vegan: false,
    glutenFree: true,
    nutFree: true,
    pairWith: 'Fresh Wild Strawberry & Bronte Pistachio',
    image: '/images/hero-three-scoop-coupe.jpg',
    accentColor: '#50352F',
    bgTone: '#F5F0EE',
    badge: 'Award Winner',
    pricePerScoop: 5.50,
  },
  {
    id: 'wild-strawberry',
    name: 'Wild Strawberry & Fior di Latte',
    italianName: 'Fragola di Bosco & Panna Fresca',
    tagline: 'Sweet woodland berries rippled through pristine cultured sweet cream.',
    description: 'Picked at peak morning ripeness, macerated with Meyer lemon peel and raw cane sugar, then layered in ribbons through our signature pristine pasture cream.',
    tastingNotes: ['Fresh tart berry', 'Wild honey', 'Rich double cream', 'Floral lemon zest'],
    origin: 'Mara des Bois Strawberries, Local Orchards',
    dairyFree: false,
    vegan: false,
    glutenFree: true,
    nutFree: true,
    pairWith: 'Bourbon Madagascar Vanilla',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=900&auto=format&fit=crop',
    accentColor: '#E9A5A1',
    bgTone: '#FDF3F2',
    badge: 'Seasonal Harvest',
    pricePerScoop: 5.50,
  },
  {
    id: 'bourbon-vanilla',
    name: 'Madagascar Bourbon Vanilla',
    italianName: 'Vaniglia Nera del Madagascar',
    tagline: 'Speckled with authentic black vanilla bean caviar and warm amber warmth.',
    description: 'Whole plump cured Bourbon vanilla pods scraped by hand and steeped slowly for 36 hours. Pure, honest, aromatic simplicity that proves why classic done right is supreme.',
    tastingNotes: ['Smoky amber', 'Warm caramel', 'Floral blossom', 'Creamy custard'],
    origin: 'Sava Region, Madagascar',
    dairyFree: false,
    vegan: false,
    glutenFree: true,
    nutFree: true,
    pairWith: 'Warm hand-rolled waffle cones and hot chocolate sauce',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=900&auto=format&fit=crop',
    accentColor: '#F4D88B',
    bgTone: '#FDF9ED',
    pricePerScoop: 5.00,
  },
  {
    id: 'fleur-de-sel-caramel',
    name: 'Fleur de Sel Salted Caramel',
    italianName: 'Caramello Salato di Guérande',
    tagline: 'Deeply caramelized organic cane sugar kissed with Brittany sea salt crystals.',
    description: 'Cooked in heavy-bottomed pans until deep amber, enriched with cultured butter and finished with crunchy Fleur de Sel crystals that dance against sweet cream.',
    tastingNotes: ['Burnt sugar', 'Cultured butter', 'Crisp mineral salt', 'Toffee'],
    origin: 'Guérande Sea Salt & Brittany Butter',
    dairyFree: false,
    vegan: false,
    glutenFree: true,
    nutFree: true,
    pairWith: 'Single-Origin Belgian Chocolate',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=900&auto=format&fit=crop',
    accentColor: '#C7A680',
    bgTone: '#FBF5EE',
    badge: 'Chef Favorite',
    pricePerScoop: 5.50,
  },
  {
    id: 'alphonso-mango-sorbet',
    name: 'Alphonso Mango & Passion Sorbet',
    italianName: 'Sorbetto di Mango Alphonso',
    tagline: '100% dairy-free velvet sorbet packed with pure tropical sunshine.',
    description: 'Ratnagiri Alphonso mango pulp blended with a bright splash of tart purple passionfruit. No dairy, no artificial stabilisers — just intense fruit silkiness.',
    tastingNotes: ['Tropical floral', 'Ripe honeyed mango', 'Tart passionfruit', 'Crisp clean finish'],
    origin: 'Ratnagiri Alphonso Mangoes, India',
    dairyFree: true,
    vegan: true,
    glutenFree: true,
    nutFree: true,
    pairWith: 'Fresh Wild Strawberry & Mint',
    image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?q=80&w=900&auto=format&fit=crop',
    accentColor: '#ECC662',
    bgTone: '#FDF9EA',
    badge: 'Vegan & Dairy-Free',
    pricePerScoop: 5.50,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'single-scoop',
    name: 'Single Artisanal Scoop',
    italianName: 'Una Coppetta o Cono',
    category: 'scoops',
    price: 5.00,
    description: 'One generous scoop of any signature flavor in our house-baked butter waffle cone or biodegradable paper cup.',
    image: '/images/vero-cup.jpg',
    dietary: { glutenFree: true },
    sizes: [
      { name: 'Standard Single', price: 5.00 },
      { name: 'Double Scoop (+2.50)', price: 7.50 },
      { name: 'Tasting Flight (3 Small Scoops)', price: 9.00 },
    ],
  },
  {
    id: 'double-scoop',
    name: 'Signature Two-Flavour Cup',
    italianName: 'Due Gusti Tradizionali',
    category: 'scoops',
    price: 7.50,
    description: 'The definitive tasting experience. Choose your pairing of two signature scoops with fresh wafer garnish.',
    image: '/images/hero-three-scoop-coupe.jpg',
    badge: 'Most Popular',
    dietary: { glutenFree: true },
  },
  {
    id: 'pistachio-pint',
    name: 'Sicilian Pistachio Artisanal Pint',
    italianName: 'Vasetto Bronte 500ml',
    category: 'pints',
    price: 14.50,
    description: 'Freshly hand-packed 500ml pint of pure stone-ground Bronte pistachio gelato. Delivered in chilled insulated packaging.',
    image: '/images/creame-pint.jpg',
    badge: 'Hand-Packed',
    dietary: { glutenFree: true, nutFree: false },
  },
  {
    id: 'chocolate-pint',
    name: '72% Belgian Chocolate Pint',
    italianName: 'Vasetto Fondente 500ml',
    category: 'pints',
    price: 14.00,
    description: 'Hand-packed pint of single-origin bittersweet Belgian chocolate gelato. Ultra-dense and decadent.',
    image: '/images/creame-pint.jpg',
    dietary: { glutenFree: true, nutFree: true },
  },
  {
    id: 'vanilla-pint',
    name: 'Bourbon Vanilla Bean Pint',
    italianName: 'Vasetto Vaniglia Nera 500ml',
    category: 'pints',
    price: 13.50,
    description: 'Hand-packed pint studded with real Madagascar vanilla caviar. The quintessential pantry luxury.',
    image: '/images/creame-pint.jpg',
    dietary: { glutenFree: true, nutFree: true },
  },
  {
    id: 'affogato-al-caffe',
    name: 'Artisan Affogato al Caffè',
    italianName: 'Affogato Artigianale',
    category: 'sundaes',
    price: 8.00,
    description: 'A scoop of Madagascar Bourbon Vanilla or Bronte Pistachio drowned table-side in a double shot of hot single-origin espresso.',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=900&auto=format&fit=crop',
    dietary: { glutenFree: true },
  },
  {
    id: 'coppa-primavera',
    name: 'Coppa Primavera Sundae',
    italianName: 'Coppa della Casa',
    category: 'sundaes',
    price: 11.50,
    description: 'Wild Strawberry & Fior di Latte, toasted Sicilian pistachios, freshly whipped Chantilly cream, and warm organic strawberry coulis.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=900&auto=format&fit=crop',
    badge: 'Atelier Exclusive',
    dietary: { glutenFree: true },
  },
  {
    id: 'warm-belgian-waffle',
    name: 'Warm Liege Brioche Waffle',
    italianName: 'Cialda Calda con Gelato',
    category: 'waffles',
    price: 12.00,
    description: 'Carmelized pearl sugar waffle served hot from the press, crowned with your choice of gelato scoop and molten warm chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=900&auto=format&fit=crop',
    dietary: { nutFree: true },
  },
  {
    id: 'mango-passion-sorbet',
    name: 'Alphonso Mango Sorbet Coupe',
    italianName: 'Coppetta Sorbetto al Mango',
    category: 'sorbets',
    price: 6.00,
    description: 'Two scoops of pure dairy-free Alphonso mango & passionfruit sorbet, garnished with crushed mint leaves and lime zest.',
    image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?q=80&w=900&auto=format&fit=crop',
    badge: '100% Plant-Based',
    dietary: { vegan: true, dairyFree: true, glutenFree: true },
  },
];

export const INGREDIENT_PILLARS = [
  {
    id: 'milk',
    title: '100% Organic Pasture Milk & Cream',
    subtitle: 'From Single-Heritage Jersey Cows',
    description: 'We source exclusively from certified pasture-grazed Jersey cows. Their milk naturally contains 20% higher butterfat and A2 beta-casein, creating an unmatched velvety mouthfeel without chemical stabilizers or gums.',
    highlight: 'Never powdered. Never skimmed. Aged for 24 hours at 4°C.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop',
    tag: 'Base Foundation',
  },
  {
    id: 'pistachio',
    title: 'DOP Bronte Green Pistachios',
    subtitle: 'Grown in Volcanic Soil Beneath Mount Etna',
    description: 'Harvested only in odd-numbered years by hand from rocky volcanic terrain. Stone-ground in small batches without added oils or colorants, retaining its vivid emerald hue and deep, lingering toast.',
    highlight: '100% Pure DOP Certified from Sicily, Italy.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800&auto=format&fit=crop',
    tag: 'Direct Sourcing',
  },
  {
    id: 'cocoa',
    title: '72% Single-Origin Criollo Cacao',
    subtitle: 'Fair-Trade Traceable Cocoa Beans',
    description: 'Rare Criollo beans roasted lightly to preserve delicate fruity and wine-like floral aromas. We melt the chocolate directly into warm cream rather than using defatted cocoa powder.',
    highlight: 'Zero palm oil. Pure cocoa butter richness.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop',
    tag: 'Craft Cocoa',
  },
  {
    id: 'vanilla',
    title: 'Whole Bourbon Vanilla Caviar',
    subtitle: 'Sambava Cured Pods, Madagascar',
    description: 'Sun-cured for three months until crystalline vanillin frosts the pod surface. Each pod is split and scraped by hand in our kitchen, yielding millions of fragrant aromatic seeds in every single batch.',
    highlight: 'Real seed caviar in every scoop. No synthetic extract.',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=800&auto=format&fit=crop',
    tag: 'Pure Pods',
  },
];

export const CRAFT_STEPS = [
  {
    step: '01',
    title: '24-Hour Cold Aging',
    subtitle: 'The Secret of True Texture',
    description: 'Before churn, our fresh cream and ingredient bases rest at precisely 3.8°C for a full day. This allows milk proteins to fully hydrate and fat globules to crystallize into microscopic velvet.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=900&auto=format&fit=crop',
    detail: '3.8°C Micro-Chill',
  },
  {
    step: '02',
    title: 'Ultra-Low Overrun Churning',
    subtitle: 'Dense, Slow, Uncompromising',
    description: 'Commercial ice cream is pumped with up to 100% air. We churn in artisanal Italian vertical batch freezers with only 22% overrun — ensuring every spoonful is dense, intensely rich, and slow-melting.',
    image: '/images/hero-three-scoop-coupe.jpg',
    detail: 'Only 22% Micro-Air Ratio',
  },
  {
    step: '03',
    title: 'Hand-Rolled Waffle Cones',
    subtitle: 'Freshly Baked Every 30 Minutes',
    description: 'Folded on traditional cast-iron presses using cultured butter, brown sugar, and Madagascar vanilla aroma. Golden, crunchy, and still warm when cradling your scoop.',
    image: '/images/brand-moodboard.jpg',
    detail: 'Baked Fresh In-Store Daily',
  },
];

export const STORE_INFO = {
  name: 'CREAME Atelier & Tasting Room',
  tagline: 'Freshly churned in small batches every morning.',
  address: '142 Artisan Row, SoHo Design Quarter',
  city: 'New York, NY 10013',
  phone: '+1 (212) 555-0194',
  email: 'atelier@creamegelato.com',
  hours: [
    { days: 'Monday – Thursday', time: '12:00 PM – 10:00 PM' },
    { days: 'Friday – Saturday', time: '11:00 AM – 11:30 PM' },
    { days: 'Sunday', time: '11:00 AM – 10:00 PM' },
  ],
  status: 'Open today until 10:00 PM',
  coordinates: '40.7223° N, 73.9982° W',
};
