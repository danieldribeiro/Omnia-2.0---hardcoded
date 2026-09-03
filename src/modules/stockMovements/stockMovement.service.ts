import { ProductRepository } from "../products/product.repository";
import { StockMovementRepository } from "./stockMovement.repository";
import { StockMovement } from "./stockMovement.schema";

export const StockMovementService = {
  verifyProduct(productId: string): boolean{
    const product = ProductRepository.getById(productId)

    if(!product){
      throw new Error('Product does not exist')
    }

    return true
  },

  create(stockMovement: StockMovement): StockMovement{
    this.verifyProduct(stockMovement.productId)

    const product = ProductRepository.getById(stockMovement.productId)
    const movement = StockMovementRepository.getByStockMovementId(stockMovement.id)

    if(movement){
      throw new Error('Duplicated stock movement')
    }

    if(stockMovement.type === 'ENTRY' && stockMovement.reason !== 'BUY'){
      throw new Error('Invalid reason for entry movement')
    } else if (stockMovement.type === 'EXIT' && stockMovement.reason === 'BUY'){
      throw new Error('Invalid reason for exit movement')
    }

    if(stockMovement.unit === 'PACK' && !product.quantityPerPack){
      throw new Error('Product is not packed')
    } else if(stockMovement.unit === 'PACK' && product.quantityPerPack){
      product.quantity += stockMovement.quantity * product.quantityPerPack
    } else {
      product.quantity += stockMovement.quantity
    }

    const newMovement: StockMovement = { 
      id: crypto.randomUUID(),
      productId: stockMovement.productId,
      quantity: stockMovement.quantity,
      reason: stockMovement.reason,
      type: stockMovement.type,
      unit: stockMovement.unit
    }

    return StockMovementRepository.create(newMovement)
  },

  getAll(): Array<StockMovement> {
    return StockMovementRepository.getAll()
  },

  getByStockMovementId(stockMovementId: string): StockMovement {
    return StockMovementRepository.getByStockMovementId(stockMovementId)
  },

  getByProductId(productId: string): Array<StockMovement> {
    return StockMovementRepository.getByProductId(productId)
  },

  getByCategoryId(categoryId: string): Array<StockMovement>{
    const products = ProductRepository.getAll()
    const categoryProducts = products.filter(product => product.categoryId === categoryId)

    const movementedProducts: Array<StockMovement> = []

    for(let product of categoryProducts){
      let stockMovement = this.getByProductId(product.id)

      if(stockMovement.productId === product.id)
        movementedProducts.push(stockMovement)
    }

    return movementedProducts
  }
}