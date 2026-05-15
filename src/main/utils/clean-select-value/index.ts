export const cleanSelectValue = (ids: string[]): void => {
  ids.forEach((id) => {
    document.getElementById(`clear-select-${id}`)?.click();
  });
};
