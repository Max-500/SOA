export function FromDataToSubject(data:any) {
    return data.map(DataToSubject);
}

function DataToSubject(data:any){
    return {
        "type": "subject",
        "uuid": data.uuid,
        "attributes": {
            "name": data.name,
        }
    }
}