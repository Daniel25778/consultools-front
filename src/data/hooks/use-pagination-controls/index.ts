interface PaginationItem {
  type:
    | 'page'
    | 'prev'
    | 'next'
    | 'start-ellipsis'
    | 'end-ellipsis'
    | 'first'
    | 'last';
  page?: number;
  selected?: boolean;
  disabled?: boolean;
}

interface UseCustomPaginationProps {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
  boundaryCount?: number;
  siblingCount?: number;
}

export function useCustomPagination({
  page,
  totalPages,
  onChange,
  boundaryCount = 1,
  siblingCount = 1,
}: UseCustomPaginationProps) {
  const createRange = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const startPages = createRange(1, Math.min(boundaryCount, totalPages));
  const endPages = createRange(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages[0] - 2,
  );

  const items: PaginationItem[] = [];

  items.push({
    type: 'first',
    page: 1,
    disabled: page === 1,
  });

  items.push({
    type: 'prev',
    page: Math.max(page - 1, 1),
    disabled: page === 1,
  });

  startPages.forEach((p) =>
    items.push({
      type: 'page',
      page: p,
      selected: p === page,
      disabled: p === page,
    }),
  );

  if (siblingsStart > boundaryCount + 2) {
    items.push({ type: 'start-ellipsis', disabled: true });
  }

  createRange(siblingsStart, siblingsEnd).forEach((p) =>
    items.push({
      type: 'page',
      page: p,
      selected: p === page,
      disabled: p === page,
    }),
  );

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    items.push({ type: 'end-ellipsis', disabled: true });
  }

  endPages.forEach((p) =>
    items.push({
      type: 'page',
      page: p,
      selected: p === page,
      disabled: p === page,
    }),
  );

  items.push({
    type: 'next',
    page: Math.min(page + 1, totalPages),
    disabled: page === totalPages,
  });

  items.push({
    type: 'last',
    page: totalPages,
    disabled: page === totalPages,
  });

  return {
    items,
    onItemClick: (item: PaginationItem) => {
      if (!item.disabled && item.page && item.page !== page) {
        onChange(item.page);
      }
    },
  };
}
