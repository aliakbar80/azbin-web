import { useQuery } from "@tanstack/react-query";
import { api } from "./fetchClient";
import { landingMockData } from "./landing-mock-data";

const LANDING_BASE = "/api/landing/api/v1";
const USE_MOCK_DATA = "yes";

interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

function useLandingQuery<T>(queryKey: string, endpoint: string, mockData: T[]) {
  return useQuery<T[]>({
    queryKey: [queryKey],
    queryFn: async () => {
      if (USE_MOCK_DATA) return mockData;
      const res = await api.get<PaginatedResponse<T>>(`${LANDING_BASE}/${endpoint}`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingServices() {
  return useLandingQuery("landing-services", "services", landingMockData.services);
}

export function useLandingFeatures() {
  return useLandingQuery("landing-features", "features", landingMockData.features);
}

export function useLandingProperties() {
  return useLandingQuery("landing-properties", "properties", landingMockData.properties);
}

export function useLandingStats() {
  return useLandingQuery("landing-stats", "stats", landingMockData.stats);
}

export function useLandingTestimonials() {
  return useLandingQuery("landing-testimonials", "testimonials", landingMockData.testimonials);
}

export function useLandingCities() {
  return useLandingQuery("landing-cities", "cities", landingMockData.cities);
}

export function useLandingTimeline() {
  return useLandingQuery("landing-timeline", "timeline", landingMockData.timeline);
}

export function useLandingGallery() {
  return useLandingQuery("landing-gallery", "gallery", landingMockData.gallery);
}

export function useLandingPropertyTypes() {
  return useLandingQuery("landing-property-types", "property-types", landingMockData.propertyTypes);
}
