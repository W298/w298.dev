HEADER START

#16. Player UI
#16. Player UI
2022-11-12
Unity
Robot-Escape

HEADER END

# Player UI

UI를 만들기 시작했다. 3부분으로 나누어서 작업할 것이다.

> - **Player UI (HUD)**
> - Enemy UI (인디케이터)
> - Turret, Laptop Hack UI

### Interact UI

![600px](https://velog.velcdn.com/images/lutca1320/post/838136e3-2ce1-439d-9932-64522c5a1cf8/image.webp)

Interactable 한 오브젝트 (AmmoBox, MedBox 등) 에 가까이 가면 Interact UI가 나온다.
description 도 추가적으로 제공할 수 있다.

### Health UI

![400px](https://velog.velcdn.com/images/lutca1320/post/5378a5b2-d1cd-472c-a848-f9efa7295b24/image.webp)

남은 체력을 표시한다. 아래에는 남은 Aid Kit 의 수를 보여준다.

### Ammo UI

![400px](https://velog.velcdn.com/images/lutca1320/post/86f12c88-843d-412e-b4a7-8f3feff3dec5/image.webp)

Ammo 관련 정보를 보여준다. 총기를 발포하면 탄약 아이콘이 하나씩 사라진다.
장전하는 동안 Reloading 텍스트가 표기된다.

### PlayerUI.cs

위 3가지 UI들을 관리한다.

```csharp
public class PlayerUI : MonoBehaviour
{
    private GunController gunController;
    private RobotStatusController statusController;
    private PlayerInventory playerInventory;
    private Animator animator;

    private Canvas canvas;
    private Text ammoText;
    private GameObject ammoContainer;
    private Text healthText;
    private GameObject healthContainer;
    private Text aidText;
    private Text reloadText;
    private RectTransform interactRect;
    private Text descriptionText;

    public GameObject interactObject = null;

    public GameObject ammoIconPrefab;

    public void ShowInteractUI(GameObject interactObject)
    {
        this.interactObject = interactObject;
    }

    public void HideInteractUI()
    {
        this.interactObject = null;
    }

    public void SetInteractDescription(string text)
    {
        descriptionText.text = text;
    }

    private void Start()
    {
        GameObject player = GameObject.Find("Player");
        gunController = player.GetComponentInChildren<GunController>();
        statusController = player.GetComponentInChildren<RobotStatusController>();
        playerInventory = player.GetComponent<PlayerInventory>();
        animator = player.GetComponent<Animator>();

        canvas = transform.GetComponent<Canvas>();
        ammoText = transform.Find("AmmoText").GetComponent<Text>();
        ammoContainer = transform.Find("AmmoContainer").gameObject;
        healthText = transform.Find("HealthText").GetComponent<Text>();
        healthContainer = transform.Find("HealthContainer").gameObject;
        aidText = transform.Find("AIDText").GetComponent<Text>();
        reloadText = transform.Find("ReloadingText").GetComponent<Text>();
        interactRect = transform.Find("Interact").GetComponent<RectTransform>();
        descriptionText = transform.Find("Interact").Find("DescriptionImage").GetChild(0).GetComponent<Text>();
    }

    private void LateUpdate()
    {
        if (statusController.isDeath) return;

        reloadText.gameObject.SetActive(animator.GetBool("isReload"));

        ammoText.text = gunController.ammoSystem.magAmmo + " / " + gunController.ammoSystem.remainAmmo;
        healthText.text = ((int)statusController.health).ToString();

        interactRect.gameObject.SetActive(interactObject != null);
        if (interactObject)
        {
            var screenPos = Camera.main.WorldToScreenPoint(interactObject.transform.position);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(canvas.transform as RectTransform, screenPos,
                canvas.worldCamera, out Vector2 movePos);

            interactRect.position = canvas.transform.TransformPoint(movePos + new Vector2(50, 50));
        }

        var aidKit = playerInventory.GetItem("AidKit");
        aidText.text = "x " + (aidKit != null ? aidKit.count.ToString() : "0");

        int count = gunController.ammoSystem.magAmmo - ammoContainer.transform.childCount;
        if (count > 0)
        {
            for (int i = 0; i < count; i++)
            {
                GameObject ammoIcon = Instantiate(ammoIconPrefab, ammoContainer.transform);
                ammoIcon.GetComponent<RectTransform>().localPosition -= new Vector3(10 * (ammoContainer.transform.childCount - 1), 0, 0);
            }
        }
        else if (count < 0)
        {
            for (int i = 0; i < -1 * count; i++)
            {
                Destroy(ammoContainer.transform.GetChild(ammoContainer.transform.childCount - 1).gameObject);
            }
        }

        int segmentCount = (int)(statusController.health /
                           (statusController.maxHealth / healthContainer.transform.childCount));

        for (int i = 0; i < segmentCount; i++)
        {
            healthContainer.transform.GetChild(i).gameObject.SetActive(true);
        }
        for (int i = segmentCount; i < healthContainer.transform.childCount; i++)
        {
            healthContainer.transform.GetChild(i).gameObject.SetActive(false);
        }
    }
}
```

### BoxInteract.cs

AmmoBox, MedBox 에 접근할 시 Interact UI가 표시되도록 하는 코드이다.

```csharp
public enum BoxMode
{
    AMMO,
    HEALTH
}

public class BoxInteract : MonoBehaviour
{
    private Animator animator;
    private PlayerUI playerUI;
    private bool isActive = false;

    public BoxMode boxMode = BoxMode.AMMO;
    public int amount = 3;

    public void Interact(GameObject target)
    {
        if (!isActive) return;

        bool success = false;
        switch (boxMode)
        {
            case BoxMode.AMMO:
                GunController g = target.GetComponentInChildren<GunController>();
                if (g && amount > 0)
                {
                    g.ammoSystem.remainAmmo += 30;
                    amount--;
                    success = true;
                }
                break;
            case BoxMode.HEALTH:
                PlayerInventory i = target.GetComponent<PlayerInventory>();
                if (i && amount > 0)
                {
                    i.AddItem("AidKit", 1);
                    amount--;
                    success = true;
                }
                break;
        }

        if (success) animator.SetTrigger("Interact");
        playerUI.SetInteractDescription(amount + " remain");
    }

    private void Start()
    {
        animator = transform.root.GetComponent<Animator>();
        playerUI = GameObject.Find("PlayerUICanvas").GetComponent<PlayerUI>();
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.name != "Player") return;
        isActive = true;
        playerUI.ShowInteractUI(transform.parent.gameObject);
        playerUI.SetInteractDescription(amount + " remain");
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.name != "Player") return;
        isActive = false;
        playerUI.HideInteractUI();
        playerUI.SetInteractDescription("");
    }
}
```
