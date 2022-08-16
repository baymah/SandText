import { CategoryService } from '../services/Category/category.service'
export const create = async (req: any, res: any, _next: any) => {
    const { name, slug, description } = req.body
    const categoryService = new CategoryService()
    try {
        const result = await categoryService.insertCategoryData({
            name,
            slug,
            description,
        }) ///some data to save here
        res.status(201).json({
            status: true,
            message: 'Category created successfully',
            data: result,
        })
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        })
    }
}

export const list = async (_req: any, res: any, _next: any) => {
    try {
        console.log("Want to implement testing:::")
        const categoryService = new CategoryService()
        const result = await categoryService.getAll()
        if (!result)
            return res.status(200).json({
                success: false,
                message: 'No category founds',
            })
        res.status(200).json({
            success: true,
            message: 'Category fetch successfully',
            data: result,
        })
    } catch (err: any) {
        return res.status(400).json({
            error: err.message,
        })
    }
}

export const categoryByID = async (req: any, res: any, _next: any) => {
    try {
        const categoryService = new CategoryService()
        const { id } = req.params
        let category = await categoryService.getById(id)
        if (!category)
            return res.status(200).json({
                success: false,
                error: 'Category not found',
            })
        return res.status(200).json({
            success: true,
            message: 'Category fetch successfully',
            data: category,
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: 'Could not retrieve category',
        })
    }
}
