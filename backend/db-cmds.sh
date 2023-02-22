npx dotenv sequelize db:seed:undo:all

npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo

npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
