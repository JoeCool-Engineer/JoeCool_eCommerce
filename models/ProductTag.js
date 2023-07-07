const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    //through table assigns a new primary key for each unique pair of product_id and tag_id
    id: {
      type:  DataTypes.INTEGER,//2
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
      },
      product_id: { //2
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id',
        },
      },
      tag_id: { //1
        type: DataTypes.INTEGER,
        references: {
            model: 'tag',
            key: 'id',
        },
      },  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
