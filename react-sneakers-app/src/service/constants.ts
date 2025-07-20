export const ApiRoutes = {
  SNEAKERS: '/sneakers',
  AUTH: '/auth',
  USERS: '/users',
  CART: '/cart',
} as const;

export type ApiRoutes = (typeof ApiRoutes)[keyof typeof ApiRoutes];
