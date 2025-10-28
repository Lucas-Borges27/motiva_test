"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface LinhaData {
  id: number;
  nome: string;
  cor: string;
  corNome?: string;
  operadora: string;
  logo: string;
  horario: string;
  status: string;
  estacoes: string[];
}

interface LinhasData {
  linhas: LinhaData[];
}

interface LinhaMetroProps {
  linhaId: string;
}

const LinhaMetro = ({ linhaId }: LinhaMetroProps) => {
  const [linhasData, setLinhasData] = useState<LinhasData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/linhas.json")
      .then((res) => res.json())
      .then((data) => {
        setLinhasData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!linhasData) {
    return <div>Erro ao carregar linhas</div>;
  }

  const linha = linhasData.linhas.find(
    (l) => l.id === parseInt(linhaId.replace("linha", ""))
  );

  if (!linha) {
    return <div>Linha não encontrada</div>;
  }

  const currentIndex = linhasData.linhas.findIndex((l) => l.id === linha.id);
  const previousLine =
    currentIndex > 0
      ? linhasData.linhas[currentIndex - 1]
      : linhasData.linhas[linhasData.linhas.length - 1];
  const nextLine =
    currentIndex < linhasData.linhas.length - 1
      ? linhasData.linhas[currentIndex + 1]
      : linhasData.linhas[0];

  // Mapear cor do status
  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes("normal")) return "text-green-600";
    if (status.toLowerCase().includes("obras")) return "text-yellow-500";
    if (status.toLowerCase().includes("problema")) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <motion.div
      className="bg-gray-100 min-h-screen p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header colorido */}
      <div
        style={{ backgroundColor: linha.cor }}
        className="text-white text-center p-4 text-lg relative"
      >
        <Link
          href={`/linha${previousLine.id}`}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center hover:underline"
        >
          <Image
            src="/images/setaEsquerda.png"
            alt="voltar"
            width={14}
            height={14}
            className="mr-2 filter brightness-0 invert"
          />
          Linha {previousLine.id}
        </Link>
        <span>{linha.nome}</span>
        <Link
          href={`/linha${nextLine.id}`}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center hover:underline"
        >
          Linha {nextLine.id}
          <Image
            src="/images/setaDireita.png"
            alt="avançar"
            width={14}
            height={14}
            className="ml-2 filter brightness-0 invert"
          />
        </Link>
      </div>

      {/* Card com info */}
      <div className="bg-white shadow-md rounded-lg p-4 my-4 relative">
        <div className="flex items-center">
          <div
            style={{ backgroundColor: linha.cor }}
            className="text-white rounded-full w-10 h-10 flex items-center justify-center text-lg mr-2"
          >
            {linha.id}
          </div>
          <div className="text-lg">{linha.nome.split(" ")[2]}</div>
        </div>
        <Image
          alt={`${linha.operadora} logo`}
          className="absolute top-4 right-4"
          src={linha.logo.startsWith("/") ? linha.logo : "/" + linha.logo}
          width={136}
          height={40}
        />
        <div className="mt-2 text-sm flex items-center">
          <span className="w-4 h-4 rounded-full bg-green-500 inline-block mr-2"></span>
          <span>{linha.horario}</span>
        </div>
        <div className={`mt-2 text-sm font-semibold ${getStatusColor(linha.status)}`}>
          {linha.status}
        </div>
      </div>

      {/* Estações */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg mb-4 font-semibold">Estações</h2>
        {linha.estacoes.map((estacao, index) => (
          <div
            key={index}
            className="py-2 border-b border-gray-300 last:border-none flex items-center"
          >
            <Image
              src="/images/imagemLoc.png"
              alt="ícone estação"
              width={20}
              height={20}
              className="mr-2"
            />
            {estacao}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LinhaMetro;
