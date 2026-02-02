import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Server, Database, Zap } from "lucide-react";

const services = [
  { name: "Web Application", status: "operational", uptime: "99.98%", icon: Server },
  { name: "AI Analysis Engine", status: "operational", uptime: "99.95%", icon: Zap },
  { name: "Database", status: "operational", uptime: "99.99%", icon: Database },
  { name: "Authentication", status: "operational", uptime: "99.97%", icon: CheckCircle2 },
];

const incidents = [
  {
    date: "Jan 28, 2025",
    title: "Scheduled Maintenance",
    status: "resolved",
    description: "Planned database optimization completed successfully.",
    duration: "2 hours",
  },
  {
    date: "Jan 15, 2025",
    title: "AI Engine Slowdown",
    status: "resolved",
    description: "Some users experienced slower scan processing. Root cause identified and fixed.",
    duration: "45 minutes",
  },
  {
    date: "Jan 5, 2025",
    title: "Authentication Delay",
    status: "resolved",
    description: "Brief delay in login processing during peak hours.",
    duration: "15 minutes",
  },
];

const uptimeHistory = [
  { month: "Jan 2025", uptime: 99.95 },
  { month: "Dec 2024", uptime: 99.99 },
  { month: "Nov 2024", uptime: 99.97 },
  { month: "Oct 2024", uptime: 99.98 },
];

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-12">
        {/* Overall Status */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-medium mb-4 ${
              allOperational
                ? "bg-success/10 text-success border border-success/20"
                : "bg-warning/10 text-warning border border-warning/20"
            }`}
          >
            {allOperational ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
            {allOperational ? "All Systems Operational" : "Some Systems Experiencing Issues"}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">SmileOS System Status</h1>
          <p className="text-muted-foreground">
            Real-time status of all SmileOS services and infrastructure
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Services Status */}
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <service.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                          service.status === "operational"
                            ? "bg-success/10 text-success"
                            : service.status === "degraded"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {service.status === "operational" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : service.status === "degraded" ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Uptime History */}
          <Card>
            <CardHeader>
              <CardTitle>Uptime History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uptimeHistory.map((month) => (
                  <div key={month.month} className="text-center p-4 rounded-xl bg-muted/30">
                    <div className="text-2xl font-bold text-success">{month.uptime}%</div>
                    <div className="text-sm text-muted-foreground">{month.month}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <div key={index} className="p-4 rounded-xl border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{incident.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {incident.date} • Duration: {incident.duration}
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscribe */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to receive notifications about system status changes
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
