HEADER START

#05. 회전하는 장애물 피하기
Sensor 를 이용하여 회전 장애물 피하기 및 checkpoint 로드로 학습
2023-08-13
ML-Agent,Unity
RL-Obstacle-Avoid

HEADER END

# 회전하는 장애물 피하기

![500px](/imgs/post_imgs/mlagent_05/1.png)

이번에는 위와 같이 회전하는 장애물 (빨간색 블록) 이 있는 Env 에서 학습을 진행해 보았다.  
이번에도 센서를 이용하였고, 장애물의 `Rigidbody` 에 `AddTorque` 로 일정 속도로 회전하게 만들었다.

## Observation (First Try, Second Try, Third Try)

| `sensor.AddObservation` |
| ----------------------- |
| `rigidbody.velocity.x`  |
| `rigidbody.velocity.z`  |

이전 포스트와 동일하다.

## First Try

### Policy

| Situation              | Reward                | EndEpisode |
| ---------------------- | --------------------- | ---------- |
| 장애물에 닿아있는 동안 | 틱당 (-500 / MaxStep) |            |
| 벽에 닿아있는 동안     | 틱당 (-30 / MaxStep)  |            |
| 타깃에 도달            | +20                   | O          |
| Living                 | 틱당 (-2 / MaxStep)   |            |

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

<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_05/1.mp4#t=0.001" type="video/mp4">
</video>

타깃에 도달하기까지가 너무 힘들기 때문에 학습이 제대로 안되는 모습을 보였다.

아무런 Base 가 없는 상태에서 학습시키는게 아니라,

1. 일단 먼저 **타깃까지 가는 모델을 학습**시킨 뒤,
2. **그 모델을 기반으로** 회전하는 장애물을 피하게 학습시키는 것이 좋을 것 같다.

## Second Try (Goal Seek 학습 후 장애물 피하기 학습)

### Goal-Seek Train

<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_05/2.mp4#t=0.001" type="video/mp4">
</video>

일단 간단하게 타깃까지 가는 Goal Seeking 학습을 250K 스탭까지 진행했다.  
이 모델에 회전하는 장애물을 추가한 Env 에서 추가 학습을 진행할 것이다.

### Policy

| Situation              | Reward                | EndEpisode |
| ---------------------- | --------------------- | ---------- |
| 장애물에 닿아있는 동안 | 틱당 (-500 / MaxStep) |            |
| 벽에 닿아있는 동안     | 틱당 (-30 / MaxStep)  |            |
| 타깃에 도달            | +20                   | O          |
| Living                 | 틱당 (-2 / MaxStep)   |            |

동일.

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

동일.

### Result

<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_05/3.mp4#t=0.001" type="video/mp4">
</video>

![800px](/imgs/post_imgs/mlagent_05/2.png)

250K 스탭 이후가 추가 학습을 진행한 그래프이다.  
없던 장애물이 갑자기 생긴 것이기 때문에 <u>초반에는 Reward 가 급격하게 떨어지는 것</u>을 확인할 수 있다.

**왼쪽으로 가는 것이 Reward 를 더 많이 받을 수 있다**는 것을 파악하고 왼쪽으로만 가고 있으며,  
장애물에 최대한 닿지 않게 상황에 따라서 **속도를 늦추거나 빠르게** 하는 모습을 확인할 수 있다.

결과는 꽤 성공적이나, 그래도 장애물에 가끔씩 닿는다.

<u>learning_rate, epsilon 이 학습이 진행될수록 linear 하게 감소</u>하기 때문에,  
250K 스탭부터 학습시킨 현재 학습이 드라마틱하게 더 이루어지지는 않는 것 같다.

그래서 이번에는 `--resume` 옵션으로 추가 학습을 하는 것이 아니라, 현재까지 학습한 모델의 **checkpoint 를 기반으로 하여 새로 학습**해 보았다.

## Third Try (지금까지 학습한 모델의 Checkpoint 기반으로 새로 학습)

### Command Line

`mlagents-learn config/ppo/RollerBall.yaml --run-id=RollerBallExtend --num-envs=24 --env=Build --initialize-from=RollerBall`

`--initialize-from` 을 사용하여 지금까지 학습한 모델의 checkpoint 를 불러왔다.

### Policy

| Situation              | Reward                | EndEpisode |
| ---------------------- | --------------------- | ---------- |
| 장애물에 닿아있는 동안 | 틱당 (-500 / MaxStep) |            |
| 벽에 닿아있는 동안     | 틱당 (-30 / MaxStep)  |            |
| 타깃에 도달            | +20                   | O          |
| Living                 | 틱당 (-2 / MaxStep)   |            |

동일.

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

동일.

### Result

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_05/4.mp4#t=0.001" type="video/mp4">
</video>

![800px](/imgs/post_imgs/mlagent_05/3.png)

회색 그래프가 Second Try 까지의 결과이고, 파란색 그래프가 이번 학습 결과이다.

완전히 20에 수렴하지는 않으나, 그래도 이전보다 확실히 좋아진 모습을 확인할 수 있다.  
굉장히 아슬아슬하게 장애물에 안닿는 모습을 볼 수 있다.
