import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Calendar,
  ArrowRight,
  Clock,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const blogPosts = [
  {
    id: 1,
    title: "5 Daily Habits That Prevent 90% of Dental Problems",
    excerpt: "Simple changes in your daily routine can have a massive impact on your oral health. Learn the science-backed habits that dentists recommend.",
    category: "Prevention",
    author: "Denta.Health Team",
    date: "Jan 28, 2024",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Your Child's First Dental Visit",
    excerpt: "When should your child see a dentist? What to expect and how to prepare them for a positive experience.",
    category: "Kids",
    author: "Dr. Meera Sharma",
    date: "Jan 25, 2024",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 3,
    title: "The Hidden Connection Between Diet and Oral Health",
    excerpt: "It's not just sugar - discover the foods that protect your teeth and the ones that harm them.",
    category: "Nutrition",
    author: "Denta.Health AI Insights",
    date: "Jan 22, 2024",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 4,
    title: "Electric vs Manual Toothbrush: The Science",
    excerpt: "We break down the research to help you make the right choice for your family.",
    category: "Products",
    author: "Denta.Health Team",
    date: "Jan 18, 2024",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 5,
    title: "Building Brushing Habits That Stick",
    excerpt: "Psychology-backed strategies to make oral hygiene automatic for you and your kids.",
    category: "Habits",
    author: "Dr. Arun Patel",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 6,
    title: "Signs You Should See a Dentist (Not Just When It Hurts)",
    excerpt: "Early indicators that suggest it's time to book that dental appointment.",
    category: "Prevention",
    author: "Denta.Health Team",
    date: "Jan 12, 2024",
    readTime: "3 min read",
    featured: false
  }
];

const categories = ["All", "Prevention", "Kids", "Nutrition", "Habits", "Products"];

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Learning Hub</h1>
                <p className="text-muted-foreground">Expert insights for better oral health</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            {/* Search & Categories */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Input 
                placeholder="Search articles..." 
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

            {/* Featured Post */}
            {featuredPost && (
              <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card mb-8">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/40" />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium w-fit mb-4">
                      Featured
                    </span>
                    <h2 className="text-xl lg:text-2xl font-bold mb-3">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button className="w-fit group">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground text-xs mb-3">
                      {post.category}
                    </span>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
