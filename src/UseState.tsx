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

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const onWrite = (newValue: string) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onDeleted = () => {
        setState({
            ...state,
            deleted: true
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ""
        })
    }

    React.useEffect(() => {
        console.log("Inicio del efecto")

        if(state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")
                console.log("Terminando la validación")

                if(state.value != SECURITY_CODE) {
                    onError()
                } else {
                    onConfirm()
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
                    onChange={(event: React.FormEvent<HTMLInputElement>) => onWrite(event.currentTarget.value)}
                />
    
                <button 
                    onClick={() => {
                        onCheck()
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
                        onDeleted()
                    }}
                >Sí, quiero eliminar</button>
                <button
                    onClick={() => {
                        onReset()
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
                        onReset()
                    }}
                >Recuperar state</button>
            </>
        )
    }
}

export { UseState }