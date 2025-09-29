import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email",
      details: "coach@sandatraining.com",
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Downtown Martial Arts Center\n123 Fighter Street, City",
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Training Hours",
      details: "Mon-Fri: 6AM-9PM\nSat-Sun: 8AM-6PM",
      action: "View Schedule"
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Training?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch to book your first session or ask any questions about 
              Sanda training. I'm here to help you begin your martial arts journey.
            </p>
          </div>
          
          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300 text-center group">
                <info.icon className="w-8 h-8 text-martial-red mx-auto mb-4 group-hover:text-martial-gold transition-colors" />
                <h3 className="font-bold text-foreground mb-3">{info.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed whitespace-pre-line">
                  {info.details}
                </p>
                <Button variant="ghost" size="sm" className="text-martial-gold hover:text-martial-red">
                  {info.action}
                </Button>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="text-center bg-gradient-hero rounded-lg p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Book Your First Session Today
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take the first step towards mastering Sanda. Contact me to schedule 
                your trial session and experience professional martial arts coaching.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg" className="group">
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Me
                </Button>
                <Button variant="outline-hero" size="lg">
                  <Phone className="w-5 h-5" />
                  Call Directly
                </Button>
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-martial-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-martial-red/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;