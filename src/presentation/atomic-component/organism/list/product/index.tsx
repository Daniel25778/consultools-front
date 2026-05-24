import { useInfiniteScroll } from 'data/hooks';
import type { Product } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { ProductCard } from 'presentation/atomic-component/atom/card';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { useAppSelector } from 'store/index';

interface ProductListProps {
  setTotalElements: Dispatch<SetStateAction<number>>;
}

export const ProductList: FC<ProductListProps> = ({ setTotalElements }) => {
  const { status, search } = useAppSelector((state) => state.filter.product);
  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  const productQuery = useInfiniteScroll<Product>({
    filters: {
      status: status ? [status] : undefined,
      search: search ? [search] : undefined,
      companyId: companyId ? [companyId] : undefined
    },
    limit: 10,
    queryName: QueryName.product,
    route: apiPaths.product
  });

  useEffect(() => {
    setTotalElements(productQuery.data?.length ?? 0);
  }, [productQuery.data, setTotalElements]);

  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll query={productQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))' }}
          className={'grid gap-[18px]'}
        >
          {productQuery.data?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </FetchOnScroll>
    </div>
  );
};
