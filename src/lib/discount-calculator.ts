import { InProgressProductWithProduct } from "@/features/products/utils/product-list";

export interface DiscountBreakdown {
  originalTotal: number;
  discountedTotal: number;
  totalSavings: number;
  discountPercentage: number;
  items: Array<{
    product: InProgressProductWithProduct;
    originalPrice: number;
    discountedPrice: number;
    savings: number;
    discountType: "none" | "percentage" | "addon";
  }>;
  explanation: string;
}

const BASE_PRICE = 9.89;
const ADDON_PRICE = 7.89;

export function calculateDiscounts(
  cartItems: InProgressProductWithProduct[],
): DiscountBreakdown {
  const itemCount = cartItems.length;
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price,
    0,
  );

  if (itemCount === 0) {
    return {
      originalTotal: 0,
      discountedTotal: 0,
      totalSavings: 0,
      discountPercentage: 0,
      items: [],
      explanation: "No items in cart",
    };
  }

  if (itemCount === 1) {
    // Single item - no discount
    return {
      originalTotal,
      discountedTotal: originalTotal,
      totalSavings: 0,
      discountPercentage: 0,
      items: cartItems.map((item) => ({
        product: item,
        originalPrice: item.product.price,
        discountedPrice: item.product.price,
        savings: 0,
        discountType: "none" as const,
      })),
      explanation: "Single item - no discount applied",
    };
  }

  if (itemCount === 2) {
    // 2 items - 10% discount on both
    const discountRate = 0.1;
    const discountedTotal = originalTotal * (1 - discountRate);
    const totalSavings = originalTotal - discountedTotal;

    return {
      originalTotal,
      discountedTotal,
      totalSavings,
      discountPercentage: 10,
      items: cartItems.map((item) => ({
        product: item,
        originalPrice: item.product.price,
        discountedPrice: item.product.price * (1 - discountRate),
        savings: item.product.price * discountRate,
        discountType: "percentage" as const,
      })),
      explanation: "2 items - 10% discount applied to all items",
    };
  }

  if (itemCount === 3) {
    // 3 items - 15% discount on all
    const discountRate = 0.15;
    const discountedTotal = originalTotal * (1 - discountRate);
    const totalSavings = originalTotal - discountedTotal;

    return {
      originalTotal,
      discountedTotal,
      totalSavings,
      discountPercentage: 15,
      items: cartItems.map((item) => ({
        product: item,
        originalPrice: item.product.price,
        discountedPrice: item.product.price * (1 - discountRate),
        savings: item.product.price * discountRate,
        discountType: "percentage" as const,
      })),
      explanation: "3 items - 15% discount applied to all items",
    };
  }

  // 4+ items - first 3 get 15% discount, rest get addon price
  const firstThreeItems = cartItems.slice(0, 3);
  const additionalItems = cartItems.slice(3);

  const firstThreeOriginal = firstThreeItems.reduce(
    (sum, item) => sum + item.product.price,
    0,
  );
  const firstThreeDiscounted = firstThreeOriginal * 0.85; // 15% discount
  const additionalItemsTotal = additionalItems.length * ADDON_PRICE;

  const discountedTotal = firstThreeDiscounted + additionalItemsTotal;
  const totalSavings = originalTotal - discountedTotal;

  const items = [
    ...firstThreeItems.map((item) => ({
      product: item,
      originalPrice: item.product.price,
      discountedPrice: item.product.price * 0.85,
      savings: item.product.price * 0.15,
      discountType: "percentage" as const,
    })),
    ...additionalItems.map((item) => ({
      product: item,
      originalPrice: item.product.price,
      discountedPrice: ADDON_PRICE,
      savings: item.product.price - ADDON_PRICE,
      discountType: "addon" as const,
    })),
  ];

  return {
    originalTotal,
    discountedTotal,
    totalSavings,
    discountPercentage: 15,
    items,
    explanation: `4+ items - First 3 items get 15% discount, additional items at addon price ($${ADDON_PRICE})`,
  };
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
