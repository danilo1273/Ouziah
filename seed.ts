import { supabase } from './src/lib/supabase';

const MOCK_PRODUCTS = [
    {
        name: 'Camiseta Dry Fit Ouziah Pro',
        price: 89.90,
        old_price: 119.90,
        category: 'Masculino',
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
        rating: 4.8,
        reviews_count: 124,
        badge: 'LANÇAMENTO'
    },
    {
        name: 'Shorts de Compressão Elite',
        price: 129.90,
        category: 'Masculino',
        image_url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop',
        rating: 4.9,
        reviews_count: 89,
        badge: 'MAIS VENDIDO'
    },
    {
        name: 'Top Esportivo Alta Sustentação',
        price: 79.90,
        old_price: 99.90,
        category: 'Feminino',
        image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop',
        rating: 4.7,
        reviews_count: 210,
        badge: '-20%'
    },
    {
        name: 'Legging Seamless Ouziah',
        price: 149.90,
        category: 'Feminino',
        image_url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop',
        rating: 4.6,
        reviews_count: 56,
    }
];

async function seed() {
    console.log('Iniciando povoamento do banco...');

    for (const product of MOCK_PRODUCTS) {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();

        if (error) {
            console.error('Erro ao inserir produto:', error);
        } else {
            const insertedProduct = data[0];
            console.log(`Produto inserido: ${insertedProduct.name}`);

            // Inserir item no estoque para este produto
            const { error: invError } = await supabase
                .from('inventory')
                .insert([{
                    product_id: insertedProduct.id,
                    sku: `SKU-${insertedProduct.name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
                    stock_quantity: Math.floor(Math.random() * 100),
                    status: 'Em Estoque'
                }]);

            if (invError) console.error('Erro ao inserir estoque:', invError);
        }
    }

    console.log('Povoamento concluído!');
}

seed();
