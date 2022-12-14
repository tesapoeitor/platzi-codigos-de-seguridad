import React from "react"

type Props = {
    name: string
}

function UseState({ name }: Props) {
    const [ error, setError ] = React.useState(false)

    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el código de seguridad.</p>

            {error && <p>Error: El código es incorrecto.</p>}

            <input type="text" placeholder="Código de seguridad" />

            <button 
                onClick={() => setError(prevState => !error)}
            >
                Comprobar
            </button>
        </div>
    )
}

export { UseState }