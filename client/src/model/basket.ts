export interface Basket {
    id: number
    buyerId: string
    basketItems: BasketItem[]
  }
  
  export interface BasketItem {
    productId: number
    name: string
    unitPrice: number
    imageUrl: string
    brand: string
    category: string
    quantity: number
  }
  