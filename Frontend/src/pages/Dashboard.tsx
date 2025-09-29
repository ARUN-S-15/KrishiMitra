import { useEffect, useState } from "react";
import { Search, Plus, ChevronRight, Cloud, TrendingUp, Camera, Upload, X, Bell, UserCircle } from "lucide-react";
import heroImage from "@/assets/kerala-farming-hero.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Crop {
  id: string;
  name: string;
  type: string;
  area: string;
  yield: string;
  image: string;
  quantity?: string;
  price?: string;
  description?: string;
  photo?: string;
}

interface CropPlan {
  id: string;
  cropName: string;
  startDate: string;
  steps: Array<{
    day: number;
    task: string;
    completed: boolean;
    active?: boolean;
    locked?: boolean;
    photoUrl?: string;
    suggestion?: string;
  }>;
}

const Dashboard = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [isAddingCropPlan, setIsAddingCropPlan] = useState(false);
  const navigate = useNavigate();
  const username = "Farmer";

  const [isDayDialogOpen, setIsDayDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const quotes = [
    "Our Farming, Our Pride / നമ്മുടെ കൃഷി, നമ്മുടെ അഭിമാനം",
    "Healthy Soil, Healthy Future / ആരോഗ്യകരമായ മണ്ണ്, ആരോഗ്യകരമായ ഭാവി",
    "Together We Grow Stronger / ഒരുമിച്ച് വളരാം, ശക്തരാകാം",
    "Smart Farming for Tomorrow / നാളെയുടെ ബുദ്ധിമാനായ കൃഷി",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const searchCards = [
    {
      title: "Tractor Info / ട്രാക്ടർ വിവരങ്ങൾ",
      description: "Tractors, drones, harvesters, tillers, sprayers",
      icon: "🚜",
      path: "/equipments",
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Community / സമൂഹം",
      description: "Connect with fellow farmers, share experiences",
      icon: "👥",
      path: "/community",
      color: "bg-accent-bright/10 text-accent-bright"
    },
    {
      title: "Government Schemes (Kerala Farmers) / സർക്കാർ പദ്ധതികൾ (കേരള കർഷകർ)",
      description: "Kerala government schemes and subsidies",
      icon: "🏛️",
      path: "/schemes",
      color: "bg-secondary-bright/10 text-secondary-bright"
    },
    {
      title: "Weather / കാലാവസ്ഥ",
      description: "Detailed forecast and crop insights",
      icon: "🌤️",
      path: "/weather",
      color: "bg-accent/10 text-accent-foreground"
    },
    {
      title: "Soil Health → Satellite-based analysis + Upload Certificate / മണ്ണ് ആരോഗ്യ പരിശോധന → ഉപഗ്രഹ വിശകലനം + സർട്ടിഫിക്കറ്റ് അപ്‌ലോഡ്",
      description: "Soil analysis and treatment suggestions",
      icon: "🌱",
      path: "/soil",
      color: "bg-primary-light/10 text-primary-light"
    }
  ];

  const [newCrop, setNewCrop] = useState({
    name: "",
    type: "",
    area: "",
    quantity: "",
    price: "",
    description: "",
    expectedYield: "",
    photo: null as File | null
  });

  const [newCropPlan, setNewCropPlan] = useState({
    cropName: "",
    startDate: ""
  });

  const [userCrops, setUserCrops] = useState<Crop[]>([
    { id: "1", name: "തക്കാളി / Tomato", type: "Vegetable", area: "2 acres", yield: "Good", image: "🍅", quantity: "500 kg", price: "₹30/kg" },
    { id: "2", name: "നെല്ല് / Rice", type: "Cereal", area: "5 acres", yield: "Excellent", image: "🌾", quantity: "2000 kg", price: "₹25/kg" },
    { id: "3", name: "കുരുമുളക് / Pepper", type: "Spice", area: "1 acre", yield: "Average", image: "🌶️", quantity: "50 kg", price: "₹400/kg" },
  ]);

  const [cropPlans, setCropPlans] = useState<CropPlan[]>([
    {
      id: "1",
      cropName: "തക്കാളി / Tomato",
      startDate: "2024-01-01",
      steps: [
        { day: 1, task: "മണ്ണ് തയ്യാറാക്കൽ / Soil Preparation", completed: true },
        { day: 2, task: "വിത്ത് വിതയ്ക്കൽ / Seed Sowing", completed: true },
        { day: 3, task: "പ്രാരംഭ നനയ്ക്കൽ / Initial Watering", completed: true },
        { day: 4, task: "കീടനാശിനി പരിശോധന / Pest Inspection", completed: false, active: true },
        { day: 5, task: "വളപ്രയോഗം / Fertilizer Application", completed: false, locked: true },
        { day: 6, task: "വളർച്ച നിരീക്ഷണം / Growth Monitoring", completed: false, locked: true },
        { day: 7, task: "വിളവെടുപ്പ് ആസൂത്രണം / Harvest Planning", completed: false, locked: true },
      ]
    }
  ]);

  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.type || !newCrop.area) {
      toast({
        title: "Error / പിശക്",
        description: "Please fill all required fields / എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക",
        variant: "destructive"
      });
      return;
    }

    const crop: Crop = {
      id: Date.now().toString(),
      name: newCrop.name,
      type: newCrop.type,
      area: newCrop.area,
      yield: newCrop.expectedYield || "New",
      image: getEmojiForCropType(newCrop.type),
      quantity: newCrop.quantity,
      price: newCrop.price,
      description: newCrop.description,
      photo: newCrop.photo ? URL.createObjectURL(newCrop.photo) : undefined
    };

    setUserCrops([...userCrops, crop]);
    setNewCrop({ name: "", type: "", area: "", quantity: "", price: "", description: "", expectedYield: "", photo: null });
    setIsAddingCrop(false);
    
    toast({
      title: "Success / വിജയം",
      description: "Crop added successfully / വിള വിജയകരമായി ചേർത്തു"
    });
  };

  const handleAddCropPlan = () => {
    if (!newCropPlan.cropName) {
      toast({
        title: "Error / പിശക്",
        description: "Please select a crop / ഒരു വിള തിരഞ്ഞെടുക്കുക",
        variant: "destructive"
      });
      return;
    }

    // Check if this crop already has a plan
    const existingPlan = cropPlans.find(plan => plan.cropName === newCropPlan.cropName);
    if (existingPlan) {
      toast({
        title: "Warning / മുന്നറിയിപ്പ്",
        description: "This crop already has a plan / ഈ വിളയ്ക്ക് ഇതിനകം ഒരു പദ്ധതി ഉണ്ട്",
        variant: "destructive"
      });
      return;
    }

    const cropPlan: CropPlan = {
      id: Date.now().toString(),
      cropName: newCropPlan.cropName,
      startDate: newCropPlan.startDate || new Date().toISOString().split('T')[0],
      steps: [
        { day: 1, task: "മണ്ണ് തയ്യാറാക്കൽ / Soil Preparation", completed: false, active: true },
        { day: 2, task: "വിത്ത് വിതയ്ക്കൽ / Seed Sowing", completed: false, locked: true },
        { day: 3, task: "പ്രാരംഭ നനയ്ക്കൽ / Initial Watering", completed: false, locked: true },
        { day: 4, task: "കീടനാശിനി പരിശോധന / Pest Inspection", completed: false, locked: true },
        { day: 5, task: "വളപ്രയോഗം / Fertilizer Application", completed: false, locked: true },
        { day: 6, task: "വളർച്ച നിരീക്ഷണം / Growth Monitoring", completed: false, locked: true },
        { day: 7, task: "വിളവെടുപ്പ് ആസൂത്രണം / Harvest Planning", completed: false, locked: true },
      ]
    };

    setCropPlans([...cropPlans, cropPlan]);
    setNewCropPlan({ cropName: "", startDate: "" });
    setIsAddingCropPlan(false);
    
    toast({
      title: "Success / വിജയം",
      description: "Crop plan added successfully / വിള പദ്ധതി വിജയകരമായി ചേർത്തു"
    });
  };

  const handleStepComplete = (planId: string, day: number) => {
    setCropPlans(prevPlans => 
      prevPlans.map(plan => {
        if (plan.id === planId) {
          const updatedSteps = plan.steps.map(step => {
            if (step.day === day) {
              return { ...step, completed: true, active: false };
            } else if (step.day === day + 1) {
              return { ...step, active: true, locked: false };
            }
            return step;
          });
          return { ...plan, steps: updatedSteps };
        }
        return plan;
      })
    );
    
    toast({
      title: "Success / വിജയം",
      description: `Day ${day} completed! / ദിവസം ${day} പൂർത്തിയായി!`
    });
  };

  const getDayTitle = (day: number) => {
    switch (day) {
      case 1: return "Disease Detection / രോഗം കണ്ടെത്തൽ";
      case 2: return "Pest Type / കീടത്തിന്റെ തരം";
      case 3: return "Treatment Suggestion / ചികിത്സ നിർദേശം";
      case 4: return "Progress Check / പുരോഗതി പരിശോധന";
      case 5: return "Additional Care / അധിക പരിചരണം";
      case 6: return "Recovery Monitoring / രോഗശാന്തി നിരീക്ഷണം";
      case 7: return "Final Status / അന്തിമ നില";
      default: return `Day ${day}`;
    }
  };

  const generateSuggestionForDay = (day: number): string => {
    const map: { [key: number]: string } = {
      1: "Leaf spots detected. Use organic fungicide. / ഇലകളിൽ പാടുകൾ കണ്ടെത്തി. ഓർഗാനിക് ഫംഗിസൈഡ് ഉപയോഗിക്കുക.",
      2: "Aphids likely. Consider neem spray. / അഫിഡ്സ് സാധ്യത. വേപ്പിൻ എണ്ണ സ്പ്രേ പരിഗണിക്കുക.",
      3: "Apply balanced NPK as suggested. / നിർദേശിച്ചതുപോലെ ബാലൻസ്ഡ് NPK നൽകുക.",
      4: "Growth looks steady. Reduce watering. / വളർച്ച സ്ഥിരം. വെള്ളം കുറയ്ക്കുക.",
      5: "Mulching recommended. / മൾച്ചിംഗ് ശുപാർശ ചെയ്യുന്നു.",
      6: "Recovery on track. Monitor pests. / രോഗശാന്തി ശരിയായ രീതിയിൽ. കീടങ്ങൾ നിരീക്ഷിക്കുക.",
      7: "Ready for harvest planning. / വിളവെടുപ്പ് ആസൂത്രണത്തിന് തയ്യാറാണ്.",
    };
    return map[day] || "Keep monitoring. / നിരീക്ഷണം തുടരുക.";
  };

  const handleOpenDayDialog = (planId: string, day: number) => {
    setSelectedPlanId(planId);
    setSelectedDay(day);
    setIsDayDialogOpen(true);
  };

  const handleUploadStepPhoto = (file: File) => {
    if (!selectedPlanId || !selectedDay) return;
    const photoUrl = URL.createObjectURL(file);
    const suggestion = generateSuggestionForDay(selectedDay);
    setCropPlans(prev => prev.map(plan => {
      if (plan.id !== selectedPlanId) return plan;
      const updatedSteps = plan.steps.map(step => {
        if (step.day === selectedDay) {
          return { ...step, photoUrl, suggestion, completed: true, active: false };
        } else if (step.day === selectedDay + 1) {
          return { ...step, active: true, locked: false };
        }
        return step;
      });
      return { ...plan, steps: updatedSteps };
    }));
    toast({ title: "Photo uploaded / ഫോട്ടോ അപ്‌ലോഡ് ചെയ്തു", description: getDayTitle(selectedDay) });
    setIsDayDialogOpen(false);
  };

  const getEmojiForCropType = (type: string) => {
    const emojiMap: { [key: string]: string } = {
      "Vegetable": "🥬",
      "Cereal": "🌾", 
      "Fruit": "🍎",
      "Spice": "🌶️",
      "Pulse": "🫘",
      "Oilseed": "🌻",
      "Cash Crop": "💰",
      "Flower": "🌸"
    };
    return emojiMap[type] || "🌱";
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header: Welcome + Notifications + Avatar */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          🌱 Welcome, {username} / സ്വാഗതം, {username}
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <UserCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {/* Welcome Quote */}
      <div className="text-center space-y-4">
        <div className="relative rounded-2xl overflow-hidden shadow-card">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${heroImage})`,
            }}
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative p-8 text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">"{quotes[quoteIndex]}"</h2>
            <p className="text-primary-foreground/80 text-sm">
              {/* Rotating bilingual quotes */}
            </p>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="space-y-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services / സേവനങ്ങൾ തിരയുക"
                className="pl-10"
                onFocus={() => setSearchExpanded(true)}
              />
            </div>
          </div>
          {searchExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto animate-slide-up">
              {searchCards.map((card, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-float transition-all duration-300 hover:scale-105 bg-card-gradient border-border/50"
                  onClick={() => navigate(card.path)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl ${card.color}`}>
                      {card.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                    <p className="text-muted-foreground text-sm">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Weather & Price Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card-gradient shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-accent-bright" />
              Today's Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">2 days ago</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">26°C</span>
                  <span className="text-muted-foreground">Cloudy</span>
                </div>
                <p className="text-sm text-muted-foreground">Yesterday</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">27°C</span>
                  <span className="text-muted-foreground">Cloudy</span>
                </div>
                <p className="text-sm text-muted-foreground">Today</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">28°C</span>
                  <span className="text-muted-foreground">Partly Cloudy</span>
                </div>
                <p className="text-sm text-muted-foreground">Tomorrow</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">29°C</span>
                  <span className="text-muted-foreground">Sunny</span>
                </div>
              </div>
              <div className="text-6xl flex items-center justify-center">⛅</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary-bright" />
              Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="pepper">Pepper</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">2 days ago</span>
                  <span className="font-semibold">₹25/kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Yesterday</span>
                  <span className="font-semibold">₹28/kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Today</span>
                  <span className="font-semibold text-primary">₹30/kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tomorrow</span>
                  <span className="font-semibold text-secondary-bright">₹32/kg</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Crops */}
      <Card className="bg-card-gradient shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle>Your Crops / നിങ്ങളുടെ വിള</CardTitle>
            <Dialog open={isAddingCrop} onOpenChange={setIsAddingCrop}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary-dark shadow-soft w-full sm:w-auto text-xs sm:text-sm !whitespace-normal">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Crop <span className="hidden sm:inline"> / വിള ചേർക്കുക</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Crop / പുതിയ വിള ചേർക്കുക</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cropName">Crop Name / വിളയുടെ പേര് *</Label>
                    <Input
                      id="cropName"
                      value={newCrop.name}
                      onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                      placeholder="Enter crop name / വിളയുടെ പേര് നൽകുക"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropType">Crop Type / വിളയുടെ തരം *</Label>
                    <Select value={newCrop.type} onValueChange={(value) => setNewCrop({...newCrop, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetable">Vegetable / പച്ചക്കറി</SelectItem>
                        <SelectItem value="Cereal">Cereal / ധാന്യം</SelectItem>
                        <SelectItem value="Fruit">Fruit / പഴം</SelectItem>
                        <SelectItem value="Spice">Spice / സുഗന്ധവ്യഞ്ജനം</SelectItem>
                        <SelectItem value="Pulse">Pulse / പയർ</SelectItem>
                        <SelectItem value="Oilseed">Oilseed / എണ്ണക്കുരു</SelectItem>
                        <SelectItem value="Cash Crop">Cash Crop / നാണ്യവിള</SelectItem>
                        <SelectItem value="Flower">Flower / പൂവ്</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cropArea">Quantity / Area / അളവ് / വിസ്തൃതി *</Label>
                    <Input
                      id="cropArea"
                      value={newCrop.area}
                      onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                      placeholder="e.g., 500 kg or 2 acres / ഉദാ: 500 കിലോ അല്ലെങ്കിൽ 2 ഏക്കർ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedYield">Expected Yield / പ്രതീക്ഷിക്കുന്ന വിളവ്</Label>
                    <Input
                      id="expectedYield"
                      value={newCrop.expectedYield}
                      onChange={(e) => setNewCrop({...newCrop, expectedYield: e.target.value})}
                      placeholder="e.g., 600 kg / ഉദാ: 600 കിലോ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropQuantity">Quantity / അളവ്</Label>
                    <Input
                      id="cropQuantity"
                      value={newCrop.quantity}
                      onChange={(e) => setNewCrop({...newCrop, quantity: e.target.value})}
                      placeholder="e.g., 500 kg / ഉദാ: 500 കിലോ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropPrice">Price / വില</Label>
                    <Input
                      id="cropPrice"
                      value={newCrop.price}
                      onChange={(e) => setNewCrop({...newCrop, price: e.target.value})}
                      placeholder="e.g., ₹30/kg / ഉദാ: ₹30/കിലോ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropDescription">Description / വിവരണം</Label>
                    <Textarea
                      id="cropDescription"
                      value={newCrop.description}
                      onChange={(e) => setNewCrop({...newCrop, description: e.target.value})}
                      placeholder="Additional details / അധിക വിവരങ്ങൾ"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropPhoto">Upload Crop Photo / വിളയുടെ ഫോട്ടോ അപ്‌ലോഡ്</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="cropPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewCrop({...newCrop, photo: e.target.files?.[0] || null})}
                        className="flex-1"
                      />
                      {newCrop.photo && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setNewCrop({...newCrop, photo: null})}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddCrop} className="flex-1">
                      Add / ചേർക്കുക
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingCrop(false)} className="flex-1">
                      Cancel / റദ്ദാക്കുക
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {userCrops.map((crop) => (
              <Card key={crop.id} className="min-w-[220px] bg-accent/5 border-accent/20">
                <CardContent className="p-4 text-center">
                  {crop.photo ? (
                    <img src={crop.photo} alt={crop.name} className="w-16 h-16 object-cover rounded-lg mx-auto mb-2" />
                  ) : (
                    <div className="text-4xl mb-2">{crop.image}</div>
                  )}
                  <h4 className="font-semibold text-sm">{crop.name}</h4>
                  <p className="text-xs text-muted-foreground">{crop.area}</p>
                  {crop.quantity && <p className="text-xs text-muted-foreground">{crop.quantity}</p>}
                  {crop.price && <p className="text-xs font-medium text-primary">{crop.price}</p>}
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {crop.yield}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Crop Care */}
      <Card className="bg-card-gradient shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>7-Day Crop Care / 7-ദിവസ വിള പരിപാലനം</CardTitle>
              <p className="text-muted-foreground">നിത്യ കൃത്യങ്ങൾ പൂർത്തിയാക്കി അടുത്ത ഘട്ടം അൺലോക്ക് ചെയ്യുക / Complete daily tasks to unlock the next step</p>
              <p className="text-sm text-muted-foreground mt-1">
                Multiple crops supported / ഒന്നിലധികം വിളകൾ പിന്തുണയ്ക്കുന്നു
              </p>
            </div>
            <Dialog open={isAddingCropPlan} onOpenChange={setIsAddingCropPlan}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-secondary-bright hover:bg-secondary-bright/80 shadow-soft w-full sm:w-auto text-xs sm:text-sm !whitespace-normal">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plan <span className="hidden sm:inline"> / പ്ലാൻ ചേർക്കുക</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Crop Plan / വിള പദ്ധതി ചേർക്കുക</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="planCrop">Select Crop / വിള തിരഞ്ഞെടുക്കുക *</Label>
                    <Select value={newCropPlan.cropName} onValueChange={(value) => setNewCropPlan({...newCropPlan, cropName: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {userCrops.map((crop) => (
                          <SelectItem key={crop.id} value={crop.name}>{crop.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date / ആരംഭ തീയതി</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newCropPlan.startDate}
                      onChange={(e) => setNewCropPlan({...newCropPlan, startDate: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddCropPlan} className="flex-1">
                      Add Plan / പ്ലാൻ ചേർക്കുക
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingCropPlan(false)} className="flex-1">
                      Cancel / റദ്ദാക്കുക
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cropPlans.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No crop plans yet / ഇതുവരെ വിള പദ്ധതികളില്ല
                </p>
                <p className="text-sm text-muted-foreground">
                  Add your first crop plan to get started / ആരംഭിക്കാൻ നിങ്ങളുടെ ആദ്യ വിള പദ്ധതി ചേർക്കുക
                </p>
              </div>
            ) : (
              cropPlans.map((plan) => (
                <div key={plan.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{plan.cropName}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Started: {plan.startDate}</Badge>
                      <Badge variant="secondary">
                        {plan.steps.filter(s => s.completed).length}/7 Complete
                      </Badge>
                    </div>
                  </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {plan.steps.map((step) => (
                    <Card 
                      key={step.day} 
                      className={`min-w-[160px] transition-all duration-300 ${
                        step.completed 
                          ? "bg-primary/10 border-primary/20" 
                          : step.active 
                          ? "bg-secondary/10 border-secondary/20 ring-2 ring-secondary-bright" 
                          : step.locked 
                          ? "bg-muted/20 border-muted opacity-50" 
                          : "bg-card"
                      }`}
                    >
                      <CardContent className="p-4 text-center cursor-pointer" onClick={() => handleOpenDayDialog(plan.id, step.day)}>
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-background shadow-soft">
                          {step.completed ? (
                            <span className="text-2xl">✅</span>
                          ) : step.active ? (
                            <Camera className="h-6 w-6 text-secondary-bright" />
                          ) : step.locked ? (
                            <span className="text-2xl">🔒</span>
                          ) : (
                            <span className="text-lg font-bold">{step.day}</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm mb-1">Day {step.day}</h4>
                        <p className="text-xs text-muted-foreground">
                          {step.day === 1 && "Disease Detection / രോഗം കണ്ടെത്തൽ"}
                          {step.day === 2 && "Pest Type / കീടത്തിന്റെ തരം"}
                          {step.day === 3 && "Treatment Suggestion / ചികിത്സ നിർദേശം"}
                          {step.day === 4 && "Progress Check / പുരോഗതി പരിശോധന"}
                          {step.day === 5 && "Additional Care / അധിക പരിചരണം"}
                          {step.day === 6 && "Recovery Monitoring / രോഗശാന്തി നിരീക്ഷണം"}
                          {step.day === 7 && "Final Status / അന്തിമ നില"}
                        </p>
                        {step.active && (
                          <Button 
                            size="sm" 
                            className="mt-3 bg-secondary-bright hover:bg-secondary-bright/80"
                            onClick={() => handleOpenDayDialog(plan.id, step.day)}
                          >
                            Upload Photo / ഫോട്ടോ അപ്‌ലോഡ്
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDayDialogOpen} onOpenChange={setIsDayDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDay ? getDayTitle(selectedDay) : "Day Detail"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPlanId && selectedDay && (() => {
              const plan = cropPlans.find(p => p.id === selectedPlanId)!;
              const step = plan.steps.find(s => s.day === selectedDay)!;
              const isFutureLocked = !!step.locked;
              const isActiveToday = !!step.active && !step.completed;
              const hasData = !!step.photoUrl || !!step.suggestion;
              return (
                <div className="space-y-4">
                  {hasData && (
                    <div className="space-y-2">
                      {step.photoUrl && (
                        <img src={step.photoUrl} alt="Uploaded" className="w-full h-48 object-cover rounded-md" />
                      )}
                      {step.suggestion && (
                        <p className="text-sm">{step.suggestion}</p>
                      )}
                    </div>
                  )}
                  {isFutureLocked && (
                    <p className="text-sm text-muted-foreground">Locked until previous steps complete / മുൻ ഘട്ടങ്ങൾ പൂർത്തിയാകുന്നത് വരെ ലോക്ക്ഡ്</p>
                  )}
                  {isActiveToday && (
                    <div className="space-y-2">
                      <Label htmlFor="dayPhoto">Upload Photo / ഫോട്ടോ അപ്‌ലോഡ്</Label>
                      <Input id="dayPhoto" type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleUploadStepPhoto(file);
                        }
                      }} />
                      <p className="text-xs text-muted-foreground">After upload, suggestion will be shown and next day unlocks / അപ്‌ലോഡ് കഴിഞ്ഞ് നിർദേശം കാണിക്കും, അടുത്ത ദിവസം അൺലോക്ക് ചെയ്യും</p>
                    </div>
                  )}
                  {!isActiveToday && !hasData && !isFutureLocked && (
                    <p className="text-sm text-muted-foreground">No data yet / ഡാറ്റയില്ല</p>
                  )}
                </div>
              );
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;