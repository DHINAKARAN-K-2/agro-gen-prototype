import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, MessageSquare, Volume2, VolumeX } from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
  speechLang: string;
}

interface Message {
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'farmer' | 'retailer' | 'consumer';
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', speechLang: 'en-US' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', speechLang: 'hi-IN' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', speechLang: 'ta-IN' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', speechLang: 'te-IN' }
];

const multilingual = {
  en: {
    selectLanguage: "Select your language",
    voiceAssistant: "Voice Assistant",
    startListening: "Start Listening",
    stopListening: "Stop Listening",
    currentlySupported: "Currently supporting limited commands in English",
    greeting: {
      farmer: "Hello! I'm here to help you with your farming needs. You can ask me about crop prices, disease detection, or government schemes.",
      retailer: "Hello! I can help you find the best suppliers, negotiate prices, and manage your inventory. What would you like assistance with?",
      consumer: "Hello! I can help you find fresh produce, track your orders, and discover new farmers. How can I assist you today?"
    },
    sampleQuestions: {
      farmer: [
        "What are today's mandi prices?",
        "How to detect crop diseases?", 
        "Tell me about government schemes"
      ],
      retailer: [
        "Find best price for tomatoes",
        "Show me top rated suppliers",
        "Help me negotiate better deals"
      ],
      consumer: [
        "Where can I find organic vegetables?",
        "Track my recent order",
        "Show me seasonal fruits"
      ]
    }
  },
  hi: {
    selectLanguage: "अपनी भाषा चुनें",
    voiceAssistant: "आवाज सहायक",
    startListening: "सुनना शुरू करें",
    stopListening: "सुनना बंद करें", 
    currentlySupported: "वर्तमान में हिंदी में सीमित कमांड का समर्थन कर रहे हैं",
    greeting: {
      farmer: "नमस्ते! मैं आपकी खेती की जरूरतों में मदद के लिए यहाँ हूँ। आप मुझसे फसल की कीमतें, बीमारी की जांच, या सरकारी योजनाओं के बारे में पूछ सकते हैं।",
      retailer: "नमस्ते! मैं आपको सबसे अच्छे आपूर्तिकर्ता खोजने, कीमतों पर बातचीत करने और आपकी इन्वेंट्री का प्रबंधन करने में मदद कर सकता हूँ।",
      consumer: "नमस्ते! मैं आपको ताजी उपज खोजने, अपने ऑर्डर को ट्रैक करने और नए किसानों की खोज करने में मदद कर सकता हूँ।"
    },
    sampleQuestions: {
      farmer: [
        "आज के मंडी भाव क्या हैं?",
        "फसल की बीमारी कैसे पहचानें?",
        "सरकारी योजनाओं के बारे में बताएं"
      ],
      retailer: [
        "टमाटर के लिए सबसे अच्छी कीमत खोजें",
        "मुझे शीर्ष रेटेड आपूर्तिकर्ता दिखाएं",
        "बेहतर सौदे की बातचीत में मदद करें"
      ],
      consumer: [
        "मुझे जैविक सब्जियां कहाँ मिल सकती हैं?",
        "मेरे हाल के ऑर्डर को ट्रैक करें",
        "मुझे मौसमी फल दिखाएं"
      ]
    }
  },
  ta: {
    selectLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    voiceAssistant: "குரல் உதவியாளர்",
    startListening: "கேட்க ஆரம்பிக்கவும்",
    stopListening: "கேட்பதை நிறுத்தவும்",
    currentlySupported: "தற்போது தமிழில் வரையறுக்கப்பட்ட கட்டளைகளை ஆதரிக்கிறது",
    greeting: {
      farmer: "வணக்கம்! உங்கள் விவசாய தேவைகளில் உதவ நான் இங்கே இருக்கிறேன். பயிர் விலைகள், நோய் கண்டறிதல் அல்லது அரசாங்க திட்டங்களைப் பற்றி என்னிடம் கேட்கலாம்.",
      retailer: "வணக்கம்! சிறந்த சப்ளையர்களைக் கண்டறியவும், விலைகளை பேரம் பேசவும், உங்கள் சரக்குகளை நிர்வகிக்கவும் உங்களுக்கு உதவ முடியும்.",
      consumer: "வணக்கம்! புதிய விளைபொருட்களைக் கண்டறியவும், உங்கள் ஆர்டர்களைக் கண்காணிக்கவும், புதிய விவசாயிகளைக் கண்டறியவும் உங்களுக்கு உதவ முடியும்."
    },
    sampleQuestions: {
      farmer: [
        "இன்றைய சந்தை விலைகள் என்ன?",
        "பயிர் நோயைக் கண்டறிவது எப்படி?",
        "அரசாங்க திட்டங்களைப் பற்றி சொல்லுங்கள்"
      ],
      retailer: [
        "தக்காளிக்கு சிறந்த விலையைக் கண்டறியவும்",
        "எனக்கு உயர் மதிப்பீட்டு சப்ளையர்களைக் காட்டுங்கள்",
        "சிறந்த ஒப்பந்தம் பேச உதவுங்கள்"
      ],
      consumer: [
        "எனக்கு இயற்கை காய்கறிகள் எங்கே கிடைக்கும்?",
        "என் சமீபத்திய ஆர்டரைக் கண்காணிக்கவும்",
        "எனக்கு பருவகால பழங்களைக் காட்டுங்கள்"
      ]
    }
  },
  te: {
    selectLanguage: "మీ భాషను ఎంచుకోండి",
    voiceAssistant: "వాయిస్ అసిస్టెంట్",
    startListening: "వినడం ప్రారంభించండి",
    stopListening: "వినడం ఆపండి",
    currentlySupported: "ప్రస్తుతం తెలుగులో పరిమిత ఆదేశాలకు మద్దతు ఇస్తోంది",
    greeting: {
      farmer: "నమస్కారం! మీ వ్యవసాయ అవసరాలలో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. పంట ధరలు, వ్యాధి గుర్తింపు లేదా ప్రభుత్వ పథకాల గురించి నన్ను అడగవచ్చు.",
      retailer: "నమస్కారం! ఉత్తమ సరఫరాదారులను కనుగొనడానికి, ధరలను బేరం చేయడానికి మరియు మీ ఇన్వెంటరీని నిర్వహించడానికి నేను మీకు సహాయం చేయగలను.",
      consumer: "నమస్కారం! తాజా ఉత్పత్తులను కనుగొనడానికి, మీ ఆర్డర్‌లను ట్రాక్ చేయడానికి మరియు కొత్త రైతులను కనుగొనడానికి నేను మీకు సహాయం చేయగలను."
    },
    sampleQuestions: {
      farmer: [
        "నేటి మార్కెట్ ధరలు ఏమిటి?",
        "పంట వ్యాధిని ఎలా గుర్తించాలి?",
        "ప్రభుత్వ పథకాల గురించి చెప్పండి"
      ],
      retailer: [
        "టమోటాలకు ఉత్తమ ధరను కనుగొనండి",
        "నాకు అత్యధిక రేటింగ్ ఉన్న సరఫరాదారులను చూపించండి",
        "మెరుగైన డీల్స్ చేయడంలో సహాయం చేయండి"
      ],
      consumer: [
        "నాకు సేంద్రీయ కూరగాయలు ఎక్కడ దొరుకుతాయి?",
        "నా ఇటీవలి ఆర్డర్‌ను ట్రాక్ చేయండి",
        "నాకు కాలానుగుణ పండ్లను చూపించండి"
      ]
    }
  }
};

const VoiceAssistantModal = ({ isOpen, onClose, userType }: VoiceAssistantModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      setRecognition(recognitionInstance);
    }
  }, []);

  // Set up speech recognition events
  useEffect(() => {
    if (!recognition || !selectedLanguage) return;

    const currentLang = languages.find(lang => lang.code === selectedLanguage);
    if (currentLang) {
      recognition.lang = currentLang.speechLang;
    }

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleUserMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
    };
  }, [recognition, selectedLanguage]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const currentLang = languages.find(lang => lang.code === selectedLanguage);
      
      if (currentLang) {
        utterance.lang = currentLang.speechLang;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleUserMessage = (text: string) => {
    const userMessage: Message = {
      type: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse = generateResponse(text, selectedLanguage as keyof typeof multilingual, userType);
      const assistantMessage: Message = {
        type: 'assistant',
        text: assistantResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      speak(assistantResponse);
    }, 1000);
  };

  const generateResponse = (userText: string, lang: keyof typeof multilingual, type: string): string => {
    const responses = {
      en: {
        farmer: {
          price: "Today's mandi prices: Wheat ₹2,125/quintal (+2.5%), Rice ₹1,890/quintal (-1.2%), Tomato ₹35/kg (+8.3%)",
          disease: "For disease detection, please upload a clear photo of affected leaves. Our AI can identify common diseases like blight, rust, and mildew.",
          scheme: "Government schemes available: PM-KISAN (₹6,000/year), Crop Insurance (90% coverage), and Soil Health Cards for free soil testing."
        },
        retailer: {
          price: "Best tomato prices today: ₹32/kg from Rajesh Kumar (4.8★), ₹35/kg from Priya Sharma (4.7★). Both offer minimum 50kg orders.",
          supplier: "Top suppliers: Rajesh Kumar (Maharashtra, 4.8★), Suresh Patel (Punjab, 4.9★), both with excellent delivery records.",
          negotiate: "For better deals, consider bulk orders, advance payment, or seasonal contracts. I can help you draft negotiation points."
        },
        consumer: {
          organic: "Organic vegetables available from: Rajesh Kumar (tomatoes, spinach), Priya Sharma (leafy greens), Kiran Patil (seasonal produce).",
          order: "Your order ORD202 is in transit. Expected delivery: Jan 17, 2024. Items: Basmati Rice, Mangoes. Total: ₹580.",
          seasonal: "Seasonal fruits now: Mangoes (₹120/kg), Oranges (₹60/kg), Pomegranates (₹180/kg). All freshly harvested!"
        }
      },
      hi: {
        farmer: {
          price: "आज के मंडी भाव: गेहूं ₹2,125/क्विंटल (+2.5%), चावल ₹1,890/क्विंटल (-1.2%), टमाटर ₹35/किग्रा (+8.3%)",
          disease: "बीमारी की जांच के लिए, प्रभावित पत्तियों की स्पष्ट तस्वीर अपलोड करें। हमारा AI सामान्य बीमारियों की पहचान कर सकता है।",
          scheme: "उपलब्ध सरकारी योजनाएं: पीएम-किसान (₹6,000/वर्ष), फसल बीमा (90% कवरेज), और मुफ्त मिट्टी परीक्षण के लिए स्वास्थ्य कार्ड।"
        },
        retailer: {
          price: "आज टमाटर की सबसे अच्छी कीमतें: राजेश कुमार से ₹32/किग्रा (4.8★), प्रिया शर्मा से ₹35/किग्रा (4.7★)।",
          supplier: "शीर्ष आपूर्तिकर्ता: राजेश कुमार (महाराष्ट्र, 4.8★), सुरेश पटेल (पंजाब, 4.9★), दोनों बेहतरीन डिलीवरी रिकॉर्ड के साथ।",
          negotiate: "बेहतर सौदों के लिए, बल्क ऑर्डर, एडवांस पेमेंट, या सीजनल कॉन्ट्रैक्ट पर विचार करें।"
        },
        consumer: {
          organic: "जैविक सब्जियां उपलब्ध: राजेश कुमार (टमाटर, पालक), प्रिया शर्मा (हरी पत्तेदार सब्जियां), किरन पाटिल (मौसमी उत्पाद)।",
          order: "आपका ऑर्डर ORD202 ट्रांजिट में है। अपेक्षित डिलीवरी: 17 जनवरी, 2024। आइटम: बासमती चावल, आम। कुल: ₹580।",
          seasonal: "अभी मौसमी फल: आम (₹120/किग्रा), संतरे (₹60/किग्रा), अनार (₹180/किग्रा)। सभी ताजा कटे हुए!"
        }
      },
      ta: {
        farmer: {
          price: "இன்றைய சந்தை விலைகள்: கோதுமை ₹2,125/குவிண்டல் (+2.5%), அரிசி ₹1,890/குவிண்டல் (-1.2%), தக்காளி ₹35/கிலோ (+8.3%)",
          disease: "நோய் கண்டறிதலுக்கு, பாதிக்கப்பட்ட இலைகளின் தெளிவான புகைப்படத்தை பதிவேற்றவும். எங்கள் AI பொதுவான நோயங்களை அடையாளம் காண முடியும்.",
          scheme: "கிடைக்கும் அரசாங்க திட்டங்கள்: PM-KISAN (₹6,000/ஆண்டு), பயிர் காப்பீடு (90% கவரேஜ்), இலவச மண் பரிசோதனைக்கான ஆரோக்கிய அட்டைகள்."
        },
        retailer: {
          price: "இன்று தக்காளியின் சிறந்த விலைகள்: ராஜேஷ் குமாரிடமிருந்து ₹32/கிலோ (4.8★), பிரியா சர்மாவிடமிருந்து ₹35/கிலோ (4.7★)।",
          supplier: "சிறந்த சப்ளையர்கள்: ராஜேஷ் குமார் (மகாராஷ்டிரா, 4.8★), சுரேஷ் பட்டேல் (பஞ்சாப், 4.9★), இருவருமே சிறந்த டெலிவரி ரெக்கார்டுடன்.",
          negotiate: "சிறந்த ஒப்பந்தங்களுக்கு, மொத்த ஆர்டர்கள், முன்னேற்ற பணம் அல்லது பருவகால ஒப்பந்தங்களைக் கருதுங்கள்."
        },
        consumer: {
          organic: "இயற்கை காய்கறிகள் கிடைக்கும்: ராஜேஷ் குமார் (தக்காளி, கீரை), பிரியா சர்மா (இலைக் காய்கறிகள்), கிரண் பாட்டீல் (பருவகால உற்பத்தி)।",
          order: "உங்கள் ஆர்டர் ORD202 போக்குவரத்தில் உள்ளது. எதிர்பார்க்கப்படும் டெலிவரி: ஜன 17, 2024. பொருட்கள்: பாஸ்மதி அரிசி, மாம்பழம். மொத்தம்: ₹580.",
          seasonal: "இப்போதைய பருவகால பழங்கள்: மாம்பழம் (₹120/கிலோ), ஆரஞ்சு (₹60/கிலோ), மாதுளை (₹180/கிலோ). அனைத்தும் புதிதாக அறுவடை செய்யப்பட்டவை!"
        }
      },
      te: {
        farmer: {
          price: "నేటి మార్కెట్ ధరలు: గోధుమ ₹2,125/క్వింటల్‌ (+2.5%), బియ్యం ₹1,890/క్వింటల్‌ (-1.2%), టమాటో ₹35/కిలో (+8.3%)",
          disease: "వ్యాధి గుర్తింపు కోసం, బాధిత ఆకుల స్పష్టమైన ఫోటో అప్‌లోడ్ చేయండి. మా AI సాధారణ వ్యాధులను గుర్తించగలదు.",
          scheme: "అందుబాటులో ఉన్న ప్రభుత్వ పథకాలు: PM-KISAN (₹6,000/సంవత్సరం), పంట బీమా (90% కవరేజ్), ఉచిత మట్టి పరీక్ష కోసం ఆరోగ్య కార్డులు."
        },
        retailer: {
          price: "నేడు టమాటో ఉత్తమ ధరలు: రాజేష్ కుమార్ నుండి ₹32/కిలో (4.8★), ప్రియా శర్మ నుండి ₹35/కిలో (4.7★).",
          supplier: "టాప్ సప్లైయర్లు: రాజేష్ కుమార్ (మహారాష్ట్ర, 4.8★), సురేష్ పటేల్ (పంజాబ్, 4.9★), ఇద్దరూ అద్భుతమైన డెలివరీ రికార్డులతో.",
          negotiate: "మెరుగైన డీల్స్ కోసం, బల్క్ ఆర్డర్లు, అడ్వాన్స్ పేమెంట్ లేదా సీజనల్ కాంట్రాక్టులను పరిగణించండి."
        },
        consumer: {
          organic: "సేంద్రీయ కూరగాయలు అందుబాటులో: రాజేష్ కుమార్ (టమాటోలు, పాలకూర), ప్రియా శర్మ (ఆకుకూరలు), కిరণ్ పాటిల్ (కాలానుగుణ ఉత్పత్తులు).",
          order: "మీ ఆర్డర్ ORD202 ట్రాన్సిట్‌లో ఉంది. ఆశించిన డెలివరీ: జన 17, 2024. వస్తువులు: బాస్మతి రైస్, మామిడికాయలు. మొత్తం: ₹580.",
          seasonal: "ప్రస్తుత కాలానుగుణ పండ్లు: మామిడికాయలు (₹120/కిలో), నారింజలు (₹60/కిలో), దానిమ్మలు (₹180/కిలో). అన్నీ తాజాగా కోసినవి!"
        }
      }
    };

    const langResponses = responses[lang]?.[type as keyof typeof responses['en']] || responses.en[type as keyof typeof responses['en']];
    
    // Simple keyword matching for responses
    const lowerText = userText.toLowerCase();
    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('भाव') || lowerText.includes('விலை') || lowerText.includes('ధర')) {
      return langResponses?.price || "I can help you with price information.";
    }
    if (lowerText.includes('disease') || lowerText.includes('बीमारी') || lowerText.includes('நோய்') || lowerText.includes('వ్యాధి')) {
      return langResponses?.disease || "I can help with disease detection.";
    }
    if (lowerText.includes('scheme') || lowerText.includes('योजना') || lowerText.includes('திட்டம்') || lowerText.includes('పథకం')) {
      return langResponses?.scheme || "I can provide information about government schemes.";
    }
    if (lowerText.includes('supplier') || lowerText.includes('आपूर्तिकर्ता') || lowerText.includes('சப்ளையர்') || lowerText.includes('సప్లైయర్')) {
      return langResponses?.supplier || "I can help you find suppliers.";
    }
    if (lowerText.includes('organic') || lowerText.includes('जैविक') || lowerText.includes('இயற்கை') || lowerText.includes('సేంద్రీయ')) {
      return langResponses?.organic || "I can help you find organic products.";
    }
    if (lowerText.includes('order') || lowerText.includes('ऑर्डर') || lowerText.includes('ஆர்டர்') || lowerText.includes('ఆర్డర్')) {
      return langResponses?.order || "I can help you track your orders.";
    }
    if (lowerText.includes('seasonal') || lowerText.includes('मौसमी') || lowerText.includes('பருவகால') || lowerText.includes('కాలానుగుణ')) {
      return langResponses?.seasonal || "I can show you seasonal products.";
    }

    // Default response
    return multilingual[lang].greeting[type as keyof typeof multilingual['en']['greeting']] || 
           "I'm here to help you. Please ask me about prices, products, or any assistance you need.";
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setMessages([]);
    
    // Add welcome message
    setTimeout(() => {
      const lang = languageCode as keyof typeof multilingual;
      const welcomeMessage: Message = {
        type: 'assistant',
        text: multilingual[lang].greeting[userType],
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      speak(welcomeMessage.text);
    }, 500);
  };

  const handleSampleQuestion = (question: string) => {
    handleUserMessage(question);
  };

  const handleClose = () => {
    if (isListening) stopListening();
    if (isSpeaking) speechSynthesis.cancel();
    setSelectedLanguage('');
    setMessages([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            {selectedLanguage ? multilingual[selectedLanguage as keyof typeof multilingual].voiceAssistant : "Voice Assistant"}
          </DialogTitle>
        </DialogHeader>

        {!selectedLanguage ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Select your language</h3>
              <p className="text-muted-foreground mb-6">Choose your preferred language for the voice assistant</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant="outline"
                  className="h-16 text-left justify-start p-4"
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <p className="font-semibold">{language.name}</p>
                      <p className="text-sm text-muted-foreground">{language.speechLang}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Language and Status Bar */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">
                  {languages.find(lang => lang.code === selectedLanguage)?.flag}
                </span>
                <span className="font-medium">
                  {languages.find(lang => lang.code === selectedLanguage)?.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isListening && <Badge variant="destructive" className="animate-pulse">Listening...</Badge>}
                {isSpeaking && <Badge variant="secondary" className="animate-pulse">Speaking...</Badge>}
                <Button variant="ghost" size="sm" onClick={() => setSelectedLanguage('')}>
                  Change Language
                </Button>
              </div>
            </div>

            {/* Voice Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="sm"
                onClick={isListening ? stopListening : startListening}
                disabled={!recognition}
              >
                {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isListening 
                  ? multilingual[selectedLanguage as keyof typeof multilingual].stopListening 
                  : multilingual[selectedLanguage as keyof typeof multilingual].startListening
                }
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => isSpeaking ? speechSynthesis.cancel() : null}
                disabled={!isSpeaking}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                {isSpeaking ? "Stop Speaking" : "Voice Output"}
              </Button>
              
              <Badge variant="outline" className="text-xs">
                {multilingual[selectedLanguage as keyof typeof multilingual].currentlySupported}
              </Badge>
            </div>

            {/* Chat Messages */}
            <Card>
              <CardContent className="p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sample Questions */}
            <div>
              <h4 className="font-medium mb-2">Try asking:</h4>
              <div className="space-y-2">
                {multilingual[selectedLanguage as keyof typeof multilingual].sampleQuestions[userType].map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto py-2 px-3"
                    onClick={() => handleSampleQuestion(question)}
                  >
                    <MessageSquare className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span className="text-xs">{question}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VoiceAssistantModal;