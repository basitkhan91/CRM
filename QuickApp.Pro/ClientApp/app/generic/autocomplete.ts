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
            if (parseInt(x[field]) === parseInt(id)) {
                return x;
            }
        })
        return data[0];
    }
}
export function getValueFromObjectByKey(field: string, object: any) {
    console.log(field, object)
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
        return data[0][field];
    }
}

export function validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
    if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
        if (typeof (currentInput) === 'string') {
            const data = originalData.filter(x => {
                return x[field].toLowerCase() === currentInput.toLowerCase()
            })
            return data;
        } else if (typeof (currentInput) === 'number') {
            const data = originalData.filter(x => {

                return x[field] === currentInput
            })
            return data;
        }

    }
}

export function editValueAssignByCondition(field: any, value: any) {
    console.log(field, value)
    if ((value !== undefined) && (field !== '' || field !== undefined)) {

        if (typeof (value) === 'string') {
            return value
        } else {
            return getValueFromObjectByKey(field, value)
        }
    }
}

