const { execSync } = require('child_process');
const path = require('path');

const name = process.env.npm_config_name;

if (!name) {
  console.error('❌ Missing migration name. Use --npm_config_name=your_name');
  process.exit(1);
}

const filePath = path.join('src', 'database', 'migrations', 'log', `${name}`);

const command = `ts-node ./node_modules/typeorm/cli.js migration:generate ${filePath} -d ./src/config/type-orm-log.config.ts`;

console.log(`📦 Generating migration: ${filePath}.ts`);
execSync(command, { stdio: 'inherit' });
