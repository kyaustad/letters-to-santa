"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  InProgressOrder,
  InProgressOrderWithProducts,
  InProgressProduct,
  InProgressProductWithProduct,
  type Product,
  productList,
} from "@/features/products/utils/product-list";
import { type Order } from "@/db/schema";
import { toast } from "sonner";

export const CartContext = createContext<{
  cart: InProgressOrder | null;
  cartWithProducts: InProgressOrderWithProducts | null;
  addToCart: (product: InProgressProduct) => Promise<boolean>;
  removeFromCart: (product: InProgressProduct) => boolean;
  clearCart: (withToast?: boolean) => void;
  updateCart: (product: InProgressProduct) => boolean;
}>({
  cart: null,
  cartWithProducts: null,
  addToCart: () => Promise.resolve(false),
  removeFromCart: () => false,
  clearCart: (withToast?: boolean) => {},
  updateCart: () => false,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<InProgressOrder | null>(null);
  const [cartWithProducts, setCartWithProducts] =
    useState<InProgressOrderWithProducts | null>(null);

  const addToCart = async (product: InProgressProduct): Promise<boolean> => {
    try {
      if (cart) {
        const itemPrice = productList.find(
          (p) => p.id === product.productId,
        )?.price;
        if (itemPrice) {
          setCart({
            ...cart,
            products: [...cart.products, product],
            total: cart.total + itemPrice,
          });
          return true;
        }
        return false;
      } else {
        const itemPrice = productList.find(
          (p) => p.id === product.productId,
        )?.price;
        setCart({
          products: [product],
          total: itemPrice ?? 9.89,
        });
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const removeFromCart = (product: InProgressProduct) => {
    if (!cart)
      throw new Error("Cart not found when trying to remove from cart");
    if (!cartWithProducts)
      throw new Error(
        "Cart with products not found when trying to remove from cart",
      );
    const itemPrice = productList.find(
      (p) => p.id === product.productId,
    )?.price;
    if (!itemPrice)
      throw new Error("Item price not found when trying to remove from cart");
    setCart({
      ...cart,
      products: cart.products.filter((p) => p.id !== product.id),
      total: cart.total - itemPrice,
    });
    setCartWithProducts({
      ...cartWithProducts,
      products: cartWithProducts.products.filter((p) => p.id !== product.id),
      total: cartWithProducts.total - itemPrice,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartWithProducts", JSON.stringify(cartWithProducts));
    toast.success("Product Removed from Cart!");
    return true;
  };

  const clearCart = (withToast: boolean = true) => {
    setCart(null);
    setCartWithProducts(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartWithProducts");
    if (withToast) {
      toast.success("Cart Cleared!");
    }
  };

  const getExistingCart = () => {
    console.log("=== LOADING CART FROM LOCALSTORAGE ===");
    const existingCart = localStorage.getItem("cart");
    console.log("Raw localStorage cart:", existingCart);

    if (existingCart) {
      try {
        const parsedCart = JSON.parse(existingCart) as InProgressOrder;
        console.log("Parsed cart:", parsedCart);
        console.log("Cart products count:", parsedCart.products?.length || 0);

        setCart(parsedCart);

        const cartWithProductsData = {
          products: parsedCart.products.map((product) => ({
            ...product,
            product:
              productList.find((p) => p.id === product.productId) ?? null,
          })) as InProgressProductWithProduct[],
          total: parsedCart.total,
        };

        console.log("Cart with products:", cartWithProductsData);
        setCartWithProducts(cartWithProductsData);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("cart");
        localStorage.removeItem("cartWithProducts");
      }
    } else {
      console.log("No existing cart found in localStorage");
    }
  };

  const updateCart = (product: InProgressProduct): boolean => {
    try {
      if (!cart) return false;

      // Find the product being updated to calculate price difference
      const oldProduct = cart.products.find((p) => p.id === product.id);
      if (!oldProduct) return false;

      const oldPrice =
        productList.find((p) => p.id === oldProduct.productId)?.price ?? 0;
      const newPrice =
        productList.find((p) => p.id === product.productId)?.price ?? 0;
      const priceDifference = newPrice - oldPrice;

      setCart({
        ...cart,
        products: cart.products.map((p) => (p.id === product.id ? product : p)),
        total: cart.total + priceDifference,
      });

      toast.success("Cart Updated!");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    getExistingCart();
  }, []);

  // Use effect to update the cart in local storage whenever it changes
  // Also used to update the cart with products
  useEffect(() => {
    console.log("=== CART CONTEXT USEEFFECT ===");
    console.log("Cart changed:", cart);

    if (cart) {
      console.log("Updating localStorage and cartWithProducts");
      localStorage.setItem("cart", JSON.stringify(cart));

      const cartWithProductsData = {
        products: cart.products.map((product) => ({
          ...product,
          product: productList.find((p) => p.id === product.productId) ?? null,
        })) as InProgressProductWithProduct[],
        total: cart.total,
      };

      console.log("Setting cartWithProducts:", cartWithProductsData);
      setCartWithProducts(cartWithProductsData);
    } else {
      console.log("Cart is null, clearing localStorage and cartWithProducts");
      localStorage.removeItem("cart");
      setCartWithProducts(null);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartWithProducts,
        addToCart,
        removeFromCart,
        clearCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
