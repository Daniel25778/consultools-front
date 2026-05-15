export const removeUndefined = (query: object): URLSearchParams =>
  Object.fromEntries(
    Object.entries(query).filter(([, value]) => {
      if (Array.isArray(value)) return value?.length > 0;

      return value !== undefined && value !== null && value !== '';
    })
  ) as URLSearchParams;
