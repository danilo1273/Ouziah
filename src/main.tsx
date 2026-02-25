import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Iniciando renderização do React...');
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Elemento #root não encontrado');

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('Renderização chamada com sucesso.');
} catch (error) {
  console.error('Erro fatal na renderização:', error);
}
