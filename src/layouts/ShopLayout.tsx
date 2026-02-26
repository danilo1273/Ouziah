import { Outlet, Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function ShopLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Top Bar */}
      <div className="bg-[#2A1A14] text-white text-xs py-1 px-4 text-center">
        Frete grátis para todo o Brasil nas compras acima de R$ 299
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Mobile Menu */}
            <button className="md:hidden p-2 text-gray-600">
              <Menu className="h-6 w-6" />
            </button>

            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img src={logo} alt="Ouziah Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2A1A14]">OUZIAH</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-[#2A1A14] focus:ring-2 focus:ring-[#2A1A14] rounded-full py-2.5 pl-4 pr-10 text-sm transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2A1A14]">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <Link to="/admin" className="hidden md:flex flex-col items-center text-gray-600 hover:text-[#2A1A14] transition-colors">
                <User className="h-6 w-6" />
                <span className="text-[10px] uppercase font-semibold mt-1">Minha Conta</span>
              </Link>
              <button className="flex flex-col items-center text-gray-600 hover:text-[#2A1A14] transition-colors relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-2 bg-[#2A1A14] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
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
                className="w-full bg-gray-100 border-transparent rounded-full py-2 pl-4 pr-10 text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex justify-center space-x-8 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider">
              <li><Link to="#" className="hover:text-[#2A1A14]">Lançamentos</Link></li>
              <li><Link to="#" className="hover:text-[#2A1A14]">Masculino</Link></li>
              <li><Link to="#" className="hover:text-[#2A1A14]">Feminino</Link></li>
              <li><Link to="#" className="hover:text-[#2A1A14]">Acessórios</Link></li>
              <li><Link to="#" className="text-red-600 hover:text-red-700">Ofertas</Link></li>
            </ul>
          </div>
        </nav>
      </header>

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
                <img src={logo} alt="Ouziah Logo" className="h-8 w-8 object-contain brightness-0 invert" />
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
