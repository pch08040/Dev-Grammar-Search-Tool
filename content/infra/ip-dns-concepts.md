---
name: IP 주소 · 도메인 · DNS
cat: 개념
kind: 개념
order: 30
aliases:
  - IP란
  - 공인 IP
  - 사설 IP
  - 도메인
  - DNS
  - IPv4
  - IPv6
  - TTL
summary: IP 주소는 인터넷에서 컴퓨터를 찾는 번호이고, 도메인은 사람이 기억하기 쉬운 이름입니다. DNS는 도메인을 IP 주소로 변환하는 시스템입니다.
related:
  - what-is-server
  - dns-lookup
  - my-ip
  - request-flow
doc: 'https://developer.mozilla.org/ko/docs/Glossary/DNS'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| IPv4 | `주소` | `203.0.113.10`처럼 점으로 구분한 숫자 4개 |
| IPv6 | `주소` | `2001:db8::1`처럼 콜론으로 구분한 긴 주소 |
| 공인 IP | `주소` | 인터넷에서 보이는 주소. 서버는 보통 고정 공인 IP를 가짐 |
| 사설 IP | `주소` | 공유기·사내망 안에서만 쓰는 주소. `192.168.x.x`, `10.x.x.x`, `172.16~31.x.x` |
| 도메인 | `이름` | `example.com`. 구매 후 DNS에서 IP와 연결 |
| DNS 레코드 | `설정` | `A`(도메인→IPv4), `AAAA`(→IPv6), `CNAME`(→다른 도메인), `MX`(메일 서버) |
| TTL | `초` | DNS 결과를 캐시하는 시간. 설정 변경이 바로 반영되지 않는 이유 |

## 사용 예시

```bash
# 도메인 → IP 조회 (DNS 질의)
dig +short example.com             # IP 주소 목록
nslookup example.com               # 같은 기능. Windows에도 있음

# 레코드 종류별 조회
dig example.com A +short           # IPv4
dig example.com AAAA +short        # IPv6
dig www.github.com CNAME +short    # 별칭 대상: github.com.

# 특정 DNS 서버(구글 8.8.8.8)에 직접 물어보기 (변경 반영 확인)
dig @8.8.8.8 example.com +short

# 내 컴퓨터의 사설 IP · 공인 IP
ipconfig getifaddr en0             # macOS 와이파이의 사설 IP
hostname -I                        # Linux의 사설 IP
curl -s https://ifconfig.me        # 공인 IP (외부에서 보이는 주소)
```

## 주의할 점

- 도메인의 DNS 설정을 바꾸면 TTL 동안 예전 IP가 보일 수 있습니다. `dig @8.8.8.8`처럼 다른 DNS 서버에 물어서 반영 여부를 확인합니다.
- 사설 IP(`192.168.x.x` 등)는 같은 네트워크 안에서만 통합니다. 외부에서 접속하려면 공인 IP나 도메인이 필요합니다.
