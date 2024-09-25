import { useQuery, gql } from "@apollo/client";
import ProductList from "../../components/Product/ProductList";

const VALIDATE_USER = gql`
  query {
    products {
      id
      name
      price
      description
      imageUrl
      quantity
      category
      badgeText
      maxQuantity
      rating
      tags
    }
  }
`;

export default function Products() {
  const { data, loading, error } = useQuery(VALIDATE_USER);
  return <ProductList data={data?.products} loading={loading} error={error} 
  onAddToCart={() => {}}
  />;
}
