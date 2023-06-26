HEADER START

Robot! Escape! DEVLOG #13
#13. AI Behavior Tree (3)
2022-11-09
Robot-Escape-DEVLOG,Unity

HEADER END

# AI Behavior Tree (3)

![600px](https://velog.velcdn.com/images/lutca1320/post/f7e26b42-4973-49f0-9319-00e12f47dcab/image.png)

이번에는 Seek, Patrol 부분을 구현해 보았다.

### Seek

```csharp
public class Seek : Node
{
    private EnemyRobotBT ebt;

    private float seekWaitDuration = 3;
    private float seekWaitTimer;
    private Vector3 seekPosition;

    public Seek(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
        seekWaitTimer = seekWaitDuration;
    }

    public override NodeState Evaluate()
    {
        if (!ebt.ai.seekPointReached) seekPosition = ebt.ai.lastEnemyPosition;

        float remainDistance = Vector3.Distance(ebt.ai.navAgent.transform.position, seekPosition);
        if (remainDistance <= ebt.ai.navAgent.stoppingDistance * 2)
        {
            seekWaitTimer -= Time.deltaTime;
            if (seekWaitTimer < 0)
            {
                seekWaitTimer += seekWaitDuration;

                seekPosition = CreateRandomPoint();
                ebt.ai.seekPointReached = true;
            }
        }

        bool success = ebt.ai.StartMove(seekPosition);
        DebugExtension.DebugWireSphere(seekPosition, Color.green, 0.5f);

        return success ? NodeState.RUNNING : NodeState.FAILURE;
    }

    private Vector3 CreateRandomPoint()
    {
        Vector3 randomPoint = Random.insideUnitSphere * 10 + ebt.ai.lastEnemyPosition;

        NavMesh.SamplePosition(randomPoint, out NavMeshHit hit, 10, NavMesh.AllAreas);

        return hit.position;
    }
}
```

![900px](https://velog.velcdn.com/images/lutca1320/post/8a9c2d21-2e70-4c8d-ace4-6cb6f56434be/image.webp)

EnemyAI 가 플레이어를 쫒아오다가 탐지 범위에서 벗어났을 때,

- 마지막으로 detect 된 플레이어의 위치 (위 그림에서 Cyan Sphere) 를 기준으로
- 주변의 Random Point (위 그림에서 Green Sphere) 를 탐색한다.
- seekLevel 이 일정 수치 아래로 내려가면 Seek 를 포기하고 Patrol 를 진행한다.

### Patrol

```csharp
public class Patrol : Node
{
    private EnemyRobotBT ebt;

    private float patrolWaitDuration = 3;
    private float patrolWaitTimer;

    private int current = 0;
    private int reverse = -1;

    public Patrol(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
        patrolWaitTimer = patrolWaitDuration;
    }

    public override NodeState Evaluate()
    {
        int count = ebt.ai.patrolPoints.transform.childCount;
        Vector3 targetPosition = ebt.ai.patrolPoints.transform.GetChild(current).transform.position;

        float remainDistance = Vector3.Distance(ebt.ai.navAgent.transform.position, targetPosition);
        if (remainDistance <= ebt.ai.navAgent.stoppingDistance)
        {
            patrolWaitTimer -= Time.deltaTime;
            if (patrolWaitTimer < 0)
            {
                patrolWaitTimer += patrolWaitDuration;

                if (current == 0 || current == count - 1) reverse *= -1;
                current += reverse;
            }
        }

        bool success = ebt.ai.StartMove(targetPosition);
        return success ? NodeState.RUNNING : NodeState.FAILURE;
    }
}
```

![900px](https://velog.velcdn.com/images/lutca1320/post/43b3d6e7-f1ee-4fff-a8ac-cf17eac985b5/image.webp)

지정된 PatrolPoint 들을 순찰한다.

- 순서는 P1 → P2 → P3 → P2 → P1 이다.
- Behavior Tree 에서 가장 오른쪽에 있는 노드로, 아무 이벤트가 없을 경우 발생된다.

### IsSeekLevelHigh, Walk

```csharp
public class IsSeekLevelHigh : Node
{
    private EnemyRobotBT ebt;
    private float threshold = 60;

    public IsSeekLevelHigh(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        return ebt.ai.seekLevel.currentLevel > threshold ? NodeState.SUCCESS : NodeState.FAILURE;
    }
}
```

```csharp
public class Walk : Node
{
    private EnemyRobotBT ebt;

    public Walk(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        ebt.ai.inputHandler.isWalk = true;
        ebt.ai.navAgent.speed = ebt.ai.inputHandler.maxSpeed / 3;

        return NodeState.SUCCESS;
    }
}
```
