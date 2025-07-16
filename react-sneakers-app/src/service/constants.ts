export const ApiRoutes = {
  SNEAKERS: '/sneakers',
  AUTH: '/auth',
  USERS: '/users',
} as const;

export type ApiRoutes = (typeof ApiRoutes)[keyof typeof ApiRoutes];
