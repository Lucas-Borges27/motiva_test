"use client";

import { FaSms, FaPhoneAlt, FaHeadset, FaExclamationTriangle } from "react-icons/fa";
import BotaoDenuncia from "../componentes/botaoDenuncia"; // Mantendo seu componente

export default function Suporte() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Página */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
            Central de Suporte
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Precisa de ajuda? Encontre aqui os canais oficiais para denúncias, informações e atendimento ao cliente.
          </p>
        </header>

        {/* Grid com os Cards de Contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: Canal de Denúncias */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col gap-6
                          hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <FaExclamationTriangle className="text-2xl text-red-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Canal de Denúncias</h2>
            </div>
            <p className="text-gray-600">
              Para relatar situações de emergência, assédio, vandalismo ou qualquer outra irregularidade.
            </p>
            
            {/* Componente do Botão + Alternativa SMS */}
            <div className="space-y-4 text-center">
              <BotaoDenuncia />
              <div className="text-sm text-gray-500">ou envie um SMS</div>
            </div>
            
            <a 
              href="sms:11912776323?&body=Descreva%20sua%20ocorrência:"
              className="group bg-gray-100 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-200 transition-colors"
            >
              <FaSms className="text-3xl text-gray-500 group-hover:text-indigo-600 transition-colors" />
              <div>
                <span className="font-semibold text-gray-800">Envie sua denúncia para:</span>
                <p className="text-lg font-bold text-indigo-600">11 91277-6323</p>
              </div>
            </a>
          </div>

          {/* Card 2: Atendimento e Informações */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col gap-6
                          hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <FaHeadset className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Atendimento Geral</h2>
            </div>
            <p className="text-gray-600">
              Para informações, achados e perdidos, sugestões ou dúvidas sobre a operação das linhas.
            </p>

            <a 
              href="tel:08007707106"
              className="group bg-indigo-50 rounded-lg p-4 text-center hover:bg-indigo-100 transition-colors"
            >
              <span className="text-sm text-indigo-700">Ligue para a Central de Atendimento</span>
              <p className="text-3xl font-bold text-indigo-600 flex items-center justify-center gap-3">
                <FaPhoneAlt />
                0800 770 7106
              </p>
            </a>

            <div className="text-center bg-gray-50 p-3 rounded-md border">
                <p className="text-sm font-semibold text-gray-700">Horário de Atendimento:</p>
                <p className="text-xs text-gray-600">Segunda a sexta: 06h30 às 22h00</p>
                <p className="text-xs text-gray-600">Sábados: 08h00 às 18h00</p>
            </div>
            
            <a href="#" className="text-center text-sm font-semibold text-indigo-600 hover:underline">
              Precisa falar com a Ouvidoria? Clique aqui.
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}