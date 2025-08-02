import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Schools } from "./pages/Schools";
import { Applications } from "./pages/Applications";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="blueberry-theme">
        <div className="min-h-screen bg-background">
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/schools" component={Schools} />
            <Route path="/applications" component={Applications} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;