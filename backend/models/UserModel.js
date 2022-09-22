module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   min: 7,
      //   max: 35,
      // },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      // validate: {
      //   // min: 5,
      //   // max: 15
      // }
    },
  });

  users.associate = (models) => {
    users.hasMany(models.IdDetails, {
      onDelete: "cascade",
      foreignKey: "users_id",
    });

    users.hasMany(models.comments, {
      onDelete: "cascade",
      foreignKey: "users_id",
    });

    users.hasMany(models.likes, {
      onDelete: "cascade",
      foreignKey: "users_id",
    });

    users.hasMany(models.hearts, {
      onDelete: "cascade",
      foreignKey: "users_id",
    });
  };
  return users;
};

// we will import id details model for this down
// users.hasMany(IdDetails, {
//   foreignKey: 'users_id'
// });
// IdDetails.belongsTo(users);
