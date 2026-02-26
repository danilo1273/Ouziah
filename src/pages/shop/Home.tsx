import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CarouselItem {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
}

export default function ShopHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carousels, setCarousels] = useState<CarouselItem[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (carousels.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carousels.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [carousels.length]);

  async function fetchData() {
    setLoading(true);
    await Promise.all([
      fetchCarousels(),
      fetchProducts()
    ]);
    setLoading(false);
  }

  async function fetchCarousels() {
    try {
      const { data, error } = await supabase
        .from('carousels')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCarousels(data || []);
    } catch (error) {
      console.error('Erro ao carregar carrosséis:', error);
    }
  }

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carousels.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carousels.length) % carousels.length);

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden group bg-gray-900">
        {carousels.length > 0 ? (
          carousels.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={slide.image_url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase italic drop-shadow-2xl">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl text-gray-200 mb-8 font-medium drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.cta_link}
                  className="bg-white text-[#2A1A14] px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors rounded-sm inline-block"
                >
                  {slide.cta_text}
                </a>
              </div>
            </div>
          ))
        ) : !loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <p className="font-black italic text-2xl uppercase tracking-[0.2em]">Ouziah Sports</p>
          </div>
        )}

        {/* Carousel Controls */}
        {carousels.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
              {carousels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-12 h-1.5 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Masculino', 'Feminino', 'Acessórios', 'Equipamentos'].map((cat, i) => (
            <div key={i} className="relative h-48 md:h-64 group cursor-pointer overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?q=80&w=500&auto=format&fit=crop`}
                alt={cat}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider">{cat}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-[#2A1A14] uppercase tracking-tight">
            Destaques Ouziah
          </h2>
          <a href="#" className="text-sm font-bold text-gray-600 hover:text-[#2A1A14] uppercase border-b-2 border-transparent hover:border-[#2A1A14] transition-all">
            Ver todos
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#2A1A14]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-10 bg-[#2A1A14] text-white text-[10px] font-bold px-2 py-1 uppercase rounded-sm">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <button className="bg-white text-[#2A1A14] w-full py-2 font-bold uppercase text-sm rounded-sm hover:bg-gray-100">
                      Adicionar
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-yellow-500 text-xs mb-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="ml-1 text-gray-500 font-medium">
                      {parseFloat(product.rating || '0').toFixed(1)} ({product.reviews_count || 0})
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#2A1A14]">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#2A1A14]">
                      R$ {parseFloat(product.price || '0').toFixed(2).replace('.', ',')}
                    </span>
                    {product.old_price && (
                      <span className="text-sm text-gray-400 line-through">
                        R$ {parseFloat(product.old_price).toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    ou 3x de R$ {(parseFloat(product.price || '0') / 3).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Banner */}
      <div className="bg-[#2A1A14] text-white py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            Desperte o Leão em Você
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            A Ouziah não é apenas uma marca de roupas, é um estilo de vida para quem busca superar seus próprios limites todos os dias.
          </p>
          <button className="border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A1A14] transition-colors rounded-sm">
            Conheça a Marca
          </button>
        </div>
      </div>
    </div>
  );
}
