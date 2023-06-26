HEADER START

Robot! Escape! DEVLOG #20
#20. Outline
2022-11-17
Robot-Escape-DEVLOG,Unity

HEADER END

# Outline

현재 스테이지에 Catwalk 가 있기 때문에, Catwalk 아래로 내려가면 바닥에 플레이어가 가려져 보이지 않는다.

이를 해결하기 위해 다음과 같은 상황에서 outline 을 그려주었다.

### 플레이어가 바닥에 가려져 보이지 않을 때,

플레이어와 아래에 있는 오브젝트들의 outline 이 보이게 된다.

![800px](https://velog.velcdn.com/images/lutca1320/post/82008bb7-e2b7-464a-962c-c483e95790d2/image.gif)

### 플레이어가 장애물에 가려져 보이지 않을 때

플레이어의 outline 이 보이게 된다.

![800px](https://velog.velcdn.com/images/lutca1320/post/53136bbb-dd47-4fb4-a02c-96a1b04d6a89/image.gif)

### EnemyRobot 이 바닥에 가려지면

그 EnemyRobot 의 outline 이 보인다.

![800px](https://velog.velcdn.com/images/lutca1320/post/6a4b2979-19c9-4464-a9e5-995810a1cc9c/image.gif)

### OutlineController.cs

```csharp
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using UnityEngine;

public class OutlineController : MonoBehaviour
{
    private int outlineLayer;
    private int objectLayer;
    private int obstacleLayer;

    private Camera camera;
    private GameObject[] obstacleAry;
    private GameObject[] enemyAry;

    private void ShowPlayerOutline()
    {
        for (int i = 2; i < transform.childCount; i++)
        {
            transform.GetChild(i).gameObject.layer = outlineLayer;
        }
    }

    private void ShowObstacleOutline()
    {
        foreach (GameObject o in obstacleAry)
        {
            SetLayerRecursive(o, outlineLayer);
        }
    }

    private void SetEnemyRobotOutline()
    {
        foreach (var enemyRobot in enemyAry)
        {
            if (enemyRobot == null) continue;
            Physics.Linecast(camera.transform.position, enemyRobot.transform.position, out RaycastHit hit,
                1 << LayerMask.NameToLayer("Obstacle") | 1 << LayerMask.NameToLayer("Ground"));

            for (int i = 4; i < enemyRobot.transform.childCount; i++)
            {
                enemyRobot.transform.GetChild(i).gameObject.layer = hit.collider ? outlineLayer : objectLayer;
            }
        }
    }

    private void HidePlayerOutline()
    {
        for (int i = 2; i < transform.childCount; i++)
        {
            transform.GetChild(i).gameObject.layer = objectLayer;
        }
    }

    private void HideObstacleOutline()
    {
        foreach (GameObject o in obstacleAry)
        {
            SetLayerRecursive(o, obstacleLayer);
        }
    }

    private void SetLayerRecursive(GameObject o, int layer)
    {
        o.layer = layer;
        foreach (Transform child in o.transform)
        {
            child.gameObject.layer = layer;

            Transform hasChildren = child.GetComponentInChildren<Transform>();
            if (hasChildren != null) SetLayerRecursive(child.gameObject, layer);
        }
    }

    private void Start()
    {
        outlineLayer = LayerMask.NameToLayer("Outlined");
        objectLayer = LayerMask.NameToLayer("Object");
        obstacleLayer = LayerMask.NameToLayer("Obstacle");

        camera = GetComponent<PlayerCameraController>().mainCam;
        obstacleAry = GameObject.FindGameObjectsWithTag("OutlineObstacle");
        enemyAry = FindObjectsOfType<EnemyRobotAI>().Select(ai => ai.gameObject).ToArray();
    }

    private void Update()
    {
        Physics.Linecast(camera.transform.position, transform.position, out RaycastHit obstacleHit, 1 << LayerMask.NameToLayer("Obstacle"));

        Physics.Linecast(camera.transform.position, transform.position, out RaycastHit groundHit, 1 << LayerMask.NameToLayer("Ground"));

        HidePlayerOutline();
        HideObstacleOutline();

        if (groundHit.collider)
        {
            ShowPlayerOutline();
            ShowObstacleOutline();
        }
        if (obstacleHit.collider)
        {
            ShowPlayerOutline();
        }

        SetEnemyRobotOutline();
    }
}
```
