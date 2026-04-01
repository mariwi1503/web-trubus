const OFFICIAL_TRUBUS_CONSULTATION_URL = 'https://trubus.id/konsultasi/';

type ProductLike = {
  name?: string;
  metadata?: Record<string, unknown> | null;
};

type ProductCtaLink = {
  key: 'tokopedia' | 'shopee' | 'halo-trubus';
  label: string;
  href: string;
  kind: 'marketplace' | 'consultation';
};

const metadataAliases: Record<ProductCtaLink['key'], string[]> = {
  tokopedia: ['tokopedia_url', 'tokopedia', 'marketplace_tokopedia', 'link_tokopedia'],
  shopee: ['shopee_url', 'shopee', 'marketplace_shopee', 'link_shopee'],
  'halo-trubus': ['halo_trubus_url', 'halo_trubus', 'halotrubus_url', 'link_halo_trubus'],
};

const isSafeExternalUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
};

const getMetadataUrl = (metadata: ProductLike['metadata'], aliases: string[]) => {
  if (!metadata || typeof metadata !== 'object') return null;

  for (const alias of aliases) {
    const value = metadata[alias];
    if (isSafeExternalUrl(value)) return value;
  }

  return null;
};

const encodeProductQuery = (productName: string) => encodeURIComponent(productName.trim());

export const getProductCtaLinks = (product: ProductLike): ProductCtaLink[] => {
  const productName = product.name?.trim() || 'Produk Trubus';

  const tokopediaUrl =
    getMetadataUrl(product.metadata, metadataAliases.tokopedia) ||
    `https://www.tokopedia.com/search?st=product&q=${encodeProductQuery(productName)}`;

  const shopeeUrl =
    getMetadataUrl(product.metadata, metadataAliases.shopee) ||
    `https://shopee.co.id/search?keyword=${encodeProductQuery(productName)}`;

  const haloTrubusUrl =
    getMetadataUrl(product.metadata, metadataAliases['halo-trubus']) ||
    OFFICIAL_TRUBUS_CONSULTATION_URL;

  return [
    {
      key: 'tokopedia',
      label: 'Tokopedia',
      href: tokopediaUrl,
      kind: 'marketplace',
    },
    {
      key: 'shopee',
      label: 'Shopee',
      href: shopeeUrl,
      kind: 'marketplace',
    },
    {
      key: 'halo-trubus',
      label: haloTrubusUrl === OFFICIAL_TRUBUS_CONSULTATION_URL ? 'Halo Trubus' : 'Buka Halo Trubus',
      href: haloTrubusUrl,
      kind: 'consultation',
    },
  ];
};

