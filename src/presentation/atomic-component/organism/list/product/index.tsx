import type { useInfiniteScroll } from 'data/hooks';
import type { Product } from 'domain/models';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { CardSkeleton, ProductCard } from 'presentation/atomic-component/atom/card';
import { type FC } from 'react';

interface ProductListProps {
  productQuery: ReturnType<typeof useInfiniteScroll<Product>>;
}

export const ProductList: FC<ProductListProps> = ({ productQuery }) => {
  return (
    <div className={'flex w-full flex-col'}>
      <FetchOnScroll skeleton={<CardSkeleton />} query={productQuery}>
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
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
