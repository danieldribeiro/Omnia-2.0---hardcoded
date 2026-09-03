import { Product, UpdateProduct } from "./product.schema"

const products: Array<Product> = []

export const ProductRepository = {
  existsById(productId: string): boolean {
    return products.some((product => product.id === productId))
  },

  create(product: Product): Product{
    if (this.existsById(product.id)){
      throw new Error('Product already exists')
    }

    products.push(product)

    return product
  },

  getAll(): Array<Product>{
    return [...products]
  },

  getById(productId: string): Product {
    const product = products.find(product => product.id === productId)

    if (!product) {
      throw new Error('Product does not exist')
    }

    return product
  },

  getByCategory(categoryId: string): Array<Product> {
    return products.filter(product => product.categoryId === categoryId)
  },

  update(productId: string, data: UpdateProduct) : Product {
    const product = this.getById(productId)

    Object.assign(product, data)

    return product
  },

  delete(productId: string): boolean {
    const index = products.findIndex(product => product.id === productId)

    if (index === -1) {
      throw new Error('Product does not exist')
    }

    products.splice(index, 1)

    return true
  }
}