HEADER START

#15. Aim Accuracy
#15. Aim Accuracy
2022-11-11
Unity
Robot-Escape

HEADER END

# Aim Accuracy

지금까지는 AI가 총을 플레이어에게 발사하면 거의 무조건 맞았다.
정확도를 조절하기 위해 `GunController` 를 수정했다.

```csharp
public class GunController : MonoBehaviour
{
    ...

    [Header("Accuracy")]
    public float circleRadius = 0.5f;
    public float circleDistance = 10f;

    ...

    private void FixedUpdate()
    {
        // DebugExtension.DebugCircle(muzzleFireStart.transform.position + muzzleFireStart.forward * circleDistance, muzzleFireStart.forward, Color.yellow, circleRadius);
    }

    private Vector3 ApplyAccuracy()
    {
        Vector2 randomOffset = Random.insideUnitCircle;
        randomOffset *= circleRadius;

        Vector3 destination = muzzleFireStart.transform.position;
        destination += muzzleFireStart.forward * circleDistance;
        destination += muzzleFireStart.up * randomOffset.y;
        destination += muzzleFireStart.right * randomOffset.x;

        // DebugExtension.DebugPoint(destination, Color.yellow, 0.5f, 1f);

        return destination;
    }

    private void FireWeapon()
    {
        ...

        RaycastHit hit = CheckHit(ApplyAccuracy());

        ...
    }

    ...
}
```

### `circleRadius`

Random Point 가 만들어 질 수 있는 범위다. 클수록 탄착군이 넓어진다.

- `circleRadius = 0.2`

![600px](https://velog.velcdn.com/images/lutca1320/post/ec4c18c1-2220-4679-8c35-b29b6ca4b1c5/image.gif)

- `circleRadius = 1`

![600px](https://velog.velcdn.com/images/lutca1320/post/e103cff4-e9db-4da2-b03b-8146bfc4688d/image.gif)

### `circleDistance`

Random Point 가 만들어지는 거리다. 클수록 탄착군이 좁아진다.

- `circleDistance = 10`

![600px](https://velog.velcdn.com/images/lutca1320/post/462f7ce8-18ed-4a30-bb56-e71298aefcc9/image.gif)

- `circleDistance = 2`

![600px](https://velog.velcdn.com/images/lutca1320/post/6653a3b1-bf3e-4ba6-9708-6489de63a070/image.gif)
