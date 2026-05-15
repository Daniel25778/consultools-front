export const getCompanyUrl = (path = window.location.pathname): string => {
  const match = path.split('/').filter((item) => item !== '' && item !== 'company');

  return match ? match[0] : '';
};
