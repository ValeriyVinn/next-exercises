"use strict";

// Операція 1 повертає `user`
fetchUser(userId, (err, user) => {
    // Операція 2 ВМАГАЄ `user.id`
    fetchOrders(user.id, (err, orders) => {
        // Операція 3 ВИМАГАЄ `orders[0].id` і може використовувати `user.name` з верхньої області видимості
        fetchOrderDetails(orders[0].id, (err, details) => {
            console.log(`Користувач ${user.name} купив ${details.itemName}`);
        });
    });
});