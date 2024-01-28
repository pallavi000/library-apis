import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig();

const config = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "nest-test",
  entities: [__dirname + "/../modules/v1/**/entity/*.entity{.ts,.js}"],
  synchronize: true,
  // migrations: ["/src/database/migrations/*.{ts,.js}"],
};
const connectionSource = new DataSource(config as DataSourceOptions);
export default connectionSource;
