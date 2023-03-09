HEADER START

#12. AI Behavior Tree (2)
Robot! Escape! DEVLOG Chapter 12
2022-11-08
Robot-Escape-DEVLOG,Unity

HEADER END

# AI Behavior Tree (2)

![600px](https://velog.velcdn.com/images/lutca1320/post/a81dac09-2b44-44d9-a040-a951a0fb03cf/image.png)

이번에는 다음 부분을 구현할 것이다.

### `IsDetectEnemy`

이 노드는 하는 일이 많다. 추후에 수정할 것이다.

#### Success

1. redZone 에 Enemy 가 존재하는지 확인한다. 있으면 enemyObject 로 지정 및 SUCCESS -> 발포
2. redZone 에 Enemy 가 없으면, yellowZone 에서 확인한다. 있으면 seekLevel 을 올린다. 80이 넘을 시 enemyObject 로 지정해 yellowZone 에 있을 때에도 SUCCESS -> 발포

#### Failure

1. yellowZone 에 있고, seekLevel 이 80 미만일 시 FAILURE
2. yellowZone 에도 없고, redZone 에도 없으면 FAILURE

```csharp
public class IsDetectEnemy : Node
{
    private EnemyRobotBT ebt;

    private Timer detectLevelStayTimer;

    public IsDetectEnemy(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;

        detectLevelStayTimer = new Timer(2f, () =>
        {
            ebt.ai.detectLevel.decTimer.active = true;

            detectLevelStayTimer.active = false;
            detectLevelStayTimer.Reset();
        });
        detectLevelStayTimer.active = false;
    }

    public override NodeState Evaluate()
    {
        if (!ebt.ai.isHit)
        {
            var redZoneEnemy = ebt.ai.visonSensor.redZoneObjectList.Find(o => o != null && !o.GetComponent<RobotStatusController>().isDeath && o.name == "Player");

            ebt.ai.enemyObject = redZoneEnemy;

            if (!redZoneEnemy)
            {
                var yellowZoneEnemy = ebt.ai.visonSensor.yellowZoneObjectList.Find(o =>
                    o != null && !o.GetComponent<RobotStatusController>().isDeath && o.name == "Player");

                if (yellowZoneEnemy)
                {
                    ebt.ai.detectLevel.incTimer.active = true;
                    ebt.ai.detectLevel.decTimer.active = false;

                    if (ebt.ai.detectLevel.currentLevel >= 80)
                    {
                        ebt.ai.enemyObject = yellowZoneEnemy;
                    }
                }
                else
                {
                    if (ebt.ai.detectLevel.incTimer.active)
                    {
                        detectLevelStayTimer.active = true;
                    }

                    ebt.ai.detectLevel.incTimer.active = false;
                }
            }
            else
            {
                ebt.ai.detectLevel.currentLevel = 100;
            }
        }

        if (ebt.ai.enemyObject)
        {
            ebt.ai.seekLevel.currentLevel = 100;
            ebt.ai.seekLevel.decTimer.active = false;
            ebt.ai.lastEnemyPosition = ebt.ai.enemyObject.transform.position;
            ebt.ai.seekPointReached = false;
            ebt.ai.closestCoverPoint = null;
        }
        else
        {
            ebt.ai.seekLevel.decTimer.active = true;
        }

        detectLevelStayTimer.Update();

        DebugExtension.DebugWireSphere(ebt.ai.lastEnemyPosition, Color.cyan, 0.5f);

        return ebt.ai.enemyObject ? NodeState.SUCCESS : NodeState.FAILURE;
    }
}
```

![900px](https://velog.velcdn.com/images/lutca1320/post/309438f5-ec92-42a7-8ce5-4aa584081945/image.gif)

바깥이 YelloZone, 안쪽이 RedZone 이다.
YelloZone 에 오래 머물거나 RedZone 에 진입하면 발포한다.

### `TakeDistance`, `Aim`

AI가 AI와 enemyObject 간의 거리를 일정 거리를 유지하려고 하게 만드는 코드이다.

```csharp
public class TakeDistance : Node
{
    private EnemyRobotBT ebt;

    public TakeDistance(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        Vector3 direction = ebt.ai.enemyObject.transform.position - ebt.ai.transform.position;
        float distance = direction.magnitude;

        direction.Normalize();

        switch (distance)
        {
            case < 7.5f:
                ebt.ai.StartMove(ebt.ai.transform.position - direction * 5);
                break;
            case > 10:
                ebt.ai.StartMove(ebt.ai.transform.position + direction * 5);
                break;
            default:
                ebt.ai.StopMove();
                break;
        }

        return NodeState.SUCCESS;
    }
}
```

```csharp
public class Aim : Node
{
    private EnemyRobotBT ebt;

    public Aim(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        ebt.ai.inputHandler.isAim = true;
        ebt.ai.navAgent.speed = ebt.ai.inputHandler.maxSpeed / 2;

        return NodeState.SUCCESS;
    }
}
```

![900px](https://velog.velcdn.com/images/lutca1320/post/92fc5d00-27e8-45b8-8b20-32945145d706/image.gif)

앞으로 돌격하면 뒤로 물러나고, 도망가면 쫒아온다.

### `NeedReload`

gunController 에 직접 접근해서 남은 탄약을 확인하고,
재장전이 필요하면 SUCCESS, 필요하지 않으면 FAILURE 를 리턴한다.

```csharp
public class NeedReload : Node
{
    private EnemyRobotBT ebt;

    public NeedReload(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        bool needReload = ebt.ai.gunController.ammoSystem.magAmmo <= 0;
        return needReload ? NodeState.SUCCESS : NodeState.FAILURE;
    }
}
```

### `Reload`

실제로 재장전한다.

```csharp
public class Reload : Node
{
    private EnemyRobotBT ebt;

    public Reload(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        if (!ebt.ai.GetComponent<Animator>().GetBool("isReload"))
        {
            ebt.ai.inputHandler.Reload();
        }

        return NodeState.RUNNING;
    }
}
```

### `Fire`

발포한다.

```csharp
public class Fire : Node
{
    private EnemyRobotBT ebt;

    public Fire(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        ebt.ai.inputHandler.isFire = true;

        return NodeState.RUNNING;
    }
}
```
