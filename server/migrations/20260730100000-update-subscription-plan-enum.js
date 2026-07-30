export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('subscriptions', 'plan_type', {
    type: Sequelize.ENUM('trial', 'basic', 'pro'),
    allowNull: false,
    defaultValue: 'trial'
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('subscriptions', 'plan_type', {
    type: Sequelize.ENUM('trial', 'paid'),
    allowNull: false,
    defaultValue: 'trial'
  });
}
