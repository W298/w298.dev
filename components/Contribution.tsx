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
  const wd = Array.from({ length: 7 }, (_, i) => i);
  const rd = Array.from({ length: 52 }, (_, i) => i);

  return (
    <table className="absolute right-[1rem] top-[55px]">
      <thead></thead>
      <tbody
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {wd.map((weekDay) => {
          return (
            <tr style={{ display: "flex", gap: "3px" }}>
              {rd.map((row) => {
                const dayData = contributionData[row * 7 + weekDay];
                return (
                  <td
                    style={{
                      width: "16.44px",
                      height: "16.44px",
                      background:
                        dayData["contributionCount"] == 0
                          ? "#212121"
                          : 1 <= dayData["contributionCount"] &&
                            dayData["contributionCount"] <= 2
                          ? "#0e4429"
                          : 3 <= dayData["contributionCount"] &&
                            dayData["contributionCount"] <= 5
                          ? "#006d32"
                          : 6 <= dayData["contributionCount"] &&
                            dayData["contributionCount"] <= 8
                          ? "#26a641"
                          : "#39d353",
                      borderRadius: "4.5px",
                    }}
                  ></td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
