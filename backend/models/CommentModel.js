module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define("comments", {
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return comments;
};
