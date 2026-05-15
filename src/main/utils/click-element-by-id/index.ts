export const clickElementById = (id: string): void => {
  const element = document.getElementById(id) as HTMLElement;

  if (element) element?.click();
};
