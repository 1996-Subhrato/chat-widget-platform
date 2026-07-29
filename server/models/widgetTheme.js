import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const WidgetTheme = sequelize.define('WidgetTheme', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true, // Nullable to accommodate global system theme presets
      references: {
        model: 'users',
        key: 'id'
      }
    },
    theme_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'widget_themes',
    underscored: true,
    timestamps: true
  });

  return WidgetTheme;
};
