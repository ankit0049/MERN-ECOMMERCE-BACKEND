import mongoose ,{Schema, model} from "mongoose"; 
 

const categorySchema = new Schema({
  label: {
    type : String ,
    required : true ,
    unique : true
  } ,  
  value : { type : String , required : true , unique: true},
 
},{timestamps:true}); 

const virtual = categorySchema.virtual('id');

virtual.get(function(){
  return this._id;
}) 

categorySchema.set('toJSON',{
  virtuals:true ,
  versionKey:true ,
  transform : function (doc , ret){ delete ret._id}

})

export const Category = model("Category" , categorySchema);