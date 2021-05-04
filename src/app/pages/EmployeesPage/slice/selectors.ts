import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.employee || initialState;

export const selectEmployee = createSelector([selectSlice], state => state);
