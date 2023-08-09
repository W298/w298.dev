HEADER START

#14. AI Behavior Tree (4)
#14. AI Behavior Tree (4)
2022-11-10
Unity
Robot-Escape

HEADER END

# AI Behavior Tree (4)

![600px](https://velog.velcdn.com/images/lutca1320/post/b8315ebc-92fc-4871-9e69-505295b5d70b/image.png)

마지막으로 Cover 기능을 구현할 것이다.

### Cover

```csharp
public class Cover : Node
{
    private EnemyRobotBT ebt;

    public Cover(BehaviorTree bt) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
    }

    public override NodeState Evaluate()
    {
        if (!ebt.ai.closestCoverPoint)
        {
            float minDistance = 10000;
            foreach (var coverPoint in GameObject.FindGameObjectsWithTag("CoverPoint"))
            {
                float dPointToAI = Vector3.Distance(coverPoint.transform.position, ebt.ai.transform.position);
                float dEnemyToPoint = ebt.ai.enemyObject ? Vector3.Distance(ebt.ai.enemyObject.transform.position, coverPoint.transform.position) : 1;

                bool isBlock = !ebt.ai.enemyObject || Physics.Linecast(coverPoint.transform.position, ebt.ai.enemyObject.transform.position, 1 << LayerMask.NameToLayer("Obstacle"));

                float value = ebt.ai.enemyObject ? (1 / dEnemyToPoint) : dPointToAI;
                if (value < minDistance && isBlock)
                {
                    ebt.ai.closestCoverPoint = coverPoint;
                    minDistance = value;
                }
            }
        }

        if (!ebt.ai.closestCoverPoint) return NodeState.FAILURE;

        ebt.ai.StartMove(ebt.ai.closestCoverPoint.transform.position);

        if (Vector3.Distance(ebt.ai.navAgent.transform.position, ebt.ai.closestCoverPoint.transform.position) <= ebt.ai.navAgent.stoppingDistance)
        {
            Quaternion toRotation = ebt.ai.closestCoverPoint.transform.rotation;
            ebt.ai.transform.rotation = Quaternion.RotateTowards(ebt.ai.transform.rotation, toRotation, Time.deltaTime * 500);

            ebt.ai.inputHandler.isCrouch = true;
        }

        return NodeState.RUNNING;
    }
}
```

![900px](https://velog.velcdn.com/images/lutca1320/post/41fbdcf9-c718-40df-9add-4765ce0bb73a/image.webp)

일정 수치 아래로 체력이 내려가면 주변에 있는 CoverPoint 로 이동하여 Cover 한다.
일정 시간이 지나 체력이 회복되면 Cover 를 종료한다.

### IsHealthLow

```csharp
public class IsHealthLow : Node
{
    private EnemyRobotBT ebt;
    private float threshold;

    public IsHealthLow(BehaviorTree bt, float threshold) : base(bt)
    {
        ebt = (EnemyRobotBT)bt;
        this.threshold = threshold;
    }

    public override NodeState Evaluate()
    {
        return (ebt.ai.statusController.health <= threshold) ? NodeState.SUCCESS : NodeState.FAILURE;
    }
}
```

![900px](https://velog.velcdn.com/images/lutca1320/post/8746309f-b606-42b4-a34d-8251a152877a/image.webp)

체력이 상당히 낮을 경우, Cover 하지 않고 맞서 싸운다.

### Behavior Tree 조립

```csharp
public class EnemyRobotBT : BehaviorTree
{
    [NonSerialized]
    public EnemyRobotAI ai;

    private void Awake()
    {
        ai = GetComponent<EnemyRobotAI>();
    }

    protected override Node CreateTree()
    {
        Node attackSequence = new Sequence(new List<Node>
        {
            new TakeDistance(this),
            new Aim(this),
            new Selector(new List<Node>
            {
                new Sequence(new List<Node>
                {
                    new NeedReload(this),
                    new Reload(this)
                }),
                new Fire(this)
            })
        });

        Node root = new Sequence(new List<Node>
        {
            new Clear(this),
            new Selector(new List<Node>
            {
                new Sequence(new List<Node>
                {
                    new IsHealthLow(this, 30),
                    new Selector(new List<Node>
                    {
                        new Sequence(new List<Node>
                        {
                            new IsDetectEnemy(this),
                            new Selector(new List<Node>
                            {
                                new Sequence(new List<Node>
                                {
                                    new IsHealthLow(this, 20),
                                    attackSequence
                                }),
                                new Cover(this)
                            })
                        }),
                        new Cover(this)
                    })
                }),
                new Sequence(new List<Node>
                {
                    new IsDetectEnemy(this),
                    attackSequence
                }),
                new Sequence(new List<Node>
                {
                    new NeedReload(this),
                    new Reload(this)
                }),
                new Selector(new List<Node>
                {
                    new Sequence(new List<Node>
                    {
                        new IsSeekLevelHigh(this),
                        new Aim(this),
                        new Seek(this)
                    }),
                    new Sequence(new List<Node>
                    {
                        new Walk(this),
                        new Patrol(this)
                    })
                })
            })
        });

        return root;
    }
}
```
