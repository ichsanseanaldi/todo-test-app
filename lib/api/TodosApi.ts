import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from "next-redux-wrapper";
import { ResponseList, Todo, Todos } from '../../types/TodosType';

export const TodosApi = createApi({
    reducerPath: 'TodosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/'
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE ) {
          return action.payload[reducerPath];
        }
      },
    endpoints: builder => ({
        getTodos: builder.query<ResponseList<Todo>, number | void>({
            query: (id)=> `todos/${id}`
        }),
        getAllTodosLimit: builder.query<ResponseList<Todos>, number | void>({
            query: (start)=> `todos?_page=${start}&_limit=10`
        }),
        addTodo: builder.mutation<Todo, Todo>({
            query: (body)=>({
                url:'todos',
                method:'POST',
                body:JSON.stringify(body),
                headers:{
                    'Content-type':'application/json; charset=UTF-8',
                }
            })
        })
    })
})

export const { 
    util: { getRunningQueriesThunk }
} = TodosApi

export const { 
    addTodo,
    getTodos, 
    getAllTodosLimit 
} = TodosApi.endpoints;