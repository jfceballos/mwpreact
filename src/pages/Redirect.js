import React, {useEffect} from 'react'

const Redirect = ( {url}) => {

    useEffect(() => {
        window.location.href = url;
        return null;
    }, []);

  return (
    <div>Redirect</div>
  )
}

export default Redirect