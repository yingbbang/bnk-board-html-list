/* 게시글 수정 + 이력 */

document.addEventListener("DOMContentLoaded", () => {
  const id = Number(Util.qs("id"));
  const boards = StorageDB.get("BOARD");
  const histories = StorageDB.get("BOARD_HISTORY");

  const board = boards.find(b => b.id === id);
  if (!board) {
    alert("게시글 없음");
    history.back();
    return;
  }

  const form = document.querySelector("#editForm");
  form.title.value = board.title;
  form.content.value = board.content;

  form.addEventListener("submit", e => {
    e.preventDefault();

    histories.push({
      history_id: StorageDB.nextId("SEQ_HISTORY_ID"),
      board_id: id,
      before_content: board.content,
      after_content: form.content.value,
      updated_by: 1,
      updated_at: new Date().toISOString()
    });

    board.title = form.title.value;
    board.content = form.content.value;
    board.updated_at = new Date().toISOString();
    board.version++;

    StorageDB.set("BOARD", boards);
    StorageDB.set("BOARD_HISTORY", histories);

    location.href = `view.html?id=${id}`;
  });
});
