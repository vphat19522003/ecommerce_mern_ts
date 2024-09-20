import mongoose, { Schema } from 'mongoose';

enum addressType {
  home = 'Home',
  company = 'Company',
  private = 'Private'
}

type AddressItemType = {
  code: string;
  text: string;
};

interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  address_detail: string;
  address_street: string;
  address_city: AddressItemType;
  address_district: AddressItemType;
  address_ward: AddressItemType;
  address_type: addressType;
  isSetDefault: boolean;
}

const addressSchema = new Schema<IAddress>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    address_detail: {
      type: String,
      required: true
    },
    address_street: {
      type: String,
      required: true
    },
    address_city: {
      text: { type: String },
      code: { type: String },
      required: true
    },
    address_district: {
      text: { type: String },
      code: { type: String },
      required: true
    },
    address_ward: {
      text: { type: String },
      code: { type: String },
      required: true
    },
    address_type: {
      type: String,
      enum: Object.values(addressType),
      default: addressType.home,
      required: true
    },
    isSetDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const AddressModel = mongoose.model('Address', addressSchema);

export default AddressModel;
