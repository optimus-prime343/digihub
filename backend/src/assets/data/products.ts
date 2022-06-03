import {
    randImg,
    randNumber,
    randProductDescription,
    randProductName,
    randText,
} from '@ngneat/falso'

import { Product } from '../../products/entities/product.entity'

export const products: Partial<Product>[] = Array.from({ length: 100 })
    .map((_, index) => index)
    .map(() => ({
        coverImage: randImg(),
        name: randProductName(),
        price: randNumber({ min: 1000, max: 10_000 }),
        quantity: randNumber({ min: 1, max: 100 }),
        tags: [randText(), randText(), randText()],
        description: randProductDescription(),
    }))
