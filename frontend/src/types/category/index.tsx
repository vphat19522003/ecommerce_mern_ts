export type CategoryResponseType = {
  _id: string;
  name: string;
  description: string;
  categoryImg: {
    category_img_url: string;
    category_img_public_id: string;
  };
  parentCategory: string;
  subCategories: string[];
  createdAt: string;
};
