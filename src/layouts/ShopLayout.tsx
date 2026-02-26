import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';

export default function ShopLayout() {
  const { user, profile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Top Bar */}
      <div className="bg-[#2A1A14] text-white text-xs py-1 px-4 text-center">
        Frete grátis para todo o Brasil nas compras acima de R$ 299
      </div>

      {/* Header */}
      <header className="bg-[#1b110b] border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-28">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              <Menu className="h-7 w-7" />
            </button>

            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img src={logo} alt="Ouziah Logo" className="h-14 w-14 md:h-20 md:w-20 object-contain" />
              <span className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">OUZIAH</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  className="w-full bg-white/10 border-transparent focus:bg-white/20 focus:ring-1 focus:ring-white/30 rounded-full py-2.5 pl-4 pr-10 text-sm text-white placeholder:text-white/40 transition-all outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              {profile?.role === 'admin' && (
                <Link to="/admin" className="hidden lg:flex flex-col items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10">
                  <span className="text-[10px] uppercase font-black tracking-widest text-white italic">Painel Gerente</span>
                </Link>
              )}

              {user ? (
                <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Logado como</span>
                    <span className="text-xs text-white font-bold truncate max-w-[120px]">{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={() => useAuth().signOut()}
                    className="flex flex-col items-center text-white/50 hover:text-white transition-colors"
                  >
                    <User className="h-6 w-6" />
                    <span className="text-[10px] uppercase font-semibold mt-1">Sair</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
                  <User className="h-6 w-6" />
                  <span className="text-[10px] uppercase font-semibold mt-1">Entrar</span>
                </Link>
              )}
              <button className="flex flex-col items-center text-white/70 hover:text-white transition-colors relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  0
                </span>
                <span className="text-[10px] uppercase font-semibold mt-1 hidden md:block">Carrinho</span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full bg-white/5 border-transparent rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder:text-white/30"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="hidden md:block border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex justify-center space-x-8 py-3 text-sm font-medium text-white/60 uppercase tracking-wider">
              <li><Link to="#" className="hover:text-white transition-colors">Lançamentos</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Masculino</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Feminino</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Acessórios</Link></li>
              <li><Link to="#" className="text-red-500 hover:text-red-400 font-bold transition-colors">Ofertas</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <div
        className={`fixed inset-y-0 left-0 z-[101] w-[280px] bg-[#1b110b] shadow-2xl transition-transform duration-300 transform md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Ouziah Logo" className="h-8 w-8 object-contain" />
              <span className="font-serif text-xl font-bold text-white tracking-tight uppercase italic">OUZIAH</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 mb-8 text-xs font-black text-white/30 uppercase tracking-[0.2em]">Categorias</div>
            <nav className="px-3 space-y-1">
              {['Lançamentos', 'Masculino', 'Feminino', 'Acessórios', 'Ofertas'].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className={`flex items-center justify-between px-3 py-4 text-sm font-bold rounded-xl transition-all ${item === 'Ofertas' ? 'text-red-500' : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <ChevronRight className="h-4 w-4 opacity-30" />
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/5 px-6">
              {user ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Logado como</p>
                    <p className="text-sm text-white font-bold truncate">{user.email}</p>
                  </div>
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center justify-center w-full py-4 bg-white text-[#1b110b] rounded-xl font-black uppercase text-xs tracking-widest italic"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Painel Gerente
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      useAuth().signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center py-4 bg-white/5 text-white/70 hover:text-white rounded-xl font-bold uppercase text-xs tracking-widest border border-white/10"
                  >
                    Sair da Conta
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full py-4 bg-white text-[#1b110b] rounded-xl font-black uppercase text-xs tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar / Cadastrar
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#2A1A14] text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Ouziah Logo" className="h-8 w-8 object-contain" />
                <span className="font-serif text-xl font-bold tracking-tight text-white">OUZIAH</span>
              </div>
              <p className="text-gray-400 text-sm">
                A marca de roupas esportivas que te acompanha em todos os desafios.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase text-gray-200">Institucional</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre a Ouziah</a></li>
                <li><a href="#" className="hover:text-white">Trabalhe Conosco</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase text-gray-200">Ajuda</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Atendimento</a></li>
                <li><a href="#" className="hover:text-white">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-white">Prazos de Entrega</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase text-gray-200">Siga-nos</h3>
              <div className="flex space-x-4">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2A1A14] cursor-pointer transition-colors">IN</div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2A1A14] cursor-pointer transition-colors">FB</div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2A1A14] cursor-pointer transition-colors">YT</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ouziah Sports. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
