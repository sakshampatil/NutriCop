import { combineReducers, configureStore } from "@reduxjs/toolkit";
//features
import authReducer from "./features/authSlice";

//services
import { ingredientsApi } from "./services/ingredients";
import { recipesApi } from "./services/recipes";
import { mealsApi } from "./services/meals";

const rootReducer = combineReducers({
  auth: authReducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [recipesApi.reducerPath]: recipesApi.reducer,
  [mealsApi.reducerPath]: mealsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      recipesApi.middleware,
      mealsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
