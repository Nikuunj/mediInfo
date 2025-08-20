import { Card, CardContent } from "@/components/ui/card";
import { 
  Stethoscope, 
  BookOpen, 
  MessageCircle, 
  Calendar, 
  Shield, 
  Search,
  Heart,
  Users
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "Medical Database",
      description: "Access comprehensive medical information from verified sources and healthcare professionals."
    },
    {
      icon: BookOpen,
      title: "Health Education",
      description: "Learn about conditions, treatments, and preventive care through our educational resources."
    },
    {
      icon: MessageCircle,
      title: "Expert Consultation",
      description: "Connect with certified healthcare professionals for reliable medical guidance."
    },
    {
      icon: Calendar,
      title: "Health Tracking",
      description: "Monitor your health metrics and maintain a comprehensive health record."
    },
    {
      icon: Shield,
      title: "Verified Content",
      description: "All medical information is reviewed and verified by licensed healthcare professionals."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find relevant medical information quickly with our intelligent search system."
    },
    {
      icon: Heart,
      title: "Wellness Tips",
      description: "Receive personalized wellness recommendations based on your health profile."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a supportive community of people sharing similar health journeys."
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Everything You Need for Better Health
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive medical information and tools designed to help you make informed health decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
