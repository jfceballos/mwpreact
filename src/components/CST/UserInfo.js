import React from 'react'

const UserInfo = () => {
  return (
    <div>
        <label htmlFor='clientId'>Client ID</label>
        <input
            id="clientId"
            name="clienteId"
            type='text'
            placeholder='Cliente ID'
         /*    value={newUser.clienteId}
            onChange={ handleChange } */
            required
        />
        <label htmlFor='Type'>Type</label>
       {/*  <Select
            className='react-select-container'
            classNamePrefix='react-select'
            options={Type}
            ref = {typeReference}
            onChange={(e) => {
                setNewUser(prevState => ({
                    ...prevState,
                        Type: e.value
                    }))
                }}   
               
        />   */}

    </div>
  )
}

export default UserInfo