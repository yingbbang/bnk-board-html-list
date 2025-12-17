# \# BNK Board HTML Project

# 

# 본 프로젝트는 부산은행 게시판 시스템을 가정하여  

# \*\*순수 HTML/CSS/JavaScript 환경에서 게시판 구조와 데이터 설계 사고를 검증\*\*하기 위해 제작되었다.

# 

# 단순 CRUD 구현이 아닌,  

# \*\*금융권 실무 기준의 데이터 구조, 상태 관리, 감사·이력 개념\*\*을 반영하는 것을 목표로 한다.

# 

# ---

# 

# \## 1. 프로젝트 목적

# 

# \- 금융권 게시판 시스템에서 요구되는 \*\*데이터 책임 분리 구조\*\*를 이해하고 구현

# \- ERD → Data Dictionary → Code Definition으로 이어지는 \*\*설계 문서 체계 확립\*\*

# \- 서버 없이도 구조적 사고를 검증할 수 있도록 \*\*프론트 단독 구조로 구성\*\*

# 

# ---

# 

# \## 2. 구현 범위

# 

# \### 화면 (HTML)

# \- 게시글 목록: `index.html`

# \- 게시글 상세: `view.html`

# \- 게시글 등록: `write.html`

# \- 게시글 수정: `edit.html`

# 

# \### 문서 (Schema)

# \- `data-dictionary.html`

# &nbsp; - 테이블 구조

# &nbsp; - 컬럼 의미

# &nbsp; - 설계 원칙

# &nbsp; - 상태 기반 운영 규칙

# \- `code-definition.html`

# &nbsp; - 코드값(role, status, type, category)의 의미

# &nbsp; - 사용 규칙 및 주의사항

# \- `erd.png`

# &nbsp; - 전체 ERD 시각 자료

# 

# ---

# 

# \## 3. 설계 핵심 원칙

# 

# \- \*\*물리 삭제 금지\*\*

# &nbsp; - 모든 데이터는 status 기반으로 관리

# \- \*\*권한 분리\*\*

# &nbsp; - role\_code + level 조합을 통한 권한 판단

# \- \*\*책임 추적 가능 구조\*\*

# &nbsp; - writer / created\_by / updated\_by 분리

# \- \*\*감사 대응\*\*

# &nbsp; - 게시글 수정 이력(BOARD\_HISTORY) 필수 기록

# \- \*\*성능 고려\*\*

# &nbsp; - 조회수·댓글 수 등 트래픽 데이터 분리(BOARD\_STAT)

# 

# ---

# 

# \## 4. 디렉토리 구조

# 

# bnk-board-html/

# └─ board/

# ├─ index.html

# ├─ view.html

# ├─ write.html

# ├─ edit.html

# ├─ assets/

# │ ├─ css/

# │ ├─ js/

# │ └─ schema/

# │ ├─ data-dictionary.html

# │ ├─ code-definition.html

# │ └─ erd.png

# 

# yaml

# 코드 복사

# 

# ---

# 

# \## 5. 문서 역할 구분

# 

# \### Data Dictionary

# \- 테이블 단위의 구조 정의

# \- 컬럼 책임과 의미 명시

# \- 운영 원칙 및 설계 판단 근거 포함

# 

# \### Code Definition

# \- 코드값의 의미와 사용 규칙 정의

# \- 화면/로직 분기 시 기준 문서 역할

# \- 임의 변경 방지를 위한 규약 문서

# 

# ---

# 

# \## 6. 버전 관리 정책

# 

# \- 문서 파일은 \*\*단일 파일로 유지\*\*

# &nbsp; - 버전명을 파일명에 포함하지 않음

# \- 변경 이력은 \*\*Git 커밋으로 관리\*\*

# \- 의미 있는 기준 시점은 \*\*Git tag로 고정\*\*

# \- 대규모 설계 변경은 \*\*별도 브랜치에서 작업 후 병합\*\*

# 

# ---

# 

# \## 7. 초기 버전 관리

# 

# \- 본 상태는 프로젝트의 \*\*최초 기준선(baseline)\*\* 이며,

# \- 설계 문서 및 화면 구조가 포함된 초기 버전으로 관리한다.

# 

# git commit -m "docs: initial board html structure with ERD and data dictionary"

# git tag v1.0-initial-board-docs

# 

# yaml

# 코드 복사

# 

# ---

# 

# \## 8. 비고

# 

# \- 본 프로젝트는 UI 완성도가 아닌 \*\*설계 사고 검증\*\*을 목적으로 한다.

# \- 서버/DB 연동은 고려하지 않으며, 구조와 책임 분리가 핵심이다.

# \- 금융권 실무 관점에서 \*\*확장 가능한 게시판 설계 예시\*\*로 활용 가능하다.

