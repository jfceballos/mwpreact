import React from 'react'

const Item = ({title, value}) => {
  return (
    <div className='col item'>
        <h5><strong>{title}</strong></h5>
        <h3>{value}</h3>
    </div>
  )
}

export default Item