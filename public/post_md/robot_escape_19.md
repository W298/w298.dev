HEADER START

#19. Mission
#19. Mission
2022-11-16
Unity
Robot-Escape

HEADER END

# Misson

## UI

### Mission UI

![400px](https://velog.velcdn.com/images/lutca1320/post/df13fca6-7540-471c-897a-868a0b833701/image.png)

### Mission Failed

![600px](https://velog.velcdn.com/images/lutca1320/post/17221a58-0f09-44de-9e02-0fff784cba18/image.png)

### Mission Complete

![600px](https://velog.velcdn.com/images/lutca1320/post/67c2bdbe-68b4-4f19-8eaf-b89672530d21/image.png)

## Laptop Mission Sound

![600px](https://velog.velcdn.com/images/lutca1320/post/17bce915-e1ba-4645-b492-014f821459bf/image.gif)

Laptop Crack 을 진행하다가 보면 30%, 80% 에서 경고음이 크게 울린다. 적들이 남아있다면, 이 소리를 듣고 몰려온다.

## Stage Clear

![600px](https://velog.velcdn.com/images/lutca1320/post/f51d7bd7-ae68-47f2-82ad-ea4fbc3733c4/image.gif)

모든 미션을 달성하면 탈출구가 열린다.

## MissionController.cs

```csharp
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;

public enum MissionStatus
{
    IN_PROGRESS,
    COMPLETE,
    FAILED
}

[System.Serializable]
public class Mission
{
    public MissionStatus currentStatus = MissionStatus.IN_PROGRESS;
    public string name;
    public Text uiText;
    public Mission parentMission = null;
    public List<Mission> subMissionList;

    public Mission(string name, Text uiText)
    {
        this.name = name;
        this.uiText = uiText;
        subMissionList = new List<Mission>();
    }

    public Mission(string name, Text uiText, List<Mission> subMissionList)
    {
        this.name = name;
        this.uiText = uiText;
        this.subMissionList = subMissionList;
        subMissionList.ForEach(sm => sm.parentMission = this);
    }
}

public class MissionController : MonoBehaviour
{
    private List<Mission> missionList;
    private bool isStageCleared = false;
    private void Start()
    {
        missionList = new List<Mission>();

        missionList.Add(new Mission("Main01", transform.Find("Main01").GetComponent<Text>(), new List<Mission>
        {
            new Mission("Main01_01", transform.Find("Main01").GetChild(0).GetComponent<Text>()),
            new Mission("Main01_02", transform.Find("Main01").GetChild(1).GetComponent<Text>()),
            new Mission("Main01_03", transform.Find("Main01").GetChild(2).GetComponent<Text>())
        }));
        missionList.Add(new Mission("Main02", transform.Find("Main02").GetComponent<Text>()));
    }

    private Mission GetMission(string name)
    {
        Mission mission = null;
        foreach (var m in missionList)
        {
            if (m.name == name)
            {
                mission = m;
                break;
            }

            foreach (var sm in m.subMissionList)
            {
                if (sm.name != name) continue;
                mission = sm;
                break;
            }
        }

        return mission;
    }

    public bool SetMissionStatus(string name, MissionStatus newStatus)
    {
        var mission = GetMission(name);
        if (mission == null) return false;

        mission.currentStatus = newStatus;
        if (mission.parentMission != null)
        {
            if (mission.parentMission.subMissionList.All(sm => sm.currentStatus == MissionStatus.COMPLETE))
            {
                SetMissionStatus(mission.parentMission.name, MissionStatus.COMPLETE);
            }
            else if (mission.parentMission.subMissionList.Any(sm => sm.currentStatus == MissionStatus.FAILED))
            {
                SetMissionStatus(mission.parentMission.name, MissionStatus.FAILED);
            }
        }

        UpdateUI(mission);
        if (missionList.All(m => m.currentStatus == MissionStatus.COMPLETE)) StageClear();
        return true;
    }

    private void UpdateUI(Mission mission)
    {
        Color color;
        switch (mission.currentStatus)
        {
            case MissionStatus.COMPLETE:
                color = new Color(0, 1, 0);
                break;
            case MissionStatus.FAILED:
                color = new Color(1, 0, 0);
                break;
            case MissionStatus.IN_PROGRESS:
            default:
                color = new Color(1, 1, 1);
                break;
        }

        mission.uiText.color = color;
    }

    private void StageClear()
    {
        if (isStageCleared) return;
        GameObject.Find("ExitDoor").SendMessage("OpenDoor");
        isStageCleared = true;
    }
}
```
