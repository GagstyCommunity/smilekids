import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Video, 
  Play,
  Clock,
  Users,
  Star,
  Filter
} from "lucide-react";

const webinars = [
  {
    id: 1,
    title: "Complete Guide to Children's Dental Health",
    doctor: "Dr. Meera Sharma",
    duration: "45 mins",
    views: 1250,
    rating: 4.9,
    category: "Kids"
  },
  {
    id: 2,
    title: "Understanding Cavity Formation & Prevention",
    doctor: "Dr. Arun Patel",
    duration: "38 mins",
    views: 980,
    rating: 4.8,
    category: "Prevention"
  },
  {
    id: 3,
    title: "Sugar, Acid, and Your Teeth",
    doctor: "Denta.Health Wellness Team",
    duration: "32 mins",
    views: 756,
    rating: 4.7,
    category: "Nutrition"
  },
  {
    id: 4,
    title: "Building Lifelong Brushing Habits",
    doctor: "Dr. Priya Nair",
    duration: "28 mins",
    views: 654,
    rating: 4.9,
    category: "Habits"
  },
  {
    id: 5,
    title: "Gum Health 101: What Every Adult Should Know",
    doctor: "Dr. Meera Sharma",
    duration: "42 mins",
    views: 543,
    rating: 4.8,
    category: "Adults"
  },
  {
    id: 6,
    title: "Managing Coffee & Tea Stains Naturally",
    doctor: "Denta.Health Wellness Team",
    duration: "25 mins",
    views: 432,
    rating: 4.6,
    category: "Lifestyle"
  }
];

const categories = ["All", "Kids", "Adults", "Prevention", "Nutrition", "Habits", "Lifestyle"];

export default function WebinarLibrary() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Video className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Webinar Library</h1>
                <p className="text-muted-foreground">Watch past sessions from dental wellness experts</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Input 
                placeholder="Search webinars..." 
                className="max-w-xs"
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Webinars Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((webinar) => (
                <div 
                  key={webinar.id}
                  className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-lg transition-shadow group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative flex items-center justify-center">
                    <Video className="w-12 h-12 text-primary/30" />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </button>
                    <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {webinar.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground text-xs mb-3">
                      {webinar.category}
                    </span>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      {webinar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {webinar.doctor}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{webinar.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span>{webinar.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Webinars
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Attend Live Sessions?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Get notified about upcoming webinars and interact with experts in real-time.
            </p>
            <Button asChild className="bg-gradient-primary">
              <Link to="/community">View Upcoming Events</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
