import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'

import { Role } from '../common/types'
import { GetUser } from '../decorators/get-user.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { User } from '../users/entities/user.entity'
import { CartsService } from './carts.service'
import { CreateCartDto } from './dtos/create-cart.dto'
import { UpdateCartDto } from './dtos/update-cart.dto'
import { Cart } from './entities/cart.entity'

@Roles(Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @Post()
    public create(
        @GetUser() user: User,
        @Body() createCartDto: CreateCartDto
    ): Promise<Cart> {
        return this.cartsService.create(user, createCartDto)
    }

    @Get()
    findAll(@GetUser() user: User): Promise<Cart[]> {
        return this.cartsService.findAll(user)
    }

    @Get(':id')
    findOneBy(@GetUser() user: User, @Param('id') id: string): Promise<Cart> {
        return this.cartsService.findOneBy(user, id)
    }

    @Patch(':id')
    update(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body() updateCartDto: UpdateCartDto
    ): Promise<Cart> {
        return this.cartsService.update(user, id, updateCartDto)
    }

    @Delete(':id')
    remove(@GetUser() user: User, @Param('id') id: string): Promise<string> {
        return this.cartsService.remove(user, id)
    }
}
