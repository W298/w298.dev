HEADER START

#01. Obstacle Avoid (Axis-Align, No Sensor)
Sensor 없이 Axis-Align 장애물을 피해 Goal Seeking 학습
2023-08-09
ML-Agent,Unity
RL-Goal-Seek

HEADER END

# Obstacle Avoid (Axis-Align, No Sensor)

먼저 축과 평행한 (Axis-Align) 장애물을 피해 타깃에 도달하는 학습을 진행해 보았다.  
이번 포스트와 다음 포스트는 센서를 활용하지 않고, 직접 `Observation` 을 제공해 주는 방법으로 학습해 보았다.

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

![600px](/imgs/post_imgs/mlagent_01/1.webp)

그랬더니 장애물에 닿지 않으려고 코너에서 우물쭈물하는 모습을 보였다.  
타깃을 찾아 이동하는 것보다 거기에 가만히 있는게 더 높은 리워드를 준다고 판단한 것 같다.

## Second Try

### Policy

| Situation              | Reward      | EndEpisode |
| ---------------------- | ----------- | ---------- |
| 밖으로 떨어짐          | -5          | O          |
| 타깃에 도달            | +5          | O          |
| 장애물에 닿아있는 동안 | 틱당 -0.005 |            |
| Living                 | 틱당 -0.001 |            |

그래서 장애물에 닿아도 에피소드를 끝내지 않고, 닿아 있는 동안 (`OnCollisionStay`) 패널티를 주는 방식으로 변경했다.  
또한 떨어질 때와, 타깃에 도달했을 때의 리워드를 각각 -5, +5 로 설정하여 떨어지지 않고 타깃에 도달할 더 강력한 의지를 부여했다.

### Result

![600px](/imgs/post_imgs/mlagent_01/2.webp)
![600px](/imgs/post_imgs/mlagent_01/3.png)

결과는 성공이다.

다만 자신 기준 타깃이 왼쪽에 있다면 왼쪽으로 돌고, 오른쪽에 있다면 오른쪽으로 도는 최단 거리를 기대했으나...  
타깃의 위치와 상관없이 한 방향으로만 도는 문제가 있다.
