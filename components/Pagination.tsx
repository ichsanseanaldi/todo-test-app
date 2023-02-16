import Link from 'next/link'
import React from 'react'
import usePagination from '../hooks/usePagination'
import styles from '../styles/Home.module.css'

const Pagination = ({currentPage}:any) => {

  console.log("fromPagination",currentPage)

  const pageNumbers = usePagination(currentPage)

  return (

    <div className={styles.paginationWrapper}>

      {pageNumbers?.map((element:number | string, idx:number)=>

          element === '...' ? (
          
            <span 
              className={styles.paginationNumber} 
              key={idx}
            >
              {element} 
            </span>
          
            ) : (

            <Link 
              className={element === currentPage ? styles.active : styles.paginationNumber} 
              key={idx} 
              href={`/todo/${element}`}
            > 
              {element}
            </Link>
        
          )
        )
      }

    </div>
  )

}

export default Pagination