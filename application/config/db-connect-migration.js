const Sequelize = require('sequelize')

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: 'mysql',
		host: process.env.DB_HOST,
		define: {
			freezeTableName: true,
		},
		charset: 'utf8mb4',       // Specifies the character set for the MySQL connection (utf8mb4 supports more characters like emojis)
		collate: 'utf8mb4_general_ci', // Specifies the collation for the MySQL connection (determines how text is compared/sorted in the database)
	}
)

module.exports = sequelize
