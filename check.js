import _ from "lodash"
import * as database from "./src/database.js"
import fetchFromTrafikverket from "./src/fetchFromTrafikverket.js"

check()

async function check() {
  console.log("fauna", await database.newest())
  console.log(
    "api  ",
    _.max(_.map(await fetchFromTrafikverket(), "ModifiedTime"))
  )
}
