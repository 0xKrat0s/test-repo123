import { useState } from "react";
import { FiHome, FiFolder, FiTool, FiBriefcase, FiEdit } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";
import { useRouter } from "next/router";

function HundredIcon(props) {
  return (
    <span
      {...props}
      className="text-white text-base font-extrabold leading-none flex items-center justify-center font-mono w-6 h-6"
      style={{ letterSpacing: '-0.1em' }}
    >
      100
    </span>
  );
}

function FiftyIcon(props) {
  return (
    <span
      {...props}
      className="text-white text-base font-extrabold leading-none flex items-center justify-center font-mono w-6 h-6"
      style={{ letterSpacing: '-0.1em' }}
    >
      50
    </span>
  );
}

const navItems = [
  { icon: FiHome, label: "Home", aria: "Home" },
  { icon: FiFolder, label: "Projects", aria: "Projects" },
  { icon: FiTool, label: "Skills", aria: "Skills" },
  { icon: FiBriefcase, label: "About", aria: "About" },
  { icon: FiEdit, label: "Blog", aria: "Blog" },
  { icon: FiftyIcon, label: "List 50", aria: "List 50" },
];

export default function NavigationBar({ locations }) {
  const router = useRouter();

  const handleNavClick = (idx, ref) => {
    if (navItems[idx].label === "Blog") {
      router.push("/blog");
      return;
    }
    if (navItems[idx].label === "List 50") {
      router.push("/bucket-list");
      return;
    }
    const sectionHashes = ["#home", "#projects", "#skills", "#about"];
    if (!ref || !ref.current) {
      router.push(`/${sectionHashes[idx] || ""}`);
      return;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behaviour: "smooth", block: "start" });
    }
  };

  // Determine active nav based on route
  const getIsActive = (item, idx) => {
    if (item.label === "Home" && router.pathname === "/") return true;
    if (item.label === "Blog" && router.pathname.startsWith("/blog")) return true;
    if (item.label === "List 50" && router.pathname === "/bucket-list") return true;
    // For section links, use locations prop if available
    if (locations && locations[idx] && locations[idx].ref && typeof window !== 'undefined') {
      // Optionally, you could add logic to highlight based on scroll position
      return false;
    }
    return false;
  };

  return (
    <div className="fixed z-50 flex justify-center w-full pointer-events-none bottom-3 left-1/2 -translate-x-1/2 top-auto sm:top-6 sm:bottom-auto">
      <nav className="pointer-events-auto flex bg-gradient-to-r from-neutral-900/90 via-neutral-800/90 to-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-8 py-2 gap-4 relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-primary-600/5 rounded-2xl"></div>
        
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = getIsActive(item, idx);
          return (
            <button
              key={item.label}
              aria-label={item.aria}
              className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-neutral-900
                ${isActive 
                  ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 scale-105" 
                  : "text-white/80 hover:text-white hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:scale-105"
                }`}
              onClick={() => handleNavClick(idx, locations && locations[idx] && locations[idx].ref)}
              type="button"
            >
              {/* Active indicator glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-xl blur-sm"></div>
              )}
              
              <div className="relative z-10">
                <Icon size={22} className={`transition-all duration-300 ${isActive ? 'drop-shadow-lg' : 'group-hover:drop-shadow-md'}`} />
              </div>
              
              {/* Tooltip */}
              <span className={`absolute left-1/2 -translate-x-1/2 top-12 text-xs font-semibold text-white bg-gradient-to-r from-neutral-900/95 to-neutral-800/95 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 z-50 whitespace-nowrap mt-2 shadow-xl shadow-black/50 transform scale-95 group-hover:scale-100`}>
                {item.label}
                {/* Tooltip arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900/95 border-l border-t border-white/10 rotate-45"></div>
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
