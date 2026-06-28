export interface LandingService {
  id: number;
  title: string;
  description: string;
  color: string;
  features: string[];
  buildingFloors: number;
  order: number;
}

export interface LandingFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
}

export interface LandingProperty {
  id: number;
  type: string;
  price: string;
  priceRaw: number;
  area: string;
  areaRaw: number;
  rooms: string;
  location: string;
  city: string;
  district: string;
  color: string;
  features: string[];
  expertScore: string;
  expertScoreRaw: number;
  status: string;
  order: number;
}

export interface LandingStat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  color: string;
  icon: string;
  order: number;
}

export interface LandingTestimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  propertyType: string;
  avatarUrl: string | null;
  order: number;
}

export interface LandingCity {
  id: number;
  name: string;
  count: string;
  countRaw: number;
  x: number;
  y: number;
  color: string;
  size: "lg" | "md" | "sm";
  order: number;
}

export interface LandingTimeline {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: string;
  order: number;
}

export interface LandingGallery {
  id: number;
  title: string;
  description: string;
  color: string;
  gridColSpan: number;
  gridRowSpan: number;
  order: number;
}

export interface LandingPropertyType {
  id: number;
  name: string;
  order: number;
}
