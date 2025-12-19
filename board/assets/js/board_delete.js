/* delete page logic (anonymous password check + soft delete) */

function bufToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return bufToHex(hash);
}

document.addEventListener("DOMContentLoaded", () => {
  const init = async () => {
    const id = Number(Util.qs("id"));
    if (!id || Number.isNaN(id)) {
      alert("잘못된 접근입니다.");
      location.href = "index.html";
      return;
    }

    const boards = StorageDB.get("BOARD") || [];

    // 임시 로그인 정보(추후 연동)
    const currentUser = { role: "USER" }; // USER / ADMIN

    const board = boards.find(b => b.id === id);
    if (!board || board.status === "DELETED") {
      alert("게시글이 존재하지 않습니다.");
      location.href = "index.html";
      return;
    }

    // 화면 표시
    const info = document.getElementById("deleteInfo");
    if (info) {
      info.innerHTML = `
        <div class="row"><div class="k">번호</div><div class="v">${board.id}</div></div>
        <div class="row"><div class="k">제목</div><div class="v">${Util.escape(board.title || "")}</div></div>
        <div class="row"><div class="k">작성자</div><div class="v">${Util.escape(board.writer || "익명")}</div></div>
        <div class="row"><div class="k">작성일</div><div class="v">${Util.fmt(board.created_at)}</div></div>
      `;
    }

    // 익명글 판단: is_anonymous=true 또는 delete_password_hash 존재
    const isAnonymousPost = (board.is_anonymous === true) || !!board.delete_password_hash;

    // 익명글 + 관리자가 아니면 비번 입력 요구
    const pwBlock = document.getElementById("pwBlock");
    if (pwBlock) {
      if (isAnonymousPost && currentUser.role !== "ADMIN") pwBlock.style.display = "block";
      else pwBlock.style.display = "none";
    }

    // 취소
    const btnCancel = document.getElementById("btnCancel");
    if (btnCancel) {
      btnCancel.addEventListener("click", () => {
        location.href = `view.html?id=${id}`;
      });
    }

    // 삭제 확정
    const btnConfirm = document.getElementById("btnConfirmDelete");
    if (btnConfirm) {
      btnConfirm.addEventListener("click", async () => {
        if (!confirm("삭제하시겠습니까?")) return;

        // 익명글이면 비밀번호 검증(관리자 예외)
        if (isAnonymousPost && currentUser.role !== "ADMIN") {
          const input = (document.getElementById("deletePw")?.value || "").trim();
          if (!input) {
            alert("삭제 비밀번호를 입력하세요.");
            return;
          }
          if (!board.delete_password_hash) {
            alert("이 글에는 삭제 비밀번호가 설정되어 있지 않습니다.");
            return;
          }

          const inputHash = await sha256(input);
          if (inputHash !== board.delete_password_hash) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
          }
        }

        const idx = boards.findIndex(b => b.id === id);
        if (idx === -1) {
          alert("게시글을 찾을 수 없습니다.");
          location.href = "index.html";
          return;
        }

        // 논리삭제
        boards[idx].status = "DELETED";
        boards[idx].deleted_at = new Date().toISOString();

        StorageDB.set("BOARD", boards);
        alert("삭제되었습니다.");
        location.href = "index.html";
      });
    }
  };

  init();
});
