import { StockMovement } from "./stockMovement.schema"

const stockMovements: Array<StockMovement> = []

export const StockMovementRepository = {
  create(stockMovement: StockMovement): StockMovement {
    const movement = this.getByStockMovementId(stockMovement.id)

    if(movement){
      throw new Error('Stock movement does not exist')
    }

    stockMovements.push(movement)

    return movement
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

  getByProductId(productId: string): StockMovement {
    const movement = stockMovements.find(movement => movement.productId === productId)

    if(!movement){
      throw new Error('Product had not been moved yet')
    }

    return movement
  },
}