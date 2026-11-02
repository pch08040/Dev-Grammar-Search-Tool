---
name: ping
cat: 네트워크 · IP
kind: 명령어
order: 20
aliases:
  - 연결 확인
  - 서버 살아 있나
  - 응답 시간
  - 패킷 손실
  - 네트워크 끊김
  - latency
summary: 상대 컴퓨터에 작은 신호를 보내 돌아오는지, 얼마나 걸리는지 확인합니다. 네트워크가 연결되어 있는지 가장 먼저 확인할 때 씁니다.
signature: ping -c 횟수 호스트
related:
  - traceroute
  - nc-port-check
  - curl
doc: 'https://man7.org/linux/man-pages/man8/ping.8.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -c 4 | `옵션` | 4번만 보내고 종료 (없으면 Ctrl+C까지 계속) |
| -i 0.5 | `옵션` | 보내는 간격(초) |
| time=12.3 ms | `출력` | 왕복 시간. 작을수록 빠름 |
| packet loss | `출력` | 돌아오지 않은 비율. 0%가 정상 |

## 사용 예시

```bash
# 4번 보내고 결과 요약
ping -c 4 example.com
# 64 bytes from 104.20.23.154: icmp_seq=0 ttl=57 time=144.1 ms
# --- example.com ping statistics ---
# 4 packets transmitted, 4 packets received, 0.0% packet loss
# round-trip min/avg/max/stddev = 144.1/150.2/156.3/6.1 ms

# 문제를 단계별로 좁히기
ping -c 2 192.168.0.1      # 1) 공유기까지 되나 (안 되면 와이파이 문제)
ping -c 2 8.8.8.8          # 2) 인터넷까지 되나 (IP로)
ping -c 2 google.com       # 3) 도메인으로도 되나 (2는 되고 3이 안 되면 DNS 문제)

# 서버 IP로 직접
ping -c 4 203.0.113.10
```

## 주의할 점

- 많은 서버와 클라우드는 보안상 ping(ICMP)을 막아 둡니다. ping이 안 돼도 서버가 죽은 것은 아닐 수 있으니 `curl`이나 `nc`로 실제 포트를 확인합니다.
- 응답 시간이 들쭉날쭉하거나 packet loss가 생기면 와이파이 품질이나 중간 네트워크 문제일 수 있습니다. `traceroute`로 어느 구간에서 느려지는지 봅니다.
