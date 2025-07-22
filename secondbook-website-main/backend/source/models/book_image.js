import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BookImage = sequelize.define('BookImage', {
  image_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'book_images',
  timestamps: false,
  underscored: true,
});

export default BookImage;