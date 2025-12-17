/* 게시글 상세 */

document.addEventListener("DOMContentLoaded", () => {
  const id = Number(Util.qs("id"));
  const boards = StorageDB.get("BOARD");
  const stats  = StorageDB.get("BOARD_STAT");

  const board = boards.find(b => b.id === id);
  if (!board || board.status === "DELETED") {
    alert("게시글이 존재하지 않습니다.");
    location.href = "index.html";
    return;
  }

  const stat = stats.find(s => s.board_id === id);
  if (stat) {
    stat.view_count++;
    StorageDB.set("BOARD_STAT", stats);
  }

  document.querySelector(".board-view .title").textContent = board.title;
  document.querySelector(".board-view .meta").textContent =
    `상태: ${board.status} | 작성일: ${Util.fmt(board.created_at)}`;
  document.querySelector(".board-view .content").innerHTML =
    Util.escape(board.content).replace(/\n/g,"<br>");

  document.querySelector("#btnEdit").onclick =
    () => location.href = `edit.html?id=${id}`;

  document.querySelector("#btnDelete").onclick = () => {
    if (!confirm("삭제하시겠습니까?")) return;
    board.status = "DELETED";
    board.updated_at = new Date().toISOString();
    StorageDB.set("BOARD", boards);
    location.href = "index.html";
  };
});
