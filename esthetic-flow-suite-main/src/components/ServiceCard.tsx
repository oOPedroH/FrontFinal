
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

const ServiceCard = ({ id, title, description, price, duration, image }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border border-gold/20 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          <span className="text-gold-dark font-medium">{price}</span>
          <span className="mx-2">•</span>
          <span>{duration}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-center">
        <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
          <Link to={`/services/${id}`}>
            Ver Detalhes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
