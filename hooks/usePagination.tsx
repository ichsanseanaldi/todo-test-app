
const pagesMap= (length:number,increment:number=1) =>{

  return Array.from({length:length}, (_,i)=>i+increment)

}

const usePagination = (currentPage:number) => {

  const limit_item:number = 10;

  const totalNumber = Math.ceil(200 / limit_item)

  const filler = '...'

  if(currentPage < 4) return [1,2,3,4, filler, totalNumber]

  if(currentPage <= totalNumber-3) {
    return [1, filler, currentPage-1,currentPage,currentPage+1,filler,totalNumber]
  }

  if(currentPage >= totalNumber-3 || currentPage === totalNumber) {
    return [1, filler, ...pagesMap(4,totalNumber-3)]
  }

}

export default usePagination