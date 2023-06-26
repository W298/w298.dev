HEADER START

Robot! Escape! DEVLOG #18
#18. HACK UI
2022-11-15
Robot-Escape-DEVLOG,Unity

HEADER END

# HACK UI

> - Player UI (HUD)
> - Enemy UI (인디케이터)
> - **Turret, Laptop Hack UI**

## UI

### Laptop Hack

미션 중 하나로, Laptop 을 Interact 하면 나오는 UI이다.

![600px](https://velog.velcdn.com/images/lutca1320/post/60898a74-1578-4781-aaaa-b44f7307aabb/image.gif)

### Turret Hack

이것도 미션 중 하나로, Turret 을 Interact 하면 나온다.

![600px](https://velog.velcdn.com/images/lutca1320/post/9cd388fc-35b7-4ccd-be4b-2a6b9f782ed2/image.gif)

100% 까지 진행했을 경우, SUCCESS 로 바뀌며 연결된 Turret 이 비활성화된다.

![600px](https://velog.velcdn.com/images/lutca1320/post/673dcbef-6421-478e-8ab7-fc085596f434/image.gif)

## Code

### LaptopInteract.cs

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LaptopInteract : MonoBehaviour
{
    private PlayerUI playerUI;
    private Canvas canvas;
    private Text hackText;
    private Text percentText;
    private RectTransform rootRect;
    private RectTransform gageRect;
    private AudioSource audioSource;

    private RobotInputHandler callerInput;
    private float gage = 0;
    private bool success = false;

    public Material onMaterial;

    public void Interact(GameObject caller)
    {
        playerUI.HideInteractUI();
        playerUI.SetInteractDescription("");
        canvas.gameObject.SetActive(true);
        callerInput = caller.GetComponent<RobotInputHandler>();

        transform.parent.GetComponent<MeshRenderer>().material = onMaterial;
    }

    private void LocateUI()
    {
        var screenPos = Camera.main.WorldToScreenPoint(transform.parent.position);
        RectTransformUtility.ScreenPointToLocalPointInRectangle(canvas.transform as RectTransform, screenPos,
            canvas.worldCamera, out Vector2 movePos);

        rootRect.position = canvas.transform.TransformPoint(movePos + new Vector2(50, 50));
    }

    private void OnSuccess()
    {
        success = true;
        hackText.text = "SUCCESS";
        hackText.color = new Color(0, 1, 0);

        playerUI.GetComponentInChildren<MissionController>().SetMissionStatus("Main02", MissionStatus.COMPLETE);
    }

    private void StartBeep()
    {
        audioSource.Play();

        foreach (var robot in GameObject.FindGameObjectsWithTag("Robot"))
        {
            var soundSensor = robot.GetComponentInChildren<AISoundSensor>();
            if (soundSensor) soundSensor.OnSoundHear(audioSource.maxDistance, transform.parent.position, transform.parent.gameObject, true);
        }

        StartCoroutine(StopBeep());
    }

    private IEnumerator StopBeep()
    {
        yield return new WaitForSeconds(0.8f * 10);
        audioSource.Stop();
    }

    private void Start()
    {
        playerUI = GameObject.Find("PlayerUICanvas").GetComponent<PlayerUI>();
        canvas = transform.parent.GetComponentInChildren<Canvas>(true);
        hackText = canvas.transform.GetChild(0).Find("HACK").GetComponent<Text>();
        percentText = canvas.transform.GetChild(0).Find("Percent").GetComponent<Text>();
        rootRect = canvas.transform.GetChild(0).GetComponent<RectTransform>();
        gageRect = canvas.transform.GetChild(0).Find("Back").GetChild(0).GetComponent<RectTransform>();
        audioSource = transform.parent.GetComponentInChildren<AudioSource>();
    }

    private void Update()
    {
        gage = Mathf.Clamp(gage + Time.deltaTime * (callerInput != null && callerInput.holdInteract ? 4 : 0), 0, 100);
        percentText.text = (int)gage + " %";
        gageRect.sizeDelta = new Vector2(gage * 1.65f, gageRect.sizeDelta.y);
        LocateUI();

        if (((30 <= gage && gage <= 31) || (80 <= gage && gage <= 81)) && !audioSource.isPlaying)
        {
            StartBeep();
        }

        if (gage >= 100)
        {
            if (!success) OnSuccess();
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (playerUI == null || other.name != "Player") return;
        playerUI.ShowInteractUI(transform.parent.gameObject);
        playerUI.SetInteractDescription("HACK");
    }

    private void OnTriggerExit(Collider other)
    {
        if (playerUI == null || other.name != "Player") return;
        canvas.gameObject.SetActive(false);
        playerUI.HideInteractUI();
        playerUI.SetInteractDescription("");
    }
}
```

### TurretTowerInteract.cs

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering.Universal;
using UnityEngine.UI;

public class TurretTowerInteract : MonoBehaviour
{
    private PlayerUI playerUI;
    private Canvas canvas;
    private Text hackText;
    private Text percentText;
    private RectTransform rootRect;
    private RectTransform gageRect;

    private RobotInputHandler callerInput;
    private float gage = 0;
    private bool success = false;

    public List<EnemyTurretAI> turretList;

    public void Interact(GameObject caller)
    {
        playerUI.HideInteractUI();
        playerUI.SetInteractDescription("");
        canvas.gameObject.SetActive(true);
        callerInput = caller.GetComponent<RobotInputHandler>();
    }

    private void LocateUI()
    {
        var screenPos = Camera.main.WorldToScreenPoint(transform.parent.position);
        RectTransformUtility.ScreenPointToLocalPointInRectangle(canvas.transform as RectTransform, screenPos,
            canvas.worldCamera, out Vector2 movePos);

        rootRect.position = canvas.transform.TransformPoint(movePos + new Vector2(50, 50));
    }

    private void OnSuccess()
    {
        success = true;
        hackText.text = "SUCCESS";
        hackText.color = new Color(0, 255, 0);

        turretList.ForEach(turret =>
        {
            turret.Deactivate();
            playerUI.GetComponentInChildren<MissionController>()
                .SetMissionStatus("Main01_" + turret.name.Substring(7, 2), MissionStatus.COMPLETE);
        });
    }

    private void Start()
    {
        playerUI = GameObject.Find("PlayerUICanvas").GetComponent<PlayerUI>();
        canvas = transform.parent.GetComponentInChildren<Canvas>(true);
        hackText = canvas.transform.GetChild(0).Find("HACK").GetComponent<Text>();
        percentText = canvas.transform.GetChild(0).Find("Percent").GetComponent<Text>();
        rootRect = canvas.transform.GetChild(0).GetComponent<RectTransform>();
        gageRect = canvas.transform.GetChild(0).Find("Back").GetChild(0).GetComponent<RectTransform>();
    }

    private void Update()
    {
        gage = Mathf.Clamp(gage + Time.deltaTime * (callerInput != null && callerInput.holdInteract ? 8 : success ? 0 : -10), 0, 100);
        percentText.text = (int)gage + " %";
        gageRect.sizeDelta = new Vector2(gage * 1.65f, gageRect.sizeDelta.y);
        LocateUI();

        if (gage >= 100)
        {
            if (!success) OnSuccess();
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (playerUI == null || other.name != "Player") return;
        playerUI.ShowInteractUI(transform.parent.gameObject);
        playerUI.SetInteractDescription("HOLD");
    }

    private void OnTriggerExit(Collider other)
    {
        if (playerUI == null || other.name != "Player") return;
        canvas.gameObject.SetActive(false);
        playerUI.HideInteractUI();
        playerUI.SetInteractDescription("");
    }
}
```
