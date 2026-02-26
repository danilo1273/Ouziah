import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Image as ImageIcon, Images, Loader2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../context/NotificationContext';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  status: string;
  display_order: number;
  is_active: boolean;
}

export default function AdminCarousels() {
  const [banners, setBanners] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { showNotification } = useNotification();

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('COMPRAR AGORA');
  const [ctaLink, setCtaLink] = useState('#');

  useEffect(() => {
    fetchBanners();
  }, []);

  async function fetchBanners() {
    try {
      const { data, error } = await supabase
        .from('carousels')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Erro ao buscar banners:', error);
      showNotification('error', 'Erro ao carregar banners.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateBanner(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);

    try {
      const { error } = await supabase
        .from('carousels')
        .insert([{
          title,
          subtitle,
          image_url: imageUrl,
          cta_text: ctaText,
          cta_link: ctaLink,
          display_order: banners.length + 1
        }]);

      if (error) throw error;

      showNotification('success', 'Banner criado com sucesso!');
      setIsModalOpen(false);
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error('Erro ao criar banner:', error);
      showNotification('error', 'Erro ao criar o banner.');
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDeleteBanner(id: string) {
    if (!confirm('Deseja realmente excluir este banner?')) return;

    try {
      const { error } = await supabase
        .from('carousels')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showNotification('success', 'Banner excluído com sucesso!');
      fetchBanners();
    } catch (error) {
      console.error('Erro ao excluir banner:', error);
      showNotification('error', 'Erro ao excluir o banner.');
    }
  }

  function resetForm() {
    setTitle('');
    setSubtitle('');
    setImageUrl('');
    setCtaText('COMPRAR AGORA');
    setCtaLink('#');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#2A1A14] uppercase tracking-tight italic">Gerenciar Carrosséis</h2>
          <p className="text-sm text-gray-500 mt-1 uppercase font-bold tracking-widest text-[10px]">Configure os banners da página inicial</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-xl text-xs font-black text-white bg-[#2A1A14] hover:bg-black transition-all uppercase tracking-widest"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Novo Banner
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#2A1A14]" />
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-sm font-black text-[#2A1A14] uppercase tracking-widest">
              Banners Ativos
            </h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#2A1A14] text-white">
              {banners.length} banners
            </span>
          </div>

          <ul className="divide-y divide-gray-100">
            {banners.map((banner) => (
              <li key={banner.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="text-gray-300 cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  <div className="h-20 w-36 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-100 shadow-inner group-hover:border-[#2A1A14]/20 transition-all">
                    <img src={banner.image_url} alt={banner.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-[#2A1A14] uppercase tracking-tight italic">{banner.title}</p>
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${banner.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {banner.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 truncate font-medium">{banner.subtitle}</p>
                    <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      CTA: {banner.cta_text} &middot; Link: {banner.cta_link}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                      title="Excluir"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {banners.length === 0 && (
            <div className="text-center py-20 px-6">
              <Images className="mx-auto h-12 w-12 text-gray-200 mb-4" />
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Nenhum banner cadastrado</h3>
              <p className="mt-2 text-xs text-gray-400">Adicione um banner para dar vida à sua página inicial.</p>
            </div>
          )}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-xl font-black text-[#2A1A14] uppercase tracking-tight italic">Novo Banner</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-[#2A1A14] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateBanner} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Título do Banner</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A1A14]/20 font-bold text-[#2A1A14] placeholder:text-gray-300"
                    placeholder="Ex: NOVA COLEÇÃO PERFORMANCE"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subtítulo</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A1A14]/20 font-bold text-gray-600 placeholder:text-gray-300"
                    placeholder="Ex: Supere seus limites todos os dias"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">URL da Imagem</label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A1A14]/20 font-mono text-xs text-blue-600 font-bold placeholder:text-gray-300"
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Texto do Botão</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A1A14]/20 font-bold text-[#2A1A14]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Link do Botão</label>
                  <input
                    type="text"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2A1A14]/20 font-bold text-[#2A1A14]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all font-sans"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-3 py-4 bg-[#2A1A14] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#2A1A14]/20 flex items-center justify-center gap-2"
                >
                  {formLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Criar Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
