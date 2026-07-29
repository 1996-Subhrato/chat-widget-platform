import crypto from 'crypto';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('widget_themes', [
    {
      id: crypto.randomUUID(),
      user_id: null, // Null indicates global system presets
      theme_name: 'Ocean',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      user_id: null,
      theme_name: 'Sunset',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      user_id: null,
      theme_name: 'Forest',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      user_id: null,
      theme_name: 'Midnight',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      user_id: null,
      theme_name: 'Minimal',
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('widget_themes', {
    theme_name: ['Ocean', 'Sunset', 'Forest', 'Midnight', 'Minimal']
  }, {});
}
