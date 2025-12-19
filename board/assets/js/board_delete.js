
  <!-- =========================
       delete 전용 스크립트
       ========================= -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const id = Number(Util.qs("id"));

      if (!id || Number.isNaN(id)) {
        alert("잘못된 접근입니다.");
        location.href = "index.html";
        return;
      }

      const boards = StorageDB.get("BOARD") || [];

      // 임시 로그인 정보 (추후 인증 연동)
      const currentUser = { role: "USER" }; // USER / ADMIN

      const board = boards.find(b => b.id === id);

      if (!board || board.status === "DELETED") {
        alert("게시글이 존재하지 않습니다.");
        location.href = "index.html";
        return;
      }

      // 권한(임시): ADMIN만 삭제 허용
      if (currentUser.role !== "ADMIN") {
        alert("삭제 권한이 없습니다.");
        location.href = `view.html?id=${id}`;
        return;
      }

      // 화면 표시
      const info = document.getElementById("deleteInfo");
      info.innerHTML = `
        <div class="row"><div class="k">번호</div><div class="v">${board.id}</div></div>
        <div class="row"><div class="k">카테고리</div><div class="v">${Util.escape(board.category || "")}</div></div>
        <div class="row"><div class="k">제목</div><div class="v">${Util.escape(board.title || "")}</div></div>
        <div class="row"><div class="k">작성자</div><div class="v">${Util.escape(board.writer || "익명")}</div></div>
        <div class="row"><div class="k">작성일</div><div class="v">${Util.fmt(board.created_at)}</div></div>
      `;

      // 취소
      document.getElementById("btnCancel").addEventListener("click", () => {
        location.href = `view.html?id=${id}`;
      });

      // 삭제 확정 (논리삭제)
      document.getElementById("btnConfirmDelete").addEventListener("click", () => {
        if (!confirm("삭제하시겠습니까?")) return;

        const idx = boards.findIndex(b => b.id === id);
        if (idx === -1) {
          alert("게시글을 찾을 수 없습니다.");
          location.href = "index.html";
          return;
        }

        boards[idx].status = "DELETED";
        boards[idx].deleted_at = new Date().toISOString();

        StorageDB.set("BOARD", boards);

        alert("삭제되었습니다.");
        location.href = "index.html";
      });
    });
  </script>