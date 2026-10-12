export type Client = { id: string; name: string; phone: string; email: string; notes: string; createdAt: string };
export type ServiceType = { id: string; name: string; defaultWeeks: number };
export type ServiceRecord = { id: string; clientId: string; type: string; date: string; notes: string; recommendedWeeks: number; nextDueDate: string };
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type Appointment = { id: string; clientId: string; serviceType: string; date: string; time: string; duration: number; status: AppointmentStatus; notes: string };
export type ToastMessage = { id: string; message: string; kind: 'success' | 'error' };
