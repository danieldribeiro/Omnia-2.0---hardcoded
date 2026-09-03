import { Product, CreateProduct, UpdateProduct } from "./product.schema";
import { CategoryRepository } from '../categories/category.repository'
import { ProductRepository } from "./product.repository";
import { CategoryService } from "../categories/category.service";

export const ProductService = {
  verifyCategory(product: CreateProduct | UpdateProduct) {
    if (product.categoryId){
        const categoryExists = CategoryRepository.existsById(product.categoryId)

        if (!categoryExists){
          throw new Error('Category does not exist')
        }
      }
  },

  validatePackedProduct(product: CreateProduct | UpdateProduct){
    if (product.isPacked && product.quantityPerPack === undefined){
      throw new Error('Packed produt must have quantity per pack set up')
    } else if (!product.isPacked && product.quantityPerPack !== undefined){
      throw new Error('A not packed product must not have quantity per pack set up')
    }
  },

  createProduct(product: CreateProduct): Product {
    this.verifyCategory(product)
    this.validatePackedProduct(product)

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: product.name,
      description: product.description,
      price: product.price,
      cost: product.cost,
      quantity: 0,
      categoryId: product.categoryId,
      expirationDate: product.expirationDate,
      isPacked: product.isPacked,
      quantityPerPack: product.quantityPerPack,
    }

    return ProductRepository.create(newProduct)
  },

  getAllProducts(): Array<Product>{
    return ProductRepository.getAll();
  },

  getProductById(productId: string): Product {
      return ProductRepository.getById(productId)
  },

  getByCategoryId(categoryId: string): Array<Product> {
    const category = CategoryService.getById(categoryId)

    if(!category){
      throw new Error('Category does not exist')
    }
    
    return ProductRepository.getByCategory(categoryId)
  },

  updateProduct(productId: string, data: UpdateProduct): Product{ 
    const product = ProductRepository.getById(productId)
    const newProduct = {...product, ...data}
    
    this.verifyCategory(data)
    this.validatePackedProduct(newProduct)

    return ProductRepository.update(productId, data)
  },

  deleteProduct(productId: string): boolean {
    return ProductRepository.delete(productId)
  }
}