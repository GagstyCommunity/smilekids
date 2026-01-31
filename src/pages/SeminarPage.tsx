import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Users, 
  Video,
  Star,
  AlertTriangle,
  Check,
  MapPin
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock seminar data
const seminar = {
  id: 1,
  title: "Cavity Prevention Masterclass for Parents",
  doctor: {
    name: "Dr. Meera Sharma",
    initials: "MS",
    specialty: "Pediatric Dental Wellness",
    rating: 4.9
  },
  date: "February 15, 2024",
  time: "6:00 PM IST",
  duration: "45 minutes",
  price: "Free",
  seatsTotal: 50,
  seatsRemaining: 23,
  description: "Join Dr. Meera Sharma for an interactive session on preventing cavities in children. Learn practical strategies that you can implement immediately to protect your child's dental health.",
  whatYouWillLearn: [
    "Understanding how cavities form in children",
    "Daily habits that prevent tooth decay",
    "Managing sugar intake effectively",
    "Fun brushing techniques kids love",
    "When to visit a dentist"
  ],
  requirements: [
    "Suitable for parents of children aged 2-12",
    "No prior dental knowledge required",
    "Interactive Q&A at the end"
  ],
  city: "Mumbai"
};

export default function SeminarPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Registration Successful! 🎉",
      description: "You've been registered for this webinar. Check your email for details.",
    });
    setIsRegistering(false);
  };

  const seatsPercentage = (seminar.seatsRemaining / seminar.seatsTotal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/community" className="hover:text-primary">Community</Link>
              <span>/</span>
              <Link to="/city/mumbai" className="hover:text-primary">{seminar.city}</Link>
              <span>/</span>
              <span>Seminar</span>
            </div>
            
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 text-success text-sm mb-4">
                <Video className="w-4 h-4" />
                Live Online Webinar
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold mb-4">{seminar.title}</h1>
              <p className="text-lg text-muted-foreground">{seminar.description}</p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Doctor Info */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <h2 className="font-bold mb-4">Your Instructor</h2>
                  <Link 
                    to="/doctors/profile"
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-foreground">
                        {seminar.doctor.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">{seminar.doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{seminar.doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm">{seminar.doctor.rating} rating</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* What You'll Learn */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <h2 className="font-bold mb-4">What You'll Learn</h2>
                  <ul className="space-y-3">
                    {seminar.whatYouWillLearn.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <h2 className="font-bold mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {seminar.requirements.map((req) => (
                      <li key={req} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-warning/10 rounded-2xl p-6 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm mb-2">Wellness Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This webinar is for educational and wellness guidance purposes only. 
                        The content does not constitute medical advice, diagnosis, or treatment recommendations. 
                        Always consult with a qualified dental professional for personalized care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Registration Card */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className={`text-3xl font-bold ${seminar.price === 'Free' ? 'text-success' : ''}`}>
                      {seminar.price}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{seminar.date}</p>
                        <p className="text-xs text-muted-foreground">Date</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{seminar.time}</p>
                        <p className="text-xs text-muted-foreground">{seminar.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Online</p>
                        <p className="text-xs text-muted-foreground">Zoom Webinar</p>
                      </div>
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Seats remaining</span>
                      <span className="font-medium">{seminar.seatsRemaining} / {seminar.seatsTotal}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all"
                        style={{ width: `${seatsPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Register Button */}
                  <Button 
                    className="w-full bg-gradient-primary shadow-glow"
                    size="lg"
                    onClick={handleRegister}
                    disabled={isRegistering}
                  >
                    {isRegistering ? (
                      "Registering..."
                    ) : (
                      <>
                        <Users className="w-4 h-4 mr-2" />
                        Register Now
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Limited seats available. Register early to secure your spot.
                  </p>
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
