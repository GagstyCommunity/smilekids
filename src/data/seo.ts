export interface SeoCity { slug: string; name: string; country: string; region: string; }

// Curated cities: USA, UK, Canada, Germany, Italy, Australia, New Zealand + other European
export const SEO_CITIES: SeoCity[] = [
  // USA
  { slug: "new-york", name: "New York", country: "United States", region: "North America" },
  { slug: "los-angeles", name: "Los Angeles", country: "United States", region: "North America" },
  { slug: "chicago", name: "Chicago", country: "United States", region: "North America" },
  { slug: "houston", name: "Houston", country: "United States", region: "North America" },
  { slug: "miami", name: "Miami", country: "United States", region: "North America" },
  { slug: "san-francisco", name: "San Francisco", country: "United States", region: "North America" },
  // UK
  { slug: "london", name: "London", country: "United Kingdom", region: "Europe" },
  { slug: "manchester", name: "Manchester", country: "United Kingdom", region: "Europe" },
  { slug: "edinburgh", name: "Edinburgh", country: "United Kingdom", region: "Europe" },
  { slug: "birmingham", name: "Birmingham", country: "United Kingdom", region: "Europe" },
  // Canada
  { slug: "toronto", name: "Toronto", country: "Canada", region: "North America" },
  { slug: "vancouver", name: "Vancouver", country: "Canada", region: "North America" },
  { slug: "montreal", name: "Montreal", country: "Canada", region: "North America" },
  // Germany
  { slug: "berlin", name: "Berlin", country: "Germany", region: "Europe" },
  { slug: "munich", name: "Munich", country: "Germany", region: "Europe" },
  { slug: "hamburg", name: "Hamburg", country: "Germany", region: "Europe" },
  { slug: "frankfurt", name: "Frankfurt", country: "Germany", region: "Europe" },
  // Italy
  { slug: "rome", name: "Rome", country: "Italy", region: "Europe" },
  { slug: "milan", name: "Milan", country: "Italy", region: "Europe" },
  { slug: "florence", name: "Florence", country: "Italy", region: "Europe" },
  { slug: "naples", name: "Naples", country: "Italy", region: "Europe" },
  // Australia
  { slug: "sydney", name: "Sydney", country: "Australia", region: "Oceania" },
  { slug: "melbourne", name: "Melbourne", country: "Australia", region: "Oceania" },
  { slug: "brisbane", name: "Brisbane", country: "Australia", region: "Oceania" },
  { slug: "perth", name: "Perth", country: "Australia", region: "Oceania" },
  // New Zealand
  { slug: "auckland", name: "Auckland", country: "New Zealand", region: "Oceania" },
  { slug: "wellington", name: "Wellington", country: "New Zealand", region: "Oceania" },
  { slug: "christchurch", name: "Christchurch", country: "New Zealand", region: "Oceania" },
  // Other Europe
  { slug: "paris", name: "Paris", country: "France", region: "Europe" },
  { slug: "lyon", name: "Lyon", country: "France", region: "Europe" },
  { slug: "madrid", name: "Madrid", country: "Spain", region: "Europe" },
  { slug: "barcelona", name: "Barcelona", country: "Spain", region: "Europe" },
  { slug: "amsterdam", name: "Amsterdam", country: "Netherlands", region: "Europe" },
  { slug: "rotterdam", name: "Rotterdam", country: "Netherlands", region: "Europe" },
  { slug: "brussels", name: "Brussels", country: "Belgium", region: "Europe" },
  { slug: "vienna", name: "Vienna", country: "Austria", region: "Europe" },
  { slug: "zurich", name: "Zurich", country: "Switzerland", region: "Europe" },
  { slug: "geneva", name: "Geneva", country: "Switzerland", region: "Europe" },
  { slug: "stockholm", name: "Stockholm", country: "Sweden", region: "Europe" },
  { slug: "copenhagen", name: "Copenhagen", country: "Denmark", region: "Europe" },
  { slug: "oslo", name: "Oslo", country: "Norway", region: "Europe" },
  { slug: "helsinki", name: "Helsinki", country: "Finland", region: "Europe" },
  { slug: "dublin", name: "Dublin", country: "Ireland", region: "Europe" },
  { slug: "lisbon", name: "Lisbon", country: "Portugal", region: "Europe" },
  { slug: "warsaw", name: "Warsaw", country: "Poland", region: "Europe" },
  { slug: "prague", name: "Prague", country: "Czechia", region: "Europe" },
  { slug: "athens", name: "Athens", country: "Greece", region: "Europe" },
];

export interface SeoTopic { slug: string; title: string; description: string; intro: string; tips: string[]; }
export const SEO_TOPICS: SeoTopic[] = [
  { slug: "cavity-prevention", title: "Cavity Prevention Guide", description: "Daily habits, foods, and AI tools to lower cavity risk for kids and adults.",
    intro: "Cavities form when sugar feeds bacteria that erode enamel. Prevention comes down to consistent brushing, flossing, smarter food choices, and regular check-ins.",
    tips: ["Brush twice daily with fluoride toothpaste","Floss once a day to remove trapped food","Limit sticky and sugary snacks","Drink water after acidic foods","Use Denta.Health's AI scan to spot risk early"] },
  { slug: "teeth-whitening", title: "Safe Teeth Whitening at Home", description: "Wellness-friendly approaches to a brighter smile without damaging enamel.",
    intro: "Whitening works best when paired with healthy habits. Avoid abrasive DIY methods—our AI helps you track stain causes and progress safely.",
    tips: ["Use a straw with coffee, tea, and wine","Rinse with water after staining drinks","Choose enamel-safe whitening toothpaste","Avoid lemon/charcoal trends","Track progress with monthly photos"] },
  { slug: "braces-and-aligners", title: "Braces and Aligners: What to Expect", description: "AI-powered alignment forecasting and care tips for teens and adults.",
    intro: "Whether traditional braces or clear aligners, success depends on hygiene and consistency. Denta.Health helps families monitor progress.",
    tips: ["Brush after every meal","Use floss threaders or interdental brushes","Avoid hard, sticky foods","Wear aligners 22+ hrs/day","Photograph alignment monthly"] },
  { slug: "kids-oral-health", title: "Kids Oral Health Made Simple", description: "Fun habit tracking, cavity prevention, and AI tools designed for parents.",
    intro: "Building habits early prevents cavities for life. Our Kids Mode turns brushing into a game with streaks and rewards.",
    tips: ["Start brushing at first tooth","Supervise brushing until age 7","Limit juice and sugary snacks","Make brushing fun with timers","Track every kid in one family dashboard"] },
  { slug: "gum-health", title: "Gum Health and Gingivitis Prevention", description: "Spot early signs of gum issues and protect your smile naturally.",
    intro: "Healthy gums are the foundation of a healthy mouth. Bleeding while brushing is an early warning sign worth tracking.",
    tips: ["Floss daily—especially at night","Brush gently with a soft brush","Massage gums during brushing","Avoid tobacco","Track bleeding episodes in Denta.Health"] },
  { slug: "bad-breath-causes", title: "Bad Breath: Causes and Fixes", description: "Understand why and what daily habits actually reduce halitosis.",
    intro: "Most bad breath starts on the tongue and between teeth. Hydration, flossing, and tongue-cleaning solve 80% of cases.",
    tips: ["Clean your tongue daily","Floss—not just brush","Stay hydrated","Limit coffee and onion","Get a fresh-breath score from our AI"] },
  { slug: "pregnancy-dental-care", title: "Dental Care During Pregnancy", description: "Hormonal changes affect gums—here's a wellness routine that helps.",
    intro: "Pregnancy increases gum sensitivity. A consistent, gentle routine keeps both mom and baby healthy.",
    tips: ["Switch to a soft brush","Floss gently—gums may bleed more","Rinse after morning sickness","Stay hydrated","Use our pregnancy-mode tracking"] },
  { slug: "smoker-coffee-stain-removal", title: "Smoker and Coffee Stain Care", description: "Reduce visible stains and protect enamel with realistic daily habits.",
    intro: "Stains accumulate from chromogens (in coffee, tea, wine, tobacco). The key is rinsing, polishing, and consistency.",
    tips: ["Rinse with water immediately after","Use a straw","Whitening toothpaste 2–3x/week","Avoid charcoal scrubs","Monthly check-ins with our AI"] },
];
