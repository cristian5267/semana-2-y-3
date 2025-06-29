import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mariadb',
        dialectOptions: {
    connectTimeout: 10000  
  },
        pool: {
    max: 15,       
    min: 0,
    acquire: 30000,
    idle: 10000
  }

    }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export const configDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB Connected");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
