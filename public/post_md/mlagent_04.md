HEADER START

#04. 밀집된 장애물 피하기 (With Sensor)
Sensor 를 이용하여 밀집된 장애물 피하기 및 추가학습으로 정확도 개선
2023-08-12
ML-Agent,Unity
RL-Obstacle-Avoid

HEADER END

# 밀집된 장애물 피하기 (With Sensor)

![400px](/imgs/post_imgs/mlagent_04/1.png)

위와 같이 장애물들이 상당히 밀집해 있는 Env 에서 Target 에 도달하는 학습을 진행해 보았다.  
Target 은 Env 전 지역에서 랜덤 위치에 스폰된다.

## Observation (First Try, Second Try)

| `sensor.AddObservation` |
| ----------------------- |
| `rigidbody.velocity.x`  |
| `rigidbody.velocity.z`  |

이전 포스트와 동일한 센서와 Observation 값들을 사용한다.

## First Try

### Policy

| Situation              | Reward               | EndEpisode |
| ---------------------- | -------------------- | ---------- |
| 장애물에 닿아있는 동안 | 틱당 (-30 / MaxStep) |            |
| 타깃에 도달            | +5                   | O          |
| Living                 | 틱당 (-2 / MaxStep)  |            |

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
  <source src="/videos/post_videos/mlagent_04/4.mp4#t=0.001" type="video/mp4">
</video>

![800px](/imgs/post_imgs/mlagent_04/5.png)

꽤 잘 되는 것 같으나... 아래와 같이 특정 구간에 타깃이 있을 시 센서에 잡혔음에도 잘 안되는것을 확인할 수 있다.  
저 구간이 좀 크기가 작아서, 스폰이 많이 일어나지 않아, <u>저 구간의 학습량이 부족</u>한 것 같다.

- 특정 구간
<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_04/3.mp4#t=0.001" type="video/mp4">
</video>

## Second Try (추가 학습)

![600px](/imgs/post_imgs/mlagent_04/4.png)

위 구간이 잘 안되는 것 같아, 저 부분을 집중적으로 학습시켰다.  
기존 학습한 모델에, <u>**저 구간에만 타깃이 생성되는 Env 로 추가 학습**</u>을 진행시켰다.

### Policy

| Situation              | Reward               | EndEpisode |
| ---------------------- | -------------------- | ---------- |
| 장애물에 닿아있는 동안 | 틱당 (-30 / MaxStep) |            |
| 타깃에 도달            | +5                   | O          |
| Living                 | 틱당 (-2 / MaxStep)  |            |

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

![800px](/imgs/post_imgs/mlagent_04/6.png)

성공이다. 거의 5에 수렴한다.

ML-Agents 의 `--resume` 옵션을 이용해 기존에 학습된 결과에 추가 학습을 진행시켰다.  
1M 이후 (빨간색 선 이후) 가 추가 학습된 그래프이다.

- 잘 안되는 구간에서 잘 되는 것을 확인할 수 있고,
<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_04/1.mp4#t=0.001" type="video/mp4">
</video>

- 전체 구간에서도 문제없이 잘 되는 것을 확인할 수 있다.
<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_04/2.mp4#t=0.001" type="video/mp4">
</video>
