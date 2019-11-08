import * as database from "./src/database.js"
import fetchFromTrafikverket from "./src/fetchFromTrafikverket.js"

create()

async function create() {
  database.create(await fetchFromTrafikverket())
}
