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
export function getIdByFromObject(field: string, object: any) {
    if ((field !== '' || field !== undefined) && (object !== undefined)) {
        return object[field];
    }
}




