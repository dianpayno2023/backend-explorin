// generate-migration.js
const { execSync } = require('child_process');
const name = process.argv[2];

if (!name) {
  console.error('❌ Migration name is required.\nUsage: npm run generate-migration <migration-name>');
  process.exit(1);
}

const command = `npm run build && ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/data-source.ts src/migrations/${name}`;

console.log(`📦 Generating migration: ${name}`);
try {
  execSync(command, { stdio: 'inherit' });
  console.log('✅ Migration generated successfully.');
} catch (error) {
  console.error('❌ Failed to generate migration.');
  process.exit(1);
}
