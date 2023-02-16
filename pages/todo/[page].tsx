import React from 'react'
import Link from 'next/link';
import { wrapper } from '../../lib/store';
import { getAllTodosLimit, getRunningQueriesThunk } from '../../lib/api/TodosApi';
import { ParentResponse, ResponseList, Todo, Todos } from '../../types/TodosType';
import Pagination from '../../components/Pagination';
import styles from '../../styles/Home.module.css'

const TodoPaginated = ({ data }:ParentResponse<ResponseList<Todos>>) => {

  //@ts-ignore
  const currentPage = Number(data[0].data[9].id/10)

  const arrOfTodo = data[0].data

  return (

    <div className={styles.container}>

      <div className={styles.wrapper}>

        <Link className={styles.link} href='/'>Home</Link>

        <h3 className={styles.heading}>ISR - Todo List - Page - {currentPage}</h3> 

        <Pagination currentPage={currentPage}/> 

        {arrOfTodo.map((e:Todo,idx:number)=>(

            <Link href={`/todo/detail/${e.id}`} key={idx}>

                <div className={styles.card}>  

                  <div className={styles.cardTitle}>

                    <strong>{e.id}.</strong>

                    <h4>{e.title}</h4>

                  </div>

                  <p>Status : {e.completed?'true':'false'}</p> 

                </div>

            </Link>

          ))}

      </div>

    </div>

  )
}

export async function getStaticPaths(){

  return {

    paths: Array.from({ length: 4 }).map((_, i) => `/todo/${i}`),

    fallback: 'blocking',

  }

}


export const getStaticProps = wrapper.getStaticProps(
  
    store => 
        
        async (context) =>{

            const id = Number(context.params?.page)

            store.dispatch(getAllTodosLimit.initiate(id))

            const data = await Promise.all(store.dispatch(getRunningQueriesThunk()))

            return{

              props:{data},

              revalidate: 60 * 60 * 24

            }

        }
)


export default TodoPaginated