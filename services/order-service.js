// const sequelize = require("../controller/routes/connection");
const sequelize = require("../database/connection");

const createOrder = async (user, paymentMethod, products) => {
  sequelize
    .query(
      "INSERT INTO `order` (userId, status, hour, paymentMethod) VALUES (:userId, :status,  CURTIME(), :paymentMethod)",
      {
        replacements: {
          userId: user.id,
          status: "new",
          paymentMethod: paymentMethod,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    )
    .then((result) => {
      const orderId = result[0];

      products.forEach((product) => {
        sequelize.query(
          `INSERT INTO map_order_product (orderId, productId, amount, total) VALUES(:orderId, :productId, :amount, ${product.amount} * (select price from product where id = ${product.id}))`,
          {
            replacements: {
              orderId: orderId,
              productId: product["id"],
              amount: product["amount"],
            },
            type: sequelize.QueryTypes.INSERT,
          }
        ).catch((err) => {
            console.log(`ERROR ${err}`);
        });
      });
      return true;
    })
    .catch((err) => {
        return false;
    });
};

const myOrder = async (userId) => {
    return await sequelize.query("select status, hour, order.id, paymentMethod, userName, user.id as userId, address from `order` inner join user on `order`.userId = user.id where userId =" + userId, {
        type: sequelize.QueryTypes.SELECT
    })
}

const detailedOrders = async () => {
    return await sequelize.query("select status, hour, order.id, paymentMethod, userName, user.id as userId, address from `order` inner join user on `order`.userId = user.id", {
        type: sequelize.QueryTypes.SELECT
    })
}

const totalOrder = async (id, hour) => {
    return await sequelize.query("select sum(total) as total from `order` inner join map_order_product on map_order_product.orderId = order.id inner join product on map_order_product.productId = product.id where hour = :hour and userId = :id",{
        replacements : {
            hour: hour,
            id: id
        },
        type: sequelize.QueryTypes.SELECT
    })
}

const orderDescription = async (userId, hour) => {
    return await sequelize.query("select amount, name from `order` inner join map_order_product on map_order_product.orderId = order.id inner join product on map_order_product.productId = product.id where hour = " + '"' + hour + '"' + " and userId = " + userId, {
        type: sequelize.QueryTypes.SELECT
    });
}

const getOrderById = async (id) => {
    const result = await sequelize.query("select * from `order` where id = :id", {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
            id: id
        }
    })

     return result.length === 1
}

const updateOrder = async (orderId, orderStatus)  => {
    return sequelize.query("UPDATE `order` SET status = :status where id = :id", {
        replacements: {
            id: orderId,
            status: orderStatus
        },
        type: sequelize.QueryTypes.UPDATE
    })
}

const orderExists = async (id) => {
  const query = await sequelize.query("select * from `order` where id = :id", {
    replacements: {
      id: id
    },
    type: sequelize.QueryTypes.SELECT
  })

  return query.length === 1;
}

const deleteOrdersList = async (id) => {
  
  const order = await orderExists(id);

  if (order) {
    console.log('Exists');
    await sequelize.query("delete from map_order_product where orderId = :id ", {
      replacements: {
        id: id,
      },
      type : sequelize.QueryTypes.DELETE
    });
    return true;
  } else {
    console.log('Doesn´t exists');
    return false;
  }

}

const deleteOrder = async (id) => {

  const deleteOrder = await deleteOrdersList(id);

  if (deleteOrder) {
    
    await sequelize.query("delete from `order` where id = :id", {
      replacements: {
        id: id
      },
      type: sequelize.QueryTypes.DELETE
    })
    console.log('WELL');
    return Promise.resolve('Order deleted successdully');
  } else {
    console.log('BAD');
    return Promise.reject(new Error('Order doesn´t exists'));
  }
}

module.exports = {
  createOrder,
  myOrder,
  orderDescription,
  totalOrder,
  detailedOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
