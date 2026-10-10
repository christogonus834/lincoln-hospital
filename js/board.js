// public/js/board.js
document.getElementById('year').textContent = new Date().getFullYear();
loadBranding('hospital');

async function loadBoardMembers() {
  const grid = document.getElementById('boardGrid');
  try {
    const members = await api.get('/api/hospital/board-members');
    if (!members.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;color:var(--stone);text-align:center;padding:40px 0;">Board member profiles will appear here shortly.</p>`;
      return;
    }
    grid.innerHTML = members.map((m) => `
      <div class="board-card">
        <div class="board-card__photo"><img src="${esc(m.photo_url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400')}" alt="${esc(m.full_name)}" /></div>
        <h3 class="board-card__name">${esc(m.full_name)}</h3>
        ${m.role ? `<p class="board-card__role">${esc(m.role)}</p>` : ''}
        ${m.bio ? `<p class="board-card__bio">${esc(m.bio)}</p>` : ''}
      </div>
    `).join('');
  } catch (e) {
    grid.innerHTML = `<p style="grid-column:1/-1;color:#8a2e1f;text-align:center;padding:40px 0;">Could not load board members. Please try again later.</p>`;
  }
}
loadBoardMembers();
