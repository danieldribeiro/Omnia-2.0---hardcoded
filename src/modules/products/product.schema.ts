import * as z from "zod"; 

export const ProductFields = z.object({
  name: z.string().max(100).nonempty(),
  description: z.string().max(100).nonempty().optional(),
  price: z.number().gt(0),
  cost: z.number().gt(0),
  categoryId: z.uuid().optional(),
  expirationDate: z
    .date()
    .refine(
      (val) => val > new Date(),
      { message: "A data de validade deve ser futura" }
    )
    .optional(),
  isPacked: z.boolean(),
  quantityPerPack: z.number().gt(0).optional()
});

export const ProductSchema = ProductFields.safeExtend({
  id: z.uuid(),
  quantity: z.number().gte(0),
})
.refine((data) => {
            if (data.isPacked){
              return data.quantityPerPack !== undefined
            } 

            return data.quantityPerPack === undefined
          },
          {message: "quantityPerPack deve ser informado somente para produtos embalados"}
        )

export const CreateProductSchema = ProductFields
.refine((data) => {
            if (data.isPacked){
              return data.quantityPerPack !== undefined
            } 

            return data.quantityPerPack === undefined
          },
          {message: "quantityPerPack deve ser informado somente para produtos embalados"}
        )

export const UpdateProductSchema = ProductFields.partial();

export type Product = z.infer<typeof ProductSchema>;

export type CreateProduct = z.infer<typeof CreateProductSchema>;

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;