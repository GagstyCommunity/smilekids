export type FoodImpact = "safe" | "moderate" | "caution";
export type FoodLevel = "low" | "medium" | "high";

export interface FoodEntry {
  name: string;
  aliases?: string[];
  sugarLevel: FoodLevel;
  acidLevel: FoodLevel;
  overallImpact: FoodImpact;
  sugarGrams: number;
  waitTime: number;
  tips: string[];
}

export const FOOD_DB: FoodEntry[] = [
  { name: "Orange Juice", aliases: ["oj"], sugarLevel: "high", acidLevel: "high", overallImpact: "caution", sugarGrams: 24, waitTime: 30, tips: ["Rinse with water immediately","Wait 30 min before brushing","Use a straw to limit contact"] },
  { name: "Apple", sugarLevel: "medium", acidLevel: "medium", overallImpact: "safe", sugarGrams: 10, waitTime: 20, tips: ["Natural fiber helps clean teeth","Rinse with water after"] },
  { name: "Banana", sugarLevel: "medium", acidLevel: "low", overallImpact: "safe", sugarGrams: 14, waitTime: 15, tips: ["Sticky residue—rinse mouth","Floss if any sticks between teeth"] },
  { name: "Coffee", sugarLevel: "low", acidLevel: "high", overallImpact: "moderate", sugarGrams: 0, waitTime: 30, tips: ["Drink water after","Wait 30 min to brush","Add milk to reduce acidity"] },
  { name: "Coffee with Sugar", sugarLevel: "medium", acidLevel: "high", overallImpact: "moderate", sugarGrams: 8, waitTime: 30, tips: ["Use less sugar","Rinse with water","Wait before brushing"] },
  { name: "Tea (Black)", sugarLevel: "low", acidLevel: "medium", overallImpact: "moderate", sugarGrams: 0, waitTime: 30, tips: ["Can stain enamel","Rinse with water","Add milk to reduce staining"] },
  { name: "Green Tea", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 0, waitTime: 10, tips: ["Polyphenols help fight bacteria","Generally tooth-friendly"] },
  { name: "Soda", aliases: ["coke","pepsi","cola","fizzy drink"], sugarLevel: "high", acidLevel: "high", overallImpact: "caution", sugarGrams: 39, waitTime: 45, tips: ["High erosion risk","Use a straw","Rinse and wait 45 min before brushing"] },
  { name: "Diet Soda", sugarLevel: "low", acidLevel: "high", overallImpact: "caution", sugarGrams: 0, waitTime: 45, tips: ["Acidic even without sugar","Use a straw","Wait before brushing"] },
  { name: "Milk", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 12, waitTime: 0, tips: ["Calcium-rich—great for enamel","Safe before bed"] },
  { name: "Greek Yogurt", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 6, waitTime: 0, tips: ["Probiotics support oral health","Choose unsweetened"] },
  { name: "Cheese", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 0, waitTime: 0, tips: ["Raises mouth pH","Great after acidic meals"] },
  { name: "Chocolate Bar", sugarLevel: "high", acidLevel: "low", overallImpact: "caution", sugarGrams: 25, waitTime: 30, tips: ["Choose dark chocolate","Rinse mouth after","Don't eat before bed"] },
  { name: "Dark Chocolate", sugarLevel: "medium", acidLevel: "low", overallImpact: "moderate", sugarGrams: 8, waitTime: 20, tips: ["Less sugar than milk chocolate","Still rinse with water"] },
  { name: "Candy", aliases: ["lollipop","sweets","gummies"], sugarLevel: "high", acidLevel: "medium", overallImpact: "caution", sugarGrams: 30, waitTime: 30, tips: ["Sticky candies are worst","Brush after 30 min","Limit frequency"] },
  { name: "Ice Cream", sugarLevel: "high", acidLevel: "low", overallImpact: "moderate", sugarGrams: 21, waitTime: 20, tips: ["Cold may trigger sensitivity","Rinse after"] },
  { name: "Bread (White)", sugarLevel: "medium", acidLevel: "low", overallImpact: "moderate", sugarGrams: 2, waitTime: 15, tips: ["Starch converts to sugar","Floss to remove residue"] },
  { name: "Bread (Whole Grain)", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 1, waitTime: 10, tips: ["Better than white bread","Floss after"] },
  { name: "Pasta", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 1, waitTime: 10, tips: ["Floss for stuck pieces","Rinse with water"] },
  { name: "Rice", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 0, waitTime: 10, tips: ["Sticky—floss after","Rinse with water"] },
  { name: "Chips", aliases: ["potato chips","crisps"], sugarLevel: "low", acidLevel: "low", overallImpact: "moderate", sugarGrams: 0, waitTime: 15, tips: ["Starch sticks in teeth","Floss thoroughly","Drink water"] },
  { name: "Wine (Red)", sugarLevel: "low", acidLevel: "high", overallImpact: "caution", sugarGrams: 1, waitTime: 45, tips: ["Stains enamel","Rinse with water","Wait 45 min to brush"] },
  { name: "Wine (White)", sugarLevel: "low", acidLevel: "high", overallImpact: "caution", sugarGrams: 1, waitTime: 45, tips: ["Highly acidic","Rinse and wait before brushing"] },
  { name: "Beer", sugarLevel: "low", acidLevel: "medium", overallImpact: "moderate", sugarGrams: 0, waitTime: 30, tips: ["Drink water alongside","Mild erosion risk"] },
  { name: "Lemon", sugarLevel: "low", acidLevel: "high", overallImpact: "caution", sugarGrams: 2, waitTime: 60, tips: ["Very acidic","Don't suck on slices","Wait 1 hr to brush"] },
  { name: "Lemon Water", sugarLevel: "low", acidLevel: "high", overallImpact: "caution", sugarGrams: 1, waitTime: 45, tips: ["Use a straw","Rinse with plain water after"] },
  { name: "Berries", aliases: ["strawberry","blueberry","raspberry"], sugarLevel: "medium", acidLevel: "medium", overallImpact: "moderate", sugarGrams: 8, waitTime: 20, tips: ["Can stain enamel","Rinse mouth after"] },
  { name: "Carrots", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 5, waitTime: 0, tips: ["Crunchy—helps clean teeth","Stimulates saliva"] },
  { name: "Celery", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 1, waitTime: 0, tips: ["Natural toothbrush","Boosts saliva flow"] },
  { name: "Nuts", aliases: ["almonds","cashews","walnuts"], sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 1, waitTime: 5, tips: ["Great snack for teeth","Watch for stuck bits"] },
  { name: "Honey", sugarLevel: "high", acidLevel: "low", overallImpact: "caution", sugarGrams: 17, waitTime: 30, tips: ["Sticky—coats teeth","Rinse well","Brush after 30 min"] },
  { name: "Energy Drink", sugarLevel: "high", acidLevel: "high", overallImpact: "caution", sugarGrams: 27, waitTime: 60, tips: ["Severe erosion risk","Use a straw","Wait 1 hr before brushing"] },
  { name: "Sports Drink", sugarLevel: "high", acidLevel: "high", overallImpact: "caution", sugarGrams: 21, waitTime: 45, tips: ["Acidic and sugary","Rinse with water","Use sparingly"] },
  { name: "Water", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 0, waitTime: 0, tips: ["Best for teeth","Drink throughout the day"] },
  { name: "Sparkling Water", sugarLevel: "low", acidLevel: "medium", overallImpact: "moderate", sugarGrams: 0, waitTime: 15, tips: ["Mildly acidic","Choose unflavored when possible"] },
  { name: "Pizza", sugarLevel: "medium", acidLevel: "medium", overallImpact: "moderate", sugarGrams: 4, waitTime: 20, tips: ["Tomato is acidic","Floss after","Rinse with water"] },
  { name: "Burger", sugarLevel: "medium", acidLevel: "low", overallImpact: "moderate", sugarGrams: 6, waitTime: 15, tips: ["Floss to remove residue","Drink water"] },
  { name: "Sushi", sugarLevel: "low", acidLevel: "medium", overallImpact: "safe", sugarGrams: 5, waitTime: 10, tips: ["Vinegar in rice is mild","Wasabi has antibacterial benefits"] },
  { name: "Salad", sugarLevel: "low", acidLevel: "low", overallImpact: "safe", sugarGrams: 3, waitTime: 0, tips: ["Crunchy veggies clean teeth","Watch dressings with sugar"] },
  { name: "Smoothie", sugarLevel: "high", acidLevel: "medium", overallImpact: "moderate", sugarGrams: 25, waitTime: 30, tips: ["Often high in fruit sugar","Drink quickly, rinse after","Use a straw"] },
];

export function findFood(query: string): FoodEntry | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  for (const f of FOOD_DB) {
    if (f.name.toLowerCase() === q) return f;
    if (f.aliases?.some(a => a.toLowerCase() === q)) return f;
  }
  for (const f of FOOD_DB) {
    if (f.name.toLowerCase().includes(q) || q.includes(f.name.toLowerCase())) return f;
    if (f.aliases?.some(a => a.toLowerCase().includes(q) || q.includes(a.toLowerCase()))) return f;
  }
  return null;
}
