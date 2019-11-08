import _ from "lodash"
import faunadb from "faunadb"
import yenv from "yenv"

const env = yenv()
const { Delete, Get, Index, Lambda, Map, Match, Paginate, Var } = faunadb.query

const faunaClient = new faunadb.Client({
  secret: env.FAUNA
})

export async function newest() {
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

export async function clear() {
  try {
    const ret = await faunaClient.query(
      Map(
        Paginate(Match(Index("all_trainstation")), { size: 3000 }),
        Lambda("X", Delete(Var("X")))
      )
    )
    console.log("fauna", "done")
    return ret
  } catch (e) {
    console.error(e)
  }
}
