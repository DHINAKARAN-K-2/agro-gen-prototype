import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Package, 
  Truck, 
  Camera, 
  DollarSign, 
  FileText, 
  Mic, 
  MessageCircle,
  BarChart3,
  Calendar,
  MapPin,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VoiceAssistantModal from "@/components/VoiceAssistantModal";
import ResponsiveHeader from "@/components/ResponsiveHeader";
import GovernmentSchemes from "@/components/GovernmentSchemes";

interface FarmerDashboardProps {
  currentLanguage: string;
  onLanguageChange: () => void;
}

const FarmerDashboard = ({ currentLanguage, onLanguageChange }: FarmerDashboardProps) => {
  const navigate = useNavigate();
  const [diseaseFile, setDiseaseFile] = useState<File | null>(null);
  const [voiceActive, setVoiceActive] = useState(false);

  // Mock data
  const orders = [
    { id: "ORD001", buyer: "Fresh Mart", product: "Organic Tomatoes", qty: "50 kg", status: "In Transit", location: "Mumbai" },
    { id: "ORD002", buyer: "Green Grocers", product: "Basmati Rice", qty: "100 kg", status: "Delivered", location: "Delhi" },
    { id: "ORD003", buyer: "Healthy Foods", product: "Organic Wheat", qty: "200 kg", status: "Preparing", location: "Bangalore" }
  ];

  const schemes = [
    { title: "PM-KISAN Scheme", description: "Direct income support for farmers", amount: "₹6,000/year" },
    { title: "Crop Insurance", description: "Protect your crops from natural disasters", coverage: "90% coverage" },
    { title: "Soil Health Cards", description: "Get detailed soil analysis for better yield", status: "Available" }
  ];

  const mandiPrices = [
    { crop: "Wheat", price: "₹2,125/quintal", change: "+2.5%" },
    { crop: "Rice", price: "₹1,890/quintal", change: "-1.2%" },
    { crop: "Tomato", price: "₹35/kg", change: "+8.3%" },
    { crop: "Onion", price: "₹28/kg", change: "+5.1%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="bg-card shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">🟢 Agrogen</h1>
              <Badge variant="secondary" className="text-sm">Farmer Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Rajesh Kumar 👨‍🌾
          </h2>
          <p className="text-muted-foreground">
            Manage your farm, track orders, and grow your agricultural business
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-rows-2 w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sell">Sell Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="disease">Disease Detection</TabsTrigger>
            <TabsTrigger value="prices">Mandi Prices</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-primary text-primary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground/80">Total Sales</p>
                      <p className="text-2xl font-bold">₹2,45,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Active Orders</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Products Listed</p>
                      <p className="text-2xl font-bold text-foreground">8</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Farm Size</p>
                      <p className="text-2xl font-bold text-foreground">25 Acres</p>
                    </div>
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <Button className="h-16 text-left justify-start bg-gradient-hero">
                  <Package className="w-6 h-6 mr-3" />
                  <div>
                    <p className="font-semibold">List New Product</p>
                    <p className="text-sm opacity-90">Add products to sell</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 text-left justify-start">
                  <Camera className="w-6 h-6 mr-3" />
                  <div>
                    <p className="font-semibold">Detect Disease</p>
                    <p className="text-sm text-muted-foreground">AI-powered diagnosis</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 text-left justify-start">
                  <DollarSign className="w-6 h-6 mr-3" />
                  <div>
                    <p className="font-semibold">Check Prices</p>
                    <p className="text-sm text-muted-foreground">Live mandi rates</p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Voice Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="w-5 h-5 mr-2" />
                  Multilingual Voice & Chat Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Button 
                    onClick={() => setVoiceActive(true)}
                    className="flex-shrink-0 bg-gradient-hero"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Open Voice Assistant
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setVoiceActive(true)}
                    className="flex-shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Open Chatbot
                  </Button>
                  <div className="hidden text-muted-foreground md:block">
                    Available in Hindi, English, Telugu, Tamil
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 min-h-[100px]">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="w-5 h-5 mt-1 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Assistant Preview:</p>
                      <p className="text-sm">
                        Hello! I am here to help you with your farming. You can ask me about crop prices, disease checkups, or government schemes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sell Products Tab */}
          <TabsContent value="sell" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>List New Product for Sale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="e.g., Organic Tomatoes" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="e.g., Vegetables" className="mt-2" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity Available</Label>
                    <Input id="quantity" placeholder="e.g., 100 kg" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Unit</Label>
                    <Input id="price" placeholder="e.g., ₹40/kg" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="harvest">Harvest Date</Label>
                    <Input id="harvest" type="date" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your product quality, organic certification, etc." 
                    className="mt-2" 
                  />
                </div>
                <Button className="w-full bg-gradient-hero">
                  List Product for Sale
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Sales chart would appear here</p>
                      <p className="text-sm">📈 Revenue trend: +15% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Organic Tomatoes</span>
                      <Badge variant="secondary">Best Seller</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Basmati Rice</span>
                      <Badge>High Demand</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Wheat</span>
                      <Badge variant="outline">Seasonal</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Delivery Tab */}
          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.buyer} • {order.product}</p>
                        <p className="text-sm text-muted-foreground">{order.qty} • {order.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                        <div className="flex items-center mt-2">
                          <Truck className="w-4 h-4 mr-1 text-primary" />
                          <span className="text-sm text-muted-foreground">Track</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disease Detection Tab */}
          <TabsContent value="disease" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  AI-Powered Crop Disease Detection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => e.target.files && setDiseaseFile(e.target.files[0])}
                    className="hidden"
                    id="disease-upload"
                  />
                  <label htmlFor="disease-upload" className="cursor-pointer">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      {diseaseFile ? `Selected: ${diseaseFile.name}` : 'Upload Crop Image'}
                    </p>
                    <p className="text-muted-foreground">
                      Take a photo of affected leaves or crops for instant AI analysis
                    </p>
                  </label>
                </div>
                
                {diseaseFile && (
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">🤖 AI Analysis Result:</h3>
                    <div className="bg-card rounded-lg p-4 border-l-4 border-destructive">
                      <p className="font-medium text-destructive mb-2">Detected: Late Blight (Tomato)</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Confidence: 85% • Severity: Moderate
                      </p>
                      <div className="space-y-2">
                        <p className="font-medium text-foreground">Recommended Treatment:</p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Apply copper-based fungicide</li>
                          <li>• Improve air circulation</li>
                          <li>• Remove affected leaves immediately</li>
                          <li>• Avoid overhead watering</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mandi Prices Tab */}
          <TabsContent value="prices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Mandi Prices</CardTitle>
                <p className="text-muted-foreground">Real-time market rates from major mandis</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mandiPrices.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{item.crop}</p>
                        <p className="text-2xl font-bold text-primary">{item.price}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={item.change.includes('+') ? 'default' : 'destructive'}>
                          {item.change}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">24h change</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Government Schemes Tab */}
          <TabsContent value="schemes" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              {schemes.map((scheme, index) => (
                <Card key={index} className="hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {scheme.title}
                      <FileText className="w-5 h-5 text-primary" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{scheme.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        {scheme.amount && <Badge variant="secondary">{scheme.amount}</Badge>}
                        {scheme.coverage && <Badge variant="secondary">{scheme.coverage}</Badge>}
                        {scheme.status && <Badge>{scheme.status}</Badge>}
                      </div>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={voiceActive}
        onClose={() => setVoiceActive(false)}
        userType="farmer"
      />
    </div>
  );
};

export default FarmerDashboard;