document.addEventListener("DOMContentLoaded", () => {

  const CATEGORY_LABEL = {
    IT: "IT·시스템",
    SECURITY: "보안",
    DIGITAL: "디지털금융",
    FINANCE_PRODUCT: "금융상품",
    PENSION: "퇴직연금",
    CORPORATE: "기업금융",
    RETAIL: "개인금융",
    DIGITAL_ASSET: "디지털자산",
    CSR: "사회공헌(CSR)",
    EVENT: "이벤트·프로모션"
  };

  /* =========================
   * 상태 변수
   * ========================= */
  let currentCategory = "";
  let currentKeyword = "";

  /* =========================
   * 데이터 로드 + 정렬
   * ========================= */
  const allBoards = (StorageDB.get("BOARD") || [])
    .filter(b => b.status === "ACTIVE")
    .sort((a, b) =>
      (b.is_pinned === true) - (a.is_pinned === true) ||
      new Date(b.created_at) - new Date(a.created_at)
    );

  const stats = StorageDB.get("BOARD_STAT") || [];
  const tbody = document.getElementById("boardList");
  const categoryButtons = document.querySelectorAll(".board-category button");

  /* =========================
   * 렌더링
   * ========================= */
  function render(boards) {
    tbody.innerHTML = "";

    boards.forEach(b => {
      const stat = stats.find(s => s.board_id === b.id) || {
        view_count: 0,
        like_count: 0
      };

      const tr = document.createElement("tr");
      if (b.is_pinned) tr.classList.add("pinned");

      tr.innerHTML = `
        <td class="text-center">${b.is_pinned ? "공지" : b.id}</td>
        <td class="text-center">
          <span class="category-badge">
            ${CATEGORY_LABEL[b.category] || b.category}
          </span>
        </td>
        <td class="title">
          ${b.is_pinned ? '<span class="notice-icon">공지</span>' : ''}
          <a href="view.html?id=${b.id}">
            ${Util.escape(b.title)}
          </a>
        </td>
        <td class="text-center">${b.writer || "익명"}</td>
        <td class="text-center">${Util.fmt(b.created_at)}</td>
        <td class="text-center">${stat.view_count}</td>
        <td class="text-center">${stat.like_count || 0}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* =========================
   * 필터 적용 (AND 조건)
   * ========================= */
  function applyFilter() {
    const filtered = allBoards.filter(b => {
      const matchCategory =
        !currentCategory || b.category === currentCategory;

      const matchKeyword =
        !currentKeyword ||
        b.title.includes(currentKeyword) ||
        b.content.includes(currentKeyword);

      return matchCategory && matchKeyword;
    });

    render(filtered);
  }

  /* =========================
   * 초기 렌더
   * ========================= */
  render(allBoards);

  /* =========================
   * 카테고리 필터
   * ========================= */
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.dataset.category || "";
      applyFilter();
    });
  });

  /* =========================
   * 검색
   * ========================= */
  document.getElementById("searchBtn")?.addEventListener("click", () => {
    currentKeyword = document.getElementById("keyword").value.trim();
    applyFilter();
  });

});
