export const isClient = () => {
  return window.__CLIENT__ || false;
};