import React from "react"

type State = {
    error: boolean,
    loading: boolean,
    value: string,
    deleted: boolean,
    confirmed: boolean
}

type Action = {
    type: "CHECK" | "ERROR" | "CONFIRM" | "WRITE" | "DELETED" | "RESET",
    payload?: string
}

type Props = {
    name: string
}

const initialState = {
    error: false,
    loading: false,
    value: "",
    deleted: false,
    confirmed: false
}

const SECURITY_CODE = "paradigma"

function UseReducer({ name }: Props) {
    // const [ state, setState ] = React.useState<State>({error: false, loading: false, value: "", deleted: false, confirmed: false})
    const [ state, dispatch ] = React.useReducer(reducer, initialState)

    const onError = () => dispatch({ type: "ERROR"})
    const onConfirm = () => dispatch({ type: "CONFIRM" })
    const onCheck = () => dispatch({ type: "CHECK" })
    const onDeleted = () => dispatch({ type: "DELETED" })
    const onReset = () => dispatch({ type: "RESET" })
    const onWrite = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: "WRITE", payload: event.currentTarget.value })
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
                    onChange={onWrite}
                />
    
                <button 
                    onClick={onCheck}
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
                    onClick={onDeleted}
                >Sí, quiero eliminar</button>
                <button
                    onClick={onReset}
                >No, me arrepentí</button>
            </>
        )
    } else { 
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >Recuperar reducer</button>
            </>
        )
    }
}

// const reducerIf = (state: State, action: Action): State => {
//     if(action.type === "CHECK") {
//         return {
//             ...state,
//             loading: true
//         }
//     } else if(action.type === "ERROR") {
//         return {
//             ...state,
//             error: true
//         }
//     } else {
//         return {
//             ...state
//         }
//     }
// }

// const reducerSwitch = (state: State, action: Action): State => {
//     switch (action.type) {
//         case "CHECK":
//             return {
//                 ...state,
//                 loading: true
//             }

//         case "ERROR":
//             return {
//                 ...state,
//                 error: true
//             }

//         default:
//             return {
//                 ...state
//             }
//     }
// }

const reducerObject = <T,>(state: T, payload = "") => ({
    CONFIRM: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    ERROR: {
        ...state,
        error: true,
        loading: false
    },
    CHECK: { 
        ...state,
        loading: true
    },
    WRITE: {
        ...state,
        value: payload
    },
    DELETED: {
        ...state,
        deleted: true
    },
    RESET: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ""
    }
})

const reducer = (state: State, action: Action): State => {
    return reducerObject(state, action.payload)[action.type]
}

export { UseReducer }