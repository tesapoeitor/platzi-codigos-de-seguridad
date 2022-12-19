import React from "react"

type Props = {
    name: string
}

const SECURITY_CODE = "paradigma"

function UseState({ name }: Props) {
    const [ value, setValue ] = React.useState("")
    const [ error, setError ] = React.useState(false)
    const [ loading, setLoading ] = React.useState(false)

    React.useEffect(() => {
        console.log("Inicio del efecto")

        if(loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")
                setLoading(false)
                console.log("Terminando la validación")

                if(value != SECURITY_CODE) {
                    setError(true)
                    return
                }  
                setError(false)
                
            }, 3000)
        }

        console.log("Fin del efecto")
    }, [loading])

    console.log(value)

    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el código de seguridad.</p>

            {(error && !loading ) && <p>Error: El código es incorrecto.</p>}

            {loading && <p>Cargando...</p>}

            <input 
                type="text" 
                placeholder="Código de seguridad"
                value={value}
                onChange={(event: React.FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
            />

            <button 
                onClick={() => {
                    setLoading(true)
                    // setError(false)
                }}
            >
                Comprobar
            </button>
        </div>
    )
}

export { UseState }