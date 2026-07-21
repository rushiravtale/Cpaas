export const encrypt = (value) => {
  return btoa(value); 
};

export function decrypt(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}
