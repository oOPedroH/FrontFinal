
import { Service, ServiceCategory } from "@/types/services";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "facial",
    name: "Estética Facial",
    description: "Tratamentos para rejuvenescimento, hidratação e limpeza facial."
  },
  {
    id: "corporal",
    name: "Estética Corporal",
    description: "Tratamentos para modelagem, redução de medidas e bem-estar corporal."
  },
  {
    id: "terapias",
    name: "Terapias",
    description: "Terapias relaxantes e tratamentos para bem-estar geral."
  },
  {
    id: "cuidados",
    name: "Cuidados Especiais",
    description: "Tratamentos específicos para diferentes necessidades."
  }
];

export const services: Service[] = [
  {
    id: "facial-1",
    categoryId: "facial",
    title: "Limpeza de Pele Profunda",
    description: "Tratamento completo para limpeza profunda da pele, com extração de cravos e espinhas.",
    fullDescription: "Nossa limpeza de pele profunda é um tratamento completo que inclui higienização, esfoliação, tonificação, vapor de ozônio, extração de comedões e impurezas, máscara facial personalizada e finalização com produtos específicos para seu tipo de pele.",
    price: "R$ 180,00",
    duration: "90 minutos",
    image: "/lovable-uploads/1e07f389-e6fd-402b-8458-8f2ee222921b.png"
  },
  {
    id: "facial-2",
    categoryId: "facial",
    title: "Microagulhamento Facial",
    description: "Tratamento para estimular a produção de colágeno e melhorar a textura da pele.",
    fullDescription: "O microagulhamento é um procedimento que utiliza pequenas agulhas que promovem microlesões na pele, estimulando assim a produção natural de colágeno e elastina. Ideal para tratar rugas, cicatrizes de acne, estrias e flacidez.",
    price: "R$ 350,00",
    duration: "60 minutos",
    image: "/lovable-uploads/8fc67829-9b9a-4f03-a77f-97ca6558ae19.png"
  },
  {
    id: "facial-3",
    categoryId: "facial",
    title: "Peeling Químico",
    description: "Tratamento para renovação celular e melhoria da textura e tom da pele.",
    fullDescription: "Nosso peeling químico utiliza ácidos em diferentes concentrações para promover a renovação celular, melhorando manchas, linhas finas, textura irregular e acne. Oferecemos diferentes opções de intensidade, adequando o tratamento às necessidades específicas de cada cliente.",
    price: "R$ 250,00",
    duration: "45 minutos",
    image: "/lovable-uploads/79cf9c41-c4bc-46a0-95cc-02a2a0071292.png"
  },
  {
    id: "corporal-1",
    categoryId: "corporal",
    title: "Drenagem Linfática",
    description: "Massagem específica para eliminar toxinas e reduzir o inchaço corporal.",
    fullDescription: "A drenagem linfática é uma técnica de massagem suave que estimula o sistema linfático, ajudando a eliminar toxinas, reduzir o inchaço e melhorar a circulação. É especialmente indicada para combater a retenção de líquidos e celulite.",
    price: "R$ 200,00",
    duration: "60 minutos",
    image: "/lovable-uploads/5f5b886e-6541-42e7-a81c-48e716b33fae.png"
  },
  {
    id: "corporal-2",
    categoryId: "corporal",
    title: "Tratamento para Celulite",
    description: "Combinação de técnicas para reduzir a aparência da celulite e melhorar a textura da pele.",
    fullDescription: "Nosso tratamento anti-celulite combina técnicas de massagem modeladora, ultrassom e produtos específicos para quebrar os nódulos de gordura, melhorar a circulação e a aparência da pele com celulite.",
    price: "R$ 280,00",
    duration: "75 minutos",
    image: "/lovable-uploads/5f5b886e-6541-42e7-a81c-48e716b33fae.png"
  },
  {
    id: "terapias-1",
    categoryId: "terapias",
    title: "Massagem Relaxante",
    description: "Massagem suave para aliviar o estresse e promover o relaxamento completo do corpo.",
    fullDescription: "Nossa massagem relaxante utiliza movimentos suaves e pressão moderada para aliviar a tensão muscular, reduzir o estresse e promover uma sensação de bem-estar geral. Realizada com óleos aromáticos e em um ambiente sereno e acolhedor.",
    price: "R$ 180,00",
    duration: "60 minutos",
    image: "/lovable-uploads/66738dc9-59d5-4248-90be-3a043f179f7d.png"
  },
  {
    id: "cuidados-1",
    categoryId: "cuidados",
    title: "Design de Sobrancelhas",
    description: "Modelagem completa para realçar o olhar e harmonizar o rosto.",
    fullDescription: "Nosso design de sobrancelhas inclui uma análise facial personalizada para determinar o formato ideal que valorize seus traços. Utilizamos técnicas de depilação com pinça e linha, além de coloração quando necessário.",
    price: "R$ 80,00",
    duration: "30 minutos",
    image: "/lovable-uploads/1e07f389-e6fd-402b-8458-8f2ee222921b.png"
  },
  {
    id: "cuidados-2",
    categoryId: "cuidados",
    title: "Extensão de Cílios",
    description: "Aplicação de cílios sintéticos para um olhar mais marcante e expressivo.",
    fullDescription: "Nossa aplicação de extensão de cílios é realizada fio a fio, garantindo um resultado natural e personalizado. Utilizamos materiais de alta qualidade e técnicas avançadas para maior durabilidade e conforto.",
    price: "R$ 250,00",
    duration: "120 minutos",
    image: "/lovable-uploads/1e07f389-e6fd-402b-8458-8f2ee222921b.png"
  }
];
