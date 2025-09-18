import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import HuntLink from "./pages/HuntLink";
import PokerLink from "./pages/PokerLink";
import PrivacyPolicy from "./pages/privacy";

function Router() {
  return (
    <Switch>
      <Route path="/hunt" component={HuntLink} />
      <Route path="/pokerRun" component={PokerLink} />
      <Route path="/" component={Home} />
      <Route path="/contact">
        <Redirect to="/" />
      </Route>
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
