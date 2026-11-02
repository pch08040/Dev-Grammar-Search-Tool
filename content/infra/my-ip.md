---
name: 내 IP 확인 (사설 · 공인)
cat: 네트워크 · IP
kind: 명령어
order: 10
aliases:
  - 내 아이피
  - IP 주소 확인
  - 공인 IP
  - 사설 IP
  - ifconfig
  - ip addr
  - 게이트웨이
summary: 내 컴퓨터의 사설 IP(공유기 안에서 쓰는 주소)와 공인 IP(인터넷에서 보이는 주소)를 확인합니다. 서버 방화벽에 내 IP를 등록하거나, 같은 와이파이의 휴대폰에서 개발 서버에 접속할 때 필요합니다.
related:
  - dns-lookup
  - ping
  - whois-ip
doc: 'https://developer.mozilla.org/en-US/docs/Glossary/IP_Address'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 사설 IP | `개념` | 공유기 안에서만 쓰는 주소. `192.168.x.x`, `10.x.x.x`, `172.16~31.x.x` |
| 공인 IP | `개념` | 인터넷에 보이는 주소. 같은 공유기를 쓰는 기기는 모두 같은 공인 IP |
| 게이트웨이 | `개념` | 공유기 주소. 밖으로 나가는 출입구 |
| 127.0.0.1 · localhost | `개념` | 자기 자신 |

## 사용 예시

```bash
# macOS: 사설 IP (와이파이는 보통 en0)
ipconfig getifaddr en0            # 192.168.0.16
ifconfig en0 | grep 'inet '       # inet 192.168.0.16 netmask ...

# macOS: 게이트웨이(공유기) 주소
route -n get default | grep gateway

# Linux(Ubuntu): 사설 IP · 게이트웨이
ip -4 addr show
hostname -I
ip route | grep default

# 공인 IP (macOS · Linux 공통)
curl -s https://ifconfig.me; echo

# 같은 와이파이의 휴대폰에서 내 맥 개발 서버 접속
# 1) 서버가 0.0.0.0으로 대기해야 함 (localhost만 열면 외부 접속 불가)
#    Vite: npm run dev -- --host   /  Spring: 기본값이 모든 주소
# 2) 휴대폰 브라우저에서 http://192.168.0.16:5173
```

## 주의할 점

- 서버나 외부 API가 보는 내 주소는 사설 IP가 아니라 공인 IP입니다. 클라우드 방화벽에 등록할 때는 공인 IP를 넣습니다.
- 집·회사·휴대폰 테더링마다 공인 IP가 바뀌고, 가정용 인터넷은 공인 IP가 주기적으로 바뀔 수 있습니다.
