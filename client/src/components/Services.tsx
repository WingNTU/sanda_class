import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Target, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

const Services = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const services = [
    {
      icon: User,
      title: "1-on-1 Personal Training",
      price: "$100",
      duration: "60 minutes",
      description: "Personalized coaching focused on your specific goals and skill level\nCome to you at your convenience",
      features: [
        "Custom training plan",
        "Technique refinement",
        "Competition preparation",
      ],
      popular: false
    },
    {
      icon: Users,
      title: "Group Classes",
      price: "$50",
      duration: "90 minutes",
      description: "Train in a supportive group environment while receiving personalized attention",
      features: [
        "Shared learning experience",
        "Partner drills",
        "Cost-effective training",
        "Regular class schedule"
      ],
      popular: true
    },
    {
      icon: Users,
      title: "Free Trial Classes",
      price: "$50",
      duration: "90 minutes",
      description: "2x Free trial class to experience the training environment and coaching style",
      features: [
        "Experience group dynamics",
        "Discover passion for Sanda",
        "Meet the community and coaches",
        "No obligation to continue"
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
              First Timer? Looking for free trials? We offer 2x free trials classes! Join us! <br /> 
              All programs include comprehensive Sanda technique instruction.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="flex justify-center mb-16">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`relative p-8 bg-gradient-card hover:shadow-card transition-all duration-300 w-full max-w-lg ${
                  service.popular ? 'border-2 border-martial-red shadow-glow' : 'border-border'
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
                  <div className="flex flex-col items-center gap-1 mb-2">
                    {service.title === "Group Classes" ? (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-lg font-medium text-muted-foreground line-through">{service.price}</span>
                          <span className="text-sm text-muted-foreground">/session</span>
                        </div>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-bold text-martial-red">$35</span>
                          <span className="text-muted-foreground">/session</span>
                          <span className="ml-2 bg-martial-gold text-martial-dark px-2 py-1 rounded-full text-xs font-bold">
                            SALE
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold text-martial-red">{service.price}</span>
                        <span className="text-muted-foreground">/session</span>
                      </div>
                    )}
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
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Session
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
};

export default Services;