const { Orders } = require('../db/Orders');
const { Users } = require('../db/User').Users;
const errorHandler = require('../utils/errorHandler');

// все заказы
module.exports.getAll = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(orders);
  } catch (e) {
    errorHandler(res, e);
  }
};

// только мои заказы

module.exports.getMyAll = async (req, res) => {
  try {
    const currentUser = await Users.findByPk({
      where: {
        id: req.user.id,
      },
    });

    if (currentUser) {
      console.log('User id: ', currentUser.id);
    }
    const orders = await currentUser.getOrders();
    res.status(200).json(orders);
  } catch (e) {
    errorHandler(res, e);
  }
};

// когда просмотреть заказ подробнее
module.exports.getById = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    res.status(200).json(order);
    if (order) {
      console.log(order);
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

// создание заказа
module.exports.create = async (req, res) => {
  try {
    console.log(Array.isArray(req.body.categories), typeof req.body.categories);
    console.log(req.body.categories);
    const orders = await new Orders({

      categories: req.body.categories,
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      date: req.body.date,
      imageSrc: req.file ? req.file.path : ' ',

    }).save();
    res.status(201).json(orders);
  } catch (e) {
    console.error(e);
  }
};

// удаление заказа
module.exports.remove = async (req, res) => {
  try {
    const currentUser = await Users.findByPk({
      where: {
        id: req.user.id,
      },
    });

    if (currentUser) {
      console.log('User id: ', currentUser.id);
    }

    await currentUser.getOrders().destroy({
      where: {
        _id: req.params.id,
      },
    });
    res.status(200).json({
      message: 'Заказ был удален',
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
