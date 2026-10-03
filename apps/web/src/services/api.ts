const API_BASE = 'http://localhost:4000/api';

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'API request failed');
  }

  return data.data;
}

export const api = {
  login: (credentials: any) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  me: () => request('/auth/me'),
  
  getDashboard: () => request('/dashboard'),
  
  getPatients: (params?: any) => {
    const qs = new URLSearchParams(params || {}).toString();
    return request(`/patients${qs ? `?${qs}` : ''}`);
  },
  getPatient: (id: string) => request(`/patients/${id}`),
  createPatient: (data: any) => request('/patients', { method: 'POST', body: JSON.stringify(data) }),
  updatePatient: (id: string, data: any) => request(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePatient: (id: string) => request(`/patients/${id}`, { method: 'DELETE' }),
  
  getAppointments: (params?: any) => {
    const qs = new URLSearchParams(params || {}).toString();
    return request(`/appointments${qs ? `?${qs}` : ''}`);
  },
  createAppointment: (data: any) => request('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  updateAppointmentStatus: (id: string, status: string) => request(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
};
