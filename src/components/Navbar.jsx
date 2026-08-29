import { useState } from "react";
import { Dice5, Menu, Moon, Sun, X } from "lucide-react";

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="navbar">
      <button className="brand" onClick={() => go("home")} aria-label="Ke beranda">
        <span className="brand-mark"><Dice5 size={22}/></span>
        <span>Group<span>Random</span></span>
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>
        <button onClick={() => go("home")}>Home</button>
        <button onClick={() => go("generator")}>Generator</button>
        <button onClick={() => go("history")}>Riwayat</button>
        <button onClick={() => go("about")}>Tentang</button>
      </nav>

      <div className="nav-actions">
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Ganti tema">
          {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
        </button>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={21}/> : <Menu size={21}/>}
        </button>
      </div>
    </header>
  );
}