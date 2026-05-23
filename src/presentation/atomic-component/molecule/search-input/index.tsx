import { Business, Description, Person, Search } from '@mui/icons-material';
import { Box, CircularProgress, InputBase, Paper, Typography } from '@mui/material';
import { useInfiniteScroll, useSearch } from 'data/hooks';
import { QueryName } from 'main/config';
import { FetchOnScroll } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style/palette';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchData {
  id: string;
  name?: string;
  title?: string;
  email?: string;
  cnpj?: string;
  description?: string;
}

interface SearchInputProps {
  placeholder?: string;
  path: string;
  route: string;
  queryName: QueryName;
}

export const SearchInput: FC<SearchInputProps> = ({
  placeholder = 'Buscar...',
  path,
  route,
  queryName
}) => {
  const navigate = useNavigate();
  const { search, searchDebounce, setSearchDebounce } = useSearch();

  const query = useInfiniteScroll<SearchData>({
    filters: { search },
    limit: 10,
    queryName,
    route
  });

  const getIcon = () => {
    switch (queryName) {
      case QueryName.user:
        return <Person sx={{ color: colors.gray[400] }} />;
      case QueryName.company:
        return <Business sx={{ color: colors.gray[400] }} />;
      default:
        return <Description sx={{ color: colors.gray[400] }} />;
    }
  };

  return (
    <div className={'w-full min-w-[300px] tablet:min-w-[400px] max-w-[500px] relative'}>
      <Paper
        elevation={0}
        className={'flex items-center gap-2 rounded-full  px-6 py-1'}
        sx={{
          border: `1.5px solid ${colors.gray[100]}`,
          backgroundColor: colors.white,
          borderRadius: '9999px',
          boxShadow: 'none'
        }}
      >
        <InputBase
          value={searchDebounce}
          onChange={(event) => setSearchDebounce(event.target.value)}
          placeholder={placeholder}
          fullWidth
          inputProps={{ 'aria-label': 'Pesquisar itens' }}
          sx={{
            fontSize: '1rem',
            color: colors.gray[900],
            '& input::placeholder': {
              color: colors.gray[500],
              opacity: 1
            }
          }}
        />
        {query.isFetching && !query.isFetchingNextPage ? (
          <CircularProgress size={20} color={'inherit'} />
        ) : (
          <Search sx={{ color: colors.gray[800], fontSize: 24 }} />
        )}
      </Paper>

      {search.length > 0 && (
        <Paper
          className={'mt-2 absolute rounded w-fit min-w-full z-50 left-0'}
          sx={{
            boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.1)',
            maxHeight: '220px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {query.data && query.data?.length > 0 ? (
            <FetchOnScroll query={query}>
              <div className={'flex flex-col'}>
                {query.data?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`${path}/${item.id}`);
                      setSearchDebounce('');
                    }}
                    className={
                      'flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-none'
                    }
                  >
                    <div className={'flex-shrink-0'}>{getIcon()}</div>
                    <div className={'flex flex-col overflow-hidden'}>
                      <span className={'font-medium text-sm text-gray-900 truncate'}>
                        {item.name || 'Sem nome'}
                      </span>
                      <span className={'text-xs text-gray-500 truncate'}>
                        {item.email || item.cnpj || item.description || ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {query.isFetchingNextPage && (
                <Box className={'flex justify-center p-2'}>
                  <CircularProgress size={20} />
                </Box>
              )}
            </FetchOnScroll>
          ) : (
            <Typography className={'text-sm text-gray-500 dark:text-gray-400 p-4'}>
              Nenhum resultado encontrado.
            </Typography>
          )}
        </Paper>
      )}
    </div>
  );
};
