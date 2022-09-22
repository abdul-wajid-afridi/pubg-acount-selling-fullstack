const { comments } = require("../models");

const insertComments = async (req, res) => {
  const id = req.params.id * 1;
  const users_id = req.user.id;
  const userName = req.user.userName;
  // converting the id to number from string
  const { comment_text } = req.body;
  console.log(req.body);
  console.log(comment_text);
  try {
    const result = await comments.create({
      comment_text,
      userName,
      idDetails_id: id,
      users_id,
    });
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await comments.findAll({ where: { idDetails_id: id } });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const DeleteComments = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await comments.destroy({ where: { id: id } });
    res.status(200).json({
      message: "post deleted",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
const UpdateComments = async (req, res) => {
  const id = req.params.id;
  const { comment_text } = req.body;
  try {
    const result = await comments.update(
      {
        comment_text,
      },
      { where: { id: id } }
    );
    res.status(200).json({
      message: "post updated",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
module.exports = {
  insertComments,
  getComments,
  DeleteComments,
  UpdateComments,
};
