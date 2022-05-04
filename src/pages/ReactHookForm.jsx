import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import ComboMWP from '../components/combos/ComboMWP';

const ReactHookForm = () => {
    const { control, register, handleSubmit } = useForm();
    const [info, setInfo] = useState()

  

    const Type = [
        { label: "Personal Owen", value: 1 },
        { label: "Business", value: 2 },
        { label: "Trust", value: 3 }
      ];

  return (
    <form onSubmit={handleSubmit((data) => setInfo(data))}>
        <div>
            <h2>Ejemplo del uso de React Hook Form</h2>
            <input name='firstname'  {...register('firstname')}/>
            <input name='lastname'  {...register('lastname')} />
            <input type='email' name='email'  {...register('email')} />

            <button type='submit' onClick={console.log(info)}>Submit</button>
            <Controller
               name='reactselect'
               control={control}
               render={ ({ field }) => <Select {...field} options={Type} /> } 
            />

            <Controller 
                name='customSelect'
                control={control}
                render={ ({field}) =>  
                    <ComboMWP 
                        key='licenseType'
                        {...field}
                        catalogName='licenseType'
/*                     onChange={(e) => {
                        comboMWPOnChange({name:'licenseType',value:e.value})} */
                     />
                }
            />
        </div>
    </form>
  )
}

export default ReactHookForm