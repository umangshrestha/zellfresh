import { CartType } from "../Cart.types";
import { ApolloError } from "@apollo/client";

export interface CartListProps {
  data: CartType[];
  loading: boolean;
  error: ApolloError | undefined;
  onRemove: (id: string) => void;
  onChange: (id: string, quantity: number) => void;
}
