import { nanoid } from 'nanoid'
import sharp from 'sharp'

export const resizeProductImages = (
    uploadedImages: Express.Multer.File[]
): Promise<string[]> => {
    return Promise.all(
        uploadedImages.map(async uploadedImage => {
            const image = `product-${nanoid()}-${Date.now()}.jpeg`
            await sharp(uploadedImage.buffer)
                .resize(600)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(
                    `${process.cwd()}/public/images/product-images/${image}`
                )
            return image
        })
    )
}
