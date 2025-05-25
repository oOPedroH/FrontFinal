
export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Service {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  fullDescription?: string;
  price: string;
  duration: string;
  image: string;
}
