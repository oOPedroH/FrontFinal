
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria Silva",
    quote: "O atendimento no Realle é simplesmente impecável! Os resultados dos meus tratamentos superaram todas as minhas expectativas.",
    image: "/lovable-uploads/13589f10-da39-4261-917d-5ba8a26ba8fd.png"
  },
  {
    id: "2",
    name: "Ana Rodrigues",
    quote: "Encontrei no Realle Esthetic Center um lugar onde posso confiar totalmente nos profissionais. Excelência em todos os aspectos!",
  },
  {
    id: "3",
    name: "Carla Mendes",
    quote: "Faço tratamentos regulares há mais de um ano e a diferença na minha autoestima é notável. Recomendo sem hesitar.",
  },
  {
    id: "4",
    name: "Juliana Costa",
    quote: "Ambiente luxuoso, profissionais atenciosos e resultados incríveis. O que mais se pode querer?",
  }
];

const TestimonialsSection = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="border-gold/20 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  {testimonial.image && (
                    <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <blockquote className="text-center flex-grow">
                    <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                    <footer className="text-sm font-medium text-gold-dark">
                      {testimonial.name}
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8">
          <CarouselPrevious className="static translate-x-0 translate-y-0 mr-4" />
          <CarouselNext className="static translate-x-0 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default TestimonialsSection;
