import React from "react"

type Props = {
    name: string
}

type State = {
    error: boolean,
    loading: boolean,
    value: string
}

const SECURITY_CODE = "paradigma"

function UseState({ name }: Props) {
    const [ state, setState ] = React.useState<State>({error: false, loading: false, value: ""})

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
                    return
                }  
                setState({
                    ...state,
                    error: false,
                    loading: false
                })
                
            }, 3000)
        }

        console.log("Fin del efecto")
    }, [state.loading])

    console.log(state)

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
}

export { UseState }