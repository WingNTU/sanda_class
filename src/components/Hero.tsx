import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target } from "lucide-react";
import heroImage from "@/assets/hero-sanda.jpg";

const Hero = () => {
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
            <span className="text-sm font-medium text-martial-light">Professional Sanda Coach</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Master the Art of
            <span className="block text-transparent bg-gradient-to-r from-martial-red to-martial-gold bg-clip-text">
              Combat Sanda
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your fighting skills with expert coaching in Chinese kickboxing. 
            Build strength, technique, and confidence through personalized training.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="group">
              Book Your Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline-hero" size="lg">
              <Target className="w-5 h-5" />
              View Programs
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-martial-gold mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-martial-gold mb-2">100+</div>
              <div className="text-muted-foreground">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-martial-gold mb-2">15+</div>
              <div className="text-muted-foreground">Competitions Won</div>
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