import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
];

interface LanguageSelectionProps {
  onLanguageSelect: (languageCode: string) => void;
}

const LanguageSelection = ({ onLanguageSelect }: LanguageSelectionProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      onLanguageSelect(selectedLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-elevated">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center shadow-soft">
              <Globe size={40} className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🟢 Welcome to Agrogen
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Select your preferred language
            </p>
            <p className="text-sm text-muted-foreground">
              अपनी भाषा चुनें | உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  selectedLanguage === lang.code
                    ? 'border-primary bg-primary/10 shadow-card'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">{lang.flag}</div>
                <div className="text-sm font-medium text-foreground">
                  {lang.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {lang.nativeName}
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedLanguage}
              size="lg"
              className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-soft disabled:opacity-50"
            >
              Continue / आगे बढ़ें
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelection;