export const ApiRoutes = {
  SNEAKERS: '/sneakers',
  AUTH: '/auth'
} as const;

export type ApiRoutes = typeof ApiRoutes[keyof typeof ApiRoutes];