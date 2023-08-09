HEADER START

#05. Gun System
#05. Gun System
2022-10-20
Unity
Robot-Escape

HEADER END

# Gun System

## 1. FireAction 바인딩

```csharp
public class RobotInputHandler : MonoBehaviour
{
    ...
    public InputAction fireAction;

    public bool isFire = false;
    ...

    public UnityEvent fireEvent;
    public UnityEvent fireStartEvent;
    public UnityEvent fireEndEvent;

    void Start()
    {
        ...
        fireAction.Enable();

        fireAction.started += context => fireStartEvent.Invoke();
        fireAction.canceled += context => fireEndEvent.Invoke();

        ...
    }

    void FixedUpdate()
    {
        ...
        if (isFire)
        {
            fireEvent.Invoke();
        }
    }
}
```

![800px](https://velog.velcdn.com/images/lutca1320/post/8541073d-69a9-4212-b15f-612db60ea9b2/image.png)

`UnityEvent` 로 `GunController` 와 바인딩을 진행했다.

- `OnFire` : 버튼이 눌려있을 때마다 호출
- `OnFireStart` : 버튼이 처음 눌렸을 때 호출
- `OnFireEnd` : 버튼에서 땠을 때 호출

이와 같이 나눈 이유는 FULL-AUTO 모드와 SEMI-AUTO 모드 둘 다 사용하기 위해서이다.

## 2. GunController 구현

내용이 많아서 좀 쪼갰다.

### `OnFire`, `OnFireStart`, `OnFireEnd`

- 아까 위에서 이벤트 바인딩한 함수이다. 이벤트가 발생하면 가장 먼저 실행된다.
- `FIREMODE` 에 따라서 로직이 다르다. `fireDelay` 변수를 설정해 총기의 발사 딜레이를 구현하였다.

실제 딜레이에 맞춰서 `FireWeapon` 함수가 실행된다.

```csharp
public void OnFire()
{
    if (fireMode != FIREMODE.FULL) return;

    if (timeLastFired + fireDelay <= Time.time)
    {
        FireWeapon();
    }
}

public void OnFireStart()
{
    if (fireMode != FIREMODE.SEMI || semiFired) return;

    if (timeLastFired + fireDelay <= Time.time)
    {
        FireWeapon();
        semiFired = true;
    }
}

public void OnFireEnd()
{
    semiFired = false;
}
```

- `fireDelay = 0.5`
  ![600px](https://velog.velcdn.com/images/lutca1320/post/88a4e73e-accf-4eaf-9979-ee965b9e202f/image.gif)

- `fireDelay = 0.05`
  ![600px](https://velog.velcdn.com/images/lutca1320/post/86836ba1-d848-481a-ab23-e32bbcb9640e/image.gif)

### `FireWeapon`

```csharp
private void FireWeapon()
{
    Instantiate(muzzleFlash, muzzleFireStart);
    // Muzzle Flash Effect 를 `muzzleFireStart` Transform 에 소환한다.

    RaycastHit hit = CheckHit();
    if (hit.collider) SpawnHitParticle(hit.point, hit.normal);
    // Hit 체크를 하고, `hit.collider` 가 true면 HitParticle 을 소환한다.

    StartCoroutine(SpawnTrail(hit));
    // Bullet Trail 을 그린다. (Corutine 사용)

    audioSource.Play(); // 총기 사운드를 플레이한다.
    camController.ShakeCamera(0.7f, 0.07f); // 카메라 Shake Effect 를 적용한다.

    timeLastFired = Time.time; // 딜레이 설정을 위해 필요
}
```

### `SpawnHitParticle`

```csharp
private void SpawnHitParticle(Vector3 hitPoint, Vector3 hitNormal)
{
    Instantiate(hitParticle, hitPoint, Quaternion.LookRotation(hitNormal));
}
```

파티클은 유니티에서 제공하는 [파티클 팩](https://assetstore.unity.com/packages/essentials/tutorial-projects/unity-particle-pack-127325) 중 Metal Hit 이펙트를 사용했다.

- Spark Effect
- Dust Effect
- Decal

### `SpawnTrail`

Bullet Trail 을 그린다. 프레임당 `3f` 씩 움직인다.
while 문이 종료되면 Destroy 를 진행한다.

```csharp
private IEnumerator SpawnTrail(RaycastHit hit)
{
    GameObject trail = Instantiate(bulletTrail, muzzleFireStart.position, muzzleFireStart.rotation);

    Vector3 hitPoint = hit.collider ? hit.point : muzzleFireStart.position + muzzleFireStart.right * 100;
    Vector3 startPoint = muzzleFireStart.position;
    float distance = Vector3.Distance(startPoint, hitPoint);
    Vector3 direction = (hitPoint - startPoint).normalized;

    while (Vector3.Distance(startPoint, trail.transform.position) < distance)
    {
        trail.transform.position += direction * 3f;
        yield return null;
    }

    trail.transform.position = hitPoint;

    Destroy(trail);
}
```

BulletTrail Prefab 을 만들어 사용했고, `Trail Renderer` 를 이용했다.

![800px](https://velog.velcdn.com/images/lutca1320/post/a15f8308-0eeb-4568-a2ba-196ed937d820/image.png)

이렇게 생겼다.

![800px](https://velog.velcdn.com/images/lutca1320/post/dd17604f-5658-44cb-9153-082edd750a52/image.gif)

### Camera Shake Effect

카메라 Shake Effect 는 다음 장에서 작성하겠다.

---

### Full-Code

```csharp
public class GunController : MonoBehaviour
{
    public GameObject muzzleFlash;
    public Transform muzzleFireStart;

    private AudioSource audioSource;
    public AudioClip audioClip;

    public GameObject bulletTrail;
    public ParticleSystem hitParticle;

    private PlayerCameraController camController;

    public FIREMODE fireMode = FIREMODE.FULL;
    public float fireDelay = 0.1f;
    private float timeLastFired = 0;
    private bool semiFired = false;

    void Start()
    {
        audioSource = GetComponentInChildren<AudioSource>();
        audioSource.clip = audioClip;
        camController = transform.root.GetComponent<PlayerCameraController>();
    }

    private RaycastHit CheckHit()
    {
        Physics.Raycast(muzzleFireStart.position, muzzleFireStart.right, out RaycastHit hit, 100);
        return hit;
    }

    private IEnumerator SpawnTrail(RaycastHit hit)
    {
        GameObject trail = Instantiate(bulletTrail, muzzleFireStart.position, muzzleFireStart.rotation);

        Vector3 hitPoint = hit.collider ? hit.point : muzzleFireStart.position + muzzleFireStart.right * 100;
        Vector3 startPoint = muzzleFireStart.position;
        float distance = Vector3.Distance(startPoint, hitPoint);
        Vector3 direction = (hitPoint - startPoint).normalized;

        while (Vector3.Distance(startPoint, trail.transform.position) < distance)
        {
            trail.transform.position += direction * 3f;
            yield return null;
        }

        trail.transform.position = hitPoint;

        Destroy(trail);
    }

    private void SpawnHitParticle(Vector3 hitPoint, Vector3 hitNormal)
    {
        Instantiate(hitParticle, hitPoint, Quaternion.LookRotation(hitNormal));
    }

    private void FireWeapon()
    {
        Instantiate(muzzleFlash, muzzleFireStart);

        RaycastHit hit = CheckHit();
        if (hit.collider) SpawnHitParticle(hit.point, hit.normal);

        StartCoroutine(SpawnTrail(hit));

        audioSource.Play();
        camController.ShakeCamera(0.7f, 0.07f);

        timeLastFired = Time.time;
    }

    public void OnFire()
    {
        if (fireMode != FIREMODE.FULL) return;

        if (timeLastFired + fireDelay <= Time.time)
        {
            FireWeapon();
        }
    }

    public void OnFireStart()
    {
        if (fireMode != FIREMODE.SEMI || semiFired) return;

        if (timeLastFired + fireDelay <= Time.time)
        {
            FireWeapon();
            semiFired = true;
        }
    }

    public void OnFireEnd()
    {
        semiFired = false;
    }
}
```
