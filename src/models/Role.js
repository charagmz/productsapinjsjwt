import {Schema, model} from "mongoose";

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
    {
        name: String,
    }, 
    {
        versionKey: false //para que no le añada __v
    }
);

//{name: "admin", __id: "11311kjlk1jl1"}


export default model('Role', roleSchema); //para exportar el modelo y no un schema


