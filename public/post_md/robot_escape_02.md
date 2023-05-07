HEADER START

#02. Input Handle & Follow Cam
Robot! Escape! DEVLOG Chapter 02
2022-10-17
Robot-Escape-DEVLOG,Unity

HEADER END

# Input Handle & Follow Cam

## 1. Player Input Handle

`Input.GetKeyDown` 이나 `Input.GetAxis` 를 이용한 Legecy 방법도 있지만, 이번엔 좀 다르게 하려고 한다.

Package Manager 에 있는 `Input System` 을 이용했다.

![800px](https://velog.velcdn.com/images/lutca1320/post/328e343c-8109-424f-b7ea-145ffa1a04b7/image.png)

`InputAction` 을 Public 으로 선언하면 위처럼 Inspector 에 설정할 수 있게 뜬다.

- movementAction - 플레이어 Movement (WASD)
- aimAction - 조준 모드 (마우스 Right Button)
- crouchAction - 앉기 (키보드 C 버튼: Toggle)
- fireAction - 총기 발사 (마우스 Left Button)

```csharp
public class RobotInputHandler : MonoBehaviour
{
    public InputAction movementAction;
    public InputAction fireAction;
    public InputAction aimAction;
    public InputAction crouchAction;

	private Vector2 movementAxis;
    public Vector2 movementVector = new(0, 0);
    public bool isCrouch = false;
    public bool isAim = false;
    public bool isMoving = false;
    public bool isFire = false;

    void Start()
    {
        movementAction.Enable();
        crouchAction.Enable();
        aimAction.Enable();

        crouchAction.performed += context =>
        {
            isCrouch = !isCrouch;
        };
    }

    void FixedUpdate()
    {
        movementAxis = movementAction.ReadValue<Vector2>();

        isAim = aimAction.ReadValue<float>() == 1;
        isFire = fireAction.ReadVale<float>() == 1;
        isMoving = movementAxis != Vector2.zero || movementVector.magnitude > 0.05f;

        movementVector = isMoving ? Vector2.Lerp(movementVector, movementAxis, Time.deltaTime * 7f) : new(0, 0);
        transform.position += new Vector3(movementVector.x, 0, movementVector.y) / (isCrouch || isAim ? 30 : 15);
    }
}
```

`movementAxis` 의 각 축의 값이 0 or 1이라서 움직임이 자연스럽지 않았다.
`Vector2.Lerp` 를 통해 보간한 값인 `movementVector` 를 활용해 `position` 을 컨트롤했다.

Aim 이나 Crouch 하면 속도가 느려져야 하므로 `isCrouch || isAim ? 30 : 15` 로 설정했다.
나중에 속도 증가 아이템이나 감소 아이템 사용 시 바뀌어야 하므로 수정할 예정

## 2. FollowCam

![800px](https://velog.velcdn.com/images/lutca1320/post/803410f8-55e9-4520-8714-53de8af89548/image.png)

Player 가 가지고 있는 컴포넌트이다.
- Attached Cam - 부착할 카메라
- Offset - 카메라와 플레이어 간의 Position Offset

```csharp
public class PlayerFollowCam : MonoBehaviour
{
    public Camera attachedCam;
    public Vector3 offset;

    void FixedUpdate()
    {
        attachedCam.transform.position = Vector3.Lerp(attachedCam.transform.position, transform.position + offset, Time.deltaTime * 2);
    }
}
```

이것도 `Vector3.Lerp` 를 통해 보간했다.