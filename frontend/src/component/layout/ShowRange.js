import React from 'react'

const ShowRange = () => {
  return (
    <div className="range-slider container">
     <span className="output outputOne"></span>
     <span className="output outputTwo"></span>
     <span className="full-range"></span>
     <span className="incl-range"></span>
     <input name="rangeOne" value="10" min="0" max="100" step="1" type="range"/>
     <input name="rangeTwo" value="90" min="0" max="100" step="1" type="range"/>
    </div>
  )
}

export default ShowRange
