"use client";

import { useMemo, useState } from "react";
import { FaTicketAlt, FaLightbulb, FaSearch } from "react-icons/fa";

type Tipo = "beneficio" | "dica";

type Estacao = {
  id: string;
  nome: string;
  tipo: Tipo;
  detalhe: string;
};

type Linha = {
  id: string;
  nome: string;
  cor: string;
  estacoes: Estacao[];
};

// DADOS FOCADOS APENAS NAS LINHAS SOLICITADAS
const LINHAS: Linha[] = [
  {
    id: "4",
    nome: "Linha 4 • Amarela",
    cor: "#F9A800",
    estacoes: [
      { id: "luz-4", nome: "Luz", tipo: "dica", detalhe: "Conecte-se com a história e a arte no centro de SP." },
      { id: "republica-4", nome: "República", tipo: "beneficio", detalhe: "Desconto em teatros parceiros da região." },
      { id: "higienopolis-mackenzie", nome: "Higienópolis-Mackenzie", tipo: "dica", detalhe: "Próximo a grandes universidades e ao Shopping Pátio Higienópolis." },
      { id: "paulista-4", nome: "Paulista-Pernambucanas", tipo: "dica", detalhe: "Coração da Av. Paulista, com cinemas, teatros e cultura." },
      { id: "oscar-freire", nome: "Oscar Freire", tipo: "beneficio", detalhe: "Entrada gratuita no MIS às quartas." },
      { id: "fradique", nome: "Fradique Coutinho", tipo: "dica", detalhe: "Rua dos Pinheiros com os melhores bares e restaurantes." },
      { id: "faria-lima", nome: "Faria Lima", tipo: "beneficio", detalhe: "Desconto em cafés parceiros no polo financeiro." },
      { id: "pinheiros-4", nome: "Pinheiros", tipo: "dica", detalhe: "Mercado de Pinheiros com ótima gastronomia e acesso ao Largo da Batata." },
      { id: "butanta", nome: "Butantã", tipo: "beneficio", detalhe: "10% de desconto no Museu Biológico do Instituto Butantan." },
      { id: "sao-paulo-morumbi", nome: "São Paulo-Morumbi", tipo: "dica", detalhe: "Acesso fácil ao Estádio do Morumbi e ao Hospital Albert Einstein." },
      { id: "vila-sonia", nome: "Vila Sônia-Professora Elisabeth Tenreiro", tipo: "beneficio", detalhe: "Descontos em lojas no terminal de ônibus anexo." },
    ],
  },
  {
    id: "5",
    nome: "Linha 5 • Lilás",
    cor: "#9A3784",
    estacoes: [
        { id: "capao", nome: "Capão Redondo", tipo: "dica", detalhe: "Próximo ao CEU Capão, opções esportivas e culturais." },
        { id: "campo-limpo", nome: "Campo Limpo", tipo: "beneficio", detalhe: "Desconto em academias locais." },
        { id: "vila-belezas", nome: "Vila das Belezas", tipo: "dica", detalhe: "Explore o comércio e serviços da região." },
        { id: "giovanni", nome: "Giovanni Gronchi", tipo: "beneficio", detalhe: "Vantagens de compras no Shopping Jardim Sul." },
        { id: "santo-amaro-5", nome: "Santo Amaro", tipo: "beneficio", detalhe: "Meia-entrada em cinema conveniado." },
        { id: "largo-treze", nome: "Largo Treze", tipo: "dica", detalhe: "Coração de Santo Amaro, com forte comércio popular." },
        { id: "adolfo-pinheiro", nome: "Adolfo Pinheiro", tipo: "beneficio", detalhe: "Promoções em lojas de departamento locais." },
        { id: "alto-bv", nome: "Alto da Boa Vista", tipo: "dica", detalhe: "Bairro com forte influência da cultura alemã." },
        { id: "borba-gato", nome: "Borba Gato", tipo: "beneficio", detalhe: "Descontos em restaurantes próximos à estátua." },
        { id: "brooklin", nome: "Brooklin", tipo: "dica", detalhe: "Polo de negócios e gastronomia." },
        { id: "campo-belo", nome: "Campo Belo", tipo: "beneficio", detalhe: "Descontos em padarias e empórios." },
        { id: "eucaliptos", nome: "Eucaliptos", tipo: "dica", detalhe: "Acesso ao Shopping Ibirapuera." },
        { id: "moema", nome: "Moema", tipo: "beneficio", detalhe: "Vantagens em lojas e serviços do bairro." },
        { id: "aacd-servidor", nome: "AACD-Servidor", tipo: "dica", detalhe: "Principal acesso ao hospital da AACD." },
        { id: "hospital-sp", nome: "Hospital São Paulo", tipo: "beneficio", detalhe: "Descontos em farmácias conveniadas." },
        { id: "santa-cruz-5", nome: "Santa Cruz", tipo: "dica", detalhe: "Integração e acesso a um grande polo de saúde." },
        { id: "chacara-klabin-5", nome: "Chácara Klabin", tipo: "beneficio", detalhe: "Promoções em petshops e clínicas veterinárias." },
    ],
  },
  {
    id: "8",
    nome: "Linha 8 • Diamante",
    cor: "#949488",
    estacoes: [
      { id: "julio-prestes", nome: "Júlio Prestes", tipo: "dica", detalhe: "Sala São Paulo, concertos renomados." },
      { id: "palmeiras-barra-funda-8", nome: "Palmeiras-Barra Funda", tipo: "beneficio", detalhe: "Desconto em estacionamento conveniado." },
      { id: "lapa-8", nome: "Lapa", tipo: "dica", detalhe: "Mercado da Lapa, comidas típicas paulistas." },
      { id: "domingos-moraes", nome: "Domingos de Moraes", tipo: "beneficio", detalhe: "Promoção em restaurantes locais." },
      { id: "imperatriz-leopoldina", nome: "Imperatriz Leopoldina", tipo: "dica", detalhe: "Explore o charmoso bairro da Vila Leopoldina." },
      { id: "presidente-altino-8", nome: "Presidente Altino", tipo: "beneficio", detalhe: "Descontos em lanchonetes próximas." },
      { id: "osasco-8", nome: "Osasco", tipo: "dica", detalhe: "Calçadão de Osasco com grande variedade de lojas." },
      { id: "comandante-sampaio", nome: "Comandante Sampaio", tipo: "beneficio", detalhe: "Café grátis em padarias conveniadas." },
      { id: "quilometro-18", nome: "Quilômetro 18", tipo: "dica", detalhe: "Acesso a bairros residenciais de Osasco." },
      { id: "general-miguel-costa", nome: "General Miguel Costa", tipo: "beneficio", detalhe: "Vantagens em autoescolas da região." },
      { id: "carapicuiba", nome: "Carapicuíba", tipo: "dica", detalhe: "Acesso ao Parque do Planalto e à Aldeia de Carapicuíba." },
      { id: "santa-tereza", nome: "Santa Terezinha", tipo: "beneficio", detalhe: "Promoções em supermercados locais." },
      { id: "jardim-silveira", nome: "Jardim Silveira", tipo: "dica", detalhe: "Acesso ao Parque Ecológico de Barueri." },
      { id: "jandira", nome: "Jandira", tipo: "beneficio", detalhe: "Descontos no terminal de ônibus municipal." },
    ],
  },
  {
    id: "9",
    nome: "Linha 9 • Esmeralda",
    cor: "#50B8A1",
    estacoes: [
        { id: "osasco-9", nome: "Osasco", tipo: "beneficio", detalhe: "Desconto em lojas de eletrônicos." },
        { id: "presidente-altino-9", nome: "Presidente Altino", tipo: "dica", detalhe: "Próximo ao parque Vila dos Remédios." },
        { id: "ceasa", nome: "Ceasa", tipo: "beneficio", detalhe: "Descontos especiais para compras no CEAGESP." },
        { id: "vila-leopoldina-9", nome: "Vila Leopoldina", tipo: "dica", detalhe: "Explore os galpões de arte e estúdios do bairro." },
        { id: "cidade-universitaria", nome: "Cidade Universitária", tipo: "beneficio", detalhe: "Entrada gratuita em exposições da USP." },
        { id: "pinheiros-9", nome: "Pinheiros", tipo: "dica", detalhe: "Feira gastronômica no Largo da Batata." },
        { id: "hebraica-reboucas", nome: "Hebraica-Rebouças", tipo: "beneficio", detalhe: "Descontos no Shopping Eldorado." },
        { id: "cidade-jardim", nome: "Cidade Jardim", tipo: "dica", detalhe: "Próximo ao Parque do Povo." },
        { id: "vila-olimpia", nome: "Vila Olímpia", tipo: "beneficio", detalhe: "10% em restaurantes parceiros." },
        { id: "berrini", nome: "Berrini", tipo: "dica", detalhe: "Próximo à ponte estaiada, cartão postal." },
        { id: "morumbi-9", nome: "Morumbi", tipo: "beneficio", detalhe: "Vantagens e acesso facilitado ao Shopping Morumbi." },
        { id: "granja-julieta", nome: "Granja Julieta", tipo: "dica", detalhe: "Visite o Parque Severo Gomes." },
        { id: "joao-dias", nome: "João Dias", tipo: "beneficio", detalhe: "Descontos em empresas do centro empresarial." },
        { id: "santo-amaro-9", nome: "Santo Amaro", tipo: "dica", detalhe: "Integração e acesso ao Mais Shopping." },
        { id: "socorro", nome: "Socorro", tipo: "beneficio", detalhe: "Descontos em lojas de artigos para barcos e esportes aquáticos." },
        { id: "jurubatuba", nome: "Jurubatuba", tipo: "dica", detalhe: "Acesso ao SP Market e Parque da Mônica." },
        { id: "autodromo", nome: "Autódromo", tipo: "beneficio", detalhe: "Descontos em ingressos para eventos selecionados em Interlagos." },
        { id: "interlagos-9", nome: "Interlagos", tipo: "dica", detalhe: "Próximo ao Sesc Interlagos, ótima opção de lazer." },
        { id: "grajau", nome: "Grajaú", tipo: "beneficio", detalhe: "Vantagens em comércios no terminal de ônibus." },
        { id: "mendes-vila-natal", nome: "Mendes-Vila Natal", tipo: "dica", detalhe: "Explore a ciclovia às margens do Rio Pinheiros." },
    ],
  },
  {
    id: "17",
    nome: "Linha 17 • Ouro",
    cor: "#B59410", // Tom de ouro
    estacoes: [
      { id: "morumbi-17", nome: "Morumbi", tipo: "dica", detalhe: "Futura integração com a Linha 9-Esmeralda." },
      { id: "chucri-zaidan", nome: "Chucri Zaidan", tipo: "beneficio", detalhe: "Descontos em restaurantes no complexo do Shopping Morumbi." },
      { id: "vila-cordeiro", nome: "Vila Cordeiro", tipo: "dica", detalhe: "Acesso à região da Berrini e centros empresariais." },
      { id: "campo-belo-17", nome: "Campo Belo", tipo: "beneficio", detalhe: "Vantagens na futura integração com a Linha 5-Lilás." },
      { id: "vereador-jose-diniz", nome: "Vereador José Diniz", tipo: "dica", detalhe: "Explore o comércio e serviços da Av. José Diniz." },
      { id: "washington-luis", nome: "Washington Luís", tipo: "beneficio", detalhe: "Promoções em hotéis parceiros da região." },
      { id: "aeroporto-congonhas", nome: "Aeroporto de Congonhas", tipo: "dica", detalhe: "Acesso direto a um dos principais aeroportos do país." },
    ],
  },
];


export default function BeneficiosPage() {
  const [linhaSelecionada, setLinhaSelecionada] = useState<Linha>(LINHAS[0]);
  const [filtro, setFiltro] = useState<"todos" | Tipo>("todos");
  const [busca, setBusca] = useState("");

  const estacoesFiltradas = useMemo(() => {
    return linhaSelecionada.estacoes.filter((e) => {
      const matchFiltro = filtro === "todos" || e.tipo === filtro;
      const matchBusca = e.nome.toLowerCase().includes(busca.toLowerCase().trim());
      return matchFiltro && matchBusca;
    });
  }, [linhaSelecionada, filtro, busca]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
            Explore Benefícios e Dicas
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Selecione uma linha e descubra vantagens exclusivas e sugestões em cada estação.
          </p>
          <nav className="mt-8 flex justify-center gap-2 sm:gap-4 flex-wrap">
            {LINHAS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLinhaSelecionada(l)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform
                  ${linhaSelecionada.id === l.id
                    ? 'text-white shadow-lg scale-105'
                    : 'text-gray-700 bg-white hover:bg-gray-100 shadow-sm'}`}
                style={{ backgroundColor: linhaSelecionada.id === l.id ? l.cor : undefined }}
              >
                Linha {l.id}
              </button>
            ))}
          </nav>
        </header>

        <div className="space-y-8">
          <div 
            className="rounded-2xl p-6 text-white transition-colors duration-500"
            style={{ backgroundColor: linhaSelecionada.cor }}
          >
            <h2 className="text-3xl font-bold">{linhaSelecionada.nome}</h2>
            <p className="opacity-90 mt-1">
              {linhaSelecionada.estacoes.length} estações com benefícios e dicas para você.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar por nome da estação..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div className="flex gap-2">
                {(["todos", "beneficio", "dica"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFiltro(t)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition
                      ${filtro === t
                        ? 'bg-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'}`}
                  >
                    {t === "todos" ? "Todos" : t === "beneficio" ? "Benefícios" : "Dicas"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {estacoesFiltradas.map((e) => (
              <div
                key={e.id}
                className="group bg-white rounded-2xl border border-gray-200 p-6 space-y-3
                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{e.nome}</h3>
                  <span
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold
                      ${e.tipo === "beneficio" ? "bg-indigo-100 text-indigo-800" : "bg-teal-100 text-teal-800"}`}
                  >
                    {e.tipo === "beneficio" ? <FaTicketAlt /> : <FaLightbulb />}
                    {e.tipo === "beneficio" ? "Benefício" : "Dica"}
                  </span>
                </div>
                <p className="text-gray-600">{e.detalhe}</p>
              </div>
            ))}
            
            {estacoesFiltradas.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700">Nenhum resultado encontrado</h3>
                <p className="text-gray-500 mt-1">Tente ajustar sua busca ou filtros.</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-5 text-center text-gray-600">
            <strong>Aviso:</strong> os benefícios e dicas são atualizados mensalmente e podem variar. As informações da Linha 17-Ouro são baseadas no projeto e podem ser alteradas.
          </div>
        </div>
      </div>
    </main>
  );
}