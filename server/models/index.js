import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';

const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

// Create database connection instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Import model definitions
import UserDefine from './user.js';
import SubscriptionDefine from './subscription.js';
import ApiKeyDefine from './apiKey.js';
import WidgetThemeDefine from './widgetTheme.js';

// Initialize models
const User = UserDefine(sequelize);
const Subscription = SubscriptionDefine(sequelize);
const ApiKey = ApiKeyDefine(sequelize);
const WidgetTheme = WidgetThemeDefine(sequelize);

// Centralize model associations configuration
// 1. User hasOne Subscription / Subscription belongsTo User
User.hasOne(Subscription, { foreignKey: 'user_id', as: 'subscription', onDelete: 'CASCADE' });
Subscription.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 2. User hasMany ApiKeys / ApiKey belongsTo User
User.hasMany(ApiKey, { foreignKey: 'user_id', as: 'apiKeys', onDelete: 'CASCADE' });
ApiKey.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 3. User hasOne WidgetTheme / WidgetTheme belongsTo User
User.hasOne(WidgetTheme, { foreignKey: 'user_id', as: 'widgetTheme', onDelete: 'SET NULL' });
WidgetTheme.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

const db = {
  sequelize,
  Sequelize,
  User,
  Subscription,
  ApiKey,
  WidgetTheme
};

export { sequelize, Sequelize, User, Subscription, ApiKey, WidgetTheme };
export default db;
