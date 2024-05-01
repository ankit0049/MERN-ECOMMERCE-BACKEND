import mongoose ,{Schema, model} from "mongoose"; 
 

const UserSchema = new Schema({
  name : { type : String }, 
  email: { type : String , required: true , unique:true}, 
  password : { type : String , required: true }, 
  role: { type : String , required: true , default:'user' }, 
  addresses : { type : [Schema.Types.Mixed]}, 
  orders : { type : [Schema.Types.Mixed]},
 
},{timestamps:true}); 

const virtual = UserSchema.virtual('id');

virtual.get(function(){
  return this._id;
}) 

UserSchema.set('toJSON',{
  virtuals:true ,
  versionKey:true ,
  transform : function (doc , ret){ delete ret._id}

})

export const User = model("User" , UserSchema);