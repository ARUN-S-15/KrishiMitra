import { ExternalLink, Users, DollarSign, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Scheme {
  id: string;
  name: string;
  department: string;
  subsidy: string;
  eligibility: string[];
  description: string;
  benefits: string[];
  applicationLink: string;
  status: 'active' | 'upcoming' | 'closed';
}

const Schemes = () => {
  const schemes: Scheme[] = [
    {
      id: "1",
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      department: "Central Government",
      subsidy: "₹6,000/year",
      eligibility: [
        "Small and marginal farmers",
        "Land holding up to 2 hectares",
        "Valid Aadhaar card required"
      ],
      description: "Direct income support scheme providing financial assistance to farmer families.",
      benefits: [
        "₹2,000 installments every 4 months",
        "Direct bank transfer",
        "No processing fee"
      ],
      applicationLink: "https://pmkisan.gov.in/",
      status: "active"
    },
    {
      id: "2", 
      name: "Kerala State Organic Farming Mission",
      department: "Kerala Agriculture Department",
      subsidy: "Up to 50%",
      eligibility: [
        "Kerala resident farmers",
        "Minimum 0.1 hectare land",
        "Commitment to organic farming"
      ],
      description: "Promoting organic farming practices through subsidies and technical support.",
      benefits: [
        "50% subsidy on organic inputs",
        "Free soil testing",
        "Certification support",
        "Market linkage assistance"
      ],
      applicationLink: "https://keralaagriculture.gov.in/",
      status: "active"
    },
    {
      id: "3",
      name: "Kisan Credit Card (KCC)",
      department: "All Banks",
      subsidy: "Interest subsidy 4%",
      eligibility: [
        "All farmers (owner/tenant)",
        "Valid land documents",
        "Good credit history preferred"
      ],
      description: "Provides adequate and timely credit support for comprehensive agricultural needs.",
      benefits: [
        "Credit limit based on land holding",
        "Flexible repayment terms",
        "Insurance coverage",
        "Lower interest rates"
      ],
      applicationLink: "https://www.nabard.org/",
      status: "active"
    },
    {
      id: "4",
      name: "Prime Minister's Micro Irrigation Scheme (PMKSY)",
      department: "Central Government",
      subsidy: "55% for general, 75% for SC/ST",
      eligibility: [
        "All categories of farmers",
        "Valid land ownership documents",
        "Water source availability"
      ],
      description: "Promoting water use efficiency through micro irrigation systems.",
      benefits: [
        "Drip irrigation subsidy",
        "Sprinkler system support", 
        "Technical guidance",
        "Water saving technology"
      ],
      applicationLink: "https://pmksy.gov.in/",
      status: "active"
    },
    {
      id: "5",
      name: "Rashtriya Krishi Vikas Yojana (RKVY)",
      department: "Kerala Planning Board",
      subsidy: "Varies by project",
      eligibility: [
        "Farmer Producer Organizations",
        "Cooperative societies",
        "Individual farmers for specific projects"
      ],
      description: "State-led agriculture development initiatives with flexible funding.",
      benefits: [
        "Infrastructure development",
        "Technology adoption support",
        "Capacity building programs",
        "Market development"
      ],
      applicationLink: "https://rkvy.nic.in/",
      status: "upcoming"
    },
    {
      id: "6",
      name: "Soil Health Card Scheme",
      department: "Kerala Agriculture Department",
      subsidy: "100% free",
      eligibility: [
        "All farmers in Kerala",
        "Valid land documents",
        "Consent for soil sampling"
      ],
      description: "Free soil testing and health cards with nutrient recommendations.",
      benefits: [
        "Free soil analysis",
        "Customized fertilizer recommendations",
        "Digital soil health card",
        "Expert advisory services"
      ],
      applicationLink: "https://soilhealth.dac.gov.in/",
      status: "active"
    }
  ];

  const handleApply = (link: string) => {
    window.open(link, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-hero-gradient rounded-2xl p-8 text-primary-foreground shadow-card">
          <h1 className="text-3xl font-bold mb-4">Government Schemes</h1>
          <p className="text-primary-foreground/80">
            Explore government schemes and subsidies available for Kerala farmers
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card-gradient shadow-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary">6</h3>
            <p className="text-muted-foreground">Active Schemes</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient shadow-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-secondary-bright" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-bright">₹50K+</h3>
            <p className="text-muted-foreground">Average Subsidy</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient shadow-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-accent-bright" />
            </div>
            <h3 className="text-2xl font-bold text-accent-bright">10K+</h3>
            <p className="text-muted-foreground">Beneficiaries</p>
          </CardContent>
        </Card>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className="bg-card-gradient shadow-card hover:shadow-float transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg text-primary mb-2">
                    {scheme.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{scheme.department}</p>
                </div>
                <Badge className={getStatusColor(scheme.status)}>
                  {scheme.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">Subsidy Amount</span>
                </div>
                <p className="text-lg font-bold text-primary">{scheme.subsidy}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scheme.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Eligibility:</h4>
                <ul className="space-y-1">
                  {scheme.eligibility.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button
                onClick={() => handleApply(scheme.applicationLink)}
                disabled={scheme.status === 'closed'}
                className="w-full bg-primary hover:bg-primary-dark shadow-soft"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {scheme.status === 'active' ? 'Apply Now' : 
                 scheme.status === 'upcoming' ? 'Coming Soon' : 'Closed'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schemes;