import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TodosApi } from "./api/TodosApi";

export const makeStore = ()=> configureStore({
  
    reducer: {
      [TodosApi.reducerPath]: TodosApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(TodosApi.middleware)

})

export const wrapper = createWrapper(makeStore);