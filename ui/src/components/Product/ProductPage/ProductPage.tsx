import ProductList from "../ProductList";
import { useQuery } from "@apollo/client";
import { VALIDATE_USER } from "./ProductPage.queries";

export const ProductPage = () => {
  const { data, loading, error } = useQuery(VALIDATE_USER);
  return (
    <ProductList
      data={data?.products}
      loading={loading}
      error={error}
      onAddToCart={() => {}}
    />
  );
};
