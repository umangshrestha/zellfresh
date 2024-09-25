import { useQuery, gql } from "@apollo/client";
import ProductItem from "../../components/Product";
import ProductSkeleton from "../../components/Product/ProductSkeleton";

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
  if (error) return <p>Error :</p>;

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {loading
        ? Array(8)
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        : data.products.map((product: any) => (
            <ProductItem key={product.id} {...product} />
          ))}
    </div>
  );
}
