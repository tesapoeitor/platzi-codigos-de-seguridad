import React from "react";

import { Loading } from "./Loading"

type Props = {
    name: string
}

type State = {
    error: boolean,
    loading: boolean
}

class ClassState extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            error: false,
            loading: false
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        console.log("Actualización")

        if(this.state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")
                this.setState({loading: false})
                console.log("Terminando la validación")
            }, 3000)
        }
    }

    render() {
        return (
        <div>
            <h2>Eliminar {this.props.name}</h2>

            <p>Por favor, escribe el código de seguridad.</p>

            {this.state.error && <p>Error: El código es incorrecto.</p>}

            {this.state.loading && <Loading/>}

            <input type="text" placeholder="Código de seguridad" />

            <button 
                onClick={() => this.setState({loading: true})}
            >
                Comprobar
            </button>
        </div>
        )
    }
}

export { ClassState }