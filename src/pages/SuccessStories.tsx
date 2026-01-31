import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Quote,
  Star,
  ArrowRight,
  Users
} from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Priya Mehta",
    location: "Mumbai",
    avatar: "PM",
    title: "My son finally loves brushing his teeth!",
    story: "Before SmileOS, getting my 6-year-old to brush was a daily battle. The Kids Mode gamification changed everything. Now he reminds ME when it's brushing time! His last dental checkup showed zero cavities.",
    stats: { beforeScore: 45, afterScore: 92, timeframe: "3 months" },
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Sharma",
    location: "Delhi",
    avatar: "RS",
    title: "Caught early signs of gum issues",
    story: "The AI scan highlighted potential gum inflammation that I had been ignoring. I visited my dentist who confirmed early-stage gingivitis. Early detection meant simple treatment instead of complicated procedures.",
    stats: { beforeScore: 58, afterScore: 85, timeframe: "2 months" },
    rating: 5
  },
  {
    id: 3,
    name: "Anita Kumar",
    location: "Bangalore",
    avatar: "AK",
    title: "Managing three kids' dental health made easy",
    story: "With three children under 10, keeping track of everyone's brushing habits was impossible. SmileOS's family dashboard gives me a complete picture. Sugar tracking has been a game-changer for preventing cavities.",
    stats: { beforeScore: 52, afterScore: 88, timeframe: "4 months" },
    rating: 5
  },
  {
    id: 4,
    name: "Vikram Joshi",
    location: "Pune",
    avatar: "VJ",
    title: "Finally understanding my coffee habit's impact",
    story: "As a heavy coffee drinker, I never thought about staining until SmileOS showed me the data. The eating advisor helped me understand timing and rinsing. My teeth are noticeably less stained now.",
    stats: { beforeScore: 61, afterScore: 79, timeframe: "6 weeks" },
    rating: 4
  },
  {
    id: 5,
    name: "Sunita Reddy",
    location: "Chennai",
    avatar: "SR",
    title: "Parent community saved me research hours",
    story: "Finding reliable dental information for kids online was exhausting. The parent community connected me with verified tips and expert webinars. It's like having a support group of dental-conscious parents.",
    stats: { beforeScore: 55, afterScore: 82, timeframe: "3 months" },
    rating: 5
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Ahmedabad",
    avatar: "AP",
    title: "Habit tracking kept me accountable",
    story: "I knew I should floss daily but never stuck to it. SmileOS's streak tracking and reminders created accountability. 90 days strong now and my gum bleeding has completely stopped.",
    stats: { beforeScore: 48, afterScore: 91, timeframe: "3 months" },
    rating: 5
  }
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-success/5 to-background">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Real Results from Real Families
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Success Stories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how families across India are building better oral health habits with SmileOS.
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8 border-b border-border/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Families</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">35%</p>
                <p className="text-sm text-muted-foreground">Avg Score Improvement</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">92%</p>
                <p className="text-sm text-muted-foreground">Would Recommend</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.8★</p>
                <p className="text-sm text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <div 
                  key={story.id}
                  className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-foreground">{story.avatar}</span>
                    </div>
                    <div>
                      <p className="font-bold">{story.name}</p>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-3 h-3 ${i < story.rating ? 'text-warning fill-warning' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-primary/30 mb-2" />
                    <h3 className="font-bold mb-2">{story.title}</h3>
                    <p className="text-sm text-muted-foreground">{story.story}</p>
                  </div>

                  {/* Score Improvement */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Protection Score</span>
                      <span className="text-success font-medium">
                        +{story.stats.afterScore - story.stats.beforeScore} points
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Before</span>
                          <span>{story.stats.beforeScore}</span>
                        </div>
                        <div className="h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-muted-foreground/30 rounded-full"
                            style={{ width: `${story.stats.beforeScore}%` }}
                          />
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>After</span>
                          <span>{story.stats.afterScore}</span>
                        </div>
                        <div className="h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary rounded-full"
                            style={{ width: `${story.stats.afterScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      in {story.stats.timeframe}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of families who are building better oral health habits with SmileOS.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
              <Link to="/signup">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
