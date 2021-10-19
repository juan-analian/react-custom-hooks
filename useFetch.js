 import {useState,useRef, useEffect} from "react"


export const useFetch = (url) => {
 
    const isMounted = useRef(true);
    const [state, setstate] = useState({data: null, loading: true, error: null})

    useEffect(() => {
        
        return () => {
            //cuando desmontamos el componente, cambiamos valor
            isMounted.current = false;
        }
        
    }, []); //cuando el comp. se carga x 1era vez: []

    useEffect(() => {
         
        setstate({
            loading: true,
            error : null,
            data: null
        })

        fetch(url)
        .then(resp => resp.json() )
        .then(data => {

            if (isMounted.current) {
                setstate({
                    loading: false,
                    error : null,
                    data
                })
            }
            else {
                //console.log("Set State no se llamó");
            }        
        })
        .catch( () => {
            setstate({
                loading: false,                
                data: null,
                error : 'No se puedo cargar la info'
            })
        });

    }, [url]); //solo se ejecuta cuando la URL cambia

    return state;
    
}