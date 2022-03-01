/* eslint-disable unicorn/no-null */
import multer from 'multer'
import { nanoid } from 'nanoid'
import { extname } from 'node:path'

export const randomFileName: multer.DiskStorageOptions['filename'] = async (
    request,
    file,
    callback
): Promise<void> => {
    const fileName = `${nanoid()}${extname(file.originalname)}`
    return callback(null, fileName)
}
