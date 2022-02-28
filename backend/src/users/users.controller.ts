import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { Role } from '../common/types'
import { GetUser } from '../decorators/getUser.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwtAuth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { fileFilter } from '../helpers/fileFilter'
import { randomFileName } from '../helpers/randomFileName'
import { UpdateMerchanStatusDto } from '../merchants/dtos/updateMerchantStatus.dto'
import { UpdateUserDto } from './dtos/updateUser.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    public findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    public updateUser(
        @GetUser() user: User,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User | undefined> {
        console.log(`Updating ${user}`)
        return this.usersService.updateUser(user, updateUserDto)
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update-merchant-status/:merchantId')
    public updateMerchantStatus(
        @Param('merchantId') merchantId: string,
        @Body() updateMerchantStatusDto: UpdateMerchanStatusDto
    ): Promise<string> {
        return this.usersService.updateMerchantStatus(
            merchantId,
            updateMerchantStatusDto
        )
    }

    @UseGuards(JwtAuthGuard)
    @Patch('upload-profile-image')
    @UseInterceptors(
        FileInterceptor('profileImage', {
            fileFilter,
            storage: diskStorage({
                filename: randomFileName,
                destination: `${process.cwd()}/public/images/profile-images`,
            }),
        })
    )
    public updateProfileImage(
        @GetUser() user: User,
        @UploadedFile() file: Express.Multer.File
    ): Promise<string> {
        return this.usersService.updateProfileImage(user, file.filename)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    public getMe(@GetUser() user: User): User | undefined {
        return user
    }
}
