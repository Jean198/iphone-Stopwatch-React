import React from 'react'

const Lap = ({lapsList}) => {
  return (
    <>
    {lapsList.map((lap)=>{
        return(
            <>

            <div className='lap-component'>{lap}</div>
           <hr className='hr'/>
            
            </>
        )
    })}
    
    </>
  )
}

export default Lap