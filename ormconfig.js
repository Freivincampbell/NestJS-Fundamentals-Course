module.exports = {
	type: 'postgres',
	host: 'postgres',
	port: 5432,
	username: 'freivincampbell',
	password: 'pass123',
	database: 'postgres',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
	cli: {
		migrationsDir: 'src/migrations'
	}
};
