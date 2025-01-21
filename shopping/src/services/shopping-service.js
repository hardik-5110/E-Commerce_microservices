const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async getCart({_id}){
    try {
      const cartItems = await this.repository.Cart(_id);
      return FormateData(cartItems)
    } catch (err) {
      throw err
    }
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // get order details
  async GetOrderDetails(orderId) {
    try {
      const orderDetails = await this.repository.OrderDetails(orderId);
      return FormateData(orderDetails);
    } catch (err) {
      throw new APIError("Order Not Found", err);
    }
  }

  async ManageCart(customerId, item, qty, isRemove){
    try {
      const cartResult = await this.repository.AddCartItem(customerId, item, qty, isRemove);
      return FormateData(cartResult);
    } catch (error) {
      throw err;
    }
  }

  async SubscribeEvents(payload){
 
    const { event, data } =  payload;

    const { userId, product, order, qty } = data;

    switch(event){
      case 'ADD_TO_CART':
          this.ManageCart(userId,product, qty, false);
          break;
      case 'REMOVE_FROM_CART':
          this.ManageCart(userId,product,qty, true);
          break;
      default:
          break;
    }

  }

  async GetOrderPayload(userId, order, event) {
    if(order) {
      const payload = {
        event:event,
        data:{userId, order}
      }
      return FormateData(payload);
    }else{
      return FormateData({error:"No /order is available"});
    }
  }

}

module.exports = ShoppingService;
