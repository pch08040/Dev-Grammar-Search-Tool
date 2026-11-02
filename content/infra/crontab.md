---
name: crontab (예약 작업)
cat: 서버 운영
kind: 설정
order: 60
aliases:
  - 예약 작업
  - 스케줄러
  - 매일 새벽 실행
  - cron
  - 정기 백업
  - 크론 표현식
summary: 정해진 시각이나 주기마다 명령을 자동으로 실행하는 Linux의 예약 작업입니다. DB 백업, 오래된 로그 삭제, 정기 리포트 같은 서버 작업에 씁니다.
signature: '분 시 일 월 요일  명령'
related:
  - spring/scheduled
  - systemctl
doc: 'https://man7.org/linux/man-pages/man5/crontab.5.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| crontab -e | `명령` | 내 예약 작업 편집 |
| crontab -l | `명령` | 내 예약 작업 목록 |
| * | `값` | 매번 (모든 값) |
| */5 | `값` | 5 간격마다 |
| 1-5 · 0,30 | `값` | 범위 · 목록 |
| @reboot · @daily | `특수 문자열` | 재부팅 직후 · 매일 0시 |

## 사용 예시

```bash
crontab -e      # 편집기 열기 (아래 줄들을 편집기 안에 씀)
crontab -l      # 등록된 목록 보기

# 형식: 분(0-59) 시(0-23) 일(1-31) 월(1-12) 요일(0-7, 0과 7은 일요일)  명령

# 매일 새벽 3시 DB 백업
0 3 * * * /opt/app/backup.sh >> /var/log/app-backup.log 2>&1

# 5분마다 헬스 체크, 실패하면 기록
*/5 * * * * curl -fsS http://localhost:8080 > /dev/null || echo "$(date) down" >> /opt/app/health.log

# 평일(월~금) 오전 9시
0 9 * * 1-5 /opt/app/report.sh

# 매주 일요일 0시 30분, 14일 지난 로그 삭제
30 0 * * 0 find /opt/app/logs -name '*.log' -mtime +14 -delete

# 재부팅 직후 한 번
@reboot /opt/app/start.sh
```

## 주의할 점

- cron은 로그인했을 때와 환경 변수(PATH 등)가 다릅니다. 명령과 파일은 항상 절대 경로로 씁니다.
- crontab 안에서 `%`는 줄바꿈으로 해석됩니다. `date +%F`처럼 쓰려면 `date +\%F`로 이스케이프합니다.
- 출력을 `>> 로그 2>&1`로 남기지 않으면 실패해도 알 수 없습니다. 앱 안의 작업이라면 Spring의 `@Scheduled`도 고려합니다.
