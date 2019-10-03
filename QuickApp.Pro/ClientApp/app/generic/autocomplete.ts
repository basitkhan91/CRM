// used to pass (field/key) and value and original Data and get  Filtered Data Bases on the (value/input) you give 
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
// used to pass  (field/key) and id and original Data and get  Filtered Data Bases on the (id/input) you give 
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
// pass (field/key) and assigned value from the object  
export function getValueFromObjectByKey(field: string, object: any) {
    if ((field !== '' || field !== undefined) && (object !== undefined)) {
        return object[field];
    }
}
// pass the (field/key) and (idField) where to Match with the  (id/input) from Original Data and particular value of key after Filter
export function getValueFromArrayOfObjectById(field: string, idField: string, id: any, originalData: any) {
    if ((field !== '' || field !== undefined) && (idField !== '' || idField !== undefined) && (id !== '' || id !== undefined) && (originalData !== undefined)) {
        const data = originalData.filter(x => {
            if (parseInt(x[idField]) === parseInt(id)) {
                return x;
            }
        })
        return data[0][field];
    }
}


// Used to Return String on Create Mode on Edit Mode Return the String from the Object 
export function editValueAssignByCondition(field: any, value: any) {
    if ((value !== undefined) && (field !== '' || field !== undefined)) {

        if (typeof (value) === 'string') {
            return value
        } else {
            return getValueFromObjectByKey(field, value)
        }
    }
}


// Used to Match and Validate the current selected and Previous data and return Boolean on Edit Mode
export function selectedValueValidate(field: string, object: any, editData: any) {
    if ((field !== '' || field !== undefined) && (object !== undefined) && (editData !== undefined)) {
        return getValueFromObjectByKey(field, object) == editValueAssignByCondition(field, editData[field])

    }

}

export function validateRecordExistsOrNotOnEdit(field: string, currentInput: any, editData: any) {
    if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (editData !== undefined)) {
        return editValueAssignByCondition(field, editData[field]) !== currentInput;

    }

}

// Used to Autocomplete Validation Whether Record Exist or not on the Key Event Comparses with original Data 
export function validateRecordExistsOrNot(field: string, currentInput: any, originalData: any, editModeDataObject?: any) {
    let validData;
    if (editModeDataObject !== undefined) {
        validData = validateRecordExistsOrNotOnEdit(field, currentInput, editModeDataObject)
    }
    if (validData || editModeDataObject == undefined) {
        if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
            if (typeof (currentInput) === 'string') {
                const data = originalData.filter(x => {
                    return x[field].toLowerCase() === currentInput.toLowerCase().trim()
                })
                return data;
            } else if (typeof (currentInput) === 'number') {
                const data = originalData.filter(x => {

                    return x[field] === currentInput
                })
                return data;
            }

        }
    } else {
        return [];
    }
}
export function colorCodeGeneratorForHistory(index: number, field: string, value: any, dataList: any) {
    console.log(index, field, value, dataList);

    if ((index !== null || index !== undefined) && (field !== '' || field !== undefined) && (value !== '' || value !== undefined) && (dataList !== undefined)) {
        console.log(index, field, value, dataList);
        const dataLength = this.dataList.length;
        if (index >= 0 && index <= dataLength) {
            if ((index + 1) === dataLength) {
                return true;
            } else {
                return dataList[index + 1][field] === value
            }

        }
    }
}

