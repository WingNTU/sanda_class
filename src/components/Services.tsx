import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Target, Clock, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: User,
      title: "1-on-1 Personal Training",
      price: "$80",
      duration: "60 minutes",
      description: "Personalized coaching focused on your specific goals and skill level",
      features: [
        "Custom training plan",
        "Technique refinement",
        "Competition preparation",
        "Flexible scheduling"
      ],
      popular: false
    },
    {
      icon: Users,
      title: "Small Group Classes",
      price: "$45",
      duration: "90 minutes",
      description: "Train with 2-4 other students in a supportive group environment",
      features: [
        "Shared learning experience",
        "Partner drills",
        "Cost-effective training",
        "Regular class schedule"
      ],
      popular: true
    },
    {
      icon: Target,
      title: "Competition Prep",
      price: "$100",
      duration: "90 minutes",
      description: "Intensive training for athletes preparing for Sanda competitions",
      features: [
        "Advanced techniques",
        "Fight strategy",
        "Mental preparation",
        "Video analysis"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Training Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the training format that best fits your goals and schedule. 
              All programs include comprehensive Sanda technique instruction.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`relative p-8 bg-gradient-card border-border hover:shadow-card transition-all duration-300 ${
                  service.popular ? 'ring-2 ring-martial-red shadow-glow' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-martial-red text-foreground px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <service.icon className="w-12 h-12 text-martial-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-3xl font-bold text-martial-red">{service.price}</span>
                    <span className="text-muted-foreground">/session</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-martial-gold flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={service.popular ? "hero" : "outline-hero"} 
                  className="w-full"
                >
                  Book Session
                </Button>
              </Card>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="text-center bg-gradient-card rounded-lg p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              First Session Special
            </h3>
            <p className="text-muted-foreground mb-6">
              New students get 50% off their first personal training session. 
              Experience the quality of professional Sanda coaching before committing.
            </p>
            <Button variant="cta" size="lg">
              Claim Your Trial Session
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;