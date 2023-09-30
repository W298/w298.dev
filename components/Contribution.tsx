async function getContribution() {
  const headers = {
    Authorization: "bearer " + process.env.GITHUB_USER_API_TOKEN,
  };

  const today = new Date();
  const startDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 364
  );

  const body = {
    query: `query { 
      user(login: "w298") {
        contributionsCollection(from: "${startDay.toISOString()}", to: "${today.toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                weekday
                date 
                contributionCount 
                color
              }
            }
            months  {
              name
                year
                firstDay 
              totalWeeks 
              
            }
          }
        }
      }
      
    }`,
  };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await res.json();

  const d = data["data"]["user"]["contributionsCollection"];
  const flatted = [];
  d["contributionCalendar"]["weeks"].forEach((element) => {
    flatted.push(...element["contributionDays"]);
  });

  return flatted;
}

export default async function Contribution() {
  const contributionData = await getContribution();
  const wd = [...Array(7).keys()];
  const rd = [...Array(52).keys()];

  return (
    <table>
      <thead></thead>
      <tbody style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {wd.map((weekDay) => {
          return (
            <tr style={{ display: "flex", gap: "3px" }}>
              {rd.map((row) => {
                const dayData = contributionData[row * 7 + weekDay];
                return (
                  <td
                    style={{
                      flex: 1,
                      fontSize: "8px",
                      color: "transparent",
                      background:
                        dayData["contributionCount"] == 0
                          ? "#212121"
                          : dayData["color"],
                      textAlign: "center",
                      borderRadius: "3px",
                    }}
                  >
                    {dayData["contributionCount"]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
