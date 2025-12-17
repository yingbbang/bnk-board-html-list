document.addEventListener("DOMContentLoaded", () => {

  const id = Number(Util.qs("id"));
  const boards = StorageDB.get("BOARD");
  const stats = StorageDB.get("BOARD_STAT");

  // 임시 로그인 정보 (나중에 교체)
  const currentUser = {
    role: "USER" // ADMIN or USER
  };

  const board = boards.find(b => b.id === id);

  // 존재/상태 검증
  if (!board || board.status === "DELETED") {
    alert("게시글이 존재하지 않습니다.");
    location.href = "index.html";
    return;
  }

  // HIDDEN 접근 제어
  if (board.status === "HIDDEN" && currentUser.role !== "ADMIN") {
    alert("접근 권한이 없습니다.");
    location.href = "index.html";
    return;
  }

  // 조회수 증가
  const stat = stats.find(s => s.board_id === id);
  if (stat) {
    stat.view_count++;
    StorageDB.set("BOARD_STAT", stats);
  }

  /* =========================
   * 상태 배너
   * ========================= */
  if (board.status === "LOCKED") {
    const banner = document.getElementById("statusBanner");
    banner.style.display = "block";
    banner.textContent = "🔒 잠긴 게시글입니다. 관리자만 수정할 수 있습니다.";
  }

  /* =========================
   * 기본 정보
   * ========================= */
  document.getElementById("viewTitle").textContent = board.title;
  document.getElementById("viewCategory").textContent = board.category;
  document.getElementById("viewWriter").textContent = board.writer || "익명";
  document.getElementById("viewDate").textContent = Util.fmt(board.created_at);
  document.getElementById("viewContent").innerHTML =
    Util.escape(board.content).replace(/\n/g, "<br>");

  /* =========================
   * 첨부파일
   * ========================= */
  if (board.attachments && board.attachments.length > 0) {
    const list = document.getElementById("attachmentList");
    const section = document.getElementById("attachmentSection");
    section.style.display = "block";

    board.attachments.forEach(file => {
      const li = document.createElement("li");

      // 이미지 미리보기
      if (file.mime_type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(new Blob([], { type: file.mime_type }));
        img.alt = file.file_name;
        img.style.maxWidth = "200px";
        img.style.display = "block";
        li.appendChild(img);
      }

      const text = document.createElement("span");
      text.textContent = `${file.file_name} (${Math.round(file.file_size / 1024)}KB)`;
      li.appendChild(text);

      list.appendChild(li);
    });
  }

});
