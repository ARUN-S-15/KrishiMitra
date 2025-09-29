import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Weather = () => {
  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12,
    rainfall: 0,
    icon: "⛅"
  };

  const forecast = [
    { day: "Today", temp: 28, condition: "Partly Cloudy", icon: "⛅", rainfall: 0 },
    { day: "Tomorrow", temp: 26, condition: "Light Rain", icon: "🌦️", rainfall: 5 },
    { day: "Wednesday", temp: 24, condition: "Moderate Rain", icon: "🌧️", rainfall: 15 },
    { day: "Thursday", temp: 27, condition: "Cloudy", icon: "☁️", rainfall: 2 },
  ];

  const cropPrices = {
    tomato: [
      { day: "2 days ago", price: 25, trend: "down" },
      { day: "Yesterday", price: 28, trend: "up" },
      { day: "Today", price: 30, trend: "up" },
      { day: "Tomorrow", price: 32, trend: "up" },
    ],
    rice: [
      { day: "2 days ago", price: 18, trend: "stable" },
      { day: "Yesterday", price: 18, trend: "stable" },
      { day: "Today", price: 19, trend: "up" },
      { day: "Tomorrow", price: 20, trend: "up" },
    ],
    pepper: [
      { day: "2 days ago", price: 120, trend: "up" },
      { day: "Yesterday", price: 115, trend: "down" },
      { day: "Today", price: 118, trend: "up" },
      { day: "Tomorrow", price: 120, trend: "up" },
    ]
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <span className="w-4 h-4 bg-gray-400 rounded-full"></span>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-hero-gradient rounded-2xl p-8 text-primary-foreground shadow-card">
          <h1 className="text-3xl font-bold mb-4">Weather & Market Prices</h1>
          <p className="text-primary-foreground/80">
            Stay updated with weather forecasts and crop price trends
          </p>
        </div>
      </div>

      {/* Current Weather */}
      <Card className="mb-8 bg-card-gradient shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-accent-bright" />
            Current Weather in Kerala
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">{currentWeather.icon}</div>
                <h2 className="text-4xl font-bold text-primary mb-2">
                  {currentWeather.temperature}°C
                </h2>
                <p className="text-xl text-muted-foreground">
                  {currentWeather.condition}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-4 text-center">
                  <Droplets className="h-8 w-8 text-accent-bright mx-auto mb-2" />
                  <p className="text-2xl font-bold text-accent-bright">
                    {currentWeather.humidity}%
                  </p>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/5 border-secondary/20">
                <CardContent className="p-4 text-center">
                  <Wind className="h-8 w-8 text-secondary-bright mx-auto mb-2" />
                  <p className="text-2xl font-bold text-secondary-bright">
                    {currentWeather.windSpeed} km/h
                  </p>
                  <p className="text-sm text-muted-foreground">Wind Speed</p>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <CloudRain className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">
                    {currentWeather.rainfall} mm
                  </p>
                  <p className="text-sm text-muted-foreground">Rainfall</p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4 text-center">
                  <Thermometer className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">
                    Normal
                  </p>
                  <p className="text-sm text-muted-foreground">UV Index</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4-Day Forecast */}
      <Card className="mb-8 bg-card-gradient shadow-card">
        <CardHeader>
          <CardTitle>4-Day Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {forecast.map((day, index) => (
              <Card key={index} className="bg-accent/5 border-accent/20 text-center">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-primary mb-2">{day.day}</h3>
                  <div className="text-4xl mb-2">{day.icon}</div>
                  <p className="text-2xl font-bold text-primary mb-1">
                    {day.temp}°C
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {day.condition}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {day.rainfall}mm rain
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crop Price Trends */}
      <Card className="bg-card-gradient shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-secondary-bright" />
            4-Day Crop Price Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(cropPrices).map(([crop, prices]) => (
              <div key={crop}>
                <h3 className="text-lg font-semibold text-primary mb-4 capitalize">
                  {crop} Prices (₹/kg)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {prices.map((price, index) => (
                    <Card key={index} className="bg-background border-border/50">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          {price.day}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <p className={`text-xl font-bold ${getTrendColor(price.trend)}`}>
                            ₹{price.price}
                          </p>
                          {getTrendIcon(price.trend)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;