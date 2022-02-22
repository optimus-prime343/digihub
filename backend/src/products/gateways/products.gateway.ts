import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
} from '@nestjs/websockets'

@WebSocketGateway()
export class ProductsGateway {
    @SubscribeMessage('fetch-all-products')
    handleFetchAllProducts(
        @MessageBody('name') data: string
    ): WsResponse<unknown> {
        console.log('FETCH ALL PRODUCTS EVENT EMITTED BY CLIENT', data)
        const event = 'fetch-all-products'
        return { event, data }
    }
}
