import { CategoryRepository } from "./category.repository"
import { Category, CreateCategory, UpdateCategory } from "./category.schema"

export const CategoryService = {
  createCategory(category: CreateCategory): Category{
    const newCategory = {id: crypto.randomUUID(), ...category}

    return CategoryRepository.create(newCategory)
  },

  getAll(): Array<Category>{
    return CategoryRepository.getAll()
  },

  getById(categoryId: string): Category{
    return CategoryRepository.getById(categoryId)
  },

  update(categoryId: string, data: UpdateCategory): Category {
    const category = this.getById(categoryId)

    const updatedCategory = CategoryRepository.update(categoryId, data)

    return updatedCategory
  },

  delete(categoryId: string): boolean{
    return CategoryRepository.delete(categoryId)
  }
}