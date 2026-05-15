/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { clickElementById } from 'main/utils';
import { colors } from 'presentation/style';
import { type FC, type ReactNode, useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface SelectValues {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectValues[];
  value: SelectValues | SelectValues[] | null;
  id: string;
  onChange: (value: SelectValues | SelectValues[] | null) => void;
  isMultiple?: boolean;
  error?: boolean;
  required?: boolean;
  optionStyle?: 'checkbox';
  register?: UseFormRegisterReturn;
  isHideClearButton?: boolean;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  labelTop?: string;
  onSearch?: (value: string) => void;
  hasSelectAll?: boolean;
  onSelectAll?: (isSelectedAll: boolean) => void;
  width?: number | string;
  onClear?: () => void;
  query?: {
    fetchNextPage: (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };
}

export const Select: FC<SelectProps> = ({
  isMultiple,
  options,
  labelTop,
  hasSelectAll,
  register,
  width,
  onSelectAll,
  value,
  id,
  ...props
}) => {
  const random = String(Math.random() * 10).replace('.', '-');
  const [selectAll, setSelectAll] = useState(false);

  const handleScroll = (): void => {
    if (props.query) {
      const element = document.getElementById(`select-scroll-${id}-${random}`);

      if (element) {
        const { scrollTop, clientHeight, scrollHeight } = element;
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;

        if (isScrolledToBottom && props.query.hasNextPage && !props.query.isFetchingNextPage)
          props.query.fetchNextPage();
      }
    }
  };

  return (
    <div className={'flex flex-col gap-1.5 w-full no-break'} style={{ maxWidth: width }}>
      {labelTop ? (
        <span className={'font-medium'}>
          {labelTop}
          {props.required ? <span className={'text-[#ff4747]'}> *</span> : ''}
        </span>
      ) : null}

      <Autocomplete
        ListboxProps={{
          id: `select-scroll-${id}-${random}`,
          onMouseLeave(event): void {
            event.target.removeEventListener('scroll', handleScroll);
          },
          onScroll(event): void {
            event.target.addEventListener('scroll', handleScroll);
          },
          style: { maxHeight: '300px' }
        }}
        clearText={'Limpar'}
        closeText={'Fechar'}
        componentsProps={{
          clearIndicator: { id: `clear-indicator-${id}` },
          popupIndicator: { id: `open-indicator-${id}` }
        }}
        disableClearable={props.isHideClearButton}
        disableCloseOnSelect={isMultiple}
        filterOptions={(opts, state) =>
          opts?.filter((item) =>
            item.label
              ?.toLowerCase()
              ?.replace(/[.\-/]/gu, '')
              ?.normalize('NFD')
              ?.replace(/[\u0300-\u036f]/gu, '')
              ?.includes(
                state?.inputValue
                  ?.toLowerCase()
                  ?.normalize('NFD')
                  ?.replace(/[\u0300-\u036f]/gu, '')
                  .replace(/[.\-/]/gu, '')
              )
          )
        }
        fullWidth
        isOptionEqualToValue={(option: SelectValues, item: SelectValues): boolean =>
          option?.value === item?.value
        }
        loading={props.isLoading}
        loadingText={'Carregando...'}
        multiple={isMultiple}
        noOptionsText={'Nenhum dado encontrado'}
        onChange={(_event, data): void => {
          if (selectAll) {
            setSelectAll(false);
            if (onSelectAll) onSelectAll(false);
          }
          props.onChange(data);
          if (!data && props.onClear) props.onClear();
        }}
        onChangeCapture={(event: any): void => {
          if (props.onSearch) props.onSearch((event.target?.value as string) ?? '');
        }}
        options={options}
        renderInput={({ InputProps, inputProps, ...params }): ReactNode => {
          const { ...rest } = InputProps;

          return (
            <TextField
              {...params}
              InputProps={{ ...rest }}
              error={props.error}
              id={`select-${id}`}
              inputProps={{ ...inputProps, style: { padding: '4px 0px' } }}
              label={
                props.label ? (
                  <span>
                    {props.label}
                    {props.required ? <span className={'text-red'}> *</span> : ''}
                  </span>
                ) : null
              }
              onBlur={(): void => {
                if (props.onSearch) props.onSearch('');
              }}
              placeholder={props.placeholder}
              ref={register?.ref}
            />
          );
        }}
        renderOption={(renderProps, option: SelectValues, state): ReactNode => {
          const { key, ...rest } = renderProps;

          return (
            <div key={key} className={'flex flex-col w-full gap-6'}>
              {state.index === 0 && isMultiple && (onSelectAll || hasSelectAll) ? (
                <span
                  className={'p-[6px_16px] h-full w-full cursor-pointer hover:bg-gray-100'}
                  onClick={(): void => {
                    if (selectAll) {
                      setSelectAll(false);
                      if (onSelectAll) onSelectAll(false);
                      props.onChange([]);
                    } else {
                      setSelectAll(true);
                      if (onSelectAll) onSelectAll(true);
                      props.onChange(options);
                    }
                  }}
                >
                  {props.optionStyle === 'checkbox' ? <Checkbox checked={selectAll} /> : null}{' '}
                  Selecionar todos
                </span>
              ) : null}

              <li
                {...rest}
                style={
                  props.optionStyle === 'checkbox'
                    ? {
                        backgroundColor: state.selected || selectAll ? colors.gray[100] : '',
                        lineHeight: '2rem'
                      }
                    : {
                        backgroundColor: state.selected || selectAll ? `${colors.primary}45` : '',
                        lineHeight: '2rem'
                      }
                }
              >
                {props.optionStyle === 'checkbox' ? (
                  <Checkbox checked={state.selected || selectAll} />
                ) : null}{' '}
                {option.label}
              </li>
            </div>
          );
        }}
        renderTags={(params): ReactNode => (
          <div className={'truncate pl-2'} onClick={() => clickElementById(`open-indicator-${id}`)}>
            {params.map((option, index) => {
              const customOption = option as SelectValues;
              const prefix = index >= 1 ? ', ' : '';

              return (
                <span
                  key={customOption.value}
                  onClick={() => clickElementById(`open-indicator-${id}`)}
                >
                  {prefix + customOption.label}
                </span>
              );
            })}
          </div>
        )}
        sx={{
          '& .MuiAutocomplete-input': {
            minWidth: '1px !important'
          },
          '& .MuiAutocomplete-inputRoot': {
            flexWrap: 'nowrap !important',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }}
        value={value}
      />

      <div
        className={'hidden'}
        id={`clear-select-${id}`}
        onClick={(): void => {
          clickElementById(`clear-indicator-${id}`);
          if (props.onClear) props.onClear();
        }}
      />
    </div>
  );
};
