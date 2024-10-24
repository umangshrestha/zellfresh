import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilterSchema } from './ProductFilter.schema';
import { ProductFilterType } from './ProductFilter.types';

export const useProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ProductFilterType>({});

  const updateParams = (newParams: Object) => {
    const parsedParams = ProductFilterSchema.safeParse({
      ...params,
      ...newParams,
    });
    if (!parsedParams.success || parsedParams.data === params) return;
    setParams(parsedParams.data);
  };

  useEffect(() => {
    const initialParams = Object.fromEntries(searchParams);
    updateParams(initialParams);
  }, []);

  useEffect(() => {
    const val = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      val.append(key, value.toString());
    });
    if (val.toString() === searchParams.toString()) return;
    setSearchParams(val);
  }, [params, setSearchParams, searchParams]);

  return {
    params,
    updateParams,
  };
};
