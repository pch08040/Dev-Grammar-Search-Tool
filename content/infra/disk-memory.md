---
name: df · du · 메모리 확인
cat: 프로세스 · 시스템
kind: 명령어
order: 60
aliases:
  - 디스크 용량
  - 폴더 용량
  - 메모리 부족
  - 스왑
  - free -h
  - vm_stat
summary: '`df`는 디스크 전체의 남은 용량을, `du`는 폴더별 사용량을 보여 줍니다. 메모리는 Linux에서 `free`, macOS에서 `vm_stat`과 스왑 사용량으로 확인합니다.'
related:
  - top-htop
  - ps-pgrep
doc: 'https://man7.org/linux/man-pages/man1/df.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| df -h | `명령어` | 디스크별 전체 · 사용 · 남은 용량 (사람이 읽기 쉬운 단위) |
| du -sh 경로 | `명령어` | 폴더 하나의 총 용량 |
| du -sh * \| sort -h | `조합` | 현재 폴더 안 항목을 용량 순으로 |
| free -h | `명령어 (Linux)` | 메모리 · 스왑 사용량. `available` 열이 실제로 쓸 수 있는 양 |
| vm_stat · sysctl vm.swapusage | `명령어 (macOS)` | 메모리 페이지 통계 · 스왑 사용량 |

## 사용 예시

```bash
# 디스크 남은 용량
df -h /

# 어떤 폴더가 큰지 (용량 순 마지막 10개)
du -sh ~/Library/Caches/* 2>/dev/null | sort -h | tail -10
du -sh ~/.gradle ~/.pub-cache ~/.claude/projects

# macOS 메모리
sysctl vm.swapusage                    # used가 수 GB면 메모리가 부족한 상태
memory_pressure | tail -1              # 사용 가능 메모리 비율
top -l 1 -n 0 | grep PhysMem           # 사용 · 압축 · 남은 메모리

# Linux(Ubuntu) 메모리
free -h
#        total   used   free  shared  buff/cache  available
# Mem:    15Gi  6.1Gi  1.2Gi   210Mi       8.1Gi      9.0Gi

# Linux: 메모리를 많이 쓰는 프로세스
ps -eo pid,%mem,rss,comm --sort=-%mem | head -10
```

## 주의할 점

- 운영체제는 남는 메모리를 파일 캐시로 채워 두기 때문에 사용량이 높아 보이는 것이 정상입니다. 실제 부족 여부는 Linux의 `available`, macOS의 스왑 사용량과 압축 메모리로 판단합니다.
- 서버 디스크가 꽉 차면 로그가 쌓이지 않고 서버가 멈출 수 있습니다. `/var/log`와 애플리케이션 로그 폴더를 `du -sh`로 주기적으로 확인합니다.
