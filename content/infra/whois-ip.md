---
name: whois · IP 정보 조회
cat: 네트워크 · IP
kind: 명령어
order: 80
aliases:
  - IP 추적
  - IP 소유자
  - 도메인 소유자
  - 의심스러운 IP
  - 어느 나라 IP
  - abuse 신고
summary: 도메인이나 IP 대역을 누가 관리하는지(통신사, 클라우드 회사, 기관)와 국가, 신고 연락처를 공개 등록 정보에서 조회합니다. 서버 로그에 수상한 IP가 보일 때 출처를 확인하는 용도입니다.
signature: whois IP또는도메인
related:
  - connections
  - dns-lookup
  - my-ip
doc: 'https://www.arin.net/resources/registry/whois/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| NetRange · CIDR | `항목` | 그 IP가 속한 대역 (방화벽 차단 단위로 씀) |
| OrgName · organisation | `항목` | 대역을 관리하는 회사 · 기관 |
| Country | `항목` | 등록 국가 |
| OrgAbuseEmail · abuse-mailbox | `항목` | 악용 신고 연락처 |
| Registrar · Creation Date | `항목 (도메인)` | 도메인 등록 대행사 · 등록일 |

## 사용 예시

```bash
# IP 대역 정보 (macOS는 IANA부터 물어본 뒤 담당 기관으로 넘어감)
whois 8.8.8.8 | grep -i -E '^(NetRange|CIDR|OrgName|Country|OrgAbuseEmail)'
# NetRange:       8.8.8.0 - 8.8.8.255
# CIDR:           8.8.8.0/24
# OrgName:        Google LLC

# 도메인 등록 정보
whois example.com | head -20

# 실무 흐름: 접속 로그에서 요청이 많은 IP를 뽑아 출처 확인
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -5
whois 203.0.113.45 | grep -i -E 'netrange|cidr|org|country|abuse'

# 역방향 DNS로 호스트 이름도 확인 (클라우드·검색엔진 봇 구분에 도움)
dig -x 203.0.113.45 +short

# Linux(Ubuntu)에 whois가 없으면
sudo apt install whois
```

## 주의할 점

- whois가 알려 주는 것은 IP 대역을 관리하는 통신사나 클라우드 회사이지, 실제 사용자 개인이 아닙니다. 국가 정보도 등록 기준이라 실제 위치와 다를 수 있습니다.
- 공격으로 보이는 IP는 `ufw`나 `fail2ban`으로 차단하고, 반복되면 조회한 abuse 연락처로 신고합니다. 개인을 추적하는 용도로 쓰지 않습니다.
