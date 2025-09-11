import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ArrowLeft } from "lucide-react";

const Register = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRegister = () => {
    // Simulate registration and redirect to appropriate dashboard
    navigate(`/dashboard/${userType}`);
  };

  const getTitle = () => {
    switch (userType) {
      case 'farmer': return 'Farmer Registration';
      case 'retailer': return 'Retailer Registration';
      case 'consumer': return 'Consumer Registration';
      default: return 'Registration';
    }
  };

  const getIcon = () => {
    switch (userType) {
      case 'farmer': return '👨‍🌾';
      case 'retailer': return '🏪';
      case 'consumer': return '🛒';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            🟢 Agrogen
          </h1>
        </div>

        <Card className="shadow-elevated">
          <CardHeader className="text-center pb-8">
            <div className="text-6xl mb-4">{getIcon()}</div>
            <CardTitle className="text-3xl text-card-foreground">{getTitle()}</CardTitle>
            <p className="text-muted-foreground">
              Join the Agrogen community and start your agricultural journey
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="Enter your first name" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="Enter your last name" className="mt-2" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="Enter your email address" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" placeholder="Enter your complete address" className="mt-2" />
            </div>

            {/* User-specific fields */}
            {userType === 'farmer' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize">Farm Size (Acres)</Label>
                    <Input id="farmSize" placeholder="e.g., 10" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="crops">Primary Crops</Label>
                    <Input id="crops" placeholder="e.g., Rice, Wheat" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="fssai">FSSAI License (Upload Document)</Label>
                  <div className="mt-2 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fssai-upload"
                    />
                    <label htmlFor="fssai-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {file ? `Selected: ${file.name}` : 'Click to upload FSSAI license'}
                      </p>
                    </label>
                  </div>
                </div>
              </>
            )}

            {userType === 'retailer' && (
              <>
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input id="businessName" placeholder="Enter your business name" className="mt-2" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gst">GST Number</Label>
                    <Input id="gst" placeholder="Enter GST number" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Input id="businessType" placeholder="e.g., Grocery Store" className="mt-2" />
                  </div>
                </div>
              </>
            )}

            {userType === 'consumer' && (
              <div>
                <Label htmlFor="preferences">Food Preferences (Optional)</Label>
                <Input id="preferences" placeholder="e.g., Organic, Local" className="mt-2" />
              </div>
            )}

            <Button 
              onClick={handleRegister}
              className="w-full bg-gradient-hero hover:scale-105 transition-all duration-300 shadow-soft"
              size="lg"
            >
              Complete Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;