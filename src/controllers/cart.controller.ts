import { Request, Response, NextFunction } from 'express';
import { OrderItemRepoService } from '../services/orderItem.service';
import { cartToDB, getOrderType, OrderRequest } from '../Dtos/OrderDTO';
import { CartDTOSchema, CartRequestDTO, idSchema, idDTO } from '../Dtos/CartDTO';
import { joiValidate } from '../utils/validator';
import { CartService } from '../services/cart.service';
import { UserDTOSchema, UserIdDTO } from '../Dtos/UserDTO';
import { OrderDTOSchema, OrderRequestDTOSchema } from '../Dtos/orderValiation';
import { OrderRepoService } from '../services/OrderService/order.service';

    //check if in use
    export const getOrders = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            // const orderService = new OrderRepoService();
            let { status } = req.query;
            if (!status) status = '';
            const orders = await new OrderRepoService().findAll({});
            return res.status(200).json({ success: true, data: orders })
        } catch (err: any) {
            return res.send(400).json({ success: false, error: err.message });
        }
    };

    //get item from the orderitem table
    export const getItem = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { itemId } = req.params;
            return await new OrderItemRepoService().getItem(itemId).then((result) => {
                res.status(200).json({ success: true, data: result });
            });
        } catch (error: any) {
            return res.send(400).json({ success: false, error: error.message });
        }
    };

    //add item to the order item table
    export const addItem = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const itemOrderDetails: cartToDB = req.body;

            //   return await new OrderItemRepoService(orderItemRepo)
            return await new OrderItemRepoService()
                .addItem(itemOrderDetails)
                .then((result) => {
                    res.status(200).json({ success: true, data: result });
                })
                .catch((error: any) => {
                    res.send(400).json({
                        success: false,
                        error: error.message,
                    });
                });
        } catch (error: any) {
            return res.send(400).json({ success: false, error: error.message });
        }
    };
    //get item's by orderid
    //save array of items 
    //buy items
    //#######error
    export const saveOrder = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { error, value: vRequest } = joiValidate<OrderRequest>(OrderRequestDTOSchema, req.body);
            if (error)
                return res.send({
                    success: false,
                    message: 'Validation(s) error',
                    error: error.message,
                });
            const { userId, address, email, name, note, phone, payment_type, items }: OrderRequest = vRequest;
            // const { userId, address, email, name, note, phone, payment_type, items }: OrderRequest = req.body;

            const order = {
                userId,
                address,
                payment_type,
                email,
                name,
                note,
                phone,
                items,
            };
            const portal = <string>req.headers.portal;
            try {
                const result = await new OrderRepoService().saveOrderOfItems(order, portal);
                return res.json({ success: true, data: result });
            } catch (error: any) {
                return res.json({ success: false, error: error });
            }
        } catch (error: any) {
            return res.sendStatus(400).json({ success: false, error: error.message });
        }
    };

    //get order
    export const getOrder = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { error, value: vRequest } = joiValidate<getOrderType>(OrderDTOSchema, req.body);
            if (error)
                return res.send({
                    success: false,
                    message: 'Validation(s) error',
                    error: error.message,
                });
            const { user_id, order_id } = vRequest;
            return await  await new OrderRepoService()
                .getOrder(user_id, order_id)
                .then((result) => {
                    return res.json({ success: true, data: result });
                })
                .catch((error: any) => {
                    return res.json({ success: false, data: error });
                });
        } catch (error: any) {
            return res.json({ success: false, error: error.message });
        }
    };

    //getAllUsersOrders
    export const getOrdersByUserId = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { error, value: vRequest } = joiValidate<UserIdDTO>(UserDTOSchema, req.params);
            if (error)
                return res.send({
                    success: false,
                    message: 'Validation(s) error',
                    error: error.message,
                });

            const portal = <string>req.headers.portal;
            const { user_id } = vRequest;
            return  await new OrderRepoService()
                .getAllOrdersByuserId(user_id, portal)
                .then((result) => {
                    return res.json({ success: true, data: result });
                })
                .catch((error: any) => {
                    return res.json({ success: false, data: error });
                });
        } catch (error: any) {
            return res.sendStatus(400).json({ success: false, error: error.message });
        }
    };

    //add item to cart latest implementation
    export const addToCart = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { error, value: vRequest } = joiValidate<CartRequestDTO>(CartDTOSchema, req.body);
            if (error)
                return res.send({
                    success: false,
                    message: 'Validation(s) error',
                    error: error.message,
                });

            const user = req.requestUser;
            const user_id = user.id;
            const portal = <string>req.headers.portal;
            return await new CartService()
                .addToCart(vRequest, portal, user_id)
                .then((result) => {
                    return res.json({ success: true, data: result });
                })
                .catch((error: any) => {
                    return res.json({ success: false, data: error });
                });
        } catch (error: any) {
            return res.sendStatus(400).json({ success: false, error: error.message });
        }
    };

    //get all cart items for user
    export const getUserCartItems = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { error, value: vRequest } = joiValidate<UserIdDTO>(UserDTOSchema, req.params);
            if (error)
                return res.send({
                    success: false,
                    message: 'Validation(s) error',
                    error: error.message,
                });

            const portal = <string>req.headers.portal;
            const { user_id } = vRequest;
            return await new CartService()
                .getAllActiveCartItems(user_id, portal)
                .then((result) => {
                    return res.json({ success: true, data: result });
                })
                .catch((error: any) => {
                    return res.json({ success: false, data: error });
                });
        } catch (error: any) {
            return res.sendStatus(400).json({ success: false, error: error.message });
        }
    };

    //remove item from cart
    export const removeItemFromCart = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            console.log("i got here ny ge ************")
            const { error, value: vRequest } = joiValidate<idDTO>(idSchema, req.params);
            if (error)
                return res.send({
                    success: false,
                    message: 'Validation(s) error',
                    error: error.message,
                });
            const { id } = vRequest;

            return await new CartService()
                .removeFromCart(id)
                .then((result) => {
                    return res.json({
                        message: 'Product successfully removed from cart',
                        success: true,
                        data: result,
                    });
                })
                .catch((error: any) => {
                    return res.json({ success: false, data: error });
                });
        } catch (error: any) {
            return res.sendStatus(400).json({ success: false, error: error.message });
        }
    };

    //export purchase cartItems
    export const purchaseCartItems = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { user_id, product_id_array } = req.body;

            return await new CartService()
                .purchaseCartItems(user_id, product_id_array)
                .then((result) => {
                    return res.json({ success: true, data: result });
                })
                .catch((error: any) => {
                    return res.json({ success: true, data: error });
                });
        } catch (error: any) {
            return res.json({ success: false, error: error.message });
        }
    };
// }

