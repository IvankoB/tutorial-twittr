//---------------------------------------------------------------- 
export class FormCheckError {
    constructor(
        /** @type {string?}*/ message, 
        /** @type {string?}*/oldValue
    ) { 
//        super();
        this.oldValue = oldValue;
        this.errorMessage = message;
    }
}
//---------------------------------------------------------------- 
export class FormString /*extends Object*/ {
    constructor(
        /** @type {string?}*/value
    ) {
//        super();
        this.value = value;
    }   
}
//---------------------------------------------------------------- 