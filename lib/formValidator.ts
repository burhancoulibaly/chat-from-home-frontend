const alphaNumRegEx = /^[A-Za-z]+$/;//validates for alphabetic characters only
const usernameRegEx = /^([a-zA-Z0-9_.-])+$/;
const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]+)\])/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/


export const validateAlphaNum = (str: string) => {
    return alphaNumRegEx.test(str);
} 

export const validateUsername = (str: string) => {
    return usernameRegEx.test(str);
}

export const validateEmail = (str: string) => {
    return emailRegex.test(str);
}

export const validatePassword = (str: string) => {
    return passwordRegEx.test(str);
}

export const confirmEmail = (str1: string, str2: string) => {
    if(str1 !== str2){
        return false;
    }

    return true;
}

export const confirmPassword = (str1: string, str2: string) => {
    if(str1 !== str2){
        return false;
    }

    return true;
}

