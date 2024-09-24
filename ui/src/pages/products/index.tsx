import { useQuery, gql } from "@apollo/client";
import ProductItem from "../../components/ProductItem";

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
      tags
    }
  }
`;

export default function Products() {

    const { data, loading, error } = useQuery(VALIDATE_USER);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div className="grid grid-cols-4 gap-4">
        {data.products.map((product: any) => (
            <ProductItem key={product.id} {...product} />
        ))}
        </div>
    );
}
