import React from "react"

type Props = {
    name: string
}

function UseState({ name }: Props) {
    const [ error, setError ] = React.useState(false)
    const [ loading, setLoading ] = React.useState(false)

    React.useEffect(() => {
        console.log("Inicio del efecto")

        if(loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")
                setLoading(false)
                console.log("Terminando la validación")
            }, 3000)
        }

        console.log("Fin del efecto")
    }, [loading])

    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el código de seguridad.</p>

            {error && <p>Error: El código es incorrecto.</p>}

            {loading && <p>Cargando...</p>}

            <input type="text" placeholder="Código de seguridad" />

            <button 
                onClick={() => setLoading(true)}
            >
                Comprobar
            </button>
        </div>
    )
}

export { UseState }