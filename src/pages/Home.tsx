import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sprout, Users, ShoppingCart } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Home = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: "Register as Farmer",
      description: "Sell your produce, access analytics, and grow your business",
      icon: Sprout,
      path: "/register/farmer",
      color: "bg-gradient-primary"
    },
    {
      title: "Register as Retailer", 
      description: "Source quality products and manage your inventory",
      icon: Users,
      path: "/register/retailer",
      color: "bg-gradient-hero"
    },
    {
      title: "Register as Consumer",
      description: "Buy fresh produce directly from farmers",
      icon: ShoppingCart,
      path: "/register/consumer", 
      color: "bg-gradient-card"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            🟢 Agrogen
          </h1>
          <p className="text-2xl md:text-3xl mb-4 opacity-90">
            The Next Generation Agriculture
          </p>
          <p className="text-lg md:text-xl mb-12 opacity-80 max-w-2xl mx-auto">
            Connecting farmers, retailers, and consumers in a revolutionary agricultural ecosystem
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-hero hover:scale-105 transition-all duration-300 shadow-elevated"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your Role
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users already transforming agriculture through technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:scale-105 transition-all duration-300 shadow-card hover:shadow-elevated cursor-pointer"
                  onClick={() => navigate(type.path)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${type.color} flex items-center justify-center text-white shadow-soft`}>
                      <IconComponent size={40} />
                    </div>
                    <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {type.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Powered by Advanced Technology
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "📊 Business Analytics", 
              "🚚 Delivery Tracking", 
              "🌱 Crop Disease Detection", 
              "🗣️ Multilingual Assistant"
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-soft">
                <p className="text-lg font-medium text-card-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;