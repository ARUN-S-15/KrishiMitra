import { useState } from "react";
import { Upload, FileText, Satellite, Beaker, Download, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const SoilHealth = () => {
  const [soilData, setSoilData] = useState({
    location: "",
    soilType: "",
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    organicMatter: "",
    notes: ""
  });

  const [analysisResult] = useState({
    ph: { value: 6.2, status: "optimal", recommendation: "Maintain current pH levels" },
    nitrogen: { value: 180, status: "low", recommendation: "Apply nitrogen-rich fertilizer" },
    phosphorus: { value: 25, status: "optimal", recommendation: "Current levels are good" },
    potassium: { value: 150, status: "medium", recommendation: "Consider potash application" },
    organicMatter: { value: 3.2, status: "good", recommendation: "Continue organic farming practices" }
  });

  const handleInputChange = (field: string, value: string) => {
    setSoilData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Certificate uploaded:", file.name);
    }
  };

  const handleSatelliteAnalysis = () => {
    console.log("Starting satellite analysis...");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
      case "good":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "low":
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-hero-gradient rounded-2xl p-8 text-primary-foreground shadow-card">
          <h1 className="text-3xl font-bold mb-4">Soil Health Management</h1>
          <p className="text-primary-foreground/80">
            Analyze your soil health and get AI-powered treatment recommendations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Soil Data Entry */}
        <div className="space-y-6">
          <Card className="bg-card-gradient shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-primary" />
                Soil Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={soilData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select onValueChange={(value) => handleInputChange("soilType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="loam">Loam</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="laterite">Laterite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    placeholder="6.5"
                    value={soilData.ph}
                    onChange={(e) => handleInputChange("ph", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
                  <Input
                    id="nitrogen"
                    placeholder="200"
                    value={soilData.nitrogen}
                    onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
                  <Input
                    id="phosphorus"
                    placeholder="30"
                    value={soilData.phosphorus}
                    onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="potassium">Potassium (kg/ha)</Label>
                  <Input
                    id="potassium"
                    placeholder="180"
                    value={soilData.potassium}
                    onChange={(e) => handleInputChange("potassium", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                <Input
                  id="organicMatter"
                  placeholder="3.5"
                  value={soilData.organicMatter}
                  onChange={(e) => handleInputChange("organicMatter", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional observations or notes..."
                  value={soilData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Certificate Upload */}
          <Card className="bg-card-gradient shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary-bright" />
                Upload Soil Test Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Certificate</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your laboratory soil test certificate (PDF, JPG, PNG)
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="certificate-upload"
                />
                <Button asChild className="bg-secondary-bright hover:bg-secondary-bright/80">
                  <label htmlFor="certificate-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Satellite Analysis */}
          <Card className="bg-card-gradient shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="h-5 w-5 text-accent-bright" />
                Satellite-Based Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get AI-powered soil analysis using satellite imagery and machine learning
              </p>
              <Button 
                onClick={handleSatelliteAnalysis}
                className="w-full bg-accent-bright hover:bg-accent-bright/80"
              >
                <Satellite className="h-4 w-4 mr-2" />
                Start Satellite Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          <Card className="bg-card-gradient shadow-card">
            <CardHeader>
              <CardTitle>AI Soil Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analysisResult).map(([nutrient, data]) => (
                  <div key={nutrient} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold capitalize text-primary">
                        {nutrient.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(data.status)}
                        <Badge className={getStatusColor(data.status)}>
                          {data.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">
                      {data.value}
                      {nutrient === 'ph' ? '' : 
                       nutrient === 'organicMatter' ? '%' : ' kg/ha'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treatment Recommendations */}
          <Card className="bg-card-gradient shadow-card">
            <CardHeader>
              <CardTitle>Treatment Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4">
                  <h3 className="font-semibold text-primary mb-2">Immediate Actions</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Apply nitrogen-rich fertilizer (Urea 200 kg/ha)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Add organic compost to improve soil structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Consider lime application if pH drops below 6.0</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/5 rounded-lg p-4">
                  <h3 className="font-semibold text-secondary-bright mb-2">Long-term Strategy</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary-bright flex-shrink-0 mt-0.5" />
                      <span>Implement crop rotation with legumes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary-bright flex-shrink-0 mt-0.5" />
                      <span>Regular soil testing every 6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary-bright flex-shrink-0 mt-0.5" />
                      <span>Maintain organic matter through cover crops</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Report */}
          <Card className="bg-card-gradient shadow-card">
            <CardContent className="p-6 text-center">
              <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Download Full Report</h3>
              <p className="text-muted-foreground mb-4">
                Get a comprehensive PDF report with detailed analysis and recommendations
              </p>
              <Button className="bg-primary hover:bg-primary-dark shadow-soft">
                <Download className="h-4 w-4 mr-2" />
                Download PDF Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoilHealth;