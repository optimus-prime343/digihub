/* eslint-disable unicorn/no-null */
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

export const fileFilter: MulterOptions['fileFilter'] = (
    request,
    file,
    callback
): void => {
    if (file.mimetype.startsWith('image')) {
        return callback(null, true)
    }
    callback(new Error('Please upload only image files'), false)
}
