import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contractor } from '@/schema/contractorSchema';

type ContractorState = {
  currentContractor: Contractor | null;
  Contractor_Token: string | null;
  Contractor_refreshToken: string | null;
};

const initialState: ContractorState = {
  currentContractor: typeof window !== "undefined" && localStorage.getItem('contractor')
    ? JSON.parse(localStorage.getItem('contractor') as string)
    : null,
  Contractor_Token: typeof window !== "undefined" && localStorage.getItem('Contractor_Token')
    ? localStorage.getItem('Contractor_Token')
    : null,
  Contractor_refreshToken: typeof window !== "undefined" && localStorage.getItem('Contractor_refreshToken')
    ? localStorage.getItem('Contractor_refreshToken')
    : null,
};

const contractorSlice = createSlice({
  name: 'contractor',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<Contractor & { accessToken: string; refreshToken: string }>) => {
      state.currentContractor = action.payload;
      state.Contractor_Token = action.payload.accessToken;
      state.Contractor_refreshToken = action.payload.refreshToken;
      localStorage.setItem('contractor', JSON.stringify(action.payload));
      localStorage.setItem('Contractor_Token', action.payload.accessToken);
      localStorage.setItem('Contractor_refreshToken', action.payload.refreshToken);
    },

    logoutSuccess: (state) => {
      state.currentContractor = null;
      state.Contractor_Token = null;
      state.Contractor_refreshToken = null;
      localStorage.removeItem('contractor');
      localStorage.removeItem('Contractor_Token');
      localStorage.removeItem('Contractor_refreshToken');
    },
  },
});

export const { signInSuccess, logoutSuccess } = contractorSlice.actions;

export default contractorSlice.reducer;
