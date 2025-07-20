import type { ErrorResponse } from '../service/model.ts';

export const extractError = (action) => {
  if (action.payload) {
    return action.payload as ErrorResponse;
  }

  return {
    message: action.error?.message || 'Unknown error',
    code: 500,
  };
}