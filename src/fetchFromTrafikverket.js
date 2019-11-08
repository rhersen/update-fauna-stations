import fetch from "node-fetch"
import yenv from "yenv"
const env = yenv()

export default async () => {
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
      console.log(response.statusText)
      return {
        statusCode: response.status,
        body: JSON.stringify({ msg: response.statusText })
      }
    }

    const data = await response.json()
    const [body] = data.RESPONSE.RESULT

    return body.TrainStation
  } catch (e) {
    console.error(e)
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
