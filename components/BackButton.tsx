import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Home.module.css'

const BackButton = () => {

  const router = useRouter()  

  return (
    <button className={styles.link} onClick={()=>router.back()}>
      Back
    </button>
  )
}

export default BackButton