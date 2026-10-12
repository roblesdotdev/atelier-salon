import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, ChartNoAxesCombined, Scissors, UsersRound, Sparkles, Menu, Moon, Sun, X } from 'lucide-react';
const nav = [{ to: '/', label: 'Resumen', icon: ChartNoAxesCombined, end: true }, { to: '/clientes', label: 'Clientes', icon: UsersRound }, { to: '/servicios', label: 'Servicios', icon: Scissors }, { to: '/agenda', label: 'Agenda', icon: CalendarDays }];
function readTheme(): 'light' | 'dark' {
  try { const saved = localStorage.getItem('atelier-theme'); return saved === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
}
export default function AppLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>(readTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('atelier-theme', theme); } catch { /* Storage can be disabled by the browser. */ } }, [theme]);
  useEffect(() => setMobileMenuOpen(false), [location.pathname]);
  const toggleTheme = () => setTheme(current => current === 'dark' ? 'light' : 'dark');
  const themeButton = <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}>{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}<span>{theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}</span></button>;
  const navigation = () => nav.map(item => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><item.icon size={18} strokeWidth={1.8}/><span>{item.label}</span></NavLink>);
  return <div className="app-shell" data-theme={theme}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Sparkles size={17}/></div><div><strong>atelier</strong><span>GESTIÓN DE SALÓN</span></div></div>
      <div className="workspace-label">ESPACIO DE TRABAJO</div>
      <nav className="desktop-nav">{navigation()}</nav>
      <div className="sidebar-bottom">
        <div className="profile-row"><div className="avatar" aria-hidden="true">A</div><div className="profile"><strong>Mi salón</strong><span>Plan personal</span></div></div>
        <div className="sidebar-settings">{themeButton}</div>
      </div>
    </aside>
    <main className="main-area">
      <header className="mobile-header"><div className="brand-mark"><Sparkles size={17}/></div><strong>atelier</strong><div className="mobile-header-actions">{themeButton}<button type="button" className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(v => !v)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}>{mobileMenuOpen ? <X size={19}/> : <Menu size={19}/>}</button></div></header>
      <AnimatePresence initial={false}>{mobileMenuOpen && <motion.nav className="mobile-nav" initial={{height:0,opacity:0,y:-5}} animate={{height:'auto',opacity:1,y:0}} exit={{height:0,opacity:0,y:-5}} transition={{duration:.2,ease:'easeOut'}}>{navigation()}</motion.nav>}</AnimatePresence>
      <Outlet/>
    </main>
    <div className="demo-seal" aria-label="Demostración del producto"><span className="demo-seal-top">ATELIER · PREVIEW</span><span className="demo-seal-center">DEMO</span><span className="demo-seal-bottom">VERSIÓN DE MUESTRA</span></div>
  </div>;
}
