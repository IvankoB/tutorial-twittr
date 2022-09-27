//---------------------------------------------------------------- 
/**
 * @param {Record<string,any>} inOutMap
 * @param {string} JsonString
 * @returns {boolean}
 */
 export function JsonCheckedParseIO(inOutMap,JsonString) {
    //----------------------
    function undefObject() {
        const keys = Object.keys(inOutMap);
        for (const key of keys) {
            inOutMap[key] = undefined;
        }
    }
    //----------------------    
    undefObject()
    try {
        //----------------------------------------                
        let tmp = JSON.parse(JsonString)
        let valueKeys = Object.keys(tmp) || []
        let inOutKeys = Object.keys(inOutMap) || []
        if (valueKeys.length !== inOutKeys.length) {
            undefObject();
            return false;
        } 
        inOutKeys.forEach(function(key) {
            if (valueKeys.indexOf(key) === -1) {
                undefObject();
                return false;
            }
            inOutMap[key] = tmp[key];
        })
    } catch(e) {
        undefObject();
        return false;
    }
    return true;
}
//---------------------------------------------------------------- 
/**
 * @template T
 * @param   { Object<keyof T,string>[] } keys2Check 
 * @param   { string } jsonString
 * @returns { T | undefined }
 */
 export function JsonCheckedParse(keys2Check = [],jsonString = '{}') {
    try {
        let result = JSON.parse(jsonString)
        let resultKeys = Object.keys(result)
        if (keys2Check.length !== resultKeys.length) {
            return undefined;
        } 
        keys2Check.forEach(function(key) {
            if (resultKeys.indexOf(key) == -1) {
                return undefined;                
            }
        })
        return result;
    } catch(e) {
        return undefined;
    }
}
//---------------------------------------------------------------- 
