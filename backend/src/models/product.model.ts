import mongoose, { Document, model, Schema } from 'mongoose';

interface ProductImgType {
  public_id: string;
  url: string;
}

interface IProduct extends Document {
  prdt_name: string;
  prdt_price: number;
  prdt_thumb_img: Array<ProductImgType>;
  description: string;
  prdt_desc_img: Array<ProductImgType>;
  category: mongoose.Types.ObjectId;
  prdt_vote_rate: number;
  stockQuantity: number;
  soldQuantity: number;
  availableQuantity: number;
  totalComment: number;
  tag: Array<string>;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

const productImgSchema = new Schema<ProductImgType>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  { _id: false }
);

const productSchemas = new Schema<IProduct>(
  {
    prdt_name: {
      type: String,
      required: true
    },
    prdt_price: {
      type: Number,
      required: true
    },
    prdt_thumb_img: { type: [productImgSchema], required: true, default: [] },
    description: {
      type: String,
      required: true
    },
    prdt_desc_img: { type: [productImgSchema], required: true, default: [] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    prdt_vote_rate: {
      type: Number,
      default: 0
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0
    },
    soldQuantity: {
      type: Number,
      default: 0
    },
    availableQuantity: {
      type: Number,
      default: 0
    },
    totalComment: {
      type: Number,
      default: 0
    },
    tag: {
      type: [String],
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const ProductModel = model<IProduct>('Product', productSchemas);

export default ProductModel;
