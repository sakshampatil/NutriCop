import { combineReducers, configureStore } from "@reduxjs/toolkit";
//features
import authReducer from "./features/authSlice";

//services
import { authApi } from "./services/auth";
import { ingredientsApi } from "./services/ingredients";
import { recipesApi } from "./services/recipes";
import { mealsApi } from "./services/meals";
import { daysApi } from "./services/days";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [recipesApi.reducerPath]: recipesApi.reducer,
  [mealsApi.reducerPath]: mealsApi.reducer,
  [daysApi.reducerPath]: daysApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      ingredientsApi.middleware,
      recipesApi.middleware,
      mealsApi.middleware,
      daysApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
