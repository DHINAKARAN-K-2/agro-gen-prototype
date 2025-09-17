import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, FileText, CreditCard, Shield, TrendingUp, Leaf, Users } from "lucide-react";

interface Scheme {
  id: string;
  title: string;
  description: string;
  category: 'loan' | 'insurance' | 'subsidy' | 'training' | 'market';
  cropType: string[];
  region: 'all' | 'north' | 'south' | 'east' | 'west' | 'central';
  url: string;
  icon: any;
  benefits: string[];
}

const schemes: Scheme[] = [
  {
    id: '1',
    title: 'PM-Kisan Samman Nidhi',
    description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
    category: 'subsidy',
    cropType: ['all'],
    region: 'all',
    url: 'https://pmkisan.gov.in',
    icon: CreditCard,
    benefits: ['₹2,000 every 4 months', 'Direct bank transfer', 'No paperwork required']
  },
  {
    id: '2',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive crop insurance scheme covering pre-sowing to post-harvest',
    category: 'insurance',
    cropType: ['rice', 'wheat', 'cotton', 'sugarcane'],
    region: 'all',
    url: 'https://pmfby.gov.in',
    icon: Shield,
    benefits: ['Low premium rates', 'Quick claim settlement', 'Coverage for natural disasters']
  },
  {
    id: '3',
    title: 'Soil Health Card Scheme',
    description: 'Provides soil health cards to farmers with nutrient status of their soil',
    category: 'training',
    cropType: ['all'],
    region: 'all',
    url: 'https://soilhealth.dac.gov.in',
    icon: Leaf,
    benefits: ['Free soil testing', 'Fertilizer recommendations', 'Crop-specific advice']
  },
  {
    id: '4',
    title: 'eNAM - National Agriculture Market',
    description: 'Online trading platform for agricultural commodities',
    category: 'market',
    cropType: ['all'],
    region: 'all',
    url: 'https://enam.gov.in',
    icon: TrendingUp,
    benefits: ['Better price discovery', 'Online bidding', 'Transparent transactions']
  },
  {
    id: '5',
    title: 'Kisan Credit Card',
    description: 'Credit facility for agriculture and allied activities',
    category: 'loan',
    cropType: ['all'],
    region: 'all',
    url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1607252',
    icon: CreditCard,
    benefits: ['Low interest rates', 'Easy application', 'Flexible repayment']
  },
  {
    id: '6',
    title: 'National Mission for Sustainable Agriculture',
    description: 'Promotes sustainable agriculture practices and climate resilience',
    category: 'training',
    cropType: ['organic', 'traditional'],
    region: 'all',
    url: 'https://nmsa.dac.gov.in',
    icon: Leaf,
    benefits: ['Training programs', 'Sustainable practices', 'Climate adaptation']
  },
  {
    id: '7',
    title: 'Formation of Farmer Producer Organizations',
    description: 'Support for creating and strengthening FPOs',
    category: 'subsidy',
    cropType: ['all'],
    region: 'all',
    url: 'https://sfac.in/fpo',
    icon: Users,
    benefits: ['Financial support', 'Training & capacity building', 'Market linkages']
  },
  {
    id: '8',
    title: 'Micro Irrigation Fund',
    description: 'Financial assistance for micro irrigation systems',
    category: 'subsidy',
    cropType: ['water-intensive'],
    region: 'all',
    url: 'https://pmksy.gov.in',
    icon: Leaf,
    benefits: ['Water conservation', '90% subsidy available', 'Increased productivity']
  }
];

const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || scheme.region === selectedRegion || scheme.region === 'all';
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'loan': return 'bg-blue-100 text-blue-800';
      case 'insurance': return 'bg-red-100 text-red-800';
      case 'subsidy': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-purple-100 text-purple-800';
      case 'market': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Government Schemes
        </h2>
        <p className="text-muted-foreground">
          Explore various government schemes designed to support farmers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-lg shadow-soft">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="loan">Loans</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
            <SelectItem value="subsidy">Subsidies</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="market">Market</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="north">North India</SelectItem>
            <SelectItem value="south">South India</SelectItem>
            <SelectItem value="east">East India</SelectItem>
            <SelectItem value="west">West India</SelectItem>
            <SelectItem value="central">Central India</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredSchemes.length} of {schemes.length} schemes
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSchemes.map((scheme) => {
          const IconComponent = scheme.icon;
          return (
            <Card key={scheme.id} className="group hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{scheme.title}</CardTitle>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge 
                    variant="secondary" 
                    className={getCategoryColor(scheme.category)}
                  >
                    {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {scheme.description}
                </p>
                
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {scheme.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => window.open(scheme.url, '_blank')}
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No results */}
      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No schemes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;