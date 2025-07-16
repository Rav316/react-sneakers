import type { AxiosError } from 'axios';

type RejectWithValueType<RejectValue> = (value: RejectValue) => any;


export async function callApiWithErrorHandling<T, Arg, RejectValue>(
  apiCall: (arg: Arg) => Promise<T>,
  arg: Arg,
  rejectWithValue: RejectWithValueType<RejectValue>
): Promise<T | ReturnType<RejectWithValueType<RejectValue>>> {
  try {
    return await apiCall(arg);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    const message = error.response?.data?.message || 'Unexpected error';
    const code = error.response?.status || 500;

    const errorObj: RejectValue = { message, code } as RejectValue;
    return rejectWithValue(errorObj);
  }
}