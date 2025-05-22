import { Products } from "../entity/products.entity.js";
import { Orders } from "../entity/orders.entity.js";    
import { Users } from "../entity/users.entity.js";

export const setupSocket = (socketio) => {
    socketio.on("connection", (socketLocal) => {
        console.log("Socket connected");

        socketLocal.on("update-delivery-time", async (payload) => {
            
            console.log(`por favor espere el tiempo de entrega se esta actualizando: ${payload.orderId}`);

          
            const updatedDeliveryTime = {
                orderId: payload.orderId,
                estimatedDeliveryTime: payload.estimatedDeliveryTime
            };

            socketio.emit("tiempo de entrega actualizado", updatedDeliveryTime);
        });
    });
};
