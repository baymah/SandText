// //Entity
// import { SubCategory } from '../infra/database/typeorm/entity/SubCategory';
// import { Category } from '../infra/database/typeorm/entity/Category';
import { edekeeSlugify } from '../utils/edekeeslugify';
import { categoryRepo, productPictureRepo, productRepo, subCategoryRepo } from '../repository';
// import { productPictureRepo, productRepo } from '../repository'

import { ProductService } from '../services/ProductService/product.service';
import { ColorService } from '../services/color.service';
import { BrandService } from '../services/brand.service';

import { config } from '../config';
import { nanoid } from 'nanoid';
const AWS = require('aws-sdk');
import multer from 'multer';
import fs from 'fs';

import { Color } from '../infra/database/typeorm/entity/Color';
import { joiValidate } from '../utils/validator';
import { CreateProductDTO, CreateProductDTOSchema } from '../Dtos/CreateProductDto';
import UserActivitiesServices from '../services/UserActivitiesService';
import { PromotionalVideoRepository } from '../repository/implementations/promotional_videos';
// import { loggerUtil } from '../utils';
const s3 = new AWS.S3({
    accessKeyId: config.aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY,
    region: config.aws.AWS_REGION,
});

const updatedProductUpload = async (req: any, res: any) => {
    try {
        const { error, value: vRequest } = joiValidate<CreateProductDTO>(CreateProductDTOSchema, req.body);
        if (error)
            return res.status(200).send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });
        console.log(vRequest, 'VRwquest');
        const colorService = new ColorService();
        const brandService = new BrandService();
        const user = req.requestUser;

        const products = req.files;
        const { name, brand, currency, price, description, categoryId, subCategoryId, colors, size, weight } = req.body;
        if (!products)
            return res.status(200).json({
                success: false,
                message: 'No product picture attached!',
            });
        const product = {
            brand_id: '',
            uuid: user.id,
            name,
            currency,
            colors,
            size,
            weight,
            slug: edekeeSlugify(name),
            description,
            price,
            categoryId,
            subCategoryId,
        };
        const category = await categoryRepo.getCategoryById(categoryId);
        // const catGorise: Category[] | null = await Promise.all(
        //     categoryId.map(async (catId: any) => {
        //         const category = await categoryRepo.getCategoryById(catId);
        //         if (!category) {
        //             return undefined;
        //         }
        //         return category;
        //     }),
        // );
        // console.log(catGorise, 'Photoshop');

        const subCategory = await subCategoryRepo.getSubCategoryById(subCategoryId);
        // const subCategory: SubCategory[] | null = await Promise.all(
        //     subCategoryId.map(async (subCatId: any) => {
        //         const subCategory = await subCategoryRepo.getSubCategoryById(subCatId);
        //         if (!subCategory) {
        //             return undefined;
        //         }
        //         return subCategory;
        //     }),
        // );
        // const subCategory: SubCategory[] | null = await Promise.all(
        //     subCategoryId.map(async (subCatId: any) => {
        //         const subCategory = await subCategoryRepo.getSubCategoryById(subCatId);
        //         if (!subCategory) {
        //             return undefined;
        //         }
        //         return subCategory;
        //     }),
        // );

        console.log(subCategory, 'SubCategory');

        const promiseColor: Color[] | null = await Promise.all(
            colors.map(async (colorId: string) => {
                return await colorService.GetColorById(colorId);
            }),
        );

        const brandObject = await brandService.getById(brand);
        if (!brandObject) return res.json({ success: false, message: 'Brand not found' });

        product.colors = promiseColor.map((color) => color.code);
        const s3Params = products.map((file: any) => {
            return {
                Bucket: config.aws.AWS_BUCKET_NAME,
                Key: `edekee/pictures/${nanoid()}-${file.originalname}`,
                Body: fs.createReadStream(file.path),
                ContentType: file.mimetype,
            };
        });
        product.brand_id = brandObject.id;
        const s3Response = await Promise.all(s3Params.map((param: any) => s3.upload(param).promise()));
        const savedProduct = await productRepo.save(product);

        await Promise.all(
            s3Response.map(async (s3Response: any) => {
                await productPictureRepo.save({
                    picture: s3Response.Location,
                    thumbnail: s3Response.Location,
                    product: savedProduct,
                });
            }),
        );
        const productService = new ProductService();
        const result = await productService.addToCategory(savedProduct.id, category, subCategory);
        if (!result) return res.status(200).json({ message: 'Err', success: false });
        return res.status(200).json({
            message: 'Product saved succesfully',
            data: result,
        });
    } catch (err: any) {
        return res.status(400).json({ message: 'Error', error: err.message });
    }
};
const uploadProduct = async (req: any, res: any) => {
    try {
        const products = req.files;
        const { name, category, slug } = req.body;
        if (!products)
            return res.status(200).json({
                success: false,
                message: 'No product picture attached!',
            });

        const productByNameAndSlug = await productRepo.getProductByEmailOrSlug(name, slug);
        if (productByNameAndSlug)
            return res.status(200).json({
                success: false,
                message: 'Product with name already exist...',
            });
        const savedProduct = await productRepo.save({
            uuid: 'randomuserid',
            name: req.body.name,
            slug,
            description: 'description',
            price: 3000,
        });
        products.map(async (file: any, index: any) => {
            if (file.mimetype === 'text/plain') {
                const params = {
                    Bucket: config.aws.AWS_BUCKET_NAME,
                    Key: `public/text/${index}-${name}-${category}-${nanoid()}.${file.originalname.split('.')[1]}`,
                    Body: fs.createReadStream(file.path),
                    ACL: 'public-read',
                    ContentType: file.mimetype,
                };
                //upload to s3 upload.
                const data = await s3.upload(params).promise();
                console.log({
                    message: `AWS_S3_SUCCESS: ${data.Location}`,
                    data,
                    process: 'upload',
                });
                // const uploadFile = {
                //       video: data.Location,
                //       thumbnail: "https://url.com",
                //       product_id: nanoid(),
                // };
                const savedProductTXTFile = await productPictureRepo.save({
                    picture: data.Location,
                    thumbnail: data.Location,
                    product: savedProduct,
                });
                console.log(savedProductTXTFile, 'SAvedProdictTXTFILE');
            } else {
                const params = {
                    Bucket: config.aws.AWS_BUCKET_NAME,
                    // Key: `images/${index}-${name}-${category}-${nanoid()}.${
                    //       file.originalname.split('.')[1]
                    // }`,
                    Key: `images/${nanoid()}-${file.originalname.split(' ').join('')}`,
                    Body: fs.createReadStream(file.path),
                    // ACL: 'public-read',
                    ContentType: file.mimetype,
                };
                //upload to s3 upload.
                const data = await s3.upload(params).promise();
                console.log({
                    message: `AWS_S3_SUCCESS: ${data.Location}`,
                    data,
                    process: 'upload',
                });
                await productPictureRepo.save({
                    picture: data.Location,
                    thumbnail: data.Location,
                    product: savedProduct,
                });
            }
        });
        return res.status(200).json({ success: true, message: 'Product upload success' });
    } catch (err: any) {
        console.log('AWS_S3_ERROR', { err, process: 'upload' });
        return res.status(500).json({
            message: 'AWS_S3_ERROR',
            success: false,
            error: err.message,
            process: 'upload',
        });
    }
};
const storage = multer.diskStorage({
    filename: function (_req: any, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({ storage });

const list = async (req: any, res: any) => {
    try {
        // const user = req.requestUser
        // console.log(user,":us")
        const productService = new ProductService();
        console.log(req.query.take, req.query.page, 'JAZZWILL');
        let products = await productService.getAll({ take: req.query.take, page: req.query.page });
        res.status(200).json(products);
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            // error: errorHandler.getErrorMessage(err)
            error: err.message,
        });
    }
};
const listProductByVideoId = async (req: any, res: any) => {
    try {
        // const user = req.requestUser
        const promotionalVideoRepository = new PromotionalVideoRepository();
        // const promotionalVideoRecords = await promotionalVideoRepository.getPromotionalVideos();
        const promotionalVideoRecords = await promotionalVideoRepository.findPromotionalVideoById(req.params.videoId);
        console.log(promotionalVideoRecords,"PROMOTIONALVIDEORECORDS")
        if (!promotionalVideoRecords.length)
            return res.status(400).json({ success: false, message: 'Video not found' });
        const productService = new ProductService();
        // let products = await productService.getProductByVideoId(req.params.videoId);
        let products = await productService.getProductByPromoVideoId(req.params.videoId);
        if (!products.length) return res.status(200).json({ success: false, message: 'No product found on the video' });
        return res.status(200).json({
            message: 'Success',
            success: true,
            data: products,
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            // error: errorHandler.getErrorMessage(err)
            error: err.message,
        });
    }
};

const productById = async (req: any, res: any) => {
    try {
        const productService = new ProductService();
        let product = await productService.getById(req.params.id);
        if (!product) {
            return res.status(200).json({
                success: false,
                message: 'Product not found',
            });
        }
        if (req.body.user_id) {
            const userActivitiesService = new UserActivitiesServices();
            const userActivities = await userActivitiesService.create({
                user_id: req.body?.user_id,
                platform: req.headers.portal,
                activity: 'View Video',
                type: 'View Video',
                city: 'Lagos',
                region: 'Ikoyi',
                country: 'Nigeria',
                latitude: '6.45305560',
                longitude: '3.43555560',
                status: 1,
            });

            console.log('USERACTIVITIES', userActivities);
        }
        return res.status(200).json({
            success: true,
            data: product,
            message: 'Product fetch successfull',
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};

const uploadProductMicro = async (req: any, res: any) => {
    // loggerUtil.log(`${message}:${JSON.stringify(user)}`);
    try {
        console.log(req.body, 'REQUETS.BODY');
        let { colors, name, categoryId, subCategoryId, brand, price, description, sizes, weights, currency } = req.body;
        if (typeof colors === 'string') colors = [colors];
        if (typeof sizes === 'string') sizes = [sizes];
        if (typeof weights === 'string') weights = [weights];
        if (typeof categoryId === 'string') categoryId = [categoryId];
        if (typeof subCategoryId === 'string') subCategoryId = [subCategoryId];
        const { error, value: vRequest } = joiValidate<CreateProductDTO>(CreateProductDTOSchema, {
            name,
            categoryId,
            subCategoryId,
            brand,
            price,
            description,
            colors,
            sizes,
            weights,
            currency,
        });
        if (error)
            return res.status(200).send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });
        console.log(vRequest.brand);
        const brandService = new BrandService();
        const brandObject = await brandService.getById(brand);
        if (!brandObject) return res.json({ success: false, message: 'Brand not found' });
        const s3Params = req.files.map((file: any) => {
            return {
                Bucket: config.aws.AWS_BUCKET_NAME,
                Key: `edekee/pictures/${brandObject.name.toLowerCase().replace(' ', '_')}/${nanoid()}-${
                    file.originalname
                }`,
                Body: fs.createReadStream(file.path),
                ContentType: file.mimetype,
            };
        });

        console.log(s3Params, 'SharkParams::');
        const s3Response: any = await Promise.all(s3Params.map((param: any) => s3.upload(param).promise()));
        console.log(s3Response, 'S3Response');
        const result = s3Response.map((s3ResponseObj: any) => s3ResponseObj.Location);
        const user = req.requestUser;
        const product = {
            brand_id: brand,
            uuid: user.id,
            name,
            currency,
            colors,
            size: sizes,
            weight: weights,
            slug: edekeeSlugify(name),
            description,
            price,
            categoryId,
            subCategoryId,
            product_processed_status: 0,
            product_processed_meta: JSON.stringify({
                subCategoryId: subCategoryId,
                categoryId: categoryId,
                imagesLocation: result,
            }),
        };
        const savedProduct = await productRepo.save(product);
        res.send(s3Response[0].Location, 'SavedProduct', savedProduct);
    } catch (err: any) {
        return res.status(400).json({ success: false, error: err.message });
    }
};

export {
    list,
    storage,
    upload,
    uploadProduct,
    productById,
    updatedProductUpload,
    listProductByVideoId,
    uploadProductMicro,
};
