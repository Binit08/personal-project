import React from 'react'

const content = ({addprice}) => {
  return (
    <div>
        <div className='flex absolute top-20 right-0 gap-5'>
            <div className='h-[10vh] border-4 w-[20vw]'>
              <h2>total sales
                </h2>
                <div>{addprice}</div></div>
            <div className='h-[10vh]  border-4 w-[20vw]'>total </div>
            <div className='h-[10vh]  border-4 w-[20vw]'>total customers</div>
            <div className='h-[10vh]  border-4 w-[20vw]'>total order</div>
        </div>
        <div className='flex absolute justify-center gap-5 top-[23vh] left-[20vw]'>
  <div className='h-[30vh] w-[50vw] border-4'>Transactions</div>
  <div className='h-[30vh] w-[20vw] border-2 '>Buyer Profile</div>
</div>

    </div>
  )
}

export default content
