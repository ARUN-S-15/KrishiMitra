import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Droplets, Leaf, Package, Scissors, Sprout, Zap, Tractor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCropById } from "@/data/crops";

const CropDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const crop = id ? getCropById(id) : null;

  if (!crop) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Crop not found</h1>
          <Button onClick={() => navigate('/information')}>
            Back to Information
          </Button>
        </div>
      </div>
    );
  }

  const sections = [
    { title: "Season", content: crop.season, icon: Calendar, color: "text-secondary-bright" },
    { title: "Plowing", content: crop.plowing, icon: Tractor, color: "text-primary" },
    { title: "Nursery", content: crop.nursery, icon: Leaf, color: "text-primary-light" },
    { title: "Varieties", content: crop.varieties, icon: Package, color: "text-accent-bright" },
    { title: "Seed Rate", content: crop.seedRate, icon: Sprout, color: "text-secondary-bright" },
    { title: "Seed Treatment", content: crop.seedTreatment, icon: Zap, color: "text-primary" },
    { title: "Sowing", content: crop.sowing, icon: Sprout, color: "text-primary-light" },
    { title: "Fertilizer", content: crop.fertilizer, icon: Package, color: "text-accent-bright" },
    { title: "Irrigation", content: crop.irrigation, icon: Droplets, color: "text-accent-bright" },
    { title: "Harvesting", content: crop.harvesting, icon: Scissors, color: "text-secondary-bright" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/information')}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-6xl">{crop.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-primary">{crop.name}</h1>
            <Badge variant="secondary" className="mt-2">
              {crop.category.charAt(0).toUpperCase() + crop.category.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <Card className="bg-hero-gradient text-primary-foreground shadow-card mb-8">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Growing Guide</h2>
          <p className="text-primary-foreground/90">
            Everything you need to know about cultivating {crop.name} successfully in Kerala
          </p>
        </CardContent>
      </Card>

      {/* Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="bg-card-gradient shadow-card hover:shadow-float transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-background ${section.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-primary hover:bg-primary-dark shadow-soft">
          Add to My Crops
        </Button>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Share with Community
        </Button>
        <Button variant="outline" className="border-accent-bright text-accent-bright hover:bg-accent-bright hover:text-white">
          Download Guide
        </Button>
      </div>
    </div>
  );
};

export default CropDetail;