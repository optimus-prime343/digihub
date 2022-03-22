import { nanoid } from 'nanoid'
import sharp from 'sharp'

export const resizeProductCoverImage = async (
    uploadedCoverImage: Express.Multer.File
): Promise<string> => {
    const imageName = `product-${nanoid()}-${Date.now()}.jpeg`
    await sharp(uploadedCoverImage.buffer)
        .resize({ width: 600, height: 400 })
        .toFormat('jpeg')
        .jpeg({ quality: 100, chromaSubsampling: '4:4:4', mozjpeg: true })
        .toFile(`${process.cwd()}/public/images/product-images/${imageName}`)
    return imageName
}
