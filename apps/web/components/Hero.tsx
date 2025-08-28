"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import medicalHero from "@/assets/medical-hero.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative  min-h-screen bg-gradient-to-br from-medical-blue-light to-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Trusted
                <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Medical Information
                </span>
                Platform
              </h1>
              <p className="text-xl text-zinc-500 leading-relaxed">
                Access reliable medical information, connect with healthcare professionals, 
                and take control of your health journey with MediInfo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={'/item'} className="cursor-pointer">
                <Button size="lg" className="text-lg px-8 py-6 group" onClick={() => router.push('/item')}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Verified Information</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Expert Network</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">24/7 Access</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src={medicalHero}
                alt="Medical professionals and healthcare technology"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
