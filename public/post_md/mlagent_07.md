HEADER START

#01. Predator & Prey
MA-POCA 의 Self-Play 를 이용한 경쟁 Multi-Agent 학습
2023-08-18
ML-Agent,Unity
RL-Competitive

HEADER END

# Predator & Prey

![600px](/imgs/post_imgs/mlagent_07/3.png)

이번에는 Predator 와 Prey, 두 개의 서로 다른 목표를 가진 Agent 를 한 Env 에서 동시에 학습해 볼 것이다.  
MA-POCA 의 Self-Play 를 이용할 것인데, 이를 이용하면 설정한 Step 마다 학습시키는 팀을 바꿔가면서 진행할 수 있다.

각 Agent 의 승리 조건은,

- Predator Agent 는 Prey Agent 를 쫒아 잡으면 승리하고,
- Prey Agent 는 Predator Agent 에게 잡히지 않고 MaxStep 까지 버티면 승리한다.

다만 Env 가 그렇게 크지 않기 때문에 Prey 가 꽤 불리하므로, Prey 의 이동 속도를 1.7, Predator 의 이동 속도의 1 로 설정하였다.

## Observation

RayPerceptionSensor 만 이용한다.

## Training

### Policy

#### Predator Agent

| Situation           | Reward              | EndEpisode |
| ------------------- | ------------------- | ---------- |
| Living              | 틱당 (-1 / MaxStep) |            |
| Prey 를 잡았을 경우 | 1                   |            |

#### Prey Agent

| Situation                 | Reward              | EndEpisode |
| ------------------------- | ------------------- | ---------- |
| Living                    | 틱당 (+1 / MaxStep) |            |
| Predator 에게 잡혔을 경우 | -1                  |            |

Predator 가 Prey 를 잡았을 경우,

- Predator 는 <u>더 빠르게 잡았을 경우 더 큰 Reward</u> 를 받는다 (+ 승리)
  - (1 - [지난시간] / MaxStep)
  - (1 - MaxStep 대비 지난 시간), 즉 시간이 지날수록 받는 Reward 감소
- Prey 는 <u>최대한 늦게 잡혔을 경우 더 적은 패널티</u> 를 받는다 (- 패배)
  - ([지난시간] / MaxStep - 1)
  - (MaxStep 대비 지난 시간 - 1), 즉 시간이 지날수록 받는 패널티 감소

Prey 가 잡히지 않고 끝까지 버텼을 경우,

- Predator 는 결국 -1 의 Reward 를 가지게 된다 (- 패배)
- Prey 는 결국 +1 의 Reward 를 가지게 된다 (+ 승리)

ELO 계산 시 Reward 가 +1 일 경우 승리, 0 은 무승부, -1 은 패배로 처리하므로 위와 같이 설정해 주었다.  
[Unity ML-Agents Docs](https://unity-technologies.github.io/ml-agents/Training-Configuration-File/#note-on-reward-signals)

### Hyperparameter

<details>
<summary>접기/펼치기</summary>

```
behaviors:
  WalkAgentPredator:
    trainer_type: poca
    hyperparameters:
      batch_size: 512
      buffer_size: 5120
      learning_rate: 3.0e-4
      beta: 1e-3
      epsilon: 0.15
      lambd: 0.95
      num_epoch: 4
      learning_rate_schedule: constant
    network_settings:
      normalize: false
      hidden_units: 256
      num_layers: 2
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    keep_checkpoints: 21
    checkpoint_interval: 50000
    max_steps: 1000000
    time_horizon: 1000
    summary_freq: 10000
    self_play:
      window: 10
      play_against_latest_model_ratio: 0.5
      save_steps: 20000
      swap_steps: 1000
      team_change: 100000
      initial_elo: 1200.0
  WalkAgentPrey:
    trainer_type: poca
    hyperparameters:
      batch_size: 512
      buffer_size: 5120
      learning_rate: 3.0e-4
      beta: 1e-3
      epsilon: 0.15
      lambd: 0.95
      num_epoch: 4
      learning_rate_schedule: constant
    network_settings:
      normalize: false
      hidden_units: 256
      num_layers: 2
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    keep_checkpoints: 21
    checkpoint_interval: 50000
    max_steps: 1000000
    time_horizon: 1000
    summary_freq: 10000
    self_play:
      window: 10
      play_against_latest_model_ratio: 0.5
      save_steps: 20000
      swap_steps: 1000
      team_change: 100000
      initial_elo: 1200.0
```

MA-POCA 를 사용할 것이기 때문에 trainer_type 를 POCA 로 설정해 주었고, self_play 부분도 추가해 주었다.

</details>

### Result

![800px](/imgs/post_imgs/mlagent_07/2.png)
![800px](/imgs/post_imgs/mlagent_07/1.png)

빨간색이 Predator, 주황색이 Prey 다.

초반에는 Predator 가 우세한 모습을 보이다가, 400K ~ 500K 정도에서 ELO 수치가 뒤바뀌는 것을 확인할 수 있다.  
1.2M 까지 학습을 진행시켰는데, 점점 차이가 벌어지는 것을 볼 수 있다.

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_07/1.mp4#t=0.001" type="video/mp4">
</video>

Prey 가 시점은 최대한 Predator 를 주시한 채로 원을 그리면서 피하는 모습을 볼 수 있다.
