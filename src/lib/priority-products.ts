type ProductLike = {
  id: string;
  handle: string;
  name: string;
  description?: string;
  product_type: string;
  price: number;
  images?: string[];
  variants?: Array<{ price: number; inventory_qty?: number | null }>;
  inventory_qty?: number | null;
  has_variants?: boolean;
  status?: string;
  tags?: string[];
  metadata?: Record<string, unknown> | null;
};

const createPriorityProduct = (
  rank: number,
  handle: string,
  name: string,
  productType: string,
  image: string,
  description: string,
  price: number,
  metadata: Record<string, unknown> = {},
): ProductLike & { priority_rank: number } => ({
  id: `priority-${handle}`,
  handle,
  name,
  description,
  product_type: productType,
  price,
  images: [image],
  variants: [],
  inventory_qty: 100,
  has_variants: false,
  status: 'active',
  tags: ['featured', 'priority-product'],
  metadata,
  priority_rank: rank,
});

export const priorityProducts = [
  createPriorityProduct(
    1,
    'nafos',
    'NaFos',
    'Pupuk',
    '/products/nafos.jpeg',
    'Pupuk organik padat kaya unsur fosfat dan kalium untuk berbagai jenis tanaman.',
    45000,
    { keunggulan: 'Kaya fosfat & kalium', bentuk: 'Padat', penggunaan: 'Semua jenis tanaman' },
  ),
  createPriorityProduct(
    2,
    'kompos-kambing-trubus',
    'Kompos Kambing Trubus',
    'Kompos',
    '/products/kompos-kambing-trubus.jpeg',
    'Kompos organik berbahan dasar kotoran kambing untuk membantu kesuburan tanah dan pertumbuhan tanaman.',
    28000,
    { bahan: 'Kompos kambing', bentuk: 'Padat', penggunaan: 'Buah, sayur, dan tanaman hias' },
  ),
  createPriorityProduct(
    3,
    'pupuk-cair-trubus',
    'Pupuk Cair Trubus',
    'Pupuk',
    '/products/pupuk-cair-trubus.jpeg',
    'Pupuk cair Trubus untuk semua jenis tanaman dengan aplikasi yang praktis.',
    35000,
    { bentuk: 'Cair', volume: '1 liter', penggunaan: 'Semua jenis tanaman' },
  ),
  createPriorityProduct(
    4,
    'biotr-plus',
    'Bio TR+',
    'Pupuk',
    '/products/biotr-plus.jpeg',
    'Pupuk hayati butiran yang membantu meningkatkan kesuburan tanah dan hasil panen.',
    40000,
    { bentuk: 'Butiran', kategori: 'Pupuk hayati', manfaat: 'Meningkatkan kesuburan tanah' },
  ),
  createPriorityProduct(
    5,
    'fullgro-high-organic-amino-16',
    'Fullgro High Organic Amino-16',
    'Pupuk',
    '/products/fullgro-high-organic-amino-16.jpeg',
    'Pupuk organik lengkap dengan kandungan asam amino untuk mendukung nutrisi tanaman.',
    55000,
    { bentuk: 'Granul', kategori: 'Pupuk organik', manfaat: 'Nutrisi makro, mikro, dan asam amino' },
  ),
  createPriorityProduct(
    6,
    'kompos-sapi-trubus',
    'Kompos Sapi Trubus',
    'Kompos',
    '/products/kompos-sapi-trubus.jpeg',
    'Kompos organik dari bahan dasar kotoran sapi untuk memperbaiki struktur dan kesuburan tanah.',
    28000,
    { bahan: 'Kompos sapi', bentuk: 'Padat', penggunaan: 'Tanaman buah dan hortikultura' },
  ),
  createPriorityProduct(
    7,
    'trubus-super-prima-pembesar-buah',
    'Trubus Super Prima Pembesar Buah',
    'Stimulan',
    '/products/trubus-super-prima-pembesar-buah.jpeg',
    'Formula pembesar buah untuk membantu pembentukan dan perkembangan buah lebih optimal.',
    32000,
    { volume: '100 ml', kategori: 'Pembesar buah', manfaat: 'Mendukung pembesaran buah' },
  ),
  createPriorityProduct(
    8,
    'monodon-trubus-green',
    'Monodon Trubus Green',
    'Pupuk',
    '/products/monodon-trubus-green.jpeg',
    'Pupuk hayati majemuk cair ramah lingkungan untuk pertanian dan perkebunan.',
    48000,
    { bentuk: 'Cair', kategori: 'Pupuk hayati majemuk', manfaat: 'Ramah lingkungan' },
  ),
  createPriorityProduct(
    9,
    'media-tanam-trubus',
    'Media Tanam Trubus',
    'Media Tanam',
    '/products/media-tanam-trubus.jpeg',
    'Media tanam siap pakai untuk membantu akar tumbuh sehat dan menjaga porositas media.',
    25000,
    { kategori: 'Media tanam', penggunaan: 'Bibit, pot, dan polybag' },
  ),
  createPriorityProduct(
    10,
    'kompos-premium-trubus',
    'Kompos Premium Trubus',
    'Kompos',
    '/products/kompos-premium-trubus.jpeg',
    'Kompos premium Trubus untuk memperkaya unsur hara dan mendukung pertumbuhan tanaman secara alami.',
    30000,
    { kategori: 'Kompos premium', bentuk: 'Padat', penggunaan: 'Tanaman buah dan sayuran' },
  ),
];

const priorityIndex = new Map(priorityProducts.map((product, index) => [product.handle, index]));

const normalizeProducts = (products: ProductLike[]) =>
  products.map(product => {
    const fallback = priorityProducts.find(priorityProduct => priorityProduct.handle === product.handle);
    if (!fallback) return product;

    return {
      ...fallback,
      ...product,
      images: product.images?.length ? product.images : fallback.images,
      variants: product.variants?.length ? product.variants : fallback.variants,
      metadata: product.metadata && Object.keys(product.metadata).length > 0 ? product.metadata : fallback.metadata,
      tags: Array.from(new Set([...(fallback.tags || []), ...(product.tags || [])])),
    };
  });

export const withPriorityProducts = (products: ProductLike[]) => {
  const normalized = normalizeProducts(products);
  const existingHandles = new Set(normalized.map(product => product.handle));
  const missingPriorityProducts = priorityProducts.filter(product => !existingHandles.has(product.handle));

  return [...missingPriorityProducts, ...normalized].sort((a, b) => {
    const aPriority = priorityIndex.get(a.handle);
    const bPriority = priorityIndex.get(b.handle);

    if (aPriority != null && bPriority != null) return aPriority - bPriority;
    if (aPriority != null) return -1;
    if (bPriority != null) return 1;
    return 0;
  });
};

export const getPriorityProductByHandle = (handle?: string) =>
  priorityProducts.find(product => product.handle === handle) || null;

export const getRelatedPriorityProducts = (currentHandle?: string, productType?: string, limit = 4) =>
  priorityProducts
    .filter(product => product.handle !== currentHandle)
    .filter(product => !productType || product.product_type === productType)
    .slice(0, limit);
