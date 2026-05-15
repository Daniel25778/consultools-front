export const scrollTo = (id: string): void => {
  const element = document.getElementById(id);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    const headerHeight = 70;

    const offsetPosition = elementPosition - 20 - headerHeight - 10;

    window.scrollTo({
      behavior: 'smooth',
      top: offsetPosition
    });
  }
};
