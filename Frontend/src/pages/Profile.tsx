import { useState } from "react";
import { Camera, Save, MapPin, Phone, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Ravi Kumar",
    email: "ravi.kumar@email.com",
    phone: "+91 9876543210",
    location: "Thrissur, Kerala",
    farmSize: "5.2",
    primaryCrops: ["Rice", "Coconut", "Pepper"],
    farmingExperience: "15",
    bio: "Organic farmer passionate about sustainable agriculture and community development.",
    profilePhoto: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save profile logic would be implemented here
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle photo upload logic
      console.log("Photo uploaded:", file.name);
    }
  };

  const farmingStats = [
    { label: "Total Crops", value: "12", icon: "🌱" },
    { label: "Farm Size", value: `${profile.farmSize} acres`, icon: "🚜" },
    { label: "Experience", value: `${profile.farmingExperience} years`, icon: "🏆" },
    { label: "Community Posts", value: "24", icon: "📝" },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Farmer Profile</h1>
        <p className="text-muted-foreground">Manage your farming profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-card-gradient shadow-card">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage src={profile.profilePhoto} alt={profile.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full h-10 w-10 bg-primary hover:bg-primary-dark"
                    >
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Camera className="h-4 w-4" />
                      </label>
                    </Button>
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-primary mb-2">{profile.name}</h2>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {profile.primaryCrops.map((crop, index) => (
                  <Badge key={index} variant="secondary">
                    {crop}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-card-gradient shadow-card mt-6">
            <CardHeader>
              <CardTitle>Farming Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {farmingStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <p className="text-lg font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card-gradient shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className={isEditing ? "bg-primary hover:bg-primary-dark" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Farming Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Farming Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize">Farm Size (acres)</Label>
                    <Input
                      id="farmSize"
                      value={profile.farmSize}
                      onChange={(e) => handleInputChange("farmSize", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={profile.farmingExperience}
                      onChange={(e) => handleInputChange("farmingExperience", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="bio">Bio/Description</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Primary Crops */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Primary Crops</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Select the main crops you cultivate:
                  </p>
                  {isEditing ? (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Add crops" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="coconut">Coconut</SelectItem>
                        <SelectItem value="pepper">Pepper</SelectItem>
                        <SelectItem value="cardamom">Cardamom</SelectItem>
                        <SelectItem value="rubber">Rubber</SelectItem>
                        <SelectItem value="tea">Tea</SelectItem>
                        <SelectItem value="coffee">Coffee</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.primaryCrops.map((crop, index) => (
                        <Badge key={index} variant="outline">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;