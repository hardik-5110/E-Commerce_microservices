const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    customeId:{type:String},
    items:[
        {
            product:{
                _id:{type:String, require:true},
                name:{type:String},
                desc:{type:String},
                banner:{type:String},
                type:{type:String},
                unit:{type:Number},
                price:{type:Number},
                suplier:{type:String}
            },
            unit:{type:Number, require:true}
        }
    ]
},
{
    tiJSON:{
        transfrom(doc, ret){
            delete ret.__v;
        },
        timestamps:true
    }
});

module.exports = mongoose.model('cart',CartSchema);