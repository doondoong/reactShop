import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
  return { productsQuery, addProduct };
}
