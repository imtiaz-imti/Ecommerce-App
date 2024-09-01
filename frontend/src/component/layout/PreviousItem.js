import React from 'react'

const PreviousItem = ({item}) => {
  let name = ''
  for(let i=0;i<item.name.length;i++){
    name+=item.name[i]
    if(i===15){
      name+='...'
      break  
    }
  }  
  return (
    <div className='previousitem'>
      <img className='everyitemimg1' src={item.image} alt='#'/>
      <div className='everyitemname'>{name}</div>
      <div className='everyitemprice'>{item.price}$</div>
      <div className='everyitemprice'>{item.quantity}</div>
    </div>
  )
}

export default PreviousItem
