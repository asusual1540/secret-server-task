import { createContext } from 'react'
import { ApplicationInterface, SecretInterface } from '../interfaces/ApplicationInterface'

export type ApplicationContextProps = {
    applicationState : ApplicationInterface,
    changeMenu : ( menu:string ) => void,
    setSecret : ( secret:SecretInterface ) => void
}

export const ApplicationContext = createContext<ApplicationContextProps>({} as ApplicationContextProps)
