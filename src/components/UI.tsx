import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { X } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode } from 'react';
export function Button({ children, variant = 'primary', className = '', ...props }: Omit<HTMLMotionProps<'button'>, 'children'> & { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' }) { return <motion.button whileTap={{ scale: .98 }} className={`button button-${variant} ${className}`} {...props}>{children}</motion.button>; }
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) { return <section className={`panel ${className}`}>{children}</section>; }
export function Field({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label className="field"><span>{label}</span><input {...props} /></label>; }
export function SelectField({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) { return <label className="field"><span>{label}</span><select {...props}>{children}</select></label>; }
export function TextAreaField({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) { return <label className="field"><span>{label}</span><textarea rows={3} {...props} /></label>; }
export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'amber' | 'red' | 'blue' }) { return <span className={`badge badge-${tone}`}>{children}</span>; }
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><motion.div initial={{ opacity: 0, y: 8, scale: .99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} className="modal"><div className="modal-head"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X size={18}/></button></div>{children}</motion.div></div>; }
export function EmptyState({ title, detail }: { title: string; detail: string }) { return <div className="empty-state"><div className="empty-mark">—</div><strong>{title}</strong><p>{detail}</p></div>; }
