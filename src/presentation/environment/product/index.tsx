import { useInfiniteScroll, useModal, useSearch } from 'data/hooks';
import { Status } from 'domain/enums';
import { statusOptions, type Product } from 'domain/models';
import { apiPaths, QueryName } from 'main/config';
import { setFilter } from 'main/utils';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { Breadcrumbs, SearchInputBase } from 'presentation/atomic-component/molecule';
import { RegisterProductModal } from 'presentation/atomic-component/molecule/modal';
import { ProductList } from 'presentation/atomic-component/organism';
import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

export const ProductContent: FC = () => {
  const { status } = useAppSelector((state) => state.filter.product);
  const modal = useModal();
  const { id = '' } = useParams<{ id: string }>();
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  useEffect(() => {
    setFilter('product', {
      search
    });
  }, [search]);

  const productQuery = useInfiniteScroll<Product>({
    filters: {
      status: status,
      search: search,
      companyId: id
    },
    limit: 20,
    queryName: QueryName.product,
    route: apiPaths.product
  });

  return (
    <div className={'w-full flex-col mx-auto gap-6 dark:bg-gray-800  rounded-md flex '}>
      <Breadcrumbs replaceItems={{ [id]: 'Detalhes de empresa' }} />
      <div
        className={
          'w-full flex flex-col-reverse items-end gap-4 tablet:flex-row tablet:justify-between'
        }
      >
        <h2 className={'text-primary text-2xl font-medium'}>Produtos</h2>
        <RegisterProductModal
          modal={{
            ...modal,
            closeModal() {
              modal.closeModal();
            }
          }}
        />
      </div>
      <div className={'flex items-end flex-col-reverse gap-4 tablet:flex-row justify-between'}>
        <p className={'text-gray-500 dark:text-gray-400'}>
          Exibindo {productQuery.data?.length} de um total de{' '}
          {productQuery.pagination?.totalElements}{' '}
          {productQuery.pagination?.totalElements && productQuery.pagination?.totalElements > 1
            ? 'itens'
            : 'item'}
        </p>

        <div className={'flex items-end gap-4 flex-col-reverse tablet:flex-row'}>
          <SearchInputBase
            value={searchDebounce}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
              setSearchDebounce(event.target.value)
            }
            placeholder={'Buscar produtos'}
          />
          <div className={'flex min-w-[200px] tablet:min-w-[256px]'}>
            <Select
              id={''}
              options={statusOptions}
              value={statusOptions.find((option) => option.value === (status ?? '')) ?? null}
              onChange={(event) => {
                const newValue = event as SelectValues | SelectValues[] | null;
                const selectedValue = Array.isArray(newValue)
                  ? newValue[0]?.value
                  : newValue?.value;

                setFilter('product', {
                  status: selectedValue ? (selectedValue as Status) : null
                });
              }}
              placeholder={'Filtrar por status'}
            />
          </div>
        </div>
      </div>
      <ProductList productQuery={productQuery} />
    </div>
  );
};
