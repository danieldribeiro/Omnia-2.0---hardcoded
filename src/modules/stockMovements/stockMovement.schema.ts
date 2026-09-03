import * as z from "zod"
import { MovementReason, MovementType, MovementUnit } from "./stockMovement.enums"

export const StockMovementFields = z.object({
  productId: z.uuid(),
  type: z.enum(MovementType),
  quantity: z.number().gt(0),
  unit: z.enum(MovementUnit),
  reason: z.enum(MovementReason)
})

export const StockMovementSchema = StockMovementFields.safeExtend({
  id: z.uuid()
})

export const StockMovementCreateSchema = StockMovementFields

export type StockMovement = z.infer<typeof StockMovementSchema>;

export type CreateStockMovement = z.infer<typeof StockMovementSchema>;
