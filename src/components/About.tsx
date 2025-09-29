import { Card } from "@/components/ui/card";
import { Trophy, Users, Zap, Shield } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Competition Champion",
      description: "Multiple regional Sanda competition wins with proven track record"
    },
    {
      icon: Users,
      title: "Expert Instructor",
      description: "Certified coach with 5+ years of teaching experience"
    },
    {
      icon: Zap,
      title: "Dynamic Training",
      description: "High-energy sessions that build both skill and confidence"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Emphasis on proper technique and injury prevention"
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Your Coach
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With years of competitive experience and a passion for teaching, 
              I'm dedicated to helping you reach your martial arts goals.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Why Choose Professional Sanda Training?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Sanda, also known as Chinese kickboxing, is a complete combat sport that combines 
                striking, throwing, and grappling techniques. My coaching approach focuses on 
                building fundamental skills while developing the mental discipline that makes 
                great fighters.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're a complete beginner or looking to refine your technique, 
                my personalized training programs will help you achieve your goals safely 
                and effectively.
              </p>
              
              {/* Quick Stats */}
              <div className="flex gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-martial-gold">5+</div>
                  <div className="text-sm text-muted-foreground">Years Coaching</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-martial-gold">15+</div>
                  <div className="text-sm text-muted-foreground">Competitions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-martial-gold">100+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
              </div>
            </div>
            
            {/* Achievements Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300 group">
                  <achievement.icon className="w-8 h-8 text-martial-red mb-4 group-hover:text-martial-gold transition-colors" />
                  <h4 className="font-bold text-foreground mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;