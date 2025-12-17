/* =========================
 * Seed Helper (seed 전용 정책)
 * ========================= */
function seedWriter(type) {
  return type === "ANON" ? "익명" : "운영자";
}


/* 
{
  category: "IT | CSR | FINANCE | DIGITAL_ASSET",
  title: "...",
  content: "...",
  writerType: "ADMIN | ANON"
}*/

const SEED_POSTS = [
  {
    category: "IT",
    title: "시스템 점검 안내",
    content: "2025년 1월 5일 02:00 ~ 04:00 시스템 점검이 예정되어 있습니다.",
    writerType: "ADMIN"
  },
  {
    category: "CSR",
    title: "자유게시판 이용 안내",
    content: "욕설 및 광고성 게시글은 삭제될 수 있습니다.",
    writerType: "ADMIN"
  },
  {
    category: "FINANCE",
    title: "퇴직연금 상품 문의",
    content: "DC형과 IRP의 차이가 무엇인가요?",
    writerType: "ANON"
  },
  {
    category: "DIGITAL_ASSET",
    title: "STO 관련 질문",
    content: "토큰증권은 기존 주식과 어떤 차이가 있나요?",
    writerType: "ANON"
  },
  {
    category: "IT",
    title: "경남·부산은행, 신입 채용… 학력·연령 제한 없어",
    content: "BNK경남은행과 부산은행이 하반기 신입 행원을 공개 채용한다. 이번 채용은 학력과 연령, 전공에 제한을 두지 않고 진행되며, 다양한 배경의 인재를 선발할 예정이다.",
    writerType: "ADMIN"
  },
  {
    category: "IT",
    title: "BNK부산·경남은행, 하반기 신입행원 공개채용 시작",
    content: "BNK금융그룹이 25일 부산은행과 경남은행의 지원서 접수를 시작으로 하반기 신입행원 공개채용에 돌입했다. 이번 채용은 그룹 차원의 인재 확보를 목표로 진행된다.",
    writerType: "ADMIN"
  },
  {
    category: "IT",
    title: "BNK금융, 부산·경남은행 신입행원 공개채용 실시",
    content: "BNK금융지주 채용 관계자는 부산은행과 경남은행이 공동으로 진행하는 컬처핏 면접을 통해 지원자들이 그룹의 핵심 가치와 하나 된 양행의 기업문화를 공유하는 인재를 선발할 계획이라고 밝혔다.",
    writerType: "ADMIN"
  },
  {
    category: "CSR",
    title: "부산은행 재능기부봉사대, 연탄나눔 봉사활동",
    content: "BNK부산은행은 지난 13일 부산 동구 매축지마을에서 부산은행 재능기부봉사대가 참여한 가운데 연탄나눔 봉사활동을 진행했다. 이번 활동은 지역 사회 취약계층을 지원하기 위한 사회공헌 활동의 일환으로 마련됐다.",
    writerType: "ADMIN"
  },
  {
    category: "CSR",
    title: "BNK부산은행, 초등생·학부모 대상 ‘슬기로운 금융생활’ 교육",
    content: "BNK부산은행은 국회부산도서관 영상세미나실에서 초등학교 고학년과 학부모 약 60명을 대상으로 ‘자녀와 함께하는 슬기로운 금융생활’ 교육을 진행했다. 이번 교육은 금융 이해력 향상과 올바른 금융 습관 형성을 돕기 위해 마련됐다.",
    writerType: "ADMIN"
  },
  {
    category: "IT",
    title: "BNK부산은행, 모바일뱅킹 통합검색 서비스 전면 개편",
    content: "BNK부산은행은 11일 모바일뱅킹 통합검색 기능을 전면 개편했다고 밝혔다. 이번 개편을 통해 검색 정확도와 사용 편의성을 높이고, 고객이 원하는 금융 정보를 보다 빠르게 찾을 수 있도록 개선했다.",
    writerType: "ADMIN"
  },
  {
    category: "DIGITAL_ASSET",
    title: "BNK금융, 원화 스테이블코인 관련 상표권 출원",
    content: "BNK금융그룹은 지난 4일 BNK금융지주와 자회사인 부산은행, 경남은행이 원화 스테이블코인과 관련한 상표권을 출원했다고 밝혔다. 이번 출원은 디지털자산 분야에서의 선제적 대응과 신사업 가능성을 검토하기 위한 행보로 풀이된다.",
    writerType: "ADMIN"
  },
  {
    category: "FINANCE",
    title: "부산은행, 해수부 부산 이전 기념 ‘BNK내맘대로 예금’ 특판",
    content: "BNK부산은행은 해양수산부의 부산 이전을 기념해 ‘BNK내맘대로 예금’ 특별판매를 실시한다. 이번 특판은 고객 선택에 따라 우대 혜택을 제공하는 상품으로, 지역 이전 이슈와 연계한 금융 프로모션의 일환이다.",
    writerType: "ADMIN"
  },
  {
    category: "IT",
    title: "지역 AI 스타트업 육성… 대출·투자 전방위 지원 나선 부산은행",
    content: "BNK부산은행은 10기를 맞은 ‘BNK 썸 인큐베이터’를 통해 LP 역할부터 대출·투자 등 자금 지원까지 아우르는 스타트업 맞춤형 지원 체계를 구축하고 있다. 결제 관련 AI를 개발한 스타트업 라젠카와의 협업 등 지역 AI 스타트업과의 실질적인 사업 연계를 강화하고 있다.",
    writerType: "ADMIN"
  },
  {
    category: "FINANCE",
    title: "부산은행, 대출금리 계산 오류로 이자 과다 수취… 수천 건 환급",
    content: "BNK부산은행이 대출 수천 건에 대해 가산금리를 규정보다 높게 적용해 이자를 과다 수취한 사실이 금융감독원 검사에서 적발됐다. 부산은행은 관련 고객에게 환급 조치를 진행할 예정이다.",
    writerType: "ADMIN"
  },
  {
    category: "IT",
    title: "부산은행, 지방은행 첫 외국인 근로자 보험 조회 서비스",
    content: "BNK부산은행은 지난 3월 시행된 김해공항 외국인 출국만기보험 지급 서비스에 이어, 지방은행 최초로 삼성화재와 협업해 외국인 근로자를 위한 보험 조회 서비스를 제공한다고 밝혔다.",
    writerType: "ADMIN"
  },
  {
    category: "IT",
    title: "BNK부산은행, ‘썸 인큐베이터 10기’ 데모데이 개최",
    content: "BNK부산은행은 11일 본점 3층 업무연수실에서 지역 스타트업 육성 플랫폼 ‘썸 인큐베이터(SUM Incubator) 10기’ 데모데이를 개최했다. 이번 행사는 참여 스타트업의 성과 공유와 투자·사업 연계 기회를 확대하기 위해 마련됐다.",
    writerType: "ADMIN"
  },
{
  category: "IT",
  title: "부산은행, AI 활용한 이상거래 추적·조사 시스템 구축 추진",
  content: "BNK부산은행은 인공지능(AI)을 활용해 이상거래 징후를 추적·조사하는 시스템을 구축할 계획이라고 밝혔다. 이번 추진은 금융사고 예방과 내부 통제 강화를 위한 디지털 금융 고도화 전략의 일환이다.",
  writerType: "ADMIN"
}



];




/* 
 * 최초 1회만 실행되는 로컬스토리지 초기 데이터 세팅
 * - 게시판 기능 동작을 위한 기본 테이블(컬렉션) 생성
 * - 샘플 게시글 1건 삽입
 */
(() => {
  // 이미 초기 데이터가 세팅된 경우 재실행 방지
  if (localStorage.getItem("SEEDED") === "Y") return;

  /* =========================
   * 1. 기본 스토리지 초기화
   * ========================= */

  // 게시글 본문 데이터
  StorageDB.set("BOARD", []);

  // 게시글 통계 데이터 (조회수, 좋아요, 댓글 수)
  StorageDB.set("BOARD_STAT", []);

  // 게시글 수정 이력 데이터
  StorageDB.set("BOARD_HISTORY", []);

  /* =========================
   * 2. 시퀀스(ID) 초기화
   * ========================= */

  // 게시글 PK 시퀀스
  localStorage.setItem("SEQ_BOARD_ID", 0);

  // 게시글 이력 PK 시퀀스
  localStorage.setItem("SEQ_HISTORY_ID", 0);

  /* =========================
   * 3. 샘플 게시글 생성
   * ========================= */

  // ISO 포맷 현재 시간 (created_at / updated_at 공통 사용)
  const now = new Date().toISOString();

  // 게시글 고유 ID 발급
  const id = StorageDB.nextId("SEQ_BOARD_ID");

  // BOARD 테이블에 초기 게시글 1건 삽입
  StorageDB.set("BOARD", [{
    id,                         // 게시글 ID (PK)
    title: "공지사항 테스트",    // 게시글 제목
    content: "초기 게시글입니다.", // 게시글 본문
    status: "ACTIVE",           // 게시글 상태 (ACTIVE / HIDDEN / DELETED 등 확장 가능)
    writer_id: 1,               // 실제 작성자
    created_by: 1,              // 등록자 (대리등록 고려)
    updated_by: 1,              // 최종 수정자
    created_at: now,            // 생성 시각
    updated_at: now,            // 최종 수정 시각
    version: 1                  // 낙관적 락(Optimistic Lock) 버전
  }]);

  /* =========================
   * 4. 게시글 통계 데이터 생성
   * ========================= */

  // BOARD_STAT 테이블에 게시글 통계 초기값 세팅
  StorageDB.set("BOARD_STAT", [{
    board_id: id,       // 게시글 ID (FK)
    view_count: 0,      // 조회수
    like_count: 0,      // 좋아요 수
    comment_count: 0    // 댓글 수
  }]);

  /* =========================
   * 5. 시딩 완료 플래그 설정
   * ========================= */

  // 이후 새로고침 시 초기화 로직이 다시 실행되지 않도록 플래그 저장
  localStorage.setItem("SEEDED", "Y");
})();
