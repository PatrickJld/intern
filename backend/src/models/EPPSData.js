const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class EPPSData extends Model{}
EPPSData.init(
    {
        test_result_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        jenis_kelamin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pendidikan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kode_epps: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "1: Available, 0: deleted",
        },
    },
    {
        sequelize,
        modelName: "EPPSdata",
        tableName: "epps_data",
    }
);

module.exports = EPPSData;