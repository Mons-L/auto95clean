const ordersDB = require('../../../../../database/orders.db.service');

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}


const handleGet = async (req, res) => {
    const userId = 1
    try {
        let orders = []
        const values = await ordersDB.getOrdersJoinProductsByUserId(userId);

        values.forEach(value => {
            let order = orders.find(order => order.id === value['order_id'])
            if(order){
                order.products.push({
                    id: value.product_id,
                    label: value.label,
                    price: value.price,
                    quantity: value['p.quantity'],
                    imagePath: value.image_path
                })
            }
            else{
                orders.push({
                    id: value['order_id'],
                    products: [
                        {
                            id: value.product_id,
                            label: value.label,
                            price: value.price,
                            quantity: value['p.quantity'],
                            imagePath: value.image_path
                        }
                    ]
                })
            }
        })

        orders = await Promise.all(orders.map(async order => {
            order = {...order, addresses: await ordersDB.getOrderJoinAddressesByOrderId(order.id)}
            return order
        }))
        return res.status(200).json({
            data: { orders: orders },
            error: null
        });
    }
    catch(err){
        const message = '[orders] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}