type State = {
    error: boolean,
    loading: boolean,
    value: string,
    deleted: boolean,
    confirmed: boolean
}

type Action = {
    type: "CHECK" | "ERROR"
}

type ReducerObjAction = {
    ERROR: State,
    CHECK: State
}

const initialState = {
    error: false,
    loading: false,
    value: "",
    deleted: false,
    confirmed: false
}

const reducerIf = (state: State, action: Action): State => {
    if(action.type === "CHECK") {
        return {
            ...state,
            loading: true
        }
    } else if(action.type === "ERROR") {
        return {
            ...state,
            error: true
        }
    } else {
        return {
            ...state
        }
    }
}

const reducerSwitch = (state: State, action: Action): State => {
    switch (action.type) {
        case "CHECK":
            return {
                ...state,
                loading: true
            }

        case "ERROR":
            return {
                ...state,
                error: true
            }

        default:
            return {
                ...state
            }
    }
}

const reducerObject = <T,>(state: T): {ERROR: T, CHECK: T} => ({
    ERROR: {
        ...state,
        error: true
    },
    CHECK: { 
        ...state,
        loading: true
    }
})

const reducer = (state: State, action: Action): State => {
    return reducerObject(state)[action.type]
}