import { Edit } from '@mui/icons-material';
import { Button, Collapse, IconButton } from '@mui/material';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

interface PageFilterProps {
  children: ReactNode;
  cleanFilters?: () => void;
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}

export const PageFilter: FC<PageFilterProps> = ({
  children,
  cleanFilters,
  setShowFilter,
  showFilter
}) => {
  const [headerIsBig, setHeaderIsBig] = useState(true);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 100) setHeaderIsBig(false);
      else setHeaderIsBig(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerIsBig]);

  return (
    <>
      <div>
        <IconButton onClick={(): void => setShowFilter(!showFilter)}>
          <Edit />
        </IconButton>
      </div>

      <Collapse
        in={showFilter}
        sx={{
          left: 0,
          // position: 'fixed',
          // top: headerIsBig ? '93px' : '79px',
          transition: 'all 200ms',
          width: '100%',
          zIndex: '20'
        }}
      >
        <div
          className={
            'flex flex-col h-full gap-4 min-h-[100px] w-screen tablet:pr-6 justify-between bg-white border-t rounded-b-xl p-4 shadow-[0px_5px_5px_0px_#00000040]'
          }
        >
          <div>{children}</div>

          <div className={'flex gap-4 justify-end'}>
            {cleanFilters ? (
              <Button
                onClick={cleanFilters}
                sx={{
                  padding: '6px 24px'
                }}
              >
                Limpar filtros
              </Button>
            ) : null}

            <Button
              onClick={(): void => setShowFilter(false)}
              sx={{
                padding: '6px 24px'
              }}
              variant={'secondary'}
            >
              Fechar
            </Button>
          </div>
        </div>
      </Collapse>
    </>
  );
};
