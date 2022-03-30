import {ApplicationInterface, SecretInterface} from '../interfaces/ApplicationInterface'


type ApplicationAction = 
    | { type: 'addSecret', payload: SecretInterface}
    | { type: 'changeMenu', payload: {selectedMenu : string}}
    | { type: 'setSecret', payload: SecretInterface}
    | { type: 'setSpoilerMode', payload: boolean}



export const ApplicationReducer = (state:ApplicationInterface, action:ApplicationAction): ApplicationInterface => {
    
    switch ( action.type ) {
        case 'setSecret':
            return {
                ...state,
                secret: {
                    ...state.secret, 
                    hash: action.payload.hash, 
                    secretText: action.payload.secretText,
                    expireAt: action.payload.expireAt,
                    createdAt: action.payload.createdAt,
                }
            }
        case 'changeMenu':
            return {
                ...state,
                selectedMenu : action.payload.selectedMenu
            }
        default:
            return state
    }
}