import { CategoryService } from '../services/Category/category.service'
import { SubCategoryService } from '../services/subCategory.service'
import { s3Upload } from '../services/s3Service'
const create = async (req: any, res: any, _next: any) => {
      const { name, slug, description, categoryId } = req.body
      try {
            const result = await s3Upload(req.file)

            const categoryService = new CategoryService()
            const subCategoryService = new SubCategoryService()
            const category = await categoryService.getById(categoryId)
            if (!category)
                  return res.status(200).json({
                        success: false,
                        message: 'category not found!!!',
                  })
            const subCategoryData = {
                  name,
                  slug,
                  image_url: result.Location,
                  description,
                  category,
            }
            subCategoryService.insertCategoryData(subCategoryData)

            return res.status(201).json({
                  status: true,
                  message: 'Subcategory created successfully',
                  //   data: 'category',
            })
      } catch (err: any) {
            return res.status(400).json({
                  success: false,
                  error: err.message,
            })
      }
}
const list = async (_req: any, res: any, _next: any) => {
      try {
            const subCategoryService = new SubCategoryService()
            const result = await subCategoryService.getAll()
            if (!result)
                  return res.status(200).json({
                        success: false,
                        message: 'No subcategory founds',
                  })
            res.status(200).json({
                  success: true,
                  message: 'Subcategory fetch successfully',
                  data: result,
            })
      } catch (err: any) {
            return res.status(400).json({
                  error: err.message,
            })
      }
}
const getSubcategoryByCategory = async (req: any, res: any, _next: any) => {
      try {
            const subCategoryService = new SubCategoryService()
            const result = await subCategoryService.getSubcategoryByCategory(req.params.id)
            
            if (!result)
                  return res.status(200).json({
                        success: false,
                        message: 'No subcategory founds',
                  })
            res.status(200).json({
                  success: true,
                  message: 'Subcategory fetch successfully',
                  data: result,
            })
      } catch (err: any) {
            return res.status(400).json({
                  error: err.message,
            })
      }
}

export { create, list,getSubcategoryByCategory }
