import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Star, 
  Video, 
  Calendar, 
  Users,
  Award,
  MessageSquare,
  Clock,
  AlertTriangle,
  Mail
} from "lucide-react";

// Mock doctor data
const doctor = {
  name: "Dr. Meera Sharma",
  initials: "MS",
  specialty: "Pediatric Dental Wellness",
  city: "Mumbai",
  rating: 4.9,
  totalSessions: 45,
  totalParticipants: 1250,
  bio: "Dr. Meera Sharma is a wellness educator with over 15 years of experience in pediatric dental health. She specializes in cavity prevention strategies and child-friendly oral hygiene education.",
  topics: [
    "Cavity Prevention for Kids",
    "Sugar Management Strategies",
    "First Year Dental Care",
    "Building Brushing Habits",
    "Nutrition for Healthy Teeth"
  ],
  upcomingWebinars: [
    {
      id: 1,
      title: "Cavity Prevention Masterclass",
      date: "Feb 15, 2024",
      time: "6:00 PM IST",
      duration: "45 mins",
      seats: 50,
      price: "Free"
    },
    {
      id: 2,
      title: "Managing Sugar Cravings in Children",
      date: "Feb 22, 2024",
      time: "7:00 PM IST",
      duration: "60 mins",
      seats: 30,
      price: "₹199"
    }
  ],
  pastSessions: [
    { title: "Introduction to Kids Dental Health", attendees: 125, rating: 4.9 },
    { title: "Summer Dental Care Tips", attendees: 98, rating: 4.8 },
    { title: "Back to School Oral Health", attendees: 156, rating: 4.9 }
  ],
  reviews: [
    { author: "Priya M.", text: "Very informative session! My kids now love brushing their teeth.", rating: 5 },
    { author: "Rahul S.", text: "Practical tips that actually work. Highly recommend!", rating: 5 },
    { author: "Anita K.", text: "Dr. Sharma explains everything in simple terms. Great for new parents.", rating: 4 }
  ]
};

export default function DoctorProfile() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Profile Header */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/community" className="hover:text-primary">Community</Link>
              <span>/</span>
              <Link to="/city/mumbai" className="hover:text-primary">Mumbai</Link>
              <span>/</span>
              <span>{doctor.name}</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-foreground">{doctor.initials}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">{doctor.name}</h1>
                <p className="text-muted-foreground mb-3">{doctor.specialty}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{doctor.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span>{doctor.rating} rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4 text-primary" />
                    <span>{doctor.totalSessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{doctor.totalParticipants} participants</span>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-primary shadow-glow">
                <Mail className="w-4 h-4 mr-2" />
                Contact (Limited)
              </Button>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Bio */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <h2 className="font-bold mb-4">About</h2>
                  <p className="text-muted-foreground">{doctor.bio}</p>
                </div>

                {/* Topics Covered */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Topics Covered</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doctor.topics.map((topic) => (
                      <span 
                        key={topic}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Upcoming Webinars */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Upcoming Webinars</h2>
                  </div>
                  <div className="space-y-4">
                    {doctor.upcomingWebinars.map((webinar) => (
                      <div 
                        key={webinar.id}
                        className="p-4 rounded-xl bg-muted/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <h3 className="font-medium">{webinar.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {webinar.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {webinar.time}
                            </span>
                            <span>{webinar.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className={`font-bold ${webinar.price === 'Free' ? 'text-success' : ''}`}>
                              {webinar.price}
                            </span>
                            <p className="text-xs text-muted-foreground">{webinar.seats} seats left</p>
                          </div>
                          <Button asChild>
                            <Link to={`/seminar/${webinar.id}`}>Book Seat</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Past Sessions */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Video className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Past Sessions</h2>
                  </div>
                  <div className="space-y-3">
                    {doctor.pastSessions.map((session) => (
                      <div 
                        key={session.title}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-sm">{session.title}</p>
                          <p className="text-xs text-muted-foreground">{session.attendees} attendees</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="text-sm">{session.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Parent Reviews</h2>
                    <span className="text-sm text-muted-foreground">(Education sessions only)</span>
                  </div>
                  <div className="space-y-4">
                    {doctor.reviews.map((review, index) => (
                      <div key={index} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-3 h-3 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-primary">
                      Book Next Webinar
                    </Button>
                    <Button variant="outline" className="w-full">
                      Follow for Updates
                    </Button>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-warning/10 rounded-2xl p-6 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm mb-2">Important Disclaimer</h3>
                      <p className="text-xs text-muted-foreground">
                        This profile is for educational and wellness content only. 
                        Sessions do not constitute medical advice, diagnosis, or treatment. 
                        Always consult with a qualified dental professional in person.
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
