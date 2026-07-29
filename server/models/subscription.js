import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Subscription = sequelize.define('Subscription', {
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
    plan_type: {
      type: DataTypes.ENUM('trial', 'paid'),
      allowNull: false,
      defaultValue: 'trial'
    },
    status: {
      type: DataTypes.ENUM('active', 'expired', 'cancelled'),
      allowNull: false,
      defaultValue: 'active'
    },
    trial_started_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    trial_ends_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'subscriptions',
    underscored: true,
    timestamps: true
  });

  return Subscription;
};
