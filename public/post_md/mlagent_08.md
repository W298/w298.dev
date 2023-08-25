HEADER START

#02. Domination
PPO 와 Self-Play 를 이용한 점령전 Multi-Agent 학습
2023-08-25
ML-Agent,Unity
RL-Competitive

HEADER END

# Domination

![800px](/imgs/post_imgs/mlagent_08/4.png)

이번에는 점령전, 즉 땅따먹기 게임을 학습시켜 보았다. 이전과 마찬가지로 Self-Play 를 이용하여 설정한 Step 마다 학습시키는 팀을 바꿔가면서 진행하였다.

제한 시간이 끝났을 때, 색칠된 타일의 수에 따라서 랭킹이 매겨지고, 이 랭킹에서 1등을 하는 것이 목적이다.  
상대방 대비 자신의 타일 개수의 비율이 중요한 것이기 때문에 많이 칠하는 것도 중요하지만, **상대방보다 많이 칠하는 것이 더 중요**하다.

즉, 빈 타일을 칠하는 것보다 <u>상대방의 타일을 자신의 색으로 칠하는 것이 최적의 방법</u>일 것이다.

## Action

DiscreteAction 하나를 사용할 것이며, 크기는 5 이다.

- 0 : `+z` 로 1칸 이동
- 1 : `-z` 로 1칸 이동
- 2 : `+x` 로 1칸 이동
- 3 : `-x` 로 1칸 이동
- 4 : 이전 이동을 이어서 계속 (이전이 +z 로 이동했으면 +z 로 이동)

멈춰 있는 선택지는 없으며, 매 Step 마다 계속 이동한다.

## Observation

| `sensor.AddObservation`                          |
| ------------------------------------------------ |
| Agent 의 x 좌표                                  |
| Agent 의 z 좌표                                  |
| Agent 가 바라보고 있는 방향 (움직이고 있는 방향) |
| 각 타일이 어떤 색으로 칠해져 있는지에 대한 정보  |

바라보고 있는 방향은, Action 2 를 취해 +x 로 1칸 이동하게 된다면 2 (Int) 가 될 것이다.  
타일 색 정보는 Agent 의 Team Number 이자 Team Enum 인 값을 Int 로 넘겨줄 것이다. 모든 타일 정보를 제공하므로 61x61 = 3721 개의 Int 정보를 넘긴다.

## Dominator Solo

Multi-Agent 를 학습시키기에 앞서, 먼저 1개의 Agent 만 넣어 테스트를 진행해 보았다. 제한 시간은 200 스탭으로 짧게 주었다.

### Policy

| Situation      | Reward               | EndEpisode |
| -------------- | -------------------- | ---------- |
| 매 Action 마다 | delta / 전체 타일 수 |            |

delta 는 이번 액션으로 변한 자신의 타일 수이다. 현재는 적이 없기 때문에 delta 값은 항상 양수일 것이다.  
delta 값을 전체 타일 수로 나누었기 때문에, 만일 모든 타일이 자신의 색으로 칠해지게 된다면 누적 Reward 는 1이 될 것이다.

### Hyperparameter

<details>
<summary>접기/펼치기</summary>

```
behaviors:
  Dominator:
    trainer_type: ppo
    hyperparameters:
      batch_size: 1024
      buffer_size: 10240
      learning_rate: 3.0e-4
      beta: 1e-3
      epsilon: 0.15
      lambd: 0.95
      num_epoch: 4
      learning_rate_schedule: constant
    network_settings:
      normalize: false
      hidden_units: 512
      num_layers: 2
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    max_steps: 6000000
    time_horizon: 1000
    summary_freq: 10000
```

</details>

### Result

![800px](/imgs/post_imgs/mlagent_08/1.png)

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_08/1.mp4#t=0.001" type="video/mp4">
</video>

테스트는 성공적이다.

제한 시간에 맞추어 최대한 자신이 얻을 수 있는 것 같은 크기의 사각형을 그려 칠하는 모습을 확인할 수 있다.  
이제 Agent 를 하나 늘려 2개의 Agent 로 학습시켜볼 것이다.

## Dominator Duo

제한 시간은 400 스탭으로 주었고, 만일 Agnet 가 타일 밖으로 빠져나갔을 경우 Agent 색으로 칠해진 모든 타일의 색을 초기화하고 리스폰하도록 하였다.

### Policy

| Situation                                  | Reward               |
| ------------------------------------------ | -------------------- |
| 매 Action 마다                             | delta / 전체 타일 수 |
| 제한 시간 종료 시 (1등일 경우 - 승리)      | percentOfTotal       |
| 제한 시간 종료 시 (1등이 아닐 경우 - 패배) | percentOfTotal - 0.5 |

이전과는 다르게 적이 생겼고, 밖으로 나갔을 경우 자신의 모든 타일을 잃기 때문에 delta 값은 음수가 될 수 있다. 즉, 패널티로 작용하는 것이다.

percentOfTotal 은 색칠되어 있는 타일 대비 자신의 색으로 칠해진 타일의 비율을 의미한다. (자신의 타일 수 / 색칠된 타일 수)

오직 1등일 때만 양수 값을 가지고, 이외에는 음수 값을 가지게 하고 싶으므로 패배일 경우 0.5 를 빼 주었다.  
이렇게 하면 똑같이 패배했을지라도 비율이 좀 더 높을 경우, 상대적으로 적은 패널티를 받게 된다.

### Hyperparameter

<details>
<summary>접기/펼치기</summary>

```
behaviors:
  Dominator:
    trainer_type: ppo
    hyperparameters:
      batch_size: 1024
      buffer_size: 10240
      learning_rate: 3.0e-4
      beta: 1e-3
      epsilon: 0.15
      lambd: 0.95
      num_epoch: 4
      learning_rate_schedule: constant
    network_settings:
      normalize: false
      hidden_units: 512
      num_layers: 2
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    max_steps: 6000000
    time_horizon: 1000
    summary_freq: 10000
    self_play:
      save_steps: 50000
      team_change: 100000
      swap_steps: 2000
      window: 10
      play_against_latest_model_ratio: 0.5
      initial_elo: 1200.0
```

</details>

### Result

![800px](/imgs/post_imgs/mlagent_08/2.png)
![800px](/imgs/post_imgs/mlagent_08/3.png)

학습은 성공적으로 되었다. 각 스탭 별 결과를 아래에 정리해 보았다.

#### 100K vs 100K

<details>
<summary>접기/펼치기</summary>

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_08/100K.mp4#t=0.001" type="video/mp4">
</video>

</details>

아직 제대로 갈피를 잡진 못한 것 같다.

#### 1M vs 1M

<details>
<summary>접기/펼치기</summary>

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_08/1M.mp4#t=0.001" type="video/mp4">
</video>

</details>

직사각형을 만들어 채우는 것이 많은 리워드를 준다는 것을 파악한 것 같다.

#### 1.8M vs 1.8M

<details>
<summary>접기/펼치기</summary>

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_08/1.8M.mp4#t=0.001" type="video/mp4">
</video>

</details>

1M 일때와는 다르게 크게 직사각형을 만들어 채우려고 노력한다.

#### 6M vs 6M

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_08/6M.mp4#t=0.001" type="video/mp4">
</video>

적당한 크기의 직사각형을 여러개 만들면서, 적이 칠한 타일을 둘러싸 채우려는 모습이 보인다.  
너무 크게 직사각형을 그리다 보면 적이 간단히 구멍을 뚫어 놓을 수 있기 떄문에, 작은 직사각형 여러개를 만드는 것이 최적이고, 이것을 제대로 학습한 것이다.

#### 100K vs 6M

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_08/100K6M.mp4#t=0.001" type="video/mp4">
</video>

100K 모델과 6M 모델을 비교해 보기 위해 빨간색 Agent 는 100K 모델을 적용시키고, 노란색 Agent 는 6M 모델을 적용시켰다.  
일단 타일을 채우는 능력부터가 차이가 꽤 나고, 노란색 Agent 가 계속 둘러싸 노란색으로 채워버리기 때문에, 여러 번 시도해 보았으나 6M 모델이 압도적으로 높은 결과를 보였다.

#### 1.8M vs 6M

<video width="700" muted controls playsinline>
  <source src="/videos/post_videos/mlagent_08/1.8M6M.mp4#t=0.001" type="video/mp4">
</video>

그래서 타일을 꽤 잘 채웠던 1.8M 모델과 비교해 보았더니, 예상한 대로 1.8M 모델은 너무 직사각형을 크게 그리는 바람에 제대로 완성하지 못하고 6M 에게 점령당하는 것을 볼 수 있다.
