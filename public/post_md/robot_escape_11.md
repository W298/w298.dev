HEADER START

Robot! Escape! DEVLOG #11
#11. Timer, LevelController
2022-11-07
Robot-Escape-DEVLOG,Unity

HEADER END

# Timer, LevelController

EnemyAI 를 구현하면서 지속적으로 증가하거나 감소하는 Level 들 (seekLevel, detectLevel 등) 이 있는데,
이들을 효과적으로 관리할 수 있는 class 가 있으면 좋을 것 같아 만들어 보았다.

그리고 만드는 김에 Timer class 도 구현해 LevelController 에 사용하였다.

```csharp
[System.Serializable]
public class LevelController
{
    public float defaultLevel;
    public float currentLevel;

    public Timer incTimer;
    public Timer decTimer;

    public LevelController(float defaultLevel, float incInterval, float decInterval)
    {
        this.defaultLevel = defaultLevel;

        incTimer = new Timer(incInterval, () => { if (currentLevel < 100) currentLevel++; });
        decTimer = new Timer(decInterval, () => { if (currentLevel > 0) currentLevel--; });

        currentLevel = this.defaultLevel;
    }

    public void Update()
    {
        incTimer.Update();
        decTimer.Update();
    }
}
```

```csharp
[System.Serializable]
public class Timer
{
    public delegate void ExecuteFunction();
    public ExecuteFunction exeFunc;

    public bool active = true;

    private float interval;
    private float timer;

    public Timer(float interval, ExecuteFunction exeFunc)
    {
        this.interval = interval;
        this.exeFunc = exeFunc;

        Reset();
    }

    public Timer(int frequency, ExecuteFunction exeFunc)
    {
        interval = 1f / frequency;
        timer = interval;
        this.exeFunc = exeFunc;
    }

    public void Reset()
    {
        timer = interval;
    }

    public void Update()
    {
        if (!active) return;
        timer -= Time.deltaTime;
        if (timer < 0)
        {
            timer += interval;
            exeFunc();
        }
    }
}
```
