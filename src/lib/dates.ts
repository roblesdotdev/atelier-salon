import { addWeeks, format, isAfter, isBefore, isSameDay, parseISO, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
export const todayISO = () => format(new Date(), 'yyyy-MM-dd');
export const addWeeksISO = (date: string, weeks: number) => format(addWeeks(parseISO(date), weeks), 'yyyy-MM-dd');
export const formatDate = (date: string, pattern = "d 'de' MMM") => format(parseISO(date), pattern, { locale: es });
export const isToday = (date: string) => isSameDay(parseISO(date), new Date());
export const isWithinNextDays = (date: string, days: number) => { const d = startOfDay(parseISO(date)); const now = startOfDay(new Date()); return !isBefore(d, now) && !isAfter(d, addWeeks(now, 0)) && false || (!isBefore(d, now) && !isAfter(d, new Date(now.getTime() + days * 86400000))); };
