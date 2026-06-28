import { BASE_URL } from "./baseUrl";

type FetchOptions = RequestInit & {
  token?: string;
};

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

function setTokens(access: string, refresh: string) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      clearTokens();
      return null;
    }

    const data = await res.json();
    const d = data.data || data;
    setTokens(d.access, d.refresh || refresh);
    return d.access;
  } catch {
    clearTokens();
    return null;
  }
}

export async function fetchClient<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOpts } = options;
  const accessToken = token || getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOpts.headers as Record<string, string>),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let res = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOpts,
    headers,
  });

  if (res.status === 401 && !options.token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...fetchOpts,
        headers,
      });
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw {
      status: res.status,
      message: error.detail || error.message || "خطای سرور",
      data: error,
    };
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}

export const api = {
  get: <T = unknown>(endpoint: string, opts?: FetchOptions) =>
    fetchClient<T>(endpoint, { method: "GET", ...opts }),

  post: <T = unknown>(endpoint: string, body?: unknown, opts?: FetchOptions) =>
    fetchClient<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...opts,
    }),

  put: <T = unknown>(endpoint: string, body?: unknown, opts?: FetchOptions) =>
    fetchClient<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...opts,
    }),

  patch: <T = unknown>(endpoint: string, body?: unknown, opts?: FetchOptions) =>
    fetchClient<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...opts,
    }),

  delete: <T = unknown>(endpoint: string, opts?: FetchOptions) =>
    fetchClient<T>(endpoint, { method: "DELETE", ...opts }),

  upload: async <T = unknown>(
    endpoint: string,
    file: File,
    fieldName = "file",
    extraData?: Record<string, string>
  ): Promise<T> => {
    const formData = new FormData();
    formData.append(fieldName, file);
    if (extraData) {
      Object.entries(extraData).forEach(([key, val]) =>
        formData.append(key, val)
      );
    }

    const accessToken = getAccessToken();
    const headers: Record<string, string> = {};
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw { status: res.status, message: error.detail || "خطا در آپلود", data: error };
    }

    return res.json();
  },

  clearTokens,
  setTokens,
};
