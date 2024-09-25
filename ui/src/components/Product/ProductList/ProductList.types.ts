import { ProductItemType } from "../ProductItem";
import { ApolloError } from "@apollo/client";

export interface ProductListProps {
  data: ProductItemType[];
  loading: boolean;
  error: ApolloError | undefined;
  onAddToCart: (id: string) => void;
}
