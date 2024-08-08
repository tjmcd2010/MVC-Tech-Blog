// Set up the Owner model
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
class Owner extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Owner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'owner_name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newOwnerData) => {
        newOwnerData.password = await bcrypt.hash(newOwnerData.password, 10);
        return newOwnerData;
      },
      beforeUpdate: async (updatedOwnerData) => {
        updatedOwnerData.password = await bcrypt.hash(updatedOwnerData.password, 10);
        return updatedOwnerData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'owner',
  }
);

module.exports = Owner;
