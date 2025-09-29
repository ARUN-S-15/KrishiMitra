import { useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cropCategories, getCropsByCategory } from "@/data/crops";
import { useNavigate } from "react-router-dom";

const Information = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCropClick = (cropId: string) => {
    navigate(`/crop/${cropId}`);
  };

  if (selectedCategory) {
    const crops = getCropsByCategory(selectedCategory);
    const category = cropCategories.find(c => c.id === selectedCategory);

    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            ← Back to Categories
          </button>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="text-3xl">{category?.icon}</span>
            {category?.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <Card
              key={crop.id}
              className="cursor-pointer hover:shadow-float transition-all duration-300 hover:scale-105 bg-card-gradient border-border/50"
              onClick={() => handleCropClick(crop.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{crop.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{crop.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {crop.season}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-primary">Varieties: </span>
                    <span className="text-muted-foreground">{crop.varieties}</span>
                  </div>
                  <div>
                    <span className="font-medium text-primary">Harvesting: </span>
                    <span className="text-muted-foreground">{crop.harvesting}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {crops.length === 0 && (
          <Card className="bg-card-gradient shadow-card">
            <CardContent className="py-12 text-center">
              <Leaf className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No crops available</h3>
              <p className="text-muted-foreground">
                Crop information for this category is coming soon.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Crop Information</h1>
        <p className="text-muted-foreground">
          Comprehensive farming information for Kerala farmers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cropCategories.map((category) => {
          const cropsCount = getCropsByCategory(category.id).length;
          
          return (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-float transition-all duration-300 hover:scale-105 bg-card-gradient border-border/50"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2 text-primary">
                  {category.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline" className="text-muted-foreground">
                    {cropsCount} crops available
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Information;