import React from "react"

type Props = {
    name: string
}

type State = {
    error: boolean,
    loading: boolean,
    value: string,
    deleted: boolean,
    confirmed: boolean
}

const SECURITY_CODE = "paradigma"

function UseState({ name }: Props) {
    const [ state, setState ] = React.useState<State>({error: false, loading: false, value: "", deleted: false, confirmed: false})

    React.useEffect(() => {
        console.log("Inicio del efecto")

        if(state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")
                console.log("Terminando la validación")

                if(state.value != SECURITY_CODE) {
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                } else {
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        confirmed: true
                    })
                }
                
            }, 3000)
        }

        console.log("Fin del efecto")
    }, [state.loading])

    console.log("state", state)

    if(!state.confirmed && !state.deleted) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
    
                <p>Por favor, escribe el código de seguridad.</p>
    
                {(state.error && !state.loading ) && <p>Error: El código es incorrecto.</p>}
    
                {state.loading && <p>Cargando...</p>}
    
                <input 
                    type="text" 
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => setState({...state, value: event.currentTarget.value})}
                />
    
                <button 
                    onClick={() => {
                        setState({
                            ...state,
                            loading: true
                        })
                    }}
                >
                    Comprobar
                </button>
            </div>
        ) 
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <p>¿Estas seguro que deseas eliminarlo?</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true
                        })
                    }}
                >Sí, quiero eliminar</button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false
                        })
                    }}
                >No, me arrepentí</button>
            </>
        )
    } else { 
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false
                        })
                    }}
                >Recuperar state</button>
            </>
        )
    }
}

export { UseState }