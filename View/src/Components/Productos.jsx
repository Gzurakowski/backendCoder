import React, { useState } from 'react'
import FormProductos from './FormProductos'
import MostrarProductos from './MostrarProductos'

function Productos() {
    const [submited, setSubmited] = useState(0)
     
    return (
        <div>
            <FormProductos onSubmit={() => setSubmited(prev => prev + 1)}/>
            <MostrarProductos refresh={submited}/>
        </div>
    )
}

export default Productos