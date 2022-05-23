import React from 'react';
import {useMediaQuery} from 'react-responsive'
import styles from './Map.module.css'

function Mapprops(lat,lon){


    const iscMobile = useMediaQuery({
        query: "(max-width: 767px)"
    })


    return(
        <div>
            {iscMobile &&
             <div>
                 
             </div>
             }
        </div>

        
        
    )


}
export default Mapprops;