/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESSA LINHA É A CHAVE: Habilita a exportação estática
  output: 'export',
  
  // Opções de linting que você já tinha:
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // Se seu projeto usa um sub-caminho (Project Page), adicione:
  // basePath: '/MOTIVA_TEST_DELET', // Substitua pelo nome do seu repositório
};

export default nextConfig;