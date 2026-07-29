import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ApiKey = sequelize.define('ApiKey', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key_prefix: {
      type: DataTypes.STRING,
      allowNull: false
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'api_keys',
    underscored: true,
    timestamps: true
  });

  return ApiKey;
};
