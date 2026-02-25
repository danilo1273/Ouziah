import { useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';

const INITIAL_BANNERS = [
  {
    id: 1,
    title: 'NOVA COLEÇÃO PERFORMANCE',
    subtitle: 'Supere seus limites com a nova linha Ouziah',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    link: '/colecao-performance',
    status: 'Ativo',
    order: 1,
  },
  {
    id: 2,
    title: 'TREINO PESADO',
    subtitle: 'Roupas que aguentam o seu ritmo',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    link: '/treino-pesado',
    status: 'Ativo',
    order: 2,
  },
  {
    id: 3,
    title: 'OFERTAS DE INVERNO',
    subtitle: 'Até 50% OFF em agasalhos',
    image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=2070&auto=format&fit=crop',
    link: '/ofertas',
    status: 'Inativo',
    order: 3,
  },
];

export default function AdminCarousels() {
  const [banners, setBanners] = useState(INITIAL_BANNERS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Carrosséis</h2>
          <p className="text-sm text-gray-500 mt-1">Configure os banners da página inicial do e-commerce.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A1A14] hover:bg-[#3A2A24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A1A14]">
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Novo Banner
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Banners Principais (Desktop & Mobile)
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {banners.length} banners
          </span>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {banners.map((banner) => (
            <li key={banner.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4">
                {/* Drag Handle */}
                <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                  <GripVertical className="h-5 w-5" />
                </button>

                {/* Image Preview */}
                <div className="h-16 w-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-200 relative">
                  {banner.image ? (
                    <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#2A1A14] truncate">{banner.title}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        banner.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {banner.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 truncate">
                        {banner.subtitle}
                      </p>
                      <p className="mt-1 sm:mt-0 sm:ml-4 flex items-center text-sm text-gray-500 truncate">
                        <span className="hidden sm:inline mx-2">&middot;</span>
                        Link: {banner.link}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Editar">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Excluir">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {banners.length === 0 && (
          <div className="text-center py-12">
            <Images className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum banner</h3>
            <p className="mt-1 text-sm text-gray-500">Comece criando um novo banner para a página inicial.</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2A1A14] hover:bg-[#3A2A24]">
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Novo Banner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
