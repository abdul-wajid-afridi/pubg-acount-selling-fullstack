const { likes, hearts, IdDetails, sequelize } = require("../models");
// like posts
const LikePost = async (req, res) => {
  const id = req.body.idDetails_id;
  console.log("body data", id + "user id" + req.user.id);

  const user_id = req.user.id;

  try {
    const isLike = await likes.findOne({
      where: { users_id: user_id, idDetails_id: id },
    });
    if (!isLike) {
      const result = await likes.create({
        idDetails_id: id,
        users_id: user_id,
      });
      // it creates an extra field with creates method so i will find another way with update method
      res.status(200).json({
        message: "post liked",
        result,
      });
    } else {
      const result = await likes.destroy({
        where: { idDetails_id: id, users_id: user_id },
      });
      res.status(200).json({
        message: "post Unliked",
        result,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

// likes.findAll({
//      attributes: [sequelize.fn("SUM", sequelize.col("idDetails_id"))],

//      raw: true,
// })
// like posts
const GiveHeart = async (req, res) => {
  const id = req.body.idDetails_id;
  const user_id = req.user.id;
  //   const user_id = "5";
  console.log("body data", id + "user id" + req.user.id);
  try {
    const Found = await hearts.findOne({
      where: { users_id: user_id, idDetails_id: id },
    });
    if (!Found) {
      const result = await hearts.create({
        idDetails_id: id,
        users_id: user_id,
      });
      res.status(200).json({
        message: "post liked",
        result,
      });
    } else {
      const result = await hearts.destroy({
        where: { idDetails_id: id, users_id: user_id },
      });
      res.status(200).json({
        message: "post Unliked",
        result,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const getAllHearts = async (req, res) => {
  const user_id = req.user.id;
  try {
    // const result = await hearts.findAll({
    //   where: {
    //     $or: [{ "$IdDetails.id$": "$hearts.idDetails_id$" }],
    //   },
    //   include: [
    //     {
    //       model: IdDetails,
    //       required: false,
    //     },
    //   ],
    // });
    //   hearts.findAll({
    //     where: {
    //         $or: [
    //             {'$B.userId$' : 100},
    //             {'$C.userId$' : 100}
    //         ]
    //     },
    //     include: [{
    //         model: B,
    //         required: false

    //     }, {
    //         model: C,
    //         required: false
    //     }]
    // })
    //     SELECT image,iddetails_id,hearts.id,iddetails.users_id
    // from hearts
    //     JOIN iddetails ON iddetails.id = hearts.idDetails_id
    const result = await sequelize.query(
      `SELECT *
    from hearts
        JOIN iddetails ON iddetails.id = hearts.idDetails_id`,
      {
        model: IdDetails,
        mapToModel: true,
      }
    );
    res.status(200).json({
      statuses: "success",
      result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

// likes.findAll({
//      attributes: [sequelize.fn("SUM", sequelize.col("idDetails_id"))],

//      raw: true,
// })

module.exports = {
  LikePost,
  GiveHeart,
  getAllHearts,
};
