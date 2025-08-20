import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Globe, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { number: "10M+", label: "Trusted Users" },
    { number: "5000+", label: "Medical Professionals" },
    { number: "50+", label: "Countries Served" },
    { number: "99.9%", label: "Uptime Reliability" }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: "Accuracy First",
      description: "Every piece of medical information is fact-checked and verified by licensed professionals."
    },
    {
      icon: Award,
      title: "Expert Network",
      description: "Our platform is backed by a network of certified healthcare professionals and specialists."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Making quality medical information accessible to people worldwide, regardless of location."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving healthcare access through cutting-edge technology and research."
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant={"outline"} className="w-fit">About MediInfo</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Transforming Healthcare Information Access
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MediInfo was founded with a simple mission: to democratize access to reliable medical 
                information and bridge the gap between patients and healthcare professionals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform combines cutting-edge technology with medical expertise to provide 
                accurate, accessible, and actionable health information to millions of users worldwide.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-primary/5">
                <CardContent className="p-6">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at MediInfo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;