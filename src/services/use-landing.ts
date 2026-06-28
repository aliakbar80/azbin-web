import { useQuery } from "@tanstack/react-query";
import { api } from "./fetchClient";
import type {
  LandingService,
  LandingFeature,
  LandingProperty,
  LandingStat,
  LandingTestimonial,
  LandingCity,
  LandingTimeline,
  LandingGallery,
  LandingPropertyType,
} from "./landing-types";

const LANDING_BASE = "/api/landing/api/v1";

interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

export function useLandingServices() {
  return useQuery<LandingService[]>({
    queryKey: ["landing-services"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingService>>(`${LANDING_BASE}/services`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingFeatures() {
  return useQuery<LandingFeature[]>({
    queryKey: ["landing-features"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingFeature>>(`${LANDING_BASE}/features`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingProperties() {
  return useQuery<LandingProperty[]>({
    queryKey: ["landing-properties"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingProperty>>(`${LANDING_BASE}/properties`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingStats() {
  return useQuery<LandingStat[]>({
    queryKey: ["landing-stats"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingStat>>(`${LANDING_BASE}/stats`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingTestimonials() {
  return useQuery<LandingTestimonial[]>({
    queryKey: ["landing-testimonials"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingTestimonial>>(`${LANDING_BASE}/testimonials`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingCities() {
  return useQuery<LandingCity[]>({
    queryKey: ["landing-cities"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingCity>>(`${LANDING_BASE}/cities`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingTimeline() {
  return useQuery<LandingTimeline[]>({
    queryKey: ["landing-timeline"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingTimeline>>(`${LANDING_BASE}/timeline`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingGallery() {
  return useQuery<LandingGallery[]>({
    queryKey: ["landing-gallery"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingGallery>>(`${LANDING_BASE}/gallery`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingPropertyTypes() {
  return useQuery<LandingPropertyType[]>({
    queryKey: ["landing-property-types"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<LandingPropertyType>>(`${LANDING_BASE}/property-types`);
      return res.results || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}
