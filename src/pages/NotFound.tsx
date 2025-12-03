import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative">
      <div className="text-center relative z-10">
        <h1 className="text-[clamp(4rem,12vw,8rem)] font-display font-bold mb-4">404</h1>
        <p className="text-xl mb-8 opacity-70">Oops! Page not found</p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-bold uppercase tracking-widest"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
