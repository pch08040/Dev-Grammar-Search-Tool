---
name: dig · nslookup
cat: 네트워크 · IP
kind: 명령어
order: 40
aliases:
  - 도메인 IP 찾기
  - DNS 조회
  - 도메인 연결 확인
  - A 레코드
  - CNAME
  - 역방향 조회
summary: 도메인이 어떤 IP로 연결되는지 DNS에 물어봅니다. 도메인을 새로 연결했는데 접속이 안 될 때, DNS 설정이 반영됐는지 확인하는 용도로 가장 많이 씁니다.
signature: dig +short 도메인 [레코드종류]
related:
  - my-ip
  - whois-ip
  - curl
doc: 'https://ss64.com/mac/dig.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| A · AAAA | `레코드` | 도메인 → IPv4 · IPv6 주소 |
| CNAME | `레코드` | 도메인 → 다른 도메인 (별칭) |
| MX · TXT · NS | `레코드` | 메일 서버 · 인증용 문자열 · 담당 DNS 서버 |
| +short | `옵션` | 결과 값만 짧게 |
| @8.8.8.8 | `옵션` | 특정 DNS 서버에 직접 질문 |
| -x IP | `옵션` | IP → 도메인 (역방향 조회) |

## 사용 예시

```bash
# 도메인의 IP
dig +short example.com
# 172.66.147.243
# 104.20.23.154

# 레코드 종류별 조회
dig +short www.example.com CNAME
dig +short example.com MX
dig +short example.com TXT        # 도메인 소유 인증 값 확인

# 공용 DNS에 직접 물어보기 (내 PC 캐시와 비교)
dig +short @8.8.8.8 api.example.com
dig +short @1.1.1.1 api.example.com

# IP로 도메인 찾기 (역방향)
dig -x 8.8.8.8 +short             # dns.google.

# 같은 내용을 nslookup으로 (macOS · Linux · Windows 공통)
nslookup example.com

# macOS DNS 캐시 비우기 (변경이 반영 안 될 때)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

## 주의할 점

- DNS를 바꾼 직후에는 TTL(캐시 유지 시간)만큼 예전 IP가 보일 수 있습니다. `@8.8.8.8`로는 새 값이 나오는데 내 PC는 예전 값이면 캐시 문제입니다.
- Linux 서버에 `dig`가 없으면 `sudo apt install dnsutils`로 설치합니다.
