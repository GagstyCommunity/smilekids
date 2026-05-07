import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  MapPin, 
  MessageSquare, 
  HelpCircle, 
  Lightbulb,
  Calendar,
  Shield,
  Flag,
  ThumbsUp,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
];

const discussions = [
  {
    id: 1,
    author: "Priya M.",
    avatar: "PM",
    city: "Mumbai",
    topic: "Cavity Prevention",
    title: "How do you limit sugar intake for a picky eater?",
    content: "My 5-year-old only wants sweets. I've tried everything but it's so hard. Any tips from other parents?",
    replies: 23,
    likes: 45,
    time: "2 hours ago"
  },
  {
    id: 2,
    author: "Rahul S.",
    avatar: "RS",
    city: "Delhi",
    topic: "Brushing Habits",
    title: "Electric vs manual toothbrush for kids?",
    content: "Thinking of getting an electric toothbrush for my 7-year-old. Is it worth it? Any brand recommendations?",
    replies: 31,
    likes: 67,
    time: "5 hours ago"
  },
  {
    id: 3,
    author: "Anita K.",
    avatar: "AK",
    city: "Bangalore",
    topic: "First Dentist Visit",
    title: "When should kids start visiting the dentist?",
    content: "My daughter is 2 years old. Some say start now, others say wait until 3. What's your experience?",
    replies: 18,
    likes: 34,
    time: "1 day ago"
  }
];

const expertTips = [
  {
    title: "The 2-Minute Rule",
    content: "Make brushing fun by using a 2-minute timer with music. Kids are more likely to brush properly when it feels like a game.",
    author: "Dr. Meera Sharma"
  },
  {
    title: "Water After Snacks",
    content: "Teaching kids to drink water after eating sugary snacks can help neutralize acids and reduce cavity risk by up to 30%.",
    author: "Denta.Health AI Insights"
  },
  {
    title: "Cheese is a Friend",
    content: "A small piece of cheese after meals can help neutralize mouth acids. It's a dentist-approved snack!",
    author: "Dr. Arun Patel"
  }
];

const upcomingEvents = [
  {
    title: "Kids Dental Health Workshop",
    city: "Mumbai",
    date: "Feb 15, 2024",
    type: "Online Webinar"
  },
  {
    title: "Sugar-Free Snacks for Children",
    city: "Delhi",
    date: "Feb 18, 2024",
    type: "Live Session"
  },
  {
    title: "First Year Dental Care",
    city: "Bangalore",
    date: "Feb 22, 2024",
    type: "Parent Workshop"
  }
];

export default function Community() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [showAskForm, setShowAskForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-accent/10 to-background">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Parents Community</h1>
                <p className="text-muted-foreground">Learn from other parents & dental experts</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* City Selector */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Select Your City</h2>
                  </div>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your city to see local discussions" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ask a Question */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <h2 className="font-bold">Ask a Question</h2>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAskForm(!showAskForm)}
                    >
                      {showAskForm ? "Cancel" : "New Question"}
                    </Button>
                  </div>
                  {showAskForm && (
                    <div className="space-y-4">
                      <Input placeholder="Question title..." />
                      <Textarea 
                        placeholder="Describe your question in detail... (All questions are moderated for safety)"
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Questions are moderated to ensure they follow our wellness guidelines
                        </p>
                        <Button size="sm" className="bg-gradient-primary">Post Question</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Discussion Feed */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Parent Discussions</h2>
                  </div>
                  
                  {discussions.map((post) => (
                    <div 
                      key={post.id}
                      className="bg-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">{post.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{post.author}</span>
                            <span className="text-xs text-muted-foreground">• {post.city}</span>
                            <span className="text-xs text-muted-foreground">• {post.time}</span>
                          </div>
                          <div className="inline-block px-2 py-0.5 rounded-full bg-accent/20 text-xs text-accent-foreground mb-2">
                            {post.topic}
                          </div>
                          <h3 className="font-bold mb-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              {post.likes}
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              {post.replies} replies
                            </button>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    Load More Discussions
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Expert Tips */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    <h2 className="font-bold">Expert Tips</h2>
                  </div>
                  <div className="space-y-4">
                    {expertTips.map((tip, index) => (
                      <div key={index} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                        <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{tip.content}</p>
                        <p className="text-xs text-primary">{tip.author}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">Upcoming Events</h2>
                  </div>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <p className="font-medium text-sm">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{event.city}</span>
                          <span>•</span>
                          <span>{event.date}</span>
                        </div>
                        <span className="text-xs text-primary">{event.type}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View All Events
                  </Button>
                </div>

                {/* Community Rules */}
                <div className="bg-warning/10 rounded-2xl p-6 border border-warning/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-warning" />
                    <h2 className="font-bold">Community Rules</h2>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• No medical diagnoses or prescriptions</li>
                    <li>• Be respectful and supportive</li>
                    <li>• Share experiences, not medical advice</li>
                    <li>• Report inappropriate content</li>
                  </ul>
                  <Button variant="ghost" size="sm" className="mt-4 w-full">
                    <Flag className="w-4 h-4 mr-2" />
                    Report Content
                  </Button>
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
