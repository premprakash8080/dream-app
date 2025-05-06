import { configureStore } from '@reduxjs/toolkit';
import dreamReducer from '../features/dreams/dreamSlice';
import myDreamReducer from '../features/dreams/myDreamSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    dreams: dreamReducer,
    myDreams: myDreamReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };
