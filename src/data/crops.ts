export interface CropInfo {
  id: string;
  name: string;
  category: string;
  season: string;
  plowing: string;
  nursery: string;
  varieties: string;
  seedRate: string;
  seedTreatment: string;
  sowing: string;
  fertilizer: string;
  irrigation: string;
  harvesting: string;
  icon: string;
}

export const cropCategories = [
  { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
  { id: 'cereals', name: 'Cereals', icon: '🌾' },
  { id: 'oilseeds', name: 'Oilseeds', icon: '🌻' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'cash-crops', name: 'Cash Crops', icon: '💰' },
  { id: 'spices', name: 'Spices', icon: '🌶️' },
  { id: 'pulses', name: 'Pulses', icon: '🫘' },
  { id: 'flowers', name: 'Flowers', icon: '🌸' },
  { id: 'hydroponic', name: 'Hydroponic', icon: '🧪' },
];

export const cropsData: CropInfo[] = [
  // Vegetables
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetables',
    season: 'Kharif & Rabi',
    plowing: '2–3 deep ploughings with FYM',
    nursery: '25–30 days in raised beds',
    varieties: 'Pusa Ruby, Arka Vikas',
    seedRate: '300–400 g/ha',
    seedTreatment: 'Fungicide + Trichoderma',
    sowing: 'Transplant seedlings at 60×45 cm spacing',
    fertilizer: '100:50:50 NPK kg/ha',
    irrigation: 'At 7–10 day intervals',
    harvesting: '70–90 days after transplanting',
    icon: '🍅'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'vegetables',
    season: 'Winter crop',
    plowing: 'Fine tilth with organic manure',
    nursery: 'Direct sowing, no transplant',
    varieties: 'Pusa Kesar, Nantes',
    seedRate: '4–5 kg/ha',
    seedTreatment: 'Warm water soaking',
    sowing: 'Line sowing, 30 cm apart',
    fertilizer: '40:50:100 NPK kg/ha',
    irrigation: 'Light frequent irrigation',
    harvesting: '90–100 days',
    icon: '🥕'
  },
  {
    id: 'brinjal',
    name: 'Brinjal (Eggplant)',
    category: 'vegetables',
    season: 'Year-round in tropical areas',
    plowing: '2–3 ploughings with FYM',
    nursery: '30–40 day seedlings',
    varieties: 'Pusa Purple, Arka Navneet',
    seedRate: '300–400 g/ha',
    seedTreatment: 'Bavistin dressing',
    sowing: 'Transplant at 60×45 cm spacing',
    fertilizer: '100:60:80 NPK kg/ha',
    irrigation: 'At 7-day intervals',
    harvesting: '120–130 days',
    icon: '🍆'
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'vegetables',
    season: 'Rabi',
    plowing: 'Fine tilth with FYM',
    nursery: 'Tubers planted directly',
    varieties: 'Kufri Jyoti, Kufri Badshah',
    seedRate: '2.5 t/ha tubers',
    seedTreatment: 'Fungicide dipping',
    sowing: '60×20 cm spacing',
    fertilizer: '150:100:100 NPK kg/ha',
    irrigation: 'At critical stages (tuber initiation)',
    harvesting: '90–120 days',
    icon: '🥔'
  },
  {
    id: 'bitter-gourd',
    name: 'Bitter Gourd',
    category: 'vegetables',
    season: 'Summer & Rainy',
    plowing: 'Raised beds with FYM',
    nursery: 'Direct sowing',
    varieties: 'Pusa Do Mausami, Arka Harit',
    seedRate: '4–5 kg/ha',
    seedTreatment: 'Hot water soaking',
    sowing: '2 seeds/hill, 1.5 m apart',
    fertilizer: '100:50:50 NPK kg/ha',
    irrigation: 'At 7-day intervals',
    harvesting: '60–70 days',
    icon: '🥒'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    category: 'vegetables',
    season: 'Summer crop',
    plowing: 'Fine tilth, raised beds',
    nursery: 'Direct sowing',
    varieties: 'Poinsette, Malini',
    seedRate: '3–4 kg/ha',
    seedTreatment: 'Trichoderma powder',
    sowing: '60×45 cm spacing',
    fertilizer: '80:60:40 NPK kg/ha',
    irrigation: 'At 5–6 day intervals',
    harvesting: '50–60 days',
    icon: '🥒'
  },
  // Cereals
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    category: 'cereals',
    season: 'Kharif',
    plowing: 'Puddling in standing water',
    nursery: '25–30 day seedlings',
    varieties: 'Jaya, IR-64',
    seedRate: '30–35 kg/ha',
    seedTreatment: 'Salt solution + fungicide',
    sowing: 'Transplanting 20×15 cm spacing',
    fertilizer: '120:60:40 NPK kg/ha',
    irrigation: 'Continuous flooding',
    harvesting: '120–150 days',
    icon: '🌾'
  }
];

export const getCropsByCategory = (categoryId: string): CropInfo[] => {
  return cropsData.filter(crop => crop.category === categoryId);
};

export const getCropById = (id: string): CropInfo | undefined => {
  return cropsData.find(crop => crop.id === id);
};