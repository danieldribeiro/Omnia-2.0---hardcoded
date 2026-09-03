import { Category, UpdateCategory } from "./category.schema"

const categories: Array<Category> = [
  {id: crypto.randomUUID(), name: "Doces"},
  {id: crypto.randomUUID(), name: "Salgados"},
  {id: crypto.randomUUID(), name: "Insumos"},
  {id: crypto.randomUUID(), name: "Descartáveis"},
  {id: crypto.randomUUID(), name: "Bebidas"},
  {id: crypto.randomUUID(), name: "Leite"},
]

export const CategoryRepository = {
  existsById(categoryId: string): boolean {
    return categories.some(category => category.id === categoryId)
  },

  create(category: Category): Category{
    if(this.existsById(category.id)){
      throw new Error('Category already exist')
    }

    categories.push(category)

    return category
  },

  getAll(): Array<Category>{
    return categories
  },

  getById(categoryId: string): Category {
    const category = categories.find(category => category.id === categoryId)

    if(!category)
      throw new Error('Category does not exist')

    return category
  },

  update(categoryId: string, data: UpdateCategory): Category {
    const category = this.getById(categoryId)

    Object.assign(category, data)

    return category
  },

  delete(categoryId: string): boolean{
    const index = categories.findIndex(category => category.id === categoryId)

    if(index === - 1){
      throw new Error('Category does not exist')
    }

    categories.splice(index, 1)

    return true
  }
}