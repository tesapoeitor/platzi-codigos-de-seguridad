import React from "react";

import { Loading } from "./Loading"

type Props = {
    name: string
}

type State = {
    error: boolean,
    loading: boolean,
    value: string
}

const SECURITY_CODE = "paradigma"

class ClassState extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            error: false,
            loading: false,
            value: ""
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        console.log("Actualización")

        if(this.state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if(this.state.value != SECURITY_CODE) {
                    this.setState({error: true, loading: false})
                } else {
                    this.setState({error: false, loading: false})
                }

                console.log("Terminando la validación")
            }, 3000)
        }
    }

    render() {
        return (
        <div>
            <h2>Eliminar {this.props.name}</h2>

            <p>Por favor, escribe el código de seguridad.</p>

            {(this.state.error && !this.state.loading) && <p>Error: El código es incorrecto.</p>}

            {this.state.loading && <Loading/>}

            <input
                type="text" 
                placeholder="Código de seguridad" 
                value={this.state.value}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                    this.setState({value: event.currentTarget.value})
                }}
            />

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