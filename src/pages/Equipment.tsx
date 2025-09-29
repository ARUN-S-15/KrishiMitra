import { useState } from "react";
import { Filter, MapPin, Phone, Star, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Equipment {
  id: string;
  name: string;
  type: string;
  owner: string;
  location: string;
  pricePerDay: number;
  rating: number;
  available: boolean;
  image: string;
  description: string;
  phone: string;
}

const Equipment = () => {
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const equipmentList: Equipment[] = [
    {
      id: "1",
      name: "Mahindra 275 DI Tractor",
      type: "tractor",
      owner: "Ravi Kumar",
      location: "Thrissur, Kerala",
      pricePerDay: 1200,
      rating: 4.8,
      available: true,
      image: "🚜",
      description: "35 HP tractor suitable for small to medium farms. Includes rotavator attachment.",
      phone: "+91 9876543210"
    },
    {
      id: "2", 
      name: "DJI Agras T20 Drone",
      type: "drone",
      owner: "Tech Agri Solutions",
      location: "Kochi, Kerala",
      pricePerDay: 2500,
      rating: 4.9,
      available: true,
      image: "🚁",
      description: "Advanced spraying drone for pesticide and fertilizer application. 20L tank capacity.",
      phone: "+91 9876543211"
    },
    {
      id: "3",
      name: "Kubota Combine Harvester",
      type: "harvester",
      owner: "Suresh Pillai",
      location: "Alappuzha, Kerala",
      pricePerDay: 3500,
      rating: 4.7,
      available: false,
      image: "🌾",
      description: "Efficient rice harvester with 4-foot cutting width. Ideal for paddy fields.",
      phone: "+91 9876543212"
    },
    {
      id: "4",
      name: "Power Tiller - VST 130",
      type: "tiller",
      owner: "Meera Nair",
      location: "Kottayam, Kerala", 
      pricePerDay: 800,
      rating: 4.5,
      available: true,
      image: "🔧",
      description: "13 HP power tiller perfect for vegetable farming and small field operations.",
      phone: "+91 9876543213"
    },
    {
      id: "5",
      name: "High Pressure Sprayer",
      type: "sprayer",
      owner: "Green Farm Equipment",
      location: "Kozhikode, Kerala",
      pricePerDay: 400,
      rating: 4.6,
      available: true,
      image: "💨",
      description: "Motorized sprayer for efficient pesticide application in large fields.",
      phone: "+91 9876543214"
    }
  ];

  const equipmentTypes = [
    { value: "all", label: "All Equipment" },
    { value: "tractor", label: "Tractors" },
    { value: "drone", label: "Drones" },
    { value: "harvester", label: "Harvesters" },
    { value: "tiller", label: "Tillers" },
    { value: "sprayer", label: "Sprayers" }
  ];

  const filteredEquipment = equipmentList.filter(equipment => 
    filterType === "all" || equipment.type === filterType
  );

  const sortedEquipment = filteredEquipment.sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.pricePerDay - b.pricePerDay;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleContact = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleBook = (equipmentId: string) => {
    // Booking logic would be implemented here
    console.log(`Book equipment ${equipmentId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Farm Equipment Rental</h1>
        <p className="text-muted-foreground">
          Rent tractors, drones, and farming equipment from local providers
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6 bg-card-gradient shadow-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Equipment Type
              </label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="rating">Rating (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full bg-primary hover:bg-primary-dark">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEquipment.map((equipment) => (
          <Card
            key={equipment.id}
            className="bg-card-gradient shadow-card hover:shadow-float transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{equipment.image}</span>
                  <div>
                    <CardTitle className="text-lg">{equipment.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {equipment.owner}</p>
                  </div>
                </div>
                <Badge 
                  variant={equipment.available ? "default" : "secondary"}
                  className={equipment.available ? "bg-green-100 text-green-800" : ""}
                >
                  {equipment.available ? "Available" : "Booked"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {equipment.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{equipment.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-primary">₹{equipment.pricePerDay}/day</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{equipment.rating} rating</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContact(equipment.phone)}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => handleBook(equipment.id)}
                  disabled={!equipment.available}
                  className="flex-1 bg-primary hover:bg-primary-dark"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {equipment.available ? "Book Now" : "Unavailable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedEquipment.length === 0 && (
        <Card className="bg-card-gradient shadow-card">
          <CardContent className="py-12 text-center">
            <span className="text-6xl mb-4 block">🚜</span>
            <h3 className="text-lg font-semibold mb-2">No equipment found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more equipment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Equipment;