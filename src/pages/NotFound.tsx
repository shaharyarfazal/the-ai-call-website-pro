import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Compass, ArrowLeft, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground overflow-hidden">
      <Helmet>
        <title>Page Not Found | The AI Call Pro</title>
        <meta name="description" content="Oops! The page you are looking for does not exist on The AI Call Pro. Return to safety." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 relative">
        {/* Ambient brand glow in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[100px] animate-pulse" />
        </div>

        <div className="container max-w-xl mx-auto text-center relative z-10">
          {/* Animated lost compass icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-24 h-24 rounded-2xl bg-card border border-border/80 flex items-center justify-center mx-auto mb-8 shadow-lg relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <Compass className="h-10 w-10 text-primary animate-[spin_10s_linear_infinite]" />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-8xl font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/30 mb-2">
              404
            </h1>
            <p className="text-xl font-bold tracking-tight mb-4 text-primary">
              Signal Lost in Deep Space
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto mb-8">
              It seems you've drifted off course. The page you are looking for has been moved, renamed, or doesn't exist.
            </p>
          </motion.div>

          {/* Interactive Navigation Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="w-full sm:w-auto shadow-md">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Home</span>
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/contact" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Contact Support</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
