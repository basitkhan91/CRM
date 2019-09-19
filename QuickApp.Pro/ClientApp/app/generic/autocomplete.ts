export function getObjectByValue(field: string, value: string, originalData: any) {
    if ((field !== '' || field !== undefined) && (value !== '' || value !== undefined) && (originalData !== undefined)) {
        const data = originalData.filter(x => {
            if (x[field] === value) {
                return x;
            }
        })
        return data[0];
    }

}
export function getObjectById(field: string, id: any, originalData: any) {
    if ((field !== '' || field !== undefined) && (id !== '' || id !== undefined) && (originalData !== undefined)) {
        const data = originalData.filter(x => {
            if (x[field] === id) {
                return x;
            }
        })
        return data[0];
    }
}
export function getValueFromObjectByKey(field: string, object: any) {
    if ((field !== '' || field !== undefined) && (object !== undefined)) {
        return object[field];
    }
    
}
export function getValueFromArrayOfObjectById(field: string, idField: string, id: any, originalData: any) {
    if ((field !== '' || field !== undefined) && (idField !== '' || idField !== undefined) && (id !== '' || id !== undefined) && (originalData !== undefined)) {
        const data = originalData.filter(x => {
            if (x[idField] === id) {
                return x;
            }
        })
       if(data.length>0){
        return data[0][field];
       }
        
    }
}