import { useReducer } from "react"
import { ApplicationInterface, SecretInterface } from '../interfaces/ApplicationInterface'
import { ApplicationContext } from './ApplicationContext'
import { ApplicationReducer } from "./ApplicationReducer"

const INITIAL_SECRET_STATE: SecretInterface = {
    hash: '',
    secretText: '',
    createdAt: '',
    expireAt: ''
}


const INITIAL_STATE: ApplicationInterface = {
    selectedMenu: 'reveal-secret',
    spoilerMode: false,
    secret: INITIAL_SECRET_STATE,
    copyRightText: 'Asusual ©2022 Created by Mehe D Adnan'
}


interface props {
    children: JSX.Element | JSX.Element[]
}

const ApplicationProvider = ({ children }: props) => {
    const [applicationState, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE)
    
    const changeMenu = ( menu: string) => {
        dispatch({ type: 'changeMenu', payload: {selectedMenu: menu}})
    }
    const setSecret = ( secret: SecretInterface) => {
        dispatch({ type: 'setSecret', payload: secret})
    }
    return (
        <ApplicationContext.Provider value={{applicationState, changeMenu, setSecret }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export default ApplicationProvider