import _ from "lodash"
import faunadb from "faunadb"
import fetch from "node-fetch"
import yenv from "yenv"

const env = yenv()

const q = faunadb.query;

const faunaClient = new faunadb.Client({
  secret: env.FAUNA,
});

f()
g()

export async function f() {
  try {
    const ret = await faunaClient.query(
      // q.Select("active", q.Get(q.Index("all_trainstation")))
      q.Get(q.Match(q.Index('station_sort_by_modified_time')))
    );
    console.log('fauna', _.get(ret, 'data.ModifiedTime'));
    return ret;
  } catch (e) {
    console.error(e);
  }
}

export async function g() {
  try {
    const response = await fetch(
      "http://api.trafikinfo.trafikverket.se/v1.2/data.json",
      {
        method: "POST",
        body: getBody(),
        headers: {
          "Content-Type": "application/xml",
          Accept: "application/json"
        }
      }
    )
    if (!response.ok) {
      console.log(response.statusText);
      return {
        statusCode: response.status, body: JSON.stringify({msg: response.statusText})
      }
    }

    const data = await response.json()
    const [body] = data.RESPONSE.RESULT
    console.log('api  ', _.max(_.map(body.TrainStation, 'ModifiedTime')));

    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  } catch (e) {
    console.error(e);
  }
}

function getBody() {
return `
<REQUEST>
<LOGIN authenticationkey='${env.TRAFIKVERKET}' />
<QUERY objecttype='TrainStation'>
<FILTER>
</FILTER>
</QUERY>
</REQUEST>`
}