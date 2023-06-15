HEADER START

Robot! Escape! DEVLOG #07
#07. Ammo & Reload
2022-10-24
Robot-Escape-DEVLOG,Unity

HEADER END

# Ammo & Reload

## Ammo System

GunController 안에 AmmoSystem Class 를 따로 구현했다.
`canReload` 는 남은 탄약이 있고, 현재 장전된 탄약이 탄창 용량보다 작으면 `true`

```csharp
public class AmmoSystem
{
    public int magAmmo;
    public int magCapacity;
    public int remainAmmo;

    public bool canReload { get => this.remainAmmo > 0 && this.magAmmo < this.magCapacity; }

    public AmmoSystem(int magCapacity, int totalAmmo)
    {
        this.magAmmo = magCapacity;
        this.magCapacity = magCapacity;
        this.remainAmmo = totalAmmo - magAmmo;
    }

    public void Reload()
    {
        int addAmmo = this.magCapacity - this.magAmmo;

        if (this.remainAmmo < addAmmo)
        {
            addAmmo = this.remainAmmo;
            this.remainAmmo = 0;
        }
        else
        {
            this.remainAmmo -= addAmmo;
        }

        this.magAmmo += addAmmo;
    }
}
```

```csharp
public class GunController : MonoBehaviour
{
	...
    public int magCapacity = 30;
    public int totalAmmo = 60;
	public AmmoSystem ammoSystem;

    private void Start()
    {
    	...
        ammoSystem = new AmmoSystem(magCapacity, totalAmmo);
    }

    private void FireWeapon()
    {
    	if (ammoSystem.magAmmo <= 0) return;
        ammoSystem.magAmmo--;

        ...
    }

    public void OnReload()
    {
    	ammoSystem.Reload();
    }
}
```

## Reload

### Input 처리

```csharp
public class RobotInputHandler : MonoBehaviour
{
	...
	public InputAction reloadAction;

	private void Start()
    {
    	...
    	reloadAction.Enable();
        ...

        reloadAction.performed += context =>
        {
        	if (!gunController.ammoSystem.canReload) return;
            reloadEvent.Invoke();
        }
    }
}
```

```csharp
public class RobotAnimationController : MonoBehaviour
{
	public void OnReload()
    {
        animator.SetBool("isReload", true);
    }
}
```

![](https://velog.velcdn.com/images/lutca1320/post/e3482d26-f3f3-48fd-a04c-4bf9407e2cf9/image.png)

Input 처리 코드를 작성해 주었다.

### Animation Out

Reload 애니메이션을 제어하기 위해 animator 에 `ReloadController` 를 부착했다.

- Reload 애니메이션이 끝나면 자동으로 `isReload` 값을 `false` 로 설정한다.
- 원래 조준하고 있었으면 조준한 상태로 장전한다. (`aimReload` 변수)
- 장전 도중 조준하면 장전이 중단 (Interrupted) 된다.
- 장전 애니메이션이 성공적으로 완료되면 `GunController` 클래스의 `OnReload` 함수를 실행시킨다.

```csharp
public class ReloadController : StateMachineBehaviour
{
    private bool aimReload = false;

    public override void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        aimReload = animator.GetBool("isAim");
    }

    public override void OnStateUpdate(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        if (!aimReload && animator.GetBool("isAim"))
        {
            animator.SetBool("isReload", false);
        }

        if (stateInfo.normalizedTime > 1)
        {
            animator.transform.GetComponentInChildren<GunController>().OnReload();
            animator.SetBool("isReload", false);
        }
    }

    public override void OnStateExit(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        animator.SetBool("isReload", false);
    }
}
```

- 재장전 성공
  ![600px](https://velog.velcdn.com/images/lutca1320/post/9435f69f-d76e-496a-847a-f7ae91d6514c/image.gif)

- 재정전 중단 (Interrupted)
  ![600px](https://velog.velcdn.com/images/lutca1320/post/e1b41df5-49fc-4e68-8d18-f9f97f7e5cc9/image.gif)

- 조준 중 재장전
  ![600px](https://velog.velcdn.com/images/lutca1320/post/225f6abe-8aa8-4cce-80e6-fa58d69ac1ac/image.gif)

### Animation Mask 설정

걸으면서, 앉아서, 서서, 뛰면서 Reload 애니메이션이 재생되도록 하기 위해서
Animation Mask 설정을 해 주었다.

![800px](https://velog.velcdn.com/images/lutca1320/post/1af7f791-0f99-4b42-96b8-67f5cadc95e3/image.png)

본 상단만 애니메이션을 적용시키기 위해 위와 같이 설정했다.

![800px](https://velog.velcdn.com/images/lutca1320/post/662e7421-95b5-47fa-aea0-85cdfa8fda0f/image.png)

- 뛰면서 장전
  ![600px](https://velog.velcdn.com/images/lutca1320/post/1e013de4-ddf0-4dd7-be97-7c1d53535afe/image.gif)

- 앉아서 장전
  ![600px](https://velog.velcdn.com/images/lutca1320/post/fb914854-65cf-4b4a-a32b-7408af888d1d/image.gif)

- 조준하면서 (걸으며) 장전
  ![600px](https://velog.velcdn.com/images/lutca1320/post/427094ac-1f24-4fcd-96b9-74bb7705dcfa/image.gif)
