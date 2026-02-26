import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Images,
  PackageSearch,
  ShoppingCart,
  DollarSign,
  ShoppingBag,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';
import logo from '../assets/logo.jpg';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Carrosséis', href: '/admin/carousels', icon: Images },
  { name: 'Estoque', href: '/admin/inventory', icon: PackageSearch },
  { name: 'Pedidos', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Financeiro', href: '/admin/finance', icon: DollarSign },
  { name: 'Compras', href: '/admin/purchases', icon: ShoppingBag },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'AD';

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2A1A14] text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ouziah Logo" className="h-8 w-8 object-contain brightness-0 invert" />
            <span className="font-serif text-xl font-bold tracking-tight text-white">OUZIAH ERP</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <Link
            to="/admin/settings"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Settings className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
            Configurações
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full group flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-md text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#2A1A14] md:bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center md:hidden">
            <button className="text-white/70 hover:text-white mr-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src={logo} alt="Ouziah Logo" className="h-8 w-8 object-contain" />
            <span className="ml-2 font-serif text-xl font-bold tracking-tight text-white">OUZIAH ERP</span>
          </div>

          <div className="hidden md:flex flex-1">
            <h1 className="text-xl font-semibold text-gray-800">
              {navigation.find(n => location.pathname.startsWith(n.href))?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              <Bell className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-3 border-l pl-4">
              <div className="w-8 h-8 rounded-full bg-[#2A1A14] text-white flex items-center justify-center text-sm font-bold">
                {userInitials}
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-700">{user?.email?.split('@')[0]}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
