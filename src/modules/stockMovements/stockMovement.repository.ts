import { StockMovement } from "./stockMovement.schema"

const stockMovements: Array<StockMovement> = []

export const StockMovementRepository = {
  create(stockMovement: StockMovement): StockMovement {
    stockMovements.push(stockMovement)

    return stockMovement
  },

  getAll(): Array<StockMovement>{
    return [...stockMovements]
  },

  getByStockMovementId(stockMovementId: string): StockMovement {
    const stockMovement = stockMovements.find(stockMovement => stockMovement.id === stockMovementId)

    if(!stockMovement){
      throw new Error('Stock Movement does not exist')
    }

    return stockMovement
  },

  getByProductId(productId: string): Array<StockMovement> {
    const movement = stockMovements.filter(movement => movement.productId === productId)

    if(!movement){
      throw new Error('Product had not been moved yet')
    }

    return movement
  },
}