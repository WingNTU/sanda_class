import { Card } from "@/components/ui/card";
import { Trophy, Users, Zap, Shield } from "lucide-react";
import coachImage from "@/assets/cermelang-bronze.jpg";


const About = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Singapore National Sanda Athlete",
      description: "In the national team representing Singapore in multiple international competitions in the 65kg category since 2018"
    },
    {
      icon: Users,
      title: "Captain of NTU Muay Thai Team",
      description: "Helped to lead the team to multiple victories in competitions while planning training sessions and mentoring junior members"
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
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              About Your Coach
            </h2>
            <div className="grid lg:grid-cols-2 gap-2 items-center">
              {/* Coach Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-80 h-80 rounded-lg overflow-hidden bg-gradient-card border border-border">
                  <img 
                    src={coachImage} 
                    alt="Wing - Sanda Coach" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 25%' }}
                  />
                </div>
              </div>
              
              {/* About Text */}
              <div className="text-center lg:text-left">
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  As a national Sanda athlete with years of competitive experience, I'm dedicated to sharing my passion for sanda with students of all levels.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Besides Sanda, I also have background in Muay Thai and Boxing, which I incorporate into my coaching to provide a well-rounded martial arts experience.
                </p>
              </div>
            </div>
          </div>

          {/* my goal */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">My Goal</h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              My goal is to promote Sanda across Singapore, build a community, and inspire others to embrace the art of Sanda.
              My <span className="font-bold">ULTIMATE</span> goal is to have my own Sanda-Cafe Fusion Gym where people can train and chillax with drinks at the same time.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                What is Sanda (Chinese Kickboxing) ?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Sanda, also known as Chinese kickboxing, is a complete combat sport that combines 
                striking (kicking and punching) with wrestling techniques. My coaching approach focuses on 
                building fundamental skills while having a <span>fun</span> element infused throughout the training.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're a complete beginner or looking to refine your technique, 
                my personalized training programs will help you achieve your goals safely 
                and effectively.
              </p>
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