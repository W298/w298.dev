HEADER START

Robot! Escape! DEVLOG #06
#06. Camera Shake
2022-10-22
Robot-Escape-DEVLOG,Unity

HEADER END

# Camera Shake

## Cinemachine 설정

Camera Shake Effect 를 위해 Main Camera 에 CinemachineBrain 컴포넌트를 붙이고,
Virtual Camera 를 새로 만들었다. 이를 수정된 PlayerCameraController 스크립트에 제공했다.

```csharp
public class PlayerCameraController : MonoBehaviour
{
    public Camera mainCam;
    public CinemachineVirtualCamera vcam;
}
```

![800px](https://velog.velcdn.com/images/lutca1320/post/6301e909-25bb-4deb-9962-d0d432d7d0dc/image.png)

원래 PlayerCameraController 에 FollowCam 스크립트가 있었는데, Cinemachine 에서 제공하는 Follow 기능을 사용하기 위해 제거했다.

## Follow Cam (Cinemachine) 설정

![800px](https://velog.velcdn.com/images/lutca1320/post/e5d62ade-6b8f-4dde-942b-5024d457e560/image.png)

## Camera Shake Effect

Cinemachine 의 Noise 기능을 이용했다.

![800px](https://velog.velcdn.com/images/lutca1320/post/3df023a4-e9eb-4f3c-b640-f4befbd99dec/image.png)

- `Amplitude Gain = 1`
  ![600px](https://velog.velcdn.com/images/lutca1320/post/2225a5a9-8154-4631-b3cb-ff559321bfdf/image.gif)

- `Amplitude Gain = 3`
  ![600px](https://velog.velcdn.com/images/lutca1320/post/383b65a1-ce00-4df5-b898-2ed3a9874f34/image.gif)

총기가 발사될 때마다 작동해야 하므로 Amplitude Gain 값을 PlayerCameraController 에서 다룬다.

```csharp
public struct ShakeParameter
{
    public ShakeParameter(float inten = 0, float dur = 0, float remain = 0)
    {
        startShakeIntensity = inten;
        shakeDuration = dur;
        remainShake = remain;
    }

    readonly public float startShakeIntensity;
    readonly public float shakeDuration;
    public float remainShake;
}

public class PlayerCameraController : MonoBehaviour
{
    public Camera mainCam;
    public CinemachineVirtualCamera vcam;

    private CinemachineBasicMultiChannelPerlin perlin;
    private ShakeParameter shake;

    private void Awake()
    {
        perlin = vcam.GetCinemachineComponent<CinemachineBasicMultiChannelPerlin>();
    }

    public void ShakeCamera(float intensity, float duration)
    {
        perlin.m_AmplitudeGain = intensity;

        shake = new ShakeParameter(intensity, duration, duration);
    }

    private void Update()
    {
        if (shake.remainShake > 0)
        {
            shake.remainShake -= Time.deltaTime;
            perlin.m_AmplitudeGain = Mathf.Lerp(shake.startShakeIntensity, 0f, 1 - shake.remainShake / shake.shakeDuration);
        }
    }
}
```

`ShakePararmeter` 라는 새로운 클래스를 만들었는데 다음과 같다.

- `startShakeIntensity` : 시작 Amplitude Gain 값
- `shakeDuration` : 지속시간
- `remainShake` : 남은 지속시간

`ShakeCamera` 호출은 이전에 만든 `GunController` 에서 진행한다.

```csharp
// GunController.cs
private void FireWeapon()
{
    ...
    camController.ShakeCamera(0.7f, 0.07f);
    ...
}
```

총기가 발사될 때마다 카메라가 짧게 흔들리므로 `fireDelay` 가 작을수록 더 많이 흔들린다.

- `fireDelay = 0.5` : 카메라가 적게 흔들림
  ![600px](https://velog.velcdn.com/images/lutca1320/post/821d5f0e-bdd5-4c4b-9d34-cb746ac8cb95/image.gif)

- `fireDelay = 0.05` : 카메라가 많이 흔들림
  ![600px](https://velog.velcdn.com/images/lutca1320/post/bcab3af9-14fe-494f-bc3c-9a4847f324bb/image.gif)
