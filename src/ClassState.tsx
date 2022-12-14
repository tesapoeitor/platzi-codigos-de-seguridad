import React from "react";

type Props = {
    name: string
}

type State = {
    error: boolean
}

class ClassState extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            error: true
        }
    }

    render() {
        return (
        <div>
            <h2>Eliminar {this.props.name}</h2>

            <p>Por favor, escribe el código de seguridad.</p>

            {this.state.error && <p>Error: El código es incorrecto.</p>}

            <input type="text" placeholder="Código de seguridad" />

            <button 
                onClick={() => this.setState(prevState => ({error: !this.state.error}))}
            >
                Comprobar
            </button>
        </div>
        )
    }
}

export { ClassState }