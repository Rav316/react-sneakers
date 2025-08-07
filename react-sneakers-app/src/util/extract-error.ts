import type { ErrorResponse } from '../service/model';

export const extractError = (action: any) => {
  if (action.payload) {
    return action.payload as ErrorResponse;
  }

  return {
    message: action.error?.message || 'Unknown error',
    code: 500,
  };
};
