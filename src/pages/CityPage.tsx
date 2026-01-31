import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { 
  MapPin, 
  Users, 
  Calendar, 
  Star, 
  Award,
  Video,
  Baby,
  AlertTriangle,
  ArrowRight,
  TrendingUp
} from "lucide-react";

// Mock data - in production this would come from API
const cityData = {
  mumbai: {
    name: "Mumbai",
    commonIssues: [
      { issue: "Childhood cavities", percentage: 67 },
      { issue: "Gum inflammation", percentage: 45 },
      { issue: "Teeth staining", percentage: 52 }
    ],
    featuredExperts: [
      { name: "Dr. Meera Sharma", specialty: "Pediatric Dentistry", rating: 4.9, sessions: 45 },
      { name: "Dr. Arun Patel", specialty: "General Wellness", rating: 4.8, sessions: 32 },
      { name: "Dr. Priya Nair", specialty: "Preventive Care", rating: 4.7, sessions: 28 }
    ],
    upcomingSeminars: [
      { title: "Cavity Prevention for Kids", date: "Feb 15, 2024", seats: 50, price: "Free" },
      { title: "Managing Sugar Cravings", date: "Feb 22, 2024", seats: 30, price: "₹199" },
      { title: "First Year Dental Care", date: "Mar 1, 2024", seats: 40, price: "₹149" }
    ],
    parentSessions: 12,
    kidsAwareness: 8
  }
};

export default function CityPage() {
  const { city } = useParams();
  const data = cityData.mumbai; // Default to Mumbai for demo

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/community" className="hover:text-primary">Community</Link>
              <span>/</span>
              <span>{data.name}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">
                  Oral Health Guidance in {data.name}
                </h1>
                <p className="text-muted-foreground">Connect with local experts and wellness resources</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Common Issues */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Common Oral Health Patterns in {data.name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered insights based on wellness data from {data.name} users
                  </p>
                  <div className="space-y-4">
                    {data.commonIssues.map((item) => (
                      <div key={item.issue}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.issue}</span>
                          <span className="text-muted-foreground">{item.percentage}% of users</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Experts */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-warning" />
                      <h2 className="font-bold">Featured Dental Experts</h2>
                    </div>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.featuredExperts.map((expert) => (
                      <Link 
                        key={expert.name}
                        to="/doctors/profile"
                        className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <span className="text-lg font-bold text-primary">
                            {expert.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <h3 className="font-medium text-sm">{expert.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{expert.specialty}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-warning fill-warning" />
                            <span>{expert.rating}</span>
                          </div>
                          <span className="text-muted-foreground">• {expert.sessions} sessions</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Upcoming Seminars */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Video className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Upcoming Live Seminars</h2>
                  </div>
                  <div className="space-y-4">
                    {data.upcomingSeminars.map((seminar) => (
                      <div 
                        key={seminar.title}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                      >
                        <div>
                          <h3 className="font-medium">{seminar.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>{seminar.date}</span>
                            <span>•</span>
                            <span>{seminar.seats} seats</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${seminar.price === 'Free' ? 'text-success' : ''}`}>
                            {seminar.price}
                          </span>
                          <Button size="sm" className="ml-4">Book</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <h3 className="font-bold mb-4">City Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-muted/50">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.parentSessions}</p>
                      <p className="text-xs text-muted-foreground">Parent Sessions</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-muted/50">
                      <Baby className="w-6 h-6 text-accent-foreground mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.kidsAwareness}</p>
                      <p className="text-xs text-muted-foreground">Kids Programs</p>
                    </div>
                  </div>
                </div>

                {/* Join Community */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                  <h3 className="font-bold mb-2">Join {data.name} Community</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with local parents and share experiences
                  </p>
                  <Button className="w-full bg-gradient-primary">
                    Join Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Wellness Disclaimer */}
                <div className="bg-warning/10 rounded-2xl p-6 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm mb-2">Wellness Disclaimer</h3>
                      <p className="text-xs text-muted-foreground">
                        All sessions and content are for educational and wellness guidance only. 
                        They do not constitute medical advice. Always consult with qualified 
                        dental professionals for diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
