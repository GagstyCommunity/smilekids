import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  MapPin, 
  Video, 
  Users, 
  TrendingUp,
  CreditCard,
  Star,
  Calendar,
  Plus,
  ArrowUpRight,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { useState } from "react";

// Mock doctor dashboard data
const dashboardData = {
  doctor: {
    name: "Dr. Meera Sharma",
    plan: "Professional",
    city: "Mumbai"
  },
  stats: {
    totalViews: 2450,
    totalRegistrations: 156,
    upcomingSessions: 3,
    avgRating: 4.9
  },
  recentRegistrations: [
    { name: "Priya M.", session: "Cavity Prevention", time: "2 hours ago" },
    { name: "Rahul S.", session: "Sugar Management", time: "5 hours ago" },
    { name: "Anita K.", session: "Cavity Prevention", time: "1 day ago" }
  ],
  upcomingWebinars: [
    { title: "Cavity Prevention Masterclass", date: "Feb 15", registrations: 27 },
    { title: "Managing Sugar Cravings", date: "Feb 22", registrations: 18 }
  ]
};

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-card">
                {/* Doctor Info */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">MS</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{dashboardData.doctor.name}</p>
                    <p className="text-xs text-primary">{dashboardData.doctor.plan} Plan</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {[
                    { id: "overview", icon: LayoutDashboard, label: "Overview" },
                    { id: "visibility", icon: MapPin, label: "City Visibility" },
                    { id: "webinars", icon: Video, label: "Webinars" },
                    { id: "registrations", icon: Users, label: "Registrations" },
                    { id: "analytics", icon: TrendingUp, label: "Analytics" },
                    { id: "reviews", icon: Star, label: "Reviews" },
                    { id: "subscription", icon: CreditCard, label: "Subscription" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === item.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="border-t border-border/50 mt-4 pt-4 space-y-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, {dashboardData.doctor.name}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button className="bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Webinar
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Profile Views", value: dashboardData.stats.totalViews, icon: TrendingUp, change: "+12%" },
                  { label: "Registrations", value: dashboardData.stats.totalRegistrations, icon: Users, change: "+8%" },
                  { label: "Upcoming Sessions", value: dashboardData.stats.upcomingSessions, icon: Calendar, change: "" },
                  { label: "Avg Rating", value: dashboardData.stats.avgRating, icon: Star, change: "+0.2" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card rounded-xl p-4 border border-border/50 shadow-card">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className="w-5 h-5 text-primary" />
                      {stat.change && (
                        <span className="text-xs text-success">{stat.change}</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Registrations */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold">Recent Registrations</h2>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <div className="space-y-3">
                    {dashboardData.recentRegistrations.map((reg, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {reg.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{reg.name}</p>
                            <p className="text-xs text-muted-foreground">{reg.session}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{reg.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Webinars */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold">Upcoming Webinars</h2>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                  <div className="space-y-3">
                    {dashboardData.upcomingWebinars.map((webinar, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="text-sm font-medium">{webinar.title}</p>
                          <p className="text-xs text-muted-foreground">{webinar.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{webinar.registrations}</p>
                          <p className="text-xs text-muted-foreground">registrations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Webinar
                  </Button>
                </div>
              </div>

              {/* City Visibility Status */}
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="font-bold">City Visibility</h2>
                  </div>
                  <Button variant="outline" size="sm">
                    Upgrade
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">{dashboardData.doctor.city}</p>
                      <p className="text-sm text-muted-foreground">Active listing</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-success/20 text-success text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="bg-warning/10 rounded-2xl p-4 border border-warning/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-warning">Compliance Notice:</strong> All content must follow our wellness guidelines. 
                  Medical diagnoses, treatment prescriptions, or guaranteed outcomes are not permitted. 
                  <Link to="/doctor-policy" className="text-primary hover:underline ml-1">
                    Read our Doctor Advertising Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
