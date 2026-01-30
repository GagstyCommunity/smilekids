import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";

const settingsSections = [
  {
    icon: User,
    title: "Profile",
    description: "Manage your personal information",
    items: ["Full Name", "Email", "Profile Photo"],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Control how you receive alerts",
    items: ["Push Notifications", "Email Reminders", "Weekly Reports"],
  },
  {
    icon: Shield,
    title: "Privacy & Data",
    description: "Manage your data and privacy settings",
    items: ["Download Data", "Delete Scan History", "Cookie Preferences"],
  },
  {
    icon: CreditCard,
    title: "Subscription",
    description: "Manage your plan and billing",
    items: ["Current Plan: Free", "Payment Methods", "Billing History"],
  },
];

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-muted-foreground">john@example.com</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4">
            {settingsSections.map((section) => (
              <div
                key={section.title}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <button
                          key={item}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          <span>{item}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="mt-6 bg-destructive/5 rounded-2xl p-6 border border-destructive/20">
            <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card">
                <div>
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm text-muted-foreground">Permanently delete your account and data</div>
                </div>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
