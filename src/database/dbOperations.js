
import { config } from "./dbConfig"
import sql from 'mssql';

async function getOrders() {
  try {
      let pool = await sql.connect(config);
      let products = await pool.request().query("SELECT * from AppUser");
      return products.recordsets;
  }
  catch (error) {
      console.log(error);
  }
}

module.exports = {
  getOrders: getOrders,
}