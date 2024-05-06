import express from 'express';
import {createOrder , deleteOrder , updateOrder , fetchAllOrders ,fetchOrdersByUser} from '../controller/Order.controller.js'

const router = express.Router();
//  /orders is already added in base path
router.post('/', createOrder)
      .get('/own/', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/',fetchAllOrders)


export default router;
