import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Learn from "./pages/Learn";
import Gallery from "./pages/Gallery";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Switch>
        <Route path="/build" component={Build} />
        <Route path="/">
          {() => (
            <Layout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/learn" component={Learn} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/docs" component={Docs} />
                <Route component={NotFound} />
              </Switch>
            </Layout>
          )}
        </Route>
      </Switch>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
