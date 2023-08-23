HEADER START

#02. 약간 회전한 장애물 피하기 (No Sensor)
Sensor 없이 약간 회전한 장애물 피하기 및 Imitation Learing 적용
2023-08-10
ML-Agent,Unity
RL-Obstacle-Avoid

HEADER END

# 약간 회전한 장애물 피하기 (No Sensor)

이번에는 약간 회전한 장애물을 피해 타깃에 도달하는 학습을 진행했다.

## Observation (First Try, Second Try)

| `sensor.AddObservation`                        |
| ---------------------------------------------- |
| `target.localPosition`                         |
| `transform.localPosition`                      |
| `rigidbody.velocity.x`                         |
| `rigidbody.velocity.z`                         |
| `obstacle.transform.localPosition`             |
| `obstacle.transform.localScale`                |
| `obstacle.transform.localRotation.eulerAngles` |

이전 포스트와 동일

## First Try

### Policy

| Situation              | Reward      | EndEpisode |
| ---------------------- | ----------- | ---------- |
| 밖으로 떨어짐          | -5          | O          |
| 타깃에 도달            | +5          | O          |
| 장애물에 닿아있는 동안 | 틱당 -0.005 |            |
| Living                 | 틱당 -0.001 |            |

이전 포스트와 동일한 Policy 로 진행하였다.

### Result

이번에도 회전은 한 방향으로만 진행했으며,

- 블록의 오른쪽 부분에 가까우면 꽤 잘 작동했으나...
<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_02/1.mp4#t=0.001" type="video/mp4">
</video>

- 타깃이 안쪽으로 들어갈수록 어려워하는 것을 확인할 수 있다. 제대로 장애물의 크기를 고려해 인식하고 피할 수는 없는 것 같다.
<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_02/2.mp4#t=0.001" type="video/mp4">
</video>

## Second Try (Imitation Learning)

### Policy

| Situation              | Reward      | EndEpisode |
| ---------------------- | ----------- | ---------- |
| 밖으로 떨어짐          | -5          | O          |
| 타깃에 도달            | +5          | O          |
| 장애물에 닿아있는 동안 | 틱당 -0.005 |            |
| Living                 | 틱당 -0.001 |            |

First Try 와 동일한 Policy 로 진행하였다.

### Settings

<video width="400" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_02/3.mp4#t=0.001" type="video/mp4">
</video>

```
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
      gail:
          strength: 0.5
          demo_path: Demos/RollerDemo.demo
    behavioral_cloning:
            strength: 0.5
            demo_path: Demos/RollerDemo.demo
```

그래서 **Imitiation Learning** 을 적용해 보기로 했다.  
유니티의 `Demonstration Recorder` 를 이용해 직접 조정하여 이상적인 Behavior 를 담은 데모를 위와 같이 찍었고, 이를 Hyperparameter 에 지정했다.

Hyperparameter 의 `gail` 과 `behavioral_cloning` 값을 각각 strength 0.5 씩 지정하여 진행하였다.

### Result

<video width="600" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_02/5.mp4#t=0.001" type="video/mp4">
</video>

![600px](/imgs/post_imgs/mlagent_02/6.png)

결과는 위처럼 실패다.

확실히 자신 기준 오른쪽에 생성되면 오른쪽으로 돌고, 왼쪽으로 생성되면 왼쪽으로 돌려는 모습을 보이기는 했으나,  
데모의 영향이 상당히 큰지 학습이 진행될 수록 이상한 움직임을 보였다.

strength 를 줄여서 학습을 진행해 보기도 했으나, 결과는 비슷했다.

Observation 으로 준 Obstacle 관련 값들이 아무래도 학습에 큰 영향을 주지 못하는 것 같다.  
위와 같은 장애물을 피해 타깃에 도달하기 위해서는 센서를 사용할 필요가 있는 것 같다.
