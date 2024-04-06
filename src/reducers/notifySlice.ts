import { INotifyState } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: INotifyState = {
  message: '',
  success: false,
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotify: (state, action: PayloadAction<INotifyState>) => {
      state = action.payload;
      return state;
    },
    resetNotify: () => {
      return initialState;
    },
  },
});

export default notifySlice.reducer;
// Other code such as selectors can use the imported `RootState` type
export const selectNotify = (state: RootState) => state.notify;
export const { setNotify, resetNotify } = notifySlice.actions;
