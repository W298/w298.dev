HEADER START

#04. Laser Pointer
#04. Laser Pointer
2022-10-19
Unity
Robot-Escape

HEADER END

# Laser Pointer

## Demonstration

![600px](https://velog.velcdn.com/images/lutca1320/post/78939c54-8072-46ff-9866-cbf770100b80/image.gif)

위처럼 레이저 포인터를 구현할 것이다. `LineRenderer` 를 이용해 구현할 것이다.

## Line Renderer

![600px](https://velog.velcdn.com/images/lutca1320/post/8674e5da-1dc9-4eaf-bf16-7d737ea59155/image.png)

Laser Prefab 을 따로 만들어서 `Line Renderer` 와 `LaserRenderer` 스크립트를 추가했다.

- `LaserRenderer` 의 내용은 별 거 없다. start, end 값을 설정해주면 `LineRenderer` 의 Position 값을 변경해준다.
- `OnEnable` `OnDisable` 을 통해 자신이 Enable / Disable 되었을 때 `LineRenderer` 도 같이 적용되게 하였다.

```csharp
public class LaserRenderer : MonoBehaviour
{
	public Vector3 start;
	public Vector3 end;

	private LineRenderer laserLine;

	void Start()
	{
		laserLine = GetComponent<LineRenderer>();
	}

	void Update()
	{
		laserLine.SetPosition(0, start);
		laserLine.SetPosition(1, end);
	}

	private void OnEnable()
	{
		if (!laserLine) return;
		laserLine.enabled = true;
	}
	private void OnDisable()
	{
        if (!laserLine) return;
        laserLine.enabled = false;
	}
}
```

start, end 값 설정은 `RobotAimController` 에서 진행한다.

```csharp
public class RobotAimController : MonoBehaviour
{
    private LaserRenderer laserRenderer;
    ...

    public Transform laserStartPoint;

    void Start()
    {
        laserRenderer = transform.root.gameObject.GetComponentInChildren<LaserRenderer>();
        ...
    }

    void FixedUpdate()
    {
        ...

        laserRenderer.enabled = inputHandler.isAim;
        laserRenderer.start = laserStartPoint.position;
        laserRenderer.end = laserRenderer.start + laserStartPoint.forward * 100;

        Ray laserRay = new Ray(laserRenderer.start, laserStartPoint.forward);
        Physics.Raycast(laserRay, out RaycastHit laserHit, 100);
        if (laserHit.collider)
        {
            laserRenderer.end = laserHit.point;
        }
    }
}
```

`Physics.Raycast` 를 이용해 Hit 된 곳을 end 값으로 지정한다.

- start 값은 총기 모델의 `laserStart` Transform 값을 사용했다.
- `laserStartPoint.forward` 을 Direction 으로 사용해 총기의 Rotation 에 따라 바뀐 Direction 으로 직진하게 만들었다.

_(↓ 총기 Rotation 이 바뀌어도 총기 방향이랑 평행하게 직진한다. )_

![600px](https://velog.velcdn.com/images/lutca1320/post/a922c8cf-410e-442d-ae86-41d8cf91c20c/image.png)
