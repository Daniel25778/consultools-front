export const closeModal = (modal: string): void => {
  document.getElementById(`close-${modal}-modal`)?.click();
};
