import mongoose ,{Schema, model} from "mongoose"; 
 
const UserSchema= new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true, default:'user' },
  addresses: { type: [Schema.Types.Mixed] }, 
  // for addresses, we can make a separate Schema like orders. but in this case we are fine
  name: { type: String },
  salt: Buffer,
  resetPasswordToken: {type: String, default:''}
},{timestamps: true});


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