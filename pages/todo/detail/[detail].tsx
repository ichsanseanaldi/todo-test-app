import React from 'react'
import { wrapper } from '../../../lib/store'
import { getRunningQueriesThunk, getTodos } from '../../../lib/api/TodosApi'
import { ParentResponse, Todo } from '../../../types/TodosType'
import BackButton from '../../../components/BackButton'
import styles from '../../../styles/Home.module.css'

const detailTodoPage = ({data}:ParentResponse<Todo>) => {

  const todo = data[0].data

  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>

        <BackButton/>

        <h3 className={styles.heading}>SSR - Detail Todo - {todo.id}</h3>

        <div className={styles.wrapper}>  

          <div className={styles.cardTitle}>

            <h4>{todo.title}</h4>

          </div>

          <p>Status : {todo.completed?'true':'false'}</p> 

        </div>
    
      </div>

    </div>
  )
}


export const getServerSideProps = wrapper.getStaticProps(
  
  store => 
      
      async (context) =>{

        const id = Number(context.params?.detail)

        store.dispatch(getTodos.initiate(id))

        const data = await Promise.all(store.dispatch(getRunningQueriesThunk()))

        return{

          props:{data},

        }

      }
)


export default detailTodoPage