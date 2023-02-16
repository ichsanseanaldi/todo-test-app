import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { addTodo } from '../../lib/api/TodosApi'
import { makeStore } from '../../lib/store'
import styles from '../../styles/Home.module.css'

const form : NextPage = () => {

    const store = makeStore()
    
    const [title, setTitle] = useState<String>('')
    const [responseId, setResponseId] = useState<any>(null);
    const [response, setResponse] = useState<any>(null);

    const body :any = {
      userId:Date.now(),
      id:Date.now(),
      title:title.toString(),
      completed:false
    }  
    
    const sendForm = async (e:FormEvent)=>{
        
        e.preventDefault()
        
        const res = await store.dispatch(addTodo.initiate(body)).unwrap()
           
        console.log(res);

        setResponseId(res.id)
        setResponse(res)
        
    }

    return (

        <div className={styles.container}>

            <div className={styles.wrapper}>

                <Link className={styles.link} href='/'>Home</Link>

                <h2 className={styles.heading}>Form - Add Todo</h2> 

                <form className={styles.form} onSubmit={(e)=>sendForm(e)}>

                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder='Title'
                        onChange={(title)=>setTitle(title.target.value)}
                    />

                    <button type="submit">Submit</button>

                </form>

                {responseId === 201 && 
                
                    <div className={styles.wrapper}>

                        <p className={styles.msg}>Form Submitted!</p> 

                        <pre>{JSON.stringify(response,null,2)}</pre>
                
                    </div>}

             </div>

        </div>

    )

}

export default form