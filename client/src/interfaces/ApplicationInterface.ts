
export interface SecretInterface {
    hash: string;
    secretText?: string;
    createdAt?: string;
    expireAt?: string;
}

export interface ApplicationInterface {
    selectedMenu: string;
    spoilerMode: boolean;
    secret: SecretInterface;
    copyRightText: string;
}