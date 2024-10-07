import Book from './class/book';
import Product from './class/product';
import { IBook, IProduct } from './type';

class ProductFactory {
  static initProduct(product: IProduct, type: string): Product {
    switch (type) {
      case 'Book':
        return new Book(product as IBook);
      default:
        return new Product(product as IProduct);
    }
  }

  static async createProduct(product: IProduct, type: string): Promise<any> {
    const productInstance = ProductFactory.initProduct(product, type);
    return productInstance.createProduct();
  }
}

export default ProductFactory;
