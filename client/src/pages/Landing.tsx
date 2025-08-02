import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  GraduationCap, 
  Target, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  Users,
  FileText,
  TrendingUp,
  Star,
  ArrowRight
} from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blueberry
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          🎯 Your Law School Journey Starts Here
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Track Every Law School Application
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Streamline your law school application process with powerful tracking, 
          deadline management, and comprehensive school research tools. 
          Your future legal career begins with organized planning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <Link href="/signup">
              Start Tracking Applications
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
            <Link href="/schools">
              Browse Law Schools
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Free to start</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Trusted by 10,000+ students</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>4.9/5 rating</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From application tracking to school research, we've got every aspect of your law school journey covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Application Tracking</CardTitle>
              <CardDescription>
                Monitor all your applications in one centralized dashboard with real-time status updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Track application status</li>
                <li>• Manage deadlines</li>
                <li>• Upload documents</li>
                <li>• Interview scheduling</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>School Analytics</CardTitle>
              <CardDescription>
                Deep dive into law school data with comprehensive rankings, statistics, and insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• LSAT/GPA requirements</li>
                <li>• Acceptance rates</li>
                <li>• Tuition & financial aid</li>
                <li>• Employment outcomes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Deadline Management</CardTitle>
              <CardDescription>
                Never miss an important deadline with smart notifications and calendar integration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Automated reminders</li>
                <li>• Calendar sync</li>
                <li>• Priority sorting</li>
                <li>• Progress tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle>Document Hub</CardTitle>
              <CardDescription>
                Organize and manage all your application documents in one secure location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Personal statements</li>
                <li>• Transcripts & resumes</li>
                <li>• Letters of recommendation</li>
                <li>• Version control</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-red-600 mb-2" />
              <CardTitle>Progress Insights</CardTitle>
              <CardDescription>
                Visualize your application progress with detailed analytics and success metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Application completion rates</li>
                <li>• Response timeline tracking</li>
                <li>• Success probability analysis</li>
                <li>• Performance benchmarks</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-8 h-8 text-indigo-600 mb-2" />
              <CardTitle>Community Support</CardTitle>
              <CardDescription>
                Connect with fellow applicants and get advice from current law students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Student forums</li>
                <li>• Application tips</li>
                <li>• School-specific advice</li>
                <li>• Peer networking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Law School Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful applicants who used Blueberry to organize their path to law school.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link href="/signup">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/schools">
                  Explore Schools
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2025 Blueberry. Empowering future lawyers with better application management.</p>
        </div>
      </footer>
    </div>
  );
}