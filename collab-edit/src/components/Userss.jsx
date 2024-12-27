import React, { useState } from 'react'

const Userss = ({user,users }) => {
    const [openedUserTab,setOpenedUserTab]=useState(false)
  return (
    <div className='h-100 text-white bg-dark position-fixed'>
      {!openedUserTab && (
            <div className=' col-md-10 mx-auto mt-4 canvas-box ' style={{width:"250px",left:"0%",textAlign:'center'}}>All Users({users.length})
            {users.map((usr,index)=>(
                <p key={index*999} className="text-white text-center py-2">
                  {usr.username}
              {user && user.userId === usr.userId && " - (You)"}</p>
            ))
            }
         </div>
        )}
    </div>
  )
}

export default Userss
