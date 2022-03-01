import { nanoid } from 'nanoid'
import sharp from 'sharp'

export const resizeProductCoverImage = async (
    uploadedCoverImage: Express.Multer.File
): Promise<string> => {
    const imageName = `product-${nanoid()}-${Date.now()}.jpeg`
    await sharp(uploadedCoverImage.buffer)
        .resize(600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`${process.cwd()}/public/images/product-images/${imageName}`)
    return imageName
}
