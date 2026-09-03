import * as z from "zod"

export const CategoryFields = z.object({
  name: z.string().max(100).nonempty(),
  description: z.string().max(100).nonempty().optional()
})

export const CategorySchema = CategoryFields.safeExtend({
  id: z.uuid()
})

export const CreateCategorySchema = CategoryFields

export const UpdateCategorySchema = CategoryFields.partial()

export type Category = z.infer<typeof CategorySchema>;

export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;