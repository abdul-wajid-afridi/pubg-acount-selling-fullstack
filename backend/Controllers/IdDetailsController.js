const { IdDetails, sequelize, likes } = require("../models");

// getting id details data
const getIdDetails = async (req, res) => {
  try {
    const result = await IdDetails.findAll();
    res.status(200).json({
      len: result.length,
      result,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// posting id details data
const postIdDetails = async (req, res) => {
  // const profile_url = `/profile/${req.file.filename}`;

  const users_id = req.user.id;
  console.log(req.user);
  const images = req.files;
  const { title, subTitle, discription, price, idLevel } = req.body;
  let gallary = [];

  try {
    if (!title || !subTitle || !discription || !price || !idLevel) {
      res.status(401).json({
        message: "please enter value",
      });
    }
    images.map((it) => {
      return gallary.push({ url: it.filename });
    });
    const postedData = await IdDetails.create({
      image: gallary,
      title,
      subTitle,
      discription,
      price,
      idLevel,
      users_id,
    });
    res.status(200).json({
      status: "success",
      data: postedData,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

// updating id details data
const updateIdDetails = async (req, res) => {
  const id = req.params.id;
  const images = req.files;
  let gallary = [];
  const { title, subTitle, discription, price, idLevel } = req.body;

  images.map((it) => {
    gallary.push({ url: `/profile/${it.filename}` });
  });

  try {
    await IdDetails.update(
      {
        image: gallary,
        title,
        subTitle,
        discription,
        price,
        idLevel,
      },
      { where: { id: id } }
    );
    res.status(200).json({
      status: "success",
      message: "data updated with id " + req.params.id,
    });
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};

// deleting id details data
const deleteIdDetails = async (req, res) => {
  const id = req.params.id;

  try {
    await IdDetails.destroy({ where: { id: id } });
    res.status(200).json({
      status: "success",
      id,
      message: "data deleted with id " + req.params.id,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const getUsersPosts = async (req, res) => {
  try {
    // const usersPost = await IdDetails.findAll({
    //   include: [
    //     {
    //       model: users,
    //       where: { users_id: users.id },
    //     },
    //   ],
    // });
    const usersPost = await IdDetails.findAll({
      where: {
        users_id: req.user.id,
      },
    });
    // const usersPost = await sequelize.query(
    //   "SELECT * FROM idDetails join users on idDetails.users_id=users.id",
    //   {
    //     model: IdDetails,
    //     mapToModel: true,
    //   }
    // );

    res.status(200).json({
      status: "success",
      user: req.user.id,
      len: usersPost.length,
      result: usersPost,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getIdDetails,
  postIdDetails,
  updateIdDetails,
  deleteIdDetails,
  getUsersPosts,
};
