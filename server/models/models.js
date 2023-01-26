import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const chatModel = sequelize.define("chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chatName: { type: DataTypes.STRING },
  isGroup: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export const messageModel = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING },
});
export const tokenModel = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING }
});

export const userModel = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique:true},
  password: { type: DataTypes.STRING },
  pic: {
    type: DataTypes.STRING,
    defaultValue:
      "anonymous-avatar-icon.jpg",
  },
});


userModel.hasOne(tokenModel);
tokenModel.belongsTo(userModel);

// chatModel.hasOne(messageModel);
// messageModel.belongsTo(chatModel);

messageModel.hasOne(chatModel, {
  foreignKey: "lastedMessage",
});
chatModel.belongsTo(messageModel, {
  foreignKey: "lastedMessage",
});

userModel.hasMany(chatModel, {
  foreignKey: {
    name: "groupAdmin",
  },
});
chatModel.belongsTo(userModel, {
  foreignKey: {
    name: "groupAdmin",
  },
});

chatModel.belongsToMany(userModel, { through: "ChatUser" });
userModel.belongsToMany(chatModel, { through: "ChatUser" });

userModel.hasOne(messageModel, {
  foreignKey: {
    name: "sender",
  },
});
messageModel.belongsTo(userModel, {
  foreignKey: {
    name: "sender",
  },
});
