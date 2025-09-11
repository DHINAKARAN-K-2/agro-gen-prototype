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
  Store, 
  TrendingUp, 
  Package, 
  MessageSquare,
  Truck,
  Bell,
  Star,
  MapPin,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [negotiationPrice, setNegotiationPrice] = useState("");

  // Mock data
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Rajesh Kumar",
      location: "Maharashtra",
      price: "₹40/kg",
      minOrder: "50 kg",
      rating: 4.8,
      image: "🍅",
      quality: "Grade A",
      harvest: "2 days ago"
    },
    {
      id: 2,
      name: "Basmati Rice",
      farmer: "Suresh Patel",
      location: "Punjab", 
      price: "₹85/kg",
      minOrder: "100 kg",
      rating: 4.9,
      image: "🌾",
      quality: "Premium",
      harvest: "1 week ago"
    },
    {
      id: 3,
      name: "Fresh Onions",
      farmer: "Ramesh Singh",
      location: "Gujarat",
      price: "₹25/kg",
      minOrder: "200 kg",
      rating: 4.7,
      image: "🧅",
      quality: "Grade A",
      harvest: "3 days ago"
    }
  ];

  const myOrders = [
    { id: "ORD101", product: "Organic Tomatoes", quantity: "100 kg", status: "Delivered", total: "₹4,000" },
    { id: "ORD102", product: "Basmati Rice", quantity: "200 kg", status: "In Transit", total: "₹17,000" },
    { id: "ORD103", product: "Fresh Onions", quantity: "150 kg", status: "Confirmed", total: "₹3,750" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="bg-card shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">🟢 Agrogen</h1>
              <Badge variant="secondary" className="text-sm">Retailer Dashboard</Badge>
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
            Welcome, Green Grocers 🏪
          </h2>
          <p className="text-muted-foreground">
            Source quality products directly from farmers and manage your inventory
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="analytics">Business Analytics</TabsTrigger>
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
          </TabsList>

          {/* Browse Products Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-primary text-primary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground/80">Total Orders</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Monthly Spend</p>
                      <p className="text-2xl font-bold text-foreground">₹1,25,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Active Suppliers</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                    <Package className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Avg Rating</p>
                      <p className="text-2xl font-bold text-foreground">4.8</p>
                    </div>
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{product.image}</div>
                      <h3 className="text-xl font-semibold text-card-foreground">{product.name}</h3>
                      <p className="text-muted-foreground">by {product.farmer}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Min Order:</span>
                        <span className="text-sm">{product.minOrder}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Location:</span>
                        <span className="text-sm flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Rating:</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{product.quality}</Badge>
                      <Badge variant="outline">Fresh • {product.harvest}</Badge>
                    </div>

                    <div className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-gradient-hero"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Negotiate & Buy
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Negotiate Price - {product.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-4xl mb-2">{product.image}</div>
                              <p className="text-muted-foreground">Current Price: {product.price}</p>
                            </div>
                            <div>
                              <Label htmlFor="quantity">Quantity Needed (kg)</Label>
                              <Input id="quantity" placeholder="Enter quantity" className="mt-2" />
                            </div>
                            <div>
                              <Label htmlFor="negotiatePrice">Your Price Offer</Label>
                              <Input 
                                id="negotiatePrice" 
                                placeholder="e.g., ₹35/kg"
                                value={negotiationPrice}
                                onChange={(e) => setNegotiationPrice(e.target.value)}
                                className="mt-2" 
                              />
                            </div>
                            <div className="space-y-2">
                              <Button className="w-full">Send Price Negotiation</Button>
                              <Button variant="outline" className="w-full">
                                <Phone className="w-4 h-4 mr-2" />
                                Call Farmer Directly
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat with Farmer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Orders Tab */}
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
                        <p className="text-sm text-muted-foreground">{order.product} • {order.quantity}</p>
                        <p className="text-lg font-bold text-primary">{order.total}</p>
                      </div>
                      <div className="text-right">
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
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Purchase trends would appear here</p>
                      <p className="text-sm">📊 Monthly spending: ₹1.25L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Rajesh Kumar</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Suresh Patel</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>4.9</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ramesh Singh</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>4.7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assistant Tab */}
          <TabsContent value="assistant" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Business Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-6 min-h-[300px]">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Assistant:</p>
                        <p className="text-sm mb-4">
                          Hello! I can help you find the best suppliers, negotiate prices, and manage your inventory. What would you like assistance with today?
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button variant="outline" className="text-left justify-start h-auto py-4">
                        <div>
                          <p className="font-semibold">Find Best Prices</p>
                          <p className="text-sm text-muted-foreground">Compare prices across suppliers</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="text-left justify-start h-auto py-4">
                        <div>
                          <p className="font-semibold">Quality Analysis</p>
                          <p className="text-sm text-muted-foreground">Check supplier ratings & reviews</p>
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
    </div>
  );
};

export default RetailerDashboard;