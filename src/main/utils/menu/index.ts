export const openMenu = (id: string): void => {
  document.getElementById(`open-menu-element-${id}`)?.click();
};

export const closeMenu = (id: string): void => {
  document.getElementById(`open-menu-element-${id}-close`)?.click();
};
