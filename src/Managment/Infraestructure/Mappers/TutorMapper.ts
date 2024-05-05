export function FromDataToTutor(data:any) {
    return data.map(DataToTutor);
}

function DataToTutor(data:any){
    return {
        "type": "tutor",
        "uuid": data.uuid,
        "attributes": {
            "name": data.name,
            "lastname": data.lastname
        }
    }
}