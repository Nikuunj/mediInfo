import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-zinc-700/15 mt-10">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 fill-[#4285F4] text-[#4285F4]" /> 
              <span className="text-2xl font-bold text-foreground">MediInfo</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Your trusted platform for reliable medical information and healthcare guidance.
            </p>
            <div className="flex space-x-4">
              {/* <Facebook className="h-5 w-5 text-zinc-500 hover:text-primary cursor-pointer transition-colors" /> */}
              <Twitter className="h-5 w-5 text-zinc-500 hover:text-primary cursor-pointer transition-colors" />
              {/* <Instagram className="h-5 w-5 text-zinc-500 hover:text-primary cursor-pointer transition-colors" />  */}
              <Linkedin className="h-5 w-5 text-zinc-500 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Features</a></li>
              {/* <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Medical Database</a></li> */}
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Expert Network</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Health Tracking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">About Us</a></li>
              {/* <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Careers</a></li> */}
              {/* <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Press</a></li> */}
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Terms of Service</a></li>
              {/* <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">HIPAA Compliance</a></li> */}
              {/* <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors">Medical Disclaimer</a></li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-700/15">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-zinc-500">
              © 2024 MediInfo. All rights reserved.
            </p>
            <p className="text-xs text-zinc-500">
              Medical information is for educational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
