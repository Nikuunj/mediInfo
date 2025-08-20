import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Phone } from "lucide-react";

const CTA = () => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join millions of users who trust MediInfo for reliable medical information 
                and healthcare guidance. Start your journey to better health today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Card className="border-0 bg-card/50">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Us</p>
                    <p className="text-sm text-muted-foreground">support@mediinfo.com</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-card/50">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Call Us</p>
                    <p className="text-sm text-muted-foreground">1-800-MEDIINFO</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-primary text-primary-foreground border-0 shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Why Choose MediInfo?</h3>
                <ul className="space-y-3 text-primary-foreground/90">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Verified medical information from trusted sources</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Connect with certified healthcare professionals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Personalized health tracking and recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Secure, HIPAA-compliant platform</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>24/7 access to medical resources</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4 border-t border-primary-foreground/20">
                <p className="text-sm text-primary-foreground/80">
                  Join over 10 million users who trust MediInfo for their healthcare information needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTA;
