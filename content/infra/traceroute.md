---
name: traceroute
cat: 네트워크 · IP
kind: 명령어
order: 30
aliases:
  - 경로 추적
  - 네트워크 경로
  - 어디서 느린지
  - hop
  - tracepath
  - mtr
summary: 내 컴퓨터에서 목적지까지 신호가 거쳐 가는 중간 장비(공유기, 통신사, 해외 구간 등)를 순서대로 보여 줍니다. 어느 구간에서 끊기거나 느려지는지 찾을 때 씁니다.
signature: traceroute -m 최대단계 호스트
related:
  - ping
  - dns-lookup
  - whois-ip
doc: 'https://man7.org/linux/man-pages/man8/traceroute.8.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -m 15 | `옵션` | 최대 15단계(hop)까지만 추적 |
| -n | `옵션` | 중간 장비 IP를 이름으로 바꾸지 않음 (빠름) |
| -w 2 | `옵션` | 단계마다 응답을 기다리는 시간(초) |
| * * * | `출력` | 그 장비가 응답하지 않음 (막아 둔 경우가 많음) |

## 사용 예시

```bash
# 목적지까지 경로 보기
traceroute -m 15 example.com
#  1  192.168.0.1 (192.168.0.1)  3.7 ms  5.1 ms  10.4 ms     ← 우리 공유기
#  2  192.168.10.254             13.5 ms ...                 ← 다음 장비
#  3  * * *                                                  ← 응답 안 함
#  ...
# 10  104.20.23.154              150.2 ms                    ← 목적지

# 이름 변환 없이 빠르게
traceroute -n -m 15 -w 2 example.com

# Linux(Ubuntu): 설치가 필요할 수 있음
sudo apt install traceroute
# 또는 기본 내장된 tracepath
tracepath example.com

# 경로와 손실률을 계속 갱신하며 보기 (mtr)
brew install mtr            # macOS (실행은 sudo mtr 호스트)
sudo apt install mtr        # Linux
```

## 주의할 점

- 중간에 `* * *`가 있어도 마지막 목적지까지 도착하면 정상입니다. 많은 장비가 이 신호에 응답하지 않도록 설정되어 있습니다.
- 특정 단계부터 시간이 크게 늘고 끝까지 유지되면 그 구간(통신사, 해외 회선)이 느린 것입니다. 이후 단계부터 계속 `*`만 나오면 그 근처에서 막혀 있을 가능성이 큽니다.
