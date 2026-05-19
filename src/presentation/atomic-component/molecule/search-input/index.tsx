import { Search } from '@mui/icons-material';
import { InputBase, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { useSearch } from 'data/hooks';
import { routePaths } from 'main/config';
import { colors } from 'presentation/style/palette';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const searchItems = [
  { id: '1', title: 'Dashboard de vendas', subtitle: 'Veja os resultados por período' },
  { id: '2', title: 'Relatório financeiro', subtitle: 'Analise receitas e despesas' },
  { id: '3', title: 'Plano de ação', subtitle: 'Acompanhe tarefas e responsáveis' },
  { id: '4', title: 'Atendimento ao cliente', subtitle: 'Ver histórico de chamados' },
  { id: '5', title: 'Usuários ativos', subtitle: 'Gerencie permissões e acessos' }
];

const normalize = (value: string): string => value.trim().toLowerCase();

const filterItems = (query: string) => {
  if (!query) return [];
  const normalizedQuery = normalize(query);
  return searchItems.filter(
    (item) =>
      normalize(item.title).includes(normalizedQuery) ||
      normalize(item.subtitle).includes(normalizedQuery)
  );
};

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ placeholder = 'Buscar...' }) => {
  const navigate = useNavigate();
  const { search, searchDebounce, setSearchDebounce } = useSearch();
  const results = filterItems(search);

  return (
    <div className={'w-full max-w-[500px] relative'}>
      <Paper
        elevation={0}
        className={'flex items-center gap-2 rounded-full px-6 py-1'}
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
        <Search sx={{ color: colors.gray[800], fontSize: 24 }} />
      </Paper>

      {search.length > 1 && (
        <Paper
          className={'mt-2 absolute rounded-xl w-full'}
          sx={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.1)' }}
        >
          {results.length > 0 ? (
            <List disablePadding>
              {results.map((item) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => navigate(`${routePaths.itemDetail}/${item.id}`)}
                  className={
                    'flex flex-col items-start gap-0 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                >
                  <ListItemText
                    primary={item.title}
                    secondary={item.subtitle}
                    primaryTypographyProps={{
                      className: 'font-medium text-sm text-gray-900 dark:text-white'
                    }}
                    secondaryTypographyProps={{
                      className: 'text-xs text-gray-500 dark:text-gray-400'
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography className={'px-4 py-3 text-sm text-gray-500 dark:text-gray-400'}>
              Nenhum resultado encontrado.
            </Typography>
          )}
        </Paper>
      )}
    </div>
  );
};
