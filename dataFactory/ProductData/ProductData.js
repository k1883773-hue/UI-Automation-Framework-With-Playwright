import { faker } from '@faker-js/faker';
import { Product } from '../../dataObject/Product.js';

export class SearchProductData {

  static createValidSearchData() {

    const product = new Product();
    product.setProductName('Blue Top');
    return product;

  }

  static createInvalidSearchData() {

    const product = new Product();
    product.setProductName(faker.word.words(2));
    return product;

  }
}