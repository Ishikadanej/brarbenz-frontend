import useCartStore from "../../Zustand/cartStore";
import { addToCartApi, getCart } from "../shop/api/api";

export async function mergeGuestCart(user, token) {
  const { cart, resetCart } = useCartStore.getState();

  if (!cart.length) {
    await getCart(user.id, token);
    return;
  }

  for (const item of cart) {
    try {
      const payload = {
        productId: item.id,
        productName: item.title,
        productImage: item.image || null,
        size: item.size || "m",
        quantity: item.quantity,
        price: item.price,
      };

      await addToCartApi(payload, token);
    } catch (err) {
      console.error("Failed to merge item:", err);
    }
  }

  // await getCart(user.id, token);
  // resetCart();

  console.log("Guest cart merged & removed successfully!");
}
