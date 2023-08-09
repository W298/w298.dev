HEADER START

#17. Enemy UI
#17. Enemy UI
2022-11-13
Unity
Robot-Escape

HEADER END

# Enemy UI

> - Player UI (HUD)
> - **Enemy UI (인디케이터)**
> - Turret, Laptop Hack UI

## UI

EnemyRobot Prefab 에 다음과 같이 Canvas 를 붙여 주었다.

![400px](https://velog.velcdn.com/images/lutca1320/post/40cfca56-4211-4fc0-9b5e-94b6f477e8e1/image.png)

노란색 아이콘은 detectLevel 을 표시하고, 아래 빨간색은 Health Bar 이다.
detectLevel 이 80 이상이거나, 플레어어를 발견하면 사각형이 꽉 차게 되고, 빨간색으로 변한다.

![600px](https://velog.velcdn.com/images/lutca1320/post/5c7273f7-b92b-47d0-b28d-302fe2a57b28/image.gif)

## StatusIndicator.cs

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class StatusIndicator : MonoBehaviour
{
    private RobotStatusController robotStatus;
    private EnemyRobotAI ai;
    private Camera mainCam;

    private RectTransform healthBarRect;

    private GameObject detectBorder;
    private Image detectFrontImage;
    private RectTransform detectFrontRect;

    private void Start()
    {
        robotStatus = transform.root.GetComponent<RobotStatusController>();
        ai = transform.root.GetComponent<EnemyRobotAI>();
        mainCam = Camera.main;

        healthBarRect = transform.GetChild(0).GetChild(1).GetComponent<RectTransform>();

        detectBorder = transform.GetChild(1).gameObject;
        detectFrontImage = detectBorder.transform.GetChild(1).GetComponent<Image>();
        detectFrontRect = detectBorder.transform.GetChild(1).GetComponent<RectTransform>();
    }

    private void LateUpdate()
    {
        healthBarRect.sizeDelta = new Vector2(robotStatus.health, healthBarRect.sizeDelta.y);

        if (ai.detectLevel.currentLevel <= 0 && !ai.enemyObject)
        {
            detectBorder.SetActive(false);
        }
        else
        {
            detectBorder.SetActive(true);
            detectFrontRect.sizeDelta = new Vector2(detectFrontRect.sizeDelta.x, ai.enemyObject ? 30 : Mathf.Clamp(ai.detectLevel.currentLevel * 0.3f * 1.25f, 0, 30));

            detectFrontImage.color = ai.detectLevel.currentLevel >= 80 || ai.enemyObject ? new Color(0.735849f, 0.2249199f, 0.2662449f) : new Color(1, 0.7328318f, 0);
        }

        transform.rotation = mainCam.transform.rotation;

        transform.parent.position = transform.root.position + new Vector3(-0.5f, 2, 0.5f);
    }
}

```
