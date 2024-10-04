import Product from './class/product';
import { ProductType } from './type';

class ProductFactory {
  static initProduct(product: ProductType, type: string): Product {
    switch (type) {
      case 'Book':
        return 0; //new BookProduct(product as BookProductType);
      default:
        return 0; //new Product(product as ProductType);
    }
  }

  static async createProduct(product: ProductType, type: string): Promise<void> {
    const productInstance = ProductFactory.initProduct(product, type);
    //return productInstance.createProduct();
  }
}

export default ProductFactory;
