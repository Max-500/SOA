export function FromDataToStudent(data:any) {
    return data.map(DataToStudent);
}

function DataToStudent(data:any){
    return {
        "type": "student",
        "uuid": data.uuid,
        "attributes": {
            "name": data.name,
            "lastname": data.lastname
        }
    }
}