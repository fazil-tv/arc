import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/userApi';
import { adminApi } from './admin/adminApi';
import { contractorApi } from './contractor/contractorApi';
import userReducer from './user/userSlice';
import contractorReducer from './contractor/contractorSlice';
import adminReducer from './admin/adminSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [contractorApi.reducerPath]: contractorApi.reducer,
    user: userReducer,
    contractor: contractorReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, adminApi.middleware, contractorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
