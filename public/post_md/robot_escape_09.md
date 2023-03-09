HEADER START

#09. AI Vision & Sound Sensor
Robot! Escape! DEVLOG Chapter 09
2022-10-26
Robot-Escape-DEVLOG,Unity

HEADER END

# AI Vision & Sound Sensor

Player 나 Object 를 Detect 하는 AISensor 모듈을 만들어 보았다.
두 가지 방법이 떠올랐는데,

1. Mesh Collider 의 Trigger 이벤트 사용
2. 원뿔형으로 LineCast 를 쏴서 RaycastHit 로 Detect

그러나 첫번째 방법에는 문제점이 있다.

- LayerMask 를 활용할 수 없다.
- 그렇기 때문에 장애물이 센서 시야를 가리게 만들 수 없다.

최종적으로 두번째 방법을 사용했다.

## AIVisionSensor

```csharp
public class AIVisionSensor : MonoBehaviour
{
    public float redZoneDistance = 8.5f;
    public float yellowZoneDistance = 12.5f;

    [Header("Angle")]
    [Range(0, 180)]
    public float horizontalAngle = 20;
    [Range(0, 180)]
    public float verticalAngle = 20;

    [Header("Resolution")]
    [Range(0, 48)]
    public int horizontalResolution = 10;
    [Range(0, 48)]
    public int verticalResolution = 3;

    [Header("Interval")]
    public float scanInterval = 0.5f;
    private float scanTimer;

    [Header("Result")]
    public List<GameObject> yellowZoneObjectList = new();
    public List<GameObject> redZoneObjectList = new();

    private void Ray(float currentVAngle, float currentHAngle, int v, int h, float distance, List<GameObject> objectList)
    {
        Vector3 point = transform.position +
                        Quaternion.AngleAxis(currentVAngle, transform.right) * Quaternion.AngleAxis(currentHAngle, transform.up) * transform.forward * distance;

        Physics.Linecast(transform.position, point, out RaycastHit hit, 1 << LayerMask.NameToLayer("Obstacle") | 1 << LayerMask.NameToLayer("Object") | 1 << LayerMask.NameToLayer("Ground"));

        if ((h == 0 || h == horizontalResolution - 1) && (v == 0 || v == verticalResolution - 1))
        {
            Debug.DrawLine(transform.position, hit.collider ? hit.point : point, Color.white, scanInterval);
        }

        DebugExtension.DebugPoint(point, Color.white, 0.25f, scanInterval);

        if (hit.collider && hit.collider.gameObject.layer == LayerMask.NameToLayer("Object"))
        {
            var detectedObject = hit.collider.gameObject;
            if (!objectList.Contains(detectedObject)) objectList.Add(detectedObject);
        }
    }

    private void Scan()
    {
        yellowZoneObjectList.Clear();
        redZoneObjectList.Clear();

        float currentVAngle = -verticalAngle;
        float deltaVAngle = (verticalAngle * 2) / (verticalResolution - 1);
        for (int v = 0; v < verticalResolution; v++)
        {
            float currentHAngle = -horizontalAngle;
            float deltaHAngle = (horizontalAngle * 2) / (horizontalResolution - 1);
            for (int h = 0; h < horizontalResolution; h++)
            {
                Ray(currentVAngle, currentHAngle, v, h, yellowZoneDistance, yellowZoneObjectList);
                Ray(currentVAngle, currentHAngle, v, h, redZoneDistance, redZoneObjectList);

                currentHAngle += deltaHAngle;
            }
            currentVAngle += deltaVAngle;
        }
    }

    private void FixedUpdate()
    {
        scanTimer -= Time.deltaTime;
        if (scanTimer < 0)
        {
            scanTimer += scanInterval;
            Scan();
        }
    }
}
```

### 파라미터

![](https://velog.velcdn.com/images/lutca1320/post/fc3ebce1-30e7-4606-a01f-089f7b198faf/image.png)

- 위 그림에서 수평 각도가 Horizontal Angle, 수직 각도가 Vertical Angle 값이다.
- Resolution 은 쏘는 Line 의 개수이므로 해상도를 의미한다.

아래와 같이 파라미터를 조절해 해상도와 각도를 조절할 수 있다.

![800px](https://velog.velcdn.com/images/lutca1320/post/6c0af228-454f-47c9-9639-3467f8b6e567/image.gif)

### Scan 함수

`Obstacle` 레이어와 `Object` 레이어의 물체를 `LineCast` 하고, 그 중 `Object` 레이어의 물체만 리턴한다.
아래 그림과 같이 장애물이 있을 경우에는 LineCast 가 통과하지 못한다.

플레이어가 장애물 뒤에 있었다면 Detect 되지 않았을 것이다.

![800px](https://velog.velcdn.com/images/lutca1320/post/aaae64db-34ce-4aea-8701-ffdec032fc91/image.png)

### RedZone / YellowZone

![800px](https://velog.velcdn.com/images/lutca1320/post/da432e51-2169-4691-9782-714baa8fcc1c/image.png)

redZoneDistance 까지가 redZone,
redZoneDistance ~ yellowZoneDistance 까지가 yellowZone 이다.

Detect Level 을 나눠두어서 나중에 AI 구현 시 편리하도록 했다.

## AISoundSensor

### AISoundSensor 스크립트 구현

`hearRange` : [Listener] 소리를 들을 수 있는 최대 반경
`soundRange` : [Owner] 소리의 최대 반경

(`hearRange + soundRange` >= Listener 와 Owner 의 거리) 면, 소리를 Detect 했다고 판단한다.

```csharp
public class AISoundSensor : MonoBehaviour
{
    private EnemyRobotAI ai;
    public float hearRange = 20f;

    [Header("Result")]
    public Vector3 lastDetectedPosition;
    public GameObject lastDetectedOwner;

    private void Start()
    {
        ai = transform.root.GetComponent<EnemyRobotAI>();
    }

    public void OnSoundHear(float soundRange, Vector3 soundPosition, GameObject owner)
    {
        if (Vector3.Distance(transform.position, soundPosition) > soundRange + hearRange) return;

        lastDetectedPosition = soundPosition;
        lastDetectedOwner = owner;
        StartCoroutine(ai.SoundReaction(soundPosition));
    }
}
```

### GunController 수정

`FireWeapon` 함수가 성공적으로 실행되면 'Robot' 태그를 가진 모든 GameObject 의 `OnSoundHear` 함수를 호출한다.

```csharp
// GunController.cs
private void FireWeapon()
{
    ...

    foreach (var robot in GameObject.FindGameObjectsWithTag("Robot"))
    {
        if (robot == transform.root.gameObject) continue;

        var soundSensor = robot.GetComponentInChildren<AISoundSensor>();
        if (soundSensor) soundSensor.OnSoundHear(fireSoundRange, transform.position, transform.root.gameObject);
    }

    ...
}
```
