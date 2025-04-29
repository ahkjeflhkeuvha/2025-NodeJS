const DataType = require("sequelize");
const sequelize = require("./index");

const Travel = sequelize.define("travelList", {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataType.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "travelList",
})

module.exports = Travel;