import mongoose, { model, Schema } from 'mongoose';

export enum addressType {
  home = 'Home',
  company = 'Company',
  private = 'Private'
}

export type AddressItemType = {
  code: string;
  name: string;
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
      type: { name: { type: String }, code: { type: String } },
      required: true
    },
    address_district: {
      type: { name: { type: String }, code: { type: String } },
      required: true
    },
    address_ward: {
      type: { name: { type: String }, code: { type: String } },
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

const AddressModel = model('Address', addressSchema);

export default AddressModel;
