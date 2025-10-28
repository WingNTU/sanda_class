import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target } from "lucide-react";
import heroImage from "@/assets/hero-sanda.jpg";


const Hero = () => {
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navHeight = 64; // Fixed navigation height (h-16 = 4rem = 64px)
      const extraOffset = 20; // Additional offset to account for section padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - extraOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToPrograms = () => {
    smoothScrollTo('services');
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-martial-darker/80 via-martial-dark/60 to-martial-red/20" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-martial-red/20 border border-martial-red/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-martial-gold" />
            <span className="text-sm font-medium text-martial-light">Freelance Sanda Trainer</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Sweat through
            <span className="block text-transparent bg-gradient-to-r from-martial-red to-martial-gold bg-clip-text">
              Sanda
            </span>
            together
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join me in an exciting journey with Chinese kickboxing. 
            Build strength, technique, and confidence through fun, engaging training.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="group" onClick={handleScrollToPrograms}>
              Book Your Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline-hero" size="lg" onClick={handleScrollToPrograms}>
              <Target className="w-5 h-5" />
              View Programs
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-martial-gold mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-martial-gold mb-2">15+</div>
              <div className="text-muted-foreground">Competitions</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-martial-red/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-martial-gold/10 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};

export default Hero;