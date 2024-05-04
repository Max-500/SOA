import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../Database/Config/MySQL/Database";

export class StudentSubjectModel extends Model {
    uuid!:string;
    studen_uuid!:string;
    subject_uuid!:string;
}

StudentSubjectModel.init({
    uuid: { type:DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey:true },
}, { sequelize });