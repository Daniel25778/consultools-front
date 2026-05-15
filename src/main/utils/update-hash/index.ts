 
export interface HashParams {
  name: string;
  value: string;
}

interface updateHashProps {
  params: HashParams[];
  resetAll?: boolean;
}

export const updateHash = (data: updateHashProps): void => {
  let params: URLSearchParams;

  if (data.resetAll) params = new URLSearchParams();
  else {
    const hash = window.location.hash.slice(1);

    params = new URLSearchParams(hash);
  }

  data.params.forEach(({ name, value }) => {
    params.set(name, value);
  });

  window.location.hash = params.toString();
};

export interface SearchParams {
  name: string;
  value: string;
}

interface UpdateSearchProps {
  params: SearchParams[];
  resetAll?: boolean;
}

export const updateSearchParams = (data: UpdateSearchProps): void => {
  let params: URLSearchParams;

  if (data.resetAll) params = new URLSearchParams();
  else {
    const { search } = window.location;

    params = new URLSearchParams(search);
  }

  data.params.forEach(({ name, value }) => {
    params.set(name, value);
  });

  const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');

  window.history.replaceState({}, '', newUrl);
};
