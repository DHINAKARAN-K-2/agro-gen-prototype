import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ShoppingCart, 
  Heart, 
  TrendingUp, 
  Package, 
  MessageSquare,
  Truck,
  Bell,
  Star,
  MapPin,
  Leaf,
  Mic
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VoiceAssistantModal from "@/components/VoiceAssistantModal";
import ResponsiveHeader from "@/components/ResponsiveHeader";

interface ConsumerDashboardProps {
  currentLanguage: string;
  onLanguageChange: () => void;
}

const ConsumerDashboard = ({ currentLanguage, onLanguageChange }: ConsumerDashboardProps) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Mock data
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Rajesh Kumar",
      location: "Maharashtra",
      price: "₹45/kg",
      originalPrice: "₹60/kg", 
      rating: 4.8,
      image: "🍅",
      organic: true,
      freshness: "Farm Fresh"
    },
    {
      id: 2,
      name: "Premium Basmati Rice",
      farmer: "Suresh Patel", 
      location: "Punjab",
      price: "₹90/kg",
      originalPrice: "₹110/kg",
      rating: 4.9,
      image: "🌾",
      organic: false,
      freshness: "Premium Quality"
    },
    {
      id: 3,
      name: "Fresh Spinach",
      farmer: "Priya Sharma",
      location: "Haryana", 
      price: "₹25/kg",
      originalPrice: "₹35/kg",
      rating: 4.7,
      image: "🥬",
      organic: true,
      freshness: "Harvested Today"
    },
    {
      id: 4,
      name: "Sweet Mangoes",
      farmer: "Kiran Patil",
      location: "Karnataka",
      price: "₹120/kg", 
      originalPrice: "₹150/kg",
      rating: 4.9,
      image: "🥭",
      organic: true,
      freshness: "Seasonal Special"
    }
  ];

  const myOrders = [
    { id: "ORD201", items: "Organic Tomatoes, Spinach", status: "Delivered", total: "₹320", date: "2024-01-15" },
    { id: "ORD202", items: "Basmati Rice, Mangoes", status: "In Transit", total: "₹580", date: "2024-01-16" },
    { id: "ORD203", items: "Mixed Vegetables", status: "Preparing", total: "₹450", date: "2024-01-17" }
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="bg-card shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">🟢 Agrogen</h1>
              <Badge variant="secondary" className="text-sm">Consumer Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cart.length})
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
            Welcome, Anita Sharma 🛒
          </h2>
          <p className="text-muted-foreground">
            Discover fresh produce directly from farmers near you
          </p>
        </div>

        <Tabs defaultValue="shop" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="shop">Shop Fresh</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
          </TabsList>

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-primary text-primary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground/80">Total Orders</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Savings This Month</p>
                      <p className="text-2xl font-bold text-foreground">₹2,340</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Favorite Farmers</p>
                      <p className="text-2xl font-bold text-foreground">5</p>
                    </div>
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Cart Items</p>
                      <p className="text-2xl font-bold text-foreground">{cart.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categories */}
            <div className="flex space-x-4 mb-6">
              <Button variant="default" className="bg-gradient-hero">🥕 Vegetables</Button>
              <Button variant="outline">🍎 Fruits</Button>
              <Button variant="outline">🌾 Grains</Button>
              <Button variant="outline">🥛 Dairy</Button>
              <Button variant="outline">🌿 Herbs</Button>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-card transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="relative">
                      <div className="text-center mb-4">
                        <div className="text-5xl mb-2">{product.image}</div>
                        <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">by {product.farmer}</p>
                      </div>
                      
                      {product.organic && (
                        <Badge className="absolute top-0 right-0 bg-green-600">
                          <Leaf className="w-3 h-3 mr-1" />
                          Organic
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-primary">{product.price}</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {product.originalPrice}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.location}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {product.freshness}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-gradient-hero">
                            Quick Buy
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Buy {product.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-4xl mb-2">{product.image}</div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-muted-foreground">by {product.farmer}</p>
                              <p className="text-2xl font-bold text-primary mt-2">{product.price}</p>
                            </div>
                            <div>
                              <Label htmlFor="quantity">Quantity (kg)</Label>
                              <Input id="quantity" placeholder="Enter quantity" className="mt-2" />
                            </div>
                            <div>
                              <Label htmlFor="address">Delivery Address</Label>
                              <Input id="address" placeholder="Enter delivery address" className="mt-2" />
                            </div>
                            <div className="space-y-2">
                              <Button className="w-full" onClick={() => addToCart(product)}>
                                Add to Cart & Continue Shopping
                              </Button>
                              <Button variant="outline" className="w-full">
                                Buy Now & Checkout
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History & Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{order.total}</p>
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                        <div className="flex items-center mt-2">
                          <Truck className="w-4 h-4 mr-1 text-primary" />
                          <span className="text-sm text-muted-foreground">Track Order</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Tracking Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Live Tracking - ORD202</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">✓</div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-muted-foreground">Jan 16, 2024 - 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">✓</div>
                    <div>
                      <p className="font-medium">Packed by Farmer</p>
                      <p className="text-sm text-muted-foreground">Jan 16, 2024 - 4:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">📦</div>
                    <div>
                      <p className="font-medium">In Transit</p>
                      <p className="text-sm text-muted-foreground">Expected delivery: Jan 17, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm">🚚</div>
                    <div>
                      <p className="font-medium text-muted-foreground">Out for Delivery</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Favorite Products & Farmers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Favorite Products</h3>
                    <div className="space-y-3">
                      {products.slice(0, 2).map((product) => (
                        <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="text-2xl">{product.image}</div>
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">by {product.farmer}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{product.price}</p>
                            <Button size="sm" variant="outline">Buy Again</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Favorite Farmers</h3>
                    <div className="space-y-3">
                      {["Rajesh Kumar", "Suresh Patel"].map((farmer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{farmer}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="text-sm">4.8</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">View Products</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assistant Tab */}
          <TabsContent value="assistant" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Multilingual Voice & Chat Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Button 
                    onClick={() => setAssistantOpen(true)}
                    className="flex-shrink-0 bg-gradient-hero"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Open Voice Assistant
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setAssistantOpen(true)}
                    className="flex-shrink-0"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Open Chatbot
                  </Button>
                  <div className="text-muted-foreground">
                    Available in Hindi, English, Telugu, Tamil
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 min-h-[300px]">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Assistant Preview:</p>
                        <p className="text-sm mb-4">
                          Hello Anita! I can help you find fresh produce, compare prices, and get the best deals from farmers near you. What are you looking for today?
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="text-left justify-start h-auto py-4"
                        onClick={() => setAssistantOpen(true)}
                      >
                        <div>
                          <p className="font-semibold">Recipe Suggestions</p>
                          <p className="text-sm text-muted-foreground">Based on seasonal produce</p>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-left justify-start h-auto py-4"
                        onClick={() => setAssistantOpen(true)}
                      >
                        <div>
                          <p className="font-semibold">Nutrition Advice</p>
                          <p className="text-sm text-muted-foreground">Healthy meal planning</p>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-left justify-start h-auto py-4"
                        onClick={() => setAssistantOpen(true)}
                      >
                        <div>
                          <p className="font-semibold">Find Best Deals</p>
                          <p className="text-sm text-muted-foreground">Compare prices & quality</p>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-left justify-start h-auto py-4"
                        onClick={() => setAssistantOpen(true)}
                      >
                        <div>
                          <p className="font-semibold">Seasonal Produce</p>
                          <p className="text-sm text-muted-foreground">What's fresh right now</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        userType="consumer"
      />
    </div>
  );
};

export default ConsumerDashboard;