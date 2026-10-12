import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { addWeeksISO, todayISO } from '../lib/dates';
import type { Appointment, Client, ServiceRecord, ServiceType, ToastMessage } from '../types';
import { useLocalStorage } from './useLocalStorage';
const starterTypes: ServiceType[] = [{ id: 'st-cut', name: 'Corte', defaultWeeks: 4 }, { id: 'st-color', name: 'Tintura', defaultWeeks: 6 }, { id: 'st-highlights', name: 'Mechas', defaultWeeks: 10 }, { id: 'st-nails', name: 'Uñas', defaultWeeks: 3 }, { id: 'st-straight', name: 'Alisado', defaultWeeks: 12 }, { id: 'st-blow', name: 'Brushing', defaultWeeks: 2 }];
type SalonContextValue = { clients: Client[]; setClients: (v: Client[] | ((p: Client[]) => Client[])) => void; services: ServiceRecord[]; setServices: (v: ServiceRecord[] | ((p: ServiceRecord[]) => ServiceRecord[])) => void; appointments: Appointment[]; setAppointments: (v: Appointment[] | ((p: Appointment[]) => Appointment[])) => void; serviceTypes: ServiceType[]; setServiceTypes: (v: ServiceType[] | ((p: ServiceType[]) => ServiceType[])) => void; toast: (message: string, kind?: ToastMessage['kind']) => void; addService: (data: Omit<ServiceRecord, 'id' | 'nextDueDate'>) => void; completeAppointment: (appointment: Appointment) => void };
const SalonContext = createContext<SalonContextValue | null>(null);
export function SalonProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useLocalStorage<Client[]>('atelier.clients', []);
  const [services, setServices] = useLocalStorage<ServiceRecord[]>('atelier.services', []);
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('atelier.appointments', []);
  const [serviceTypes, setServiceTypes] = useLocalStorage<ServiceType[]>('atelier.serviceTypes', starterTypes);
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const showToast = (message: string, kind: ToastMessage['kind'] = 'success') => { const id = crypto.randomUUID(); setMessages(p => [...p, { id, message, kind }]); window.setTimeout(() => setMessages(p => p.filter(m => m.id !== id)), 3000); };
  const addService = (data: Omit<ServiceRecord, 'id' | 'nextDueDate'>) => { setServices(p => [{ ...data, id: crypto.randomUUID(), nextDueDate: addWeeksISO(data.date, data.recommendedWeeks) }, ...p]); showToast('Servicio guardado en el historial'); };
  const completeAppointment = (appointment: Appointment) => { setAppointments(p => p.map(a => a.id === appointment.id ? { ...a, status: 'completed' } : a)); addService({ clientId: appointment.clientId, type: appointment.serviceType, date: appointment.date, notes: appointment.notes, recommendedWeeks: serviceTypes.find(t => t.name === appointment.serviceType)?.defaultWeeks ?? 4 }); };
  const value = useMemo(() => ({ clients, setClients, services, setServices, appointments, setAppointments, serviceTypes, setServiceTypes, toast: showToast, addService, completeAppointment }), [clients, services, appointments, serviceTypes]);
  return <SalonContext.Provider value={value}>{children}<div className="toast-stack" aria-live="polite">{messages.map(m => <div className={`toast ${m.kind}`} key={m.id}>{m.message}</div>)}</div></SalonContext.Provider>;
}
export function useSalon() { const value = useContext(SalonContext); if (!value) throw new Error('useSalon debe usarse dentro de SalonProvider'); return value; }
export const newClient = (data: Omit<Client, 'id' | 'createdAt'>): Client => ({ ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
export const newAppointment = (data: Omit<Appointment, 'id' | 'status'>): Appointment => ({ ...data, id: crypto.randomUUID(), status: 'pending' });
export { todayISO };
