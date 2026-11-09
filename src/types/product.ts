export interface ProductItem {
    id?: string;
    sku: string;
    title: string;
    slug: string;
    material: string;
    stage: string;
    description: string;
    price: number;
    inventory?: {
      stockOnHand: number;
      stockReserved: number;
    } | null;
  }