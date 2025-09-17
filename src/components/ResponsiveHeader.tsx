import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X, Globe, Settings } from "lucide-react";
import MobileNavigation from "./MobileNavigation";

interface ResponsiveHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onLanguageChange?: () => void;
  currentLanguage?: string;
  userType?: 'farmer' | 'retailer' | 'consumer';
}

const ResponsiveHeader = ({ 
  title = "Agrogen", 
  showBackButton = false, 
  onBackClick,
  onLanguageChange,
  currentLanguage = "English",
  userType 
}: ResponsiveHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-soft">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackClick}
                className="md:hidden"
              >
                ←
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Sprout size={18} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                🟢 {title}
              </span>
            </div>
          </div>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {onLanguageChange && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLanguageChange}
                className="flex items-center space-x-2"
              >
                <Globe size={16} />
                <span className="text-sm">{currentLanguage}</span>
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings size={16} />
            </Button>
          </div>

          {/* Mobile menu button */}
          {userType && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
        </div>
      </header>

      {/* Mobile Navigation */}
      {userType && (
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          userType={userType}
          onLanguageChange={onLanguageChange}
          currentLanguage={currentLanguage}
        />
      )}
    </>
  );
};

export default ResponsiveHeader;