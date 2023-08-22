HEADER START

#01. 축에 평행한 장애물 피하기 (No Sensor)
Sensor 없이 축에 평행한 장애물을 피해 Target 에 도달
2023-08-09
ML-Agent,Unity
RL-Obstacle-Avoid

HEADER END

# 축에 평행한 장애물 피하기 (No Sensor)

먼저 축과 평행한 (Axis-Align) 장애물을 피해 타깃에 도달하는 학습을 진행해 보았다.  
이번 포스트와 다음 포스트는 센서를 활용하지 않고, 직접 `Observation` 을 제공해 주는 방법으로 학습해 보았다.

모델은 PPO(Proximal Policy Optimization) 을 사용하였다.

## Observation (First Try, Second Try)

먼저 `RayPerceptionSensor` 없이 아래 정보들을 제공하여 학습을 진행시켰다.

| `sensor.AddObservation`                        |
| ---------------------------------------------- |
| `target.localPosition`                         |
| `transform.localPosition`                      |
| `rigidbody.velocity.x`                         |
| `rigidbody.velocity.z`                         |
| `obstacle.transform.localPosition`             |
| `obstacle.transform.localScale`                |
| `obstacle.transform.localRotation.eulerAngles` |

## First Try

### Policy

| Situation                       | Reward      | EndEpisode |
| ------------------------------- | ----------- | ---------- |
| 밖으로 떨어지거나 장애물에 닿음 | -1          | O          |
| 타깃에 도달                     | +1          | O          |
| Living                          | 틱당 -0.001 |            |

### Result

<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_01/1.mp4" type="video/mp4">
</video>

그랬더니 장애물에 닿지 않으려고 코너에서 우물쭈물하는 모습을 보였다.  
이동하여 떨어지는 리스크를 감수하는 것보다 가만히 있는게 더 높은 리워드를 준다고 판단한 것 같다.

## Second Try

### Policy

| Situation              | Reward      | EndEpisode |
| ---------------------- | ----------- | ---------- |
| 밖으로 떨어짐          | -5          | O          |
| 타깃에 도달            | +5          | O          |
| 장애물에 닿아있는 동안 | 틱당 -0.005 |            |
| Living                 | 틱당 -0.001 |            |

그래서 장애물에 닿아도 에피소드를 끝내지 않고, 닿아 있는 동안 (`OnCollisionStay`) 패널티를 주는 방식으로 변경했다.  
장애물에 닿아있는 동안 틱당 -0.005 의 패널티를 부과하였다.

### Result

<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_01/2.mp4" type="video/mp4">
</video>

![600px](/imgs/post_imgs/mlagent_01/3.png)

결과는 반은 성공했다고 볼 수 있을 것 같다.

Agent 기준 타깃이 왼쪽에 있다면 왼쪽으로 돌고, 오른쪽에 있다면 오른쪽으로 도는 일반화된 모습을 기대했으나... 타깃의 위치와 상관없이 한 방향으로만 돈다.

즉, <u>Overfitting 으로 일반화에 실패</u>한 것이다.  
타깃은 Random 한 위치로 스폰되나, 장애물이나 Agent 의 스폰 위치, 크기 등은 고정되어 있기 때문에 Overfitting 이 발생한 것이다.

직접 Unity Script 내에 Parameter Randomization 을 구현해도 되나, 찾아보니 관련 기능이 ML-Agents 에 내장되어 있었다.  
[Parameter Randomization](https://unity-technologies.github.io/ml-agents/Training-ML-Agents/#environment-parameter-randomization)

해당 내용은 나중에 포스트에서 다루도록 하겠다.
