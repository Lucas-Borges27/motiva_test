"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Status() {
  const [searchTerm, setSearchTerm] = useState("");

  const linhas = [
    { numero: "1", nome: "Azul", cor: "bg-[#011289]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha1" },
    { numero: "2", nome: "Verde", cor: "bg-[#01775A]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha2" },
    { numero: "3", nome: "Vermelha", cor: "bg-[#F51200]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha3" },
    { numero: "4", nome: "Amarela", cor: "bg-[#F9A800]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha4" },
    { numero: "5", nome: "Lilás", cor: "bg-[#9A3784]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha5" },
    { numero: "7", nome: "Rubi", cor: "bg-[#C80857]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha7" },
    { numero: "8", nome: "Diamante", cor: "bg-[#949488]", status: "Circulação de trens", statusClass: "text-yellow-400", bolinha: "bg-yellow-400", href: "/linha8" },
    { numero: "9", nome: "Esmeralda", cor: "bg-[#50B8A1]", status: "Falta de energia", statusClass: "text-red-500", bolinha: "bg-red-500", href: "/linha9" },
    { numero: "10", nome: "Turquesa", cor: "bg-[#40B0C1]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha10" },
    { numero: "11", nome: "Coral", cor: "bg-[#FF7F50]", status: "Obras na via", statusClass: "text-yellow-400", bolinha: "bg-yellow-400", href: "/linha11" },
    { numero: "12", nome: "Safira", cor: "bg-[#1F2086]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha12" },
    { numero: "13", nome: "Jade", cor: "bg-[#29B352]", status: "Operação normal", statusClass: "text-green-500", bolinha: "bg-green-500", href: "/linha13" },
  ];

  const linhasFiltradas = linhas.filter((linha) =>
    linha.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* Conteúdo */}
      <main className="container mx-auto p-4">
        {/* Barra de busca */}
        <motion.form
          role="search"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <input
            type="text"
            placeholder="🔍 Busque uma linha..."
            className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.form>

        {/* Lista de linhas (um embaixo do outro) */}
        {linhasFiltradas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 font-semibold"
          >
            Nenhuma linha encontrada
          </motion.div>
        ) : (
          <motion.div layout className="flex flex-col gap-4">
            {linhasFiltradas.map((linha) => (
              <motion.div
                key={linha.numero}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={linha.href}
                  className="flex items-center p-5 border rounded-2xl shadow-md bg-white transition-all hover:shadow-xl cursor-pointer no-underline text-black"
                >
                  {/* Bolinha */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center text-white font-bold rounded-full ${linha.cor}`}
                  >
                    {linha.numero}
                  </div>

                  {/* Nome */}
                  <div className="ml-4 font-semibold text-lg">{linha.nome}</div>

                  {/* Status */}
                  <div className="ml-auto flex items-center">
                    <div className={`text-sm mr-2 font-bold ${linha.statusClass}`}>
                      {linha.status}
                    </div>
                    <div className={`w-5 h-5 rounded-full ${linha.bolinha}`}></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
