import React from 'react'
import MetaData from './MetaData'
const Home = async () => {
  return (
    <div className='homecompo'>
       <MetaData title='Home Page'/>
       <div className='text1'>WELCOME TO OUR APP</div>
       <div className='text2'>You will get the best product from here</div>
    </div>
  )
}

export default Home
