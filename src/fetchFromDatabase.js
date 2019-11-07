import _ from "lodash"
import faunadb from "faunadb"
import yenv from "yenv"

const env = yenv()
const { Get, Match, Index } = faunadb.query

const faunaClient = new faunadb.Client({
  secret: env.FAUNA
})

export default async () => {
  try {
    const ret = await faunaClient.query(
      Get(Match(Index("station_sort_by_modified_time")))
    )
    console.log("fauna", _.get(ret, "data.ModifiedTime"))
    return ret
  } catch (e) {
    console.error(e)
  }
}
