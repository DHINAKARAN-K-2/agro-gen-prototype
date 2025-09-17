import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Package, 
  BarChart3, 
  Truck, 
  Camera, 
  TrendingUp, 
  FileText, 
  MessageCircle,
  ShoppingBag,
  Search,
  Heart,
  Globe,
  Settings,
  LogOut
} from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'farmer' | 'retailer' | 'consumer';
  onLanguageChange?: () => void;
  currentLanguage?: string;
}

const MobileNavigation = ({ 
  isOpen, 
  onClose, 
  userType, 
  onLanguageChange,
  currentLanguage = "English" 
}: MobileNavigationProps) => {
  
  const getMenuItems = () => {
    switch (userType) {
      case 'farmer':
        return [
          { icon: Package, label: "Sell Products", id: "sell" },
          { icon: BarChart3, label: "Analytics", id: "analytics" },
          { icon: Truck, label: "Delivery Tracking", id: "delivery" },
          { icon: Camera, label: "Disease Detection", id: "disease" },
          { icon: TrendingUp, label: "Mandi Prices", id: "prices" },
          { icon: FileText, label: "Government Schemes", id: "schemes" },
          { icon: MessageCircle, label: "Voice Assistant", id: "assistant" },
        ];
      case 'retailer':
        return [
          { icon: ShoppingBag, label: "Browse Products", id: "browse" },
          { icon: Search, label: "Search", id: "search" },
          { icon: BarChart3, label: "Analytics", id: "analytics" },
          { icon: Truck, label: "Track Orders", id: "track" },
          { icon: MessageCircle, label: "Voice Assistant", id: "assistant" },
        ];
      case 'consumer':
        return [
          { icon: ShoppingBag, label: "Shop Products", id: "shop" },
          { icon: Heart, label: "Favorites", id: "favorites" },
          { icon: Truck, label: "Track Orders", id: "track" },
          { icon: MessageCircle, label: "Voice Assistant", id: "assistant" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleMenuClick = (itemId: string) => {
    // Handle navigation here
    console.log(`Navigate to ${itemId}`);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-left">
            🟢 Agrogen
          </SheetTitle>
          <p className="text-sm text-muted-foreground text-left">
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
          </p>
        </SheetHeader>

        <div className="px-6 pb-6">
          {/* Navigation Items */}
          <div className="space-y-2 mb-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleMenuClick(item.id)}
                  className="w-full justify-start h-12 text-left"
                >
                  <IconComponent size={18} className="mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Settings Section */}
          <div className="border-t border-border pt-6 space-y-2">
            {onLanguageChange && (
              <Button
                variant="ghost"
                onClick={onLanguageChange}
                className="w-full justify-start h-12"
              >
                <Globe size={18} className="mr-3" />
                <div className="text-left">
                  <div>Change Language</div>
                  <div className="text-xs text-muted-foreground">
                    Current: {currentLanguage}
                  </div>
                </div>
              </Button>
            )}
            
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
            >
              <Settings size={18} className="mr-3" />
              Settings
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-destructive hover:text-destructive"
            >
              <LogOut size={18} className="mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;