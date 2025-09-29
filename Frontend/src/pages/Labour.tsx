import { useState } from "react";
import { Plus, Search, Phone, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Labour {
  id: string;
  name: string;
  mobileNumber: string;
  availability: "available" | "notAvailable";
  skills: string[];
  experience: string;
  dailyWage: number;
}

const Labour = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [isAddingLabour, setIsAddingLabour] = useState(false);
  const [newLabour, setNewLabour] = useState({
    name: "",
    mobileNumber: "",
    availability: "available" as "available" | "notAvailable",
    skills: "",
    experience: "",
    dailyWage: ""
  });

  const [labourList, setLabourList] = useState<Labour[]>([
    {
      id: "1",
      name: "രാജേഷ് കുമാർ / Rajesh Kumar",
      mobileNumber: "9876543210",
      availability: "available",
      skills: ["Plowing", "Harvesting", "Irrigation"],
      experience: "5 years",
      dailyWage: 500
    },
    {
      id: "2", 
      name: "സുരേഷ് നായർ / Suresh Nair",
      mobileNumber: "9876543211",
      availability: "notAvailable",
      skills: ["Spraying", "Weeding", "Planting"],
      experience: "8 years",
      dailyWage: 600
    },
    {
      id: "3",
      name: "അനിൽ വർമ്മ / Anil Varma", 
      mobileNumber: "9876543212",
      availability: "available",
      skills: ["Tractor Operation", "Equipment Maintenance"],
      experience: "10 years",
      dailyWage: 800
    }
  ]);

  const handleAddLabour = () => {
    if (!newLabour.name || !newLabour.mobileNumber) {
      toast({
        title: "Error / പിശക്",
        description: "Please fill all required fields / എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക",
        variant: "destructive"
      });
      return;
    }

    const labour: Labour = {
      id: Date.now().toString(),
      name: newLabour.name,
      mobileNumber: newLabour.mobileNumber,
      availability: newLabour.availability,
      skills: newLabour.skills ? newLabour.skills.split(",").map(s => s.trim()) : [],
      experience: newLabour.experience,
      dailyWage: parseFloat(newLabour.dailyWage) || 0
    };

    setLabourList([...labourList, labour]);
    setNewLabour({
      name: "",
      mobileNumber: "",
      availability: "available",
      skills: "",
      experience: "",
      dailyWage: ""
    });
    setIsAddingLabour(false);
    
    toast({
      title: "Success / വിജയം",
      description: "Labour added successfully / തൊഴിലാളി വിജയകരമായി ചേർത്തു"
    });
  };

  const filteredLabour = labourList.filter(labour => {
    const matchesSearch = labour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         labour.mobileNumber.includes(searchTerm);
    const matchesAvailability = filterAvailability === "all" || labour.availability === filterAvailability;
    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Labour Management / തൊഴിലാളി മാനേജ്മെന്റ്
          </h1>
          <p className="text-muted-foreground">
            "Together We Grow Stronger / ഒരുമിച്ച് വളരാം, ശക്തരാകാം"
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or mobile / പേര് അല്ലെങ്കിൽ മൊബൈൽ നമ്പർ ഉപയോഗിച്ച് തിരയുക"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterAvailability} onValueChange={setFilterAvailability}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All / എല്ലാം</SelectItem>
              <SelectItem value="available">Available / ലഭ്യമാണ്</SelectItem>
              <SelectItem value="notAvailable">Not Available / ലഭ്യമല്ല</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddingLabour} onOpenChange={setIsAddingLabour}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-dark shadow-soft">
                <Plus className="h-4 w-4 mr-2" />
                Add Labour / തൊഴിലാളി ചേർക്കുക
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Labour / പുതിയ തൊഴിലാളി ചേർക്കുക</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name / പേര് *</Label>
                  <Input
                    id="name"
                    value={newLabour.name}
                    onChange={(e) => setNewLabour({...newLabour, name: e.target.value})}
                    placeholder="Enter name / പേര് നൽകുക"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number / മൊബൈൽ നമ്പർ *</Label>
                  <Input
                    id="mobile"
                    value={newLabour.mobileNumber}
                    onChange={(e) => setNewLabour({...newLabour, mobileNumber: e.target.value})}
                    placeholder="Enter mobile number / മൊബൈൽ നമ്പർ നൽകുക"
                  />
                </div>
                <div>
                  <Label htmlFor="availability">Availability / ലഭ്യത</Label>
                  <Select 
                    value={newLabour.availability} 
                    onValueChange={(value: "available" | "notAvailable") => 
                      setNewLabour({...newLabour, availability: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available / ലഭ്യമാണ്</SelectItem>
                      <SelectItem value="notAvailable">Not Available / ലഭ്യമല്ല</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="skills">Skills / കഴിവുകൾ</Label>
                  <Input
                    id="skills"
                    value={newLabour.skills}
                    onChange={(e) => setNewLabour({...newLabour, skills: e.target.value})}
                    placeholder="e.g., Plowing, Harvesting (comma separated)"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience / പരിചയം</Label>
                  <Input
                    id="experience"
                    value={newLabour.experience}
                    onChange={(e) => setNewLabour({...newLabour, experience: e.target.value})}
                    placeholder="e.g., 5 years / 5 വർഷം"
                  />
                </div>
                <div>
                  <Label htmlFor="wage">Daily Wage (₹) / ദിവസവേതനം</Label>
                  <Input
                    id="wage"
                    type="number"
                    value={newLabour.dailyWage}
                    onChange={(e) => setNewLabour({...newLabour, dailyWage: e.target.value})}
                    placeholder="Enter daily wage / ദിവസവേതനം നൽകുക"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddLabour} className="flex-1">
                    Add / ചേർക്കുക
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingLabour(false)} className="flex-1">
                    Cancel / റദ്ദാക്കുക
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Labour List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabour.map((labour) => (
          <Card key={labour.id} className="bg-card-gradient shadow-card hover:shadow-float transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{labour.name}</CardTitle>
                {labour.availability === "available" ? (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available / ലഭ്യമാണ്
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                    <XCircle className="h-3 w-3 mr-1" />
                    Not Available / ലഭ്യമല്ല
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent-bright" />
                  <span className="text-sm">{labour.mobileNumber}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="ml-auto h-8 px-3"
                    onClick={() => window.open(`tel:${labour.mobileNumber}`)}
                  >
                    Call / വിളിക്കുക
                  </Button>
                </div>
                
                {labour.experience && (
                  <div>
                    <p className="text-sm text-muted-foreground">Experience / പരിചയം</p>
                    <p className="text-sm font-medium">{labour.experience}</p>
                  </div>
                )}
                
                {labour.skills.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills / കഴിവുകൾ</p>
                    <div className="flex flex-wrap gap-1">
                      {labour.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {labour.dailyWage > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Wage / ദിവസവേതനം</p>
                    <p className="text-lg font-bold text-primary">₹{labour.dailyWage}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLabour.length === 0 && (
        <Card className="bg-card-gradient shadow-card">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No labour found / തൊഴിലാളികളെ കണ്ടെത്തിയില്ല
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Labour;