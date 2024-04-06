import { useAppDispatch } from '@/reducers/hooks';
import { resetNotify, setNotify } from '@/reducers/notifySlice';
import { isAxiosError } from 'axios';

const ErrorHandler = (error: unknown) => {
  const dispatch = useAppDispatch();

  if (isAxiosError(error)) {
    if (error?.response?.data && typeof error?.response?.data === 'string') {
      const message = error.response.data.replace(
        'Something went wrong. Error: ',
        ''
      );
      console.error(message);
      dispatch(setNotify({ message }));
      setTimeout(() => {
        dispatch(resetNotify());
      }, 5000);
    }
  } else {
    console.error('Unknown error', error);
    dispatch(setNotify({ message: 'Unknown error' }));
    setTimeout(() => {
      dispatch(resetNotify());
    }, 5000);
  }
};

export default ErrorHandler;
