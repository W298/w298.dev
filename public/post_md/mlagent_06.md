HEADER START

#06. 레이저 장애물 피하기
Sensor 를 이용하여 레이저 장애물 피하기 (부분 목표 달성 시 Reward)
2023-08-14
ML-Agent,Unity
RL-Obstacle-Avoid

HEADER END

# 레이저 장애물 피하기

![600px](/imgs/post_imgs/mlagent_06/1.png)

이번에는 위와 같이 레이저 장애물을 준비했다.  
실제로 센서가 제대로 레이저를 인식하고 Agent 가 멈출 수 있는 지를 확인하고 싶어 이번 Env 를 만들었다.

![600px](/imgs/post_imgs/mlagent_06/2.png)

이번에는 **2개의 RayPerceptionSensor** 를 준비했다.

- 벽과 타깃을 탐지하는 센서
- 레이저를 탐지하는 센서

2개로 나눈 이유는, 만일 <u>하나의 센서로 벽, 타깃, 레이저를 탐지하게 한다면 레이저의 Collider 에 막혀 타깃을 탐지할 수 없기 때문</u>이다.  
즉, 타깃을 탐지하고 그 타깃으로 향하되, 레이저에 맞지 않게 속도를 조절하면서 가게 하려면 위와 같은 구성이 필요했다.

## Observation

| `sensor.AddObservation` |
| ----------------------- |
| `rigidbody.velocity.x`  |
| `rigidbody.velocity.z`  |

이전 포스트와 동일하다.

## Training

### Policy

| Situation            | Reward               | EndEpisode |
| -------------------- | -------------------- | ---------- |
| 타깃에 도달          | +20                  | O          |
| 레이저에 닿으면      |                      | O          |
| 벽에 닿아있는 동안   | 틱당 (-10 / MaxStep) |            |
| 1번째 레이저 통과 시 | 4                    |            |
| 2번째 레이저 통과 시 | 4                    |            |
| 3번째 레이저 통과 시 | 4                    |            |
| Living               | 틱당 (-1 / MaxStep)  |            |

이번 학습에서는 **레이저를 통과할 때마다 Reward** 를 주었다.  
즉, **부분 목표**를 지정한 것이고, 이를 달성할 때마다 조금씩 Reward 를 준 것이다.

만일 타깃에 도달하는 목표만 Reward 를 준다면,  
3개의 레이저를 모두 통과해야만 Reward 를 20 받을 수 있는 것이 되는데, 그 확률이 상당히 낮기에 학습이 제대로 안되거나 오래 걸릴 것이다.

3개의 레이저를 통과해야 타깃에 일단 도달할 수 있는 가능성이 생기는 것이기 때문에, 학습을 원활하게 하기 위해 다음과 같이 구성하였다.

### Hyperparameter

<details>
<summary>접기/펼치기</summary>

```
behaviors:
  RollerBall:
    trainer_type: ppo
    hyperparameters:
      batch_size: 512
      buffer_size: 2048
      learning_rate: 3.0e-4
      beta: 1e-3
      epsilon: 0.15
      lambd: 0.95
      num_epoch: 4
      learning_rate_schedule: linear
      beta_schedule: constant
      epsilon_schedule: linear
    network_settings:
      normalize: false
      hidden_units: 128
      num_layers: 2
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    max_steps: 1000000
    time_horizon: 256
    summary_freq: 10000
```

</details>

### Result

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_06/1.mp4" type="video/mp4">
</video>

![800px](/imgs/post_imgs/mlagent_06/3.png)

결과는 성공적이다.  
레이저에 아슬아슬하게 닿게 하지 않으면서 타깃에 도달하는 모습을 확인할 수 있다.
