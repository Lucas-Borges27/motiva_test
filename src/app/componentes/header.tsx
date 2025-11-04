"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-[#5E22F3] flex justify-between items-center px-4 sm:px-8 bg-gradient-to-r shadow-md relative">
      <div className="flex items-center text-white font-bold text-base sm:text-xl">
        <Link href="/" className="flex items-center">
          <Image
            id="logoViaMobilidade"
            src="/images/logoMotivaSemEscrita.png"
            alt="Logo"
            width={50}
            height={30}
            className="m-3 sm:m-5 mr-2 sm:mr-3"
          />
          <span className="hidden sm:inline">ViaMobilidade</span>
        </Link>

        {userName && (
          <span className="ml-2 sm:ml-4 text-sm sm:text-base font-normal truncate max-w-[100px] sm:max-w-none">
            Olá, {userName}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {!userName ? (
          <button
            onClick={handleLogin}
            className="text-sm sm:text-base text-white font-medium hover:underline transition"
          >
            <a>Login</a>
          </button>
        ) : (
          <button
            onClick={onLogout}
            className="text-sm sm:text-base text-white font-medium hover:text-gray-200 transition"
          >
            Sair
          </button>
        )}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-md hover:bg-[#4a1bb3] transition"
        aria-label="Menu"
      >
        <div className="w-5 h-0.5 bg-white rounded-full"></div>
        <div className="w-5 h-0.5 bg-white rounded-full"></div>
        <div className="w-5 h-0.5 bg-white rounded-full"></div>
      </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-14 sm:top-16 right-2 sm:right-8 bg-white text-gray-800 rounded-lg sm:rounded-xl shadow-lg w-36 sm:w-40 py-2 z-50"
          >
            <ul>
              {[
                { href: "/", label: "Rotas" },
                { href: "/status", label: "Status" },
                { href: "/beneficios", label: "Benefícios" },
                { href: "/suporte", label: "Suporte" },
                { href: "/desenvolvedores", label: "Devs" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-3 sm:px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#5E22F3] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
