import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ui/score-ring";
import {
  Trophy,
  Flame,
  Star,
  Medal,
  Crown,
  Sparkles,
  Target,
  Zap,
  Award,
  Lock,
  Users,
} from "lucide-react";

const streakData = {
  current: 12,
  longest: 24,
  thisWeek: 5,
  thisMonth: 18,
};

const badges = [
  { id: 1, name: "First Scan", icon: Sparkles, unlocked: true, date: "Jan 15", description: "Completed your first AI scan" },
  { id: 2, name: "7-Day Streak", icon: Flame, unlocked: true, date: "Jan 22", description: "Maintained habits for 7 days" },
  { id: 3, name: "Perfect Week", icon: Star, unlocked: true, date: "Jan 28", description: "100% habits completed in a week" },
  { id: 4, name: "30-Day Warrior", icon: Medal, unlocked: false, date: null, description: "30 consecutive days of habits", progress: 12, total: 30 },
  { id: 5, name: "90-Day Legend", icon: Crown, unlocked: false, date: null, description: "90 days of consistent care", progress: 12, total: 90 },
  { id: 6, name: "Floss Boss", icon: Award, unlocked: true, date: "Feb 1", description: "Flossed 14 days in a row" },
  { id: 7, name: "Sugar Saver", icon: Target, unlocked: false, date: null, description: "Low sugar intake for 7 days", progress: 4, total: 7 },
  { id: 8, name: "Early Bird", icon: Zap, unlocked: false, date: null, description: "Morning brush before 7am for 7 days", progress: 2, total: 7 },
];

const familyLeaderboard = [
  { name: "Mom", avatar: "👩", score: 94, streak: 18 },
  { name: "Dad", avatar: "👨", score: 88, streak: 12 },
  { name: "Emma", avatar: "👧", score: 82, streak: 8 },
  { name: "Jack", avatar: "👦", score: 76, streak: 5 },
];

const kidsRewards = [
  { stars: 10, reward: "Choose dinner", claimed: true },
  { stars: 25, reward: "Extra screen time", claimed: true },
  { stars: 50, reward: "New toothbrush color", claimed: false, current: 38 },
  { stars: 100, reward: "Fun family outing", claimed: false, current: 38 },
];

export default function ProgressAchievements() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-warning" />
            Progress & Achievements
          </h1>
          <p className="text-muted-foreground">
            Track your streaks, earn badges, and compete with family
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Streak Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-warning" />
                  Your Streaks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-warning/10 border border-warning/20">
                    <Flame className="w-8 h-8 text-warning mx-auto mb-2" />
                    <div className="text-3xl font-bold text-warning">{streakData.current}</div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-primary">{streakData.longest}</div>
                    <div className="text-sm text-muted-foreground">Longest Streak</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-success/10 border border-success/20">
                    <Star className="w-8 h-8 text-success mx-auto mb-2" />
                    <div className="text-3xl font-bold text-success">{streakData.thisWeek}</div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-info/10 border border-info/20">
                    <Target className="w-8 h-8 text-info mx-auto mb-2" />
                    <div className="text-3xl font-bold text-info">{streakData.thisMonth}</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-primary" />
                  Badges & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`relative p-4 rounded-xl text-center transition-all ${
                        badge.unlocked
                          ? "bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20"
                          : "bg-muted/30 border border-border/50 opacity-60"
                      }`}
                    >
                      {!badge.unlocked && (
                        <Lock className="absolute top-2 right-2 w-4 h-4 text-muted-foreground" />
                      )}
                      <div
                        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                          badge.unlocked ? "bg-warning/20" : "bg-muted"
                        }`}
                      >
                        <badge.icon
                          className={`w-6 h-6 ${
                            badge.unlocked ? "text-warning" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="font-medium text-sm mb-1">{badge.name}</div>
                      {badge.unlocked ? (
                        <div className="text-xs text-success">{badge.date}</div>
                      ) : (
                        <div className="mt-2">
                          <Progress value={(badge.progress! / badge.total!) * 100} className="h-1" />
                          <div className="text-xs text-muted-foreground mt-1">
                            {badge.progress}/{badge.total}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Kids Rewards */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  Kids Rewards Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 rounded-xl bg-warning/10 text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="text-2xl font-bold">38 Stars</div>
                  <div className="text-sm text-muted-foreground">Keep going to unlock rewards!</div>
                </div>

                <div className="space-y-3">
                  {kidsRewards.map((reward, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        reward.claimed
                          ? "bg-success/10 border border-success/20"
                          : "bg-muted/30 border border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-1 min-w-[60px]">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-bold">{reward.stars}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{reward.reward}</div>
                        {!reward.claimed && reward.current && (
                          <Progress value={(reward.current / reward.stars) * 100} className="h-1 mt-1" />
                        )}
                      </div>
                      {reward.claimed ? (
                        <span className="text-xs text-success font-medium">Claimed!</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {reward.current}/{reward.stars}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Family Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Family Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyLeaderboard.map((member, index) => (
                    <div
                      key={member.name}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        index === 0 ? "bg-warning/10 border border-warning/20" : "bg-muted/30"
                      }`}
                    >
                      <div className="text-xl font-bold text-muted-foreground w-6">
                        {index + 1}
                      </div>
                      <div className="text-2xl">{member.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Flame className="w-3 h-3 text-warning" />
                          {member.streak} day streak
                        </div>
                      </div>
                      <ScoreRing score={member.score} size="sm" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-6xl mb-3">🏆</div>
                  <div className="text-lg font-bold mb-1">Level 4</div>
                  <div className="text-sm opacity-80 mb-4">Smile Guardian</div>
                  <Progress value={65} className="h-2 bg-primary-foreground/20" />
                  <div className="text-xs mt-2 opacity-80">650 / 1000 XP to Level 5</div>
                </div>
              </CardContent>
            </Card>

            {/* Next Badge */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">🎯 Next Badge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Medal className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">30-Day Warrior</div>
                    <Progress value={40} className="h-1 mt-2" />
                    <div className="text-xs text-muted-foreground mt-1">12/30 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
