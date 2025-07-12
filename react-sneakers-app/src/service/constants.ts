export const ApiRoutes = {
  SNEAKERS: '/sneakers',
} as const;

export type ApiRoutes = typeof ApiRoutes[keyof typeof ApiRoutes];