import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./fetchClient";

// ==================== Types ====================

export interface User {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: "MALE" | "FEMALE";
  address?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

// Auth
export interface LoginDto {
  phoneNumber: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface CreateOtpDto {
  phoneNumber: string;
}

export interface VerifyOtpDto {
  code: number;
}

export interface SetPasswordDto {
  phoneNumber: string;
  password: string;
  passwordRetype: string;
}

export interface RefreshTokenDto {
  refresh: string;
}

export interface CheckPhoneDto {
  phoneNumber: string;
}

// Users
export interface UpdateProfileDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  gender?: "MALE" | "FEMALE";
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  newPasswordRetype: string;
}

// Categories
export interface Category {
  id: string;
  name: string;
}

export interface CreateCategoryDto {
  name: string;
}

// Cities
export interface City {
  id: string;
  name: string;
}

export interface CreateCityDto {
  name: string;
}

// Services
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceWithDiscount?: number;
  enable: boolean;
  cityId?: string;
  categoryId?: string;
  createdAt?: string;
}

export interface CreateServiceDto {
  cityId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  priceWithDiscount?: number;
  enable?: boolean;
}

export interface UpdateServiceDto {
  cityId?: string;
  categoryId?: string;
  title?: string;
  description?: string;
  price?: number;
  priceWithDiscount?: number;
  enable?: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
}

export interface CreateServiceDetailDto {
  title: string;
  description: string;
}

// Service Requests
export interface ServiceRequest {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  orginalDeedNumber: string;
  subDeedNumber: string;
  service: Service;
  status: "PENDING" | "FAILED" | "COMPLETE";
  workingProgressStatus: "PENDING" | "FAILED" | "DONE";
  createdAt: string;
}

export interface BuyServiceDto {
  serviceId: string;
  phoneNumber: string;
  name: string;
  address: string;
  orginalDeedNumber: string;
  subDeedNumber: string;
}

export interface UpdateServiceRequestDto {
  status?: "PENDING" | "FAILED" | "COMPLETE";
  workingProgressStatus?: "PENDING" | "FAILED" | "DONE";
}

export interface CreateAnswerDto {
  data: Record<string, unknown>;
}

// Questionnaire
export type QuestionType = "normal" | "DropDownList" | "multiChoice" | "RangeDrag" | "rating" | "matrix";

export interface QuestionPreviewValue {
  key: string;
  question: string;
  type?: QuestionType;
  required?: boolean;
  isDiscription?: boolean;
  description?: string;
  typeDescription?: "info" | "success" | "warning" | "error";
  noTextInside?: string;
  TextInside?: string;
  AnswerTemplate?: "text" | "textarea" | "number" | "date";
  listItem?: string[];
  isOther?: boolean;
  TextInsideOther?: string;
  lengthStart?: number;
  iconType?: "star" | "heart" | "thumb";
  column?: string[];
  row?: string[];
  value?: unknown;
}

export interface QuestionDataItem {
  type: QuestionType;
  previewValue: QuestionPreviewValue;
}

export interface Questionnaire {
  id: string;
  serviceId: string;
  roleId: string;
  data: QuestionDataItem[];
}

export interface QuestionAnswerItem {
  type: QuestionType;
  result: {
    question: string;
    answer: unknown;
    key: string;
  };
  role_name?: string;
  role_id?: string;
}

export interface ServiceRequestAnswer {
  id: string;
  serviceRequestId: string;
  data: QuestionAnswerItem[];
}

export interface CreateQuestionnaireDto {
  serviceId: string;
  roleId: string;
  data: QuestionDataItem[];
}

export interface CreateServiceRequestAnswerDto {
  data: QuestionAnswerItem[];
}

// Media
export interface Media {
  id: string;
  url: string;
  type: string;
}

// Payment
export interface Payment {
  id: string;
  amount: number;
  status: string;
  gateway: string;
  createdAt: string;
}

export interface InitializePaymentDto {
  serviceRequestId: string;
  gateway: "ZARINPAL" | "SAMAN" | "MELLAT" | "PARSIAN" | "PASARGAD";
  callbackUrl?: string;
}

export interface RefundPaymentDto {
  amount: number;
  reason: string;
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface RegisterDeviceDto {
  token: string;
  platform: "IOS" | "ANDROID" | "WEB";
}

export interface UpdateNotificationSettingsDto {
  serviceRequestUpdates?: boolean;
  paymentNotifications?: boolean;
  chatMessages?: boolean;
  expertAssignment?: boolean;
  systemAnnouncements?: boolean;
  emailNotifications?: boolean;
}

// Chat
export interface ChatRoom {
  id: string;
  name: string;
  participants: User[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  messageType: "TEXT" | "IMAGE" | "FILE" | "VOICE" | "LOCATION" | "SYSTEM";
  content: string;
  replyToId?: string;
  createdAt: string;
}

export interface SendMessageDto {
  messageType: "TEXT" | "IMAGE" | "FILE" | "VOICE" | "LOCATION" | "SYSTEM";
  content: string;
  replyToId?: string;
}

export interface UpdateMessageDto {
  content: string;
}

// Reviews
export interface Review {
  id: string;
  serviceRequestId: string;
  overallRating: number;
  qualityRating?: number;
  speedRating?: number;
  communicationRating?: number;
  priceRating?: number;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
  isRecommended?: boolean;
}

export interface CreateReviewDto {
  serviceRequestId: string;
  overallRating: number;
  qualityRating?: number;
  speedRating?: number;
  communicationRating?: number;
  priceRating?: number;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
  isRecommended?: boolean;
}

export interface VoteReviewDto {
  isHelpful: boolean;
}

export interface ReportReviewDto {
  reason: "SPAM" | "OFFENSIVE" | "FAKE" | "IRRELEVANT" | "OTHER";
  details?: string;
}

// Experts
export interface Expert {
  id: string;
  expertise: string[];
  bio?: string;
  experience?: number;
  certifications?: string[];
  languages?: string[];
  serviceAreas: string[];
  userId?: string;
  isApproved?: boolean;
}

export interface RegisterExpertDto {
  expertise: string[];
  bio?: string;
  experience?: number;
  certifications?: string[];
  languages?: string[];
  serviceAreas: string[];
}

export interface CancelAssignmentDto {
  reason: string;
}

export interface RequestPayoutDto {
  amount: number;
  method: "BANK_TRANSFER" | "WALLET";
  bankAccount?: Record<string, unknown>;
}

export interface ExpertAssignment {
  id: string;
  serviceRequest: ServiceRequest;
  status: string;
  createdAt: string;
}

export interface ExpertEarning {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface ExpertPayout {
  id: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
}

// Analytics
export interface AdminOverview {
  totalUsers: number;
  totalServices: number;
  totalRequests: number;
  totalRevenue: number;
}

export interface RevenueAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  growth: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  timestamp: string;
}

// ==================== API Hooks ====================

// --- Auth ---
export function useCreateOtp() {
  return useMutation({
    mutationFn: (data: CreateOtpDto) =>
      api.post("/api/auth/otp/create", data),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: VerifyOtpDto) =>
      api.post("/api/auth/otp/verify", data),
  });
}

export function useSetPassword() {
  return useMutation({
    mutationFn: (data: SetPasswordDto) =>
      api.post("/api/auth/set-password", data),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginDto) =>
      api.post<LoginResponse>("/api/auth/login", data),
    onSuccess: (data) => {
      api.setTokens(data.access, data.refresh);
      queryClient.setQueryData(["user", "me"], data.user);
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (data: RefreshTokenDto) =>
      api.post<{ access: string; refresh: string }>("/api/auth/refresh", data),
  });
}

export function useCheckPhone() {
  return useMutation({
    mutationFn: (data: CheckPhoneDto) =>
      api.post<{ exists: boolean }>("/api/auth/check-phone", data),
  });
}

// --- Users ---
export function useMyProfile() {
  return useQuery<User>({
    queryKey: ["user", "me"],
    queryFn: () => api.get<User>("/api/users/profiles/me"),
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileDto) =>
      api.put("/api/users/profiles/me", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}

export function useAllProfiles(params?: {
  limit?: number;
  offset?: number;
  gender?: string;
  search?: string;
  ordering?: string;
}) {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ["users", "profiles", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      if (params?.gender) searchParams.set("gender", params.gender);
      if (params?.search) searchParams.set("search", params.search);
      if (params?.ordering) searchParams.set("ordering", params.ordering);
      const qs = searchParams.toString();
      return api.get(`/api/users/profiles${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useProfileById(id: string) {
  return useQuery<User>({
    queryKey: ["users", "profile", id],
    queryFn: () => api.get<User>(`/api/users/profiles/${id}`),
    enabled: !!id,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) =>
      api.post("/api/users/change-password", data),
  });
}

// --- Categories ---
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => api.get<Category[]>("/api/categories"),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryDto) => api.post("/api/categories", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryDto }) =>
      api.put(`/api/categories/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

// --- Cities ---
export function useCities() {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => api.get<City[]>("/api/cities"),
  });
}

export function useCreateCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCityDto) => api.post("/api/cities", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });
}

export function useUpdateCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCityDto }) =>
      api.put(`/api/cities/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });
}

export function useDeleteCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/cities/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });
}

// --- Services ---
export function useServices(params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<Service>>({
    queryKey: ["services", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/services${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useService(id: string) {
  return useQuery<Service>({
    queryKey: ["service", id],
    queryFn: () => api.get<Service>(`/api/services/${id}`),
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServiceDto) => api.post("/api/services", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceDto }) =>
      api.patch(`/api/services/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/services/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useServiceDetails(serviceId: string) {
  return useQuery<ServiceDetail[]>({
    queryKey: ["service-details", serviceId],
    queryFn: () => api.get<ServiceDetail[]>(`/api/services/${serviceId}/details`),
    enabled: !!serviceId,
  });
}

export function useCreateServiceDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, data }: { serviceId: string; data: CreateServiceDetailDto }) =>
      api.post(`/api/services/${serviceId}/details`, data),
    onSuccess: (_, { serviceId }) =>
      queryClient.invalidateQueries({ queryKey: ["service-details", serviceId] }),
  });
}

export function useUpdateServiceDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, id, data }: { serviceId: string; id: string; data: CreateServiceDetailDto }) =>
      api.put(`/api/services/${serviceId}/details/${id}`, data),
    onSuccess: (_, { serviceId }) =>
      queryClient.invalidateQueries({ queryKey: ["service-details", serviceId] }),
  });
}

export function useDeleteServiceDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, id }: { serviceId: string; id: string }) =>
      api.delete(`/api/services/${serviceId}/details/${id}`),
    onSuccess: (_, { serviceId }) =>
      queryClient.invalidateQueries({ queryKey: ["service-details", serviceId] }),
  });
}

export function useServiceMedias(serviceId: string) {
  return useQuery<Media[]>({
    queryKey: ["service-medias", serviceId],
    queryFn: () => api.get<Media[]>(`/api/services/${serviceId}/medias`),
    enabled: !!serviceId,
  });
}

export function useHomePageServices() {
  return useQuery<Service[]>({
    queryKey: ["services", "home"],
    queryFn: () => api.get<Service[]>("/api/services/home-page"),
    staleTime: 5 * 60 * 1000,
  });
}

// --- Service Requests ---
export function useServiceRequests(params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<ServiceRequest>>({
    queryKey: ["service-requests", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/service-requests${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useServiceRequest(id: string) {
  return useQuery<ServiceRequest>({
    queryKey: ["service-request", id],
    queryFn: () => api.get<ServiceRequest>(`/api/service-requests/${id}`),
    enabled: !!id,
  });
}

export function useBuyService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BuyServiceDto) =>
      api.upload("/api/service-requests/buy", new File([], ""), "file", {
        serviceId: data.serviceId,
        phoneNumber: data.phoneNumber,
        name: data.name,
        address: data.address,
        orginalDeedNumber: data.orginalDeedNumber,
        subDeedNumber: data.subDeedNumber,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
    },
  });
}

export function useUpdateServiceRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceRequestDto }) =>
      api.patch(`/api/service-requests/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
    },
  });
}

export function useMyRequests(params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<ServiceRequest>>({
    queryKey: ["my-requests", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/service-requests/my-requests${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useMyRequestsCount() {
  return useQuery<{ serviceId: string; serviceTitle: string; count: number }[]>({
    queryKey: ["my-requests-count"],
    queryFn: () => api.get("/api/service-requests/my-requests-count"),
  });
}

export function useMyReports(params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<ServiceRequest>>({
    queryKey: ["my-reports", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/service-requests/my-reports${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useCreateAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateAnswerDto }) =>
      api.post(`/api/service-requests/${id}/answer`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
    },
  });
}

export function useQuestions(serviceRequestId: string) {
  return useQuery({
    queryKey: ["questions", serviceRequestId],
    queryFn: () => api.get(`/api/service-requests/${serviceRequestId}/questions`),
    enabled: !!serviceRequestId,
  });
}

// --- Media ---
export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, fieldName }: { file: File; fieldName?: string }) =>
      api.upload("/api/media/upload", file, fieldName || "file"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media"] }),
  });
}

export function useAllMedia(params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<Media>>({
    queryKey: ["media", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/media${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useMedia(id: string) {
  return useQuery<Media>({
    queryKey: ["media", id],
    queryFn: () => api.get<Media>(`/api/media/${id}`),
    enabled: !!id,
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/media/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media"] }),
  });
}

export function useUploadMediaForService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, file }: { serviceId: string; file: File }) =>
      api.upload(`/api/media/service/${serviceId}`, file, "file"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      queryClient.invalidateQueries({ queryKey: ["service-medias"] });
    },
  });
}

// --- Payments ---
export function useInitializePayment() {
  return useMutation({
    mutationFn: (data: InitializePaymentDto) =>
      api.post<{ paymentUrl: string }>("/api/payments/initialize", data),
  });
}

export function useMyPayments() {
  return useQuery<Payment[]>({
    queryKey: ["my-payments"],
    queryFn: () => api.get<Payment[]>("/api/payments/my-payments"),
  });
}

export function useAllPayments() {
  return useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: () => api.get<Payment[]>("/api/payments"),
  });
}

export function usePayment(id: string) {
  return useQuery<Payment>({
    queryKey: ["payment", id],
    queryFn: () => api.get<Payment>(`/api/payments/${id}`),
    enabled: !!id,
  });
}

export function useRefundPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RefundPaymentDto }) =>
      api.post(`/api/payments/${id}/refund`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });
}

// --- Notifications ---
export function useNotifications() {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => api.get<Notification[]>("/api/notifications"),
  });
}

export function useUnreadCount() {
  return useQuery<{ count: number }>({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => api.get("/api/notifications/unread-count"),
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.patch("/api/notifications/read-all"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
}

export function useRegisterDevice() {
  return useMutation({
    mutationFn: (data: RegisterDeviceDto) =>
      api.post("/api/notifications/register-device", data),
  });
}

export function useNotificationSettings() {
  return useQuery<UpdateNotificationSettingsDto>({
    queryKey: ["notification-settings"],
    queryFn: () => api.get("/api/notifications/settings"),
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateNotificationSettingsDto) =>
      api.put("/api/notifications/settings", data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notification-settings"] }),
  });
}

// --- Chat ---
export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<ChatRoom>("/api/chat/rooms"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat-rooms"] }),
  });
}

export function useChatRooms() {
  return useQuery<ChatRoom[]>({
    queryKey: ["chat-rooms"],
    queryFn: () => api.get<ChatRoom[]>("/api/chat/rooms"),
  });
}

export function useChatRoom(id: string) {
  return useQuery<ChatRoom>({
    queryKey: ["chat-room", id],
    queryFn: () => api.get<ChatRoom>(`/api/chat/rooms/${id}`),
    enabled: !!id,
  });
}

export function useChatMessages(roomId: string, params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<ChatMessage>>({
    queryKey: ["chat-messages", roomId, params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/chat/rooms/${roomId}/messages${qs ? `?${qs}` : ""}`);
    },
    enabled: !!roomId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roomId, data }: { roomId: string; data: SendMessageDto }) =>
      api.post(`/api/chat/rooms/${roomId}/messages`, data),
    onSuccess: (_, { roomId }) =>
      queryClient.invalidateQueries({ queryKey: ["chat-messages", roomId] }),
  });
}

export function useUpdateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMessageDto }) =>
      api.put(`/api/chat/messages/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat-messages"] }),
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/chat/messages/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat-messages"] }),
  });
}

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/chat/messages/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat-messages"] }),
  });
}

export function useAssignExpert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roomId: string) => api.post(`/api/chat/rooms/${roomId}/assign-expert`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat-rooms"] }),
  });
}

export function useCloseRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roomId: string) => api.patch(`/api/chat/rooms/${roomId}/close`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat-rooms"] }),
  });
}

export function useChatUnreadCount() {
  return useQuery<{ count: number }>({
    queryKey: ["chat-unread-count"],
    queryFn: () => api.get("/api/chat/unread-count"),
  });
}

// --- Reviews ---
export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewDto) => api.post("/api/reviews", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: () => api.get<Review[]>("/api/reviews"),
  });
}

export function useMyReviews(params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<Review>>({
    queryKey: ["my-reviews", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/reviews/my-reviews${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useServiceReviewStats(serviceId: string) {
  return useQuery<{ averageRating: number; totalReviews: number }>({
    queryKey: ["review-stats", serviceId],
    queryFn: () => api.get(`/api/reviews/service/${serviceId}/stats`),
    enabled: !!serviceId,
  });
}

export function useReview(id: string) {
  return useQuery<Review>({
    queryKey: ["review", id],
    queryFn: () => api.get<Review>(`/api/reviews/${id}`),
    enabled: !!id,
  });
}

export function useVoteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VoteReviewDto }) =>
      api.post(`/api/reviews/${id}/vote`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useReportReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReportReviewDto }) =>
      api.post(`/api/reviews/${id}/report`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useApproveReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/reviews/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useRejectReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/reviews/${id}/reject`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useRespondToReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.post(`/api/reviews/${id}/respond`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

// --- Experts ---
export function useRegisterExpert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterExpertDto) =>
      api.post("/api/experts/register", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["experts"] }),
  });
}

export function useExperts() {
  return useQuery<Expert[]>({
    queryKey: ["experts"],
    queryFn: () => api.get<Expert[]>("/api/experts"),
  });
}

export function useMyExpertProfile() {
  return useQuery<Expert>({
    queryKey: ["expert", "me"],
    queryFn: () => api.get<Expert>("/api/experts/me"),
  });
}

export function useExpert(id: string) {
  return useQuery<Expert>({
    queryKey: ["expert", id],
    queryFn: () => api.get<Expert>(`/api/experts/${id}`),
    enabled: !!id,
  });
}

export function useMyAssignments() {
  return useQuery<ExpertAssignment[]>({
    queryKey: ["expert-assignments"],
    queryFn: () => api.get<ExpertAssignment[]>("/api/experts/me/assignments"),
  });
}

export function useAcceptAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/assignments/${id}/accept`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expert-assignments"] }),
  });
}

export function useStartWork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/assignments/${id}/start`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expert-assignments"] }),
  });
}

export function useCompleteWork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/assignments/${id}/complete`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expert-assignments"] }),
  });
}

export function useCancelAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CancelAssignmentDto }) =>
      api.post(`/api/experts/assignments/${id}/cancel`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expert-assignments"] }),
  });
}

export function useExpertEarnings() {
  return useQuery<ExpertEarning[]>({
    queryKey: ["expert-earnings"],
    queryFn: () => api.get<ExpertEarning[]>("/api/experts/me/earnings"),
  });
}

export function useRequestPayout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RequestPayoutDto) =>
      api.post("/api/experts/me/payout", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expert-earnings"] });
      queryClient.invalidateQueries({ queryKey: ["expert-payouts"] });
    },
  });
}

export function useExpertPayouts() {
  return useQuery<ExpertPayout[]>({
    queryKey: ["expert-payouts"],
    queryFn: () => api.get<ExpertPayout[]>("/api/experts/me/payouts"),
  });
}

export function useSetAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.patch("/api/experts/me/availability"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expert", "me"] }),
  });
}

export function usePendingExperts(params?: { limit?: number; offset?: number }) {
  return useQuery<PaginatedResponse<Expert>>({
    queryKey: ["experts", "pending", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const qs = searchParams.toString();
      return api.get(`/api/experts/pending${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useApproveExpert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["experts"] }),
  });
}

export function useRejectExpert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/${id}/reject`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["experts"] }),
  });
}

export function useSuspendExpert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/${id}/suspend`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["experts"] }),
  });
}

// --- Analytics ---
export function useUserDashboard() {
  return useQuery({
    queryKey: ["analytics", "dashboard"],
    queryFn: () => api.get("/api/analytics/dashboard"),
  });
}

export function useAdminOverview() {
  return useQuery<AdminOverview>({
    queryKey: ["analytics", "admin", "overview"],
    queryFn: () => api.get<AdminOverview>("/api/analytics/admin/overview"),
  });
}

export function useRevenueAnalytics(startDate: string, endDate: string) {
  return useQuery<RevenueAnalytics>({
    queryKey: ["analytics", "admin", "revenue", startDate, endDate],
    queryFn: () =>
      api.get(`/api/analytics/admin/revenue?startDate=${startDate}&endDate=${endDate}`),
    enabled: !!startDate && !!endDate,
  });
}

export function useExpertDashboard() {
  return useQuery({
    queryKey: ["analytics", "expert", "dashboard"],
    queryFn: () => api.get("/api/analytics/expert/dashboard"),
  });
}

export function useActivityLogs() {
  return useQuery<ActivityLog[]>({
    queryKey: ["analytics", "activity-logs"],
    queryFn: () => api.get<ActivityLog[]>("/api/analytics/activity-logs"),
  });
}

// --- Questionnaire ---
export function useQuestionnaire(serviceRequestId: string) {
  return useQuery<{ data: Questionnaire }>({
    queryKey: ["questionnaire", serviceRequestId],
    queryFn: () => api.get(`/api/service-requests/${serviceRequestId}/questions`),
    enabled: !!serviceRequestId,
  });
}

export function useSaveQuestionnaire() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateQuestionnaireDto }) =>
      api.post(`/api/service-requests/${id}/answer`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire"] });
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
    },
  });
}

export function useServiceRequestAnswers(serviceRequestId: string) {
  return useQuery<{ data: ServiceRequestAnswer }>({
    queryKey: ["sr-answers", serviceRequestId],
    queryFn: () => api.get(`/api/service-requests/${serviceRequestId}/answer`),
    enabled: !!serviceRequestId,
  });
}

export function useSaveServiceRequestAnswers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateServiceRequestAnswerDto }) =>
      api.post(`/api/service-requests/${id}/answer`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sr-answers"] });
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
    },
  });
}
