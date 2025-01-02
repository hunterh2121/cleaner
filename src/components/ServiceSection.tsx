import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Star, Sparkles, Home, LucideIcon } from 'lucide-react';

interface ServiceItem {
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  highlight: string;
}

interface ServiceDataType {
  residential: ServiceItem[];
  commercial: ServiceItem[];
}

const serviceData: ServiceDataType = {
  residential: [
    {
      title: "Window Cleaning",
      icon: Sparkles,
      description: "Professional residential window cleaning services",
      features: ["Interior & exterior windows", "Screen cleaning", "Track cleaning", "Hard water removal"],
      highlight: "Safe for all window types"
    },
    {
      title: "Gutter Cleaning",
      icon: Droplets,
      description: "Complete gutter maintenance solution",
      features: ["Debris removal", "Downspout clearing", "Gutter Rinse", "Down Spout Inspection"],
      highlight: "Prevent water damage"
    },
    {
      title: "Christmas Lights",
      icon: Star,
      description: "Custom holiday lighting installation",
      features: ["Design consultation", "Professional install", "Timers included", "Post-season removal"],
      highlight: "Light Up Your Holidays"
    },
    {
      title: "Pressure Washing",
      icon: Home,
      description: "Restore your property's appearance",
      features: ["Driveways", "Decks & patios", "Siding", "Fences"],
      highlight: "Keep Your Home Looking Spotless"
    }
  ],
  commercial: [
    {
      title: "Window Cleaning",
      icon: Sparkles,
      description: "Large-scale commercial window services",
      features: ["Multi-story buildings", "Interior And Exterior", "Satisfaction Guaranteed", "Maintenance plans"],
      highlight: "Liability insured"
    },
    {
      title: "Gutter Cleaning",
      icon: Droplets,
      description: "Industrial gutter maintenance",
      features: ["Large systems", "Emergency service", "Preventative care", "Down Spout Cleaning"],
      highlight: "Annual contracts"
    },
    {
      title: "Christmas Lights",
      icon: Star,
      description: "Commercial holiday lighting",
      features: ["Large displays", "Property-wide design", "LED options", "Timer systems"],
      highlight: "Energy efficient"
    },
    {
      title: "Pressure Washing",
      icon: Home,
      description: "Commercial pressure cleaning",
      features: ["Parking lots", "Building exteriors", "Side Walks", "Roofs"],
      highlight: "Industrial grade"
    }
  ]
};

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <h3 className="text-lg md:text-xl font-bold">{service.title}</h3>
      </div>
      
      <p className="text-sm md:text-base text-gray-600 mb-4">{service.description}</p>
      
      <ul className="space-y-2 mb-4">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0" />
            <span className="text-sm md:text-base text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
          {service.highlight}
        </span>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">Our Services</h2>
      <p className="text-sm md:text-base text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
        Professional cleaning and maintenance services for residential and commercial properties
      </p>
      
      <Tabs defaultValue="residential" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-6 md:mb-8 h-full">
          <TabsTrigger value="residential" className="text-base md:text-lg">Residential</TabsTrigger>
          <TabsTrigger value="commercial" className="text-base md:text-lg">Commercial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="residential">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {serviceData.residential.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="commercial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {serviceData.commercial.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesSection;