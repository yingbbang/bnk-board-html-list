document.addEventListener("DOMContentLoaded", () => {
  const boards = (StorageDB.get("BOARD") || [])
    .filter(b => b.status === "ACTIVE")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const stats = StorageDB.get("BOARD_STAT") || [];
  const tbody = document.getElementById("boardList");
  tbody.innerHTML = "";

  boards.forEach(b => {
    const stat = stats.find(s => s.board_id === b.id) || {
      view_count: 0,
      like_count: 0
    };

    const hasAttachment = b.attachments && b.attachments.length > 0;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="text-center">${b.id}</td>

      <td class="title">
        ${hasAttachment ? '<span class="attach-icon"></span>' : ''}
        <a href="view.html?id=${b.id}">
          ${Util.escape(b.title)}
        </a>
      </td>

      <td class="text-center">${b.writer_name || "운영자"}</td>
      <td class="text-center">${Util.fmt(b.created_at)}</td>
      <td class="text-center">${stat.view_count}</td>
      <td class="text-center">${stat.like_count || 0}</td>
    `;

    tbody.appendChild(tr);
  });
});
