(() => {
  const VERSION = '2026-09-30-v1';
  const page = document.body.dataset.page || 'home';
  const prefix = 'aion2-ranger:' + VERSION + ':' + page + ':';
  const boxes = [...document.querySelectorAll('input[data-task]')];
  const bar = document.querySelector('[data-progress-bar]');
  const label = document.querySelector('[data-progress-label]');

  function key(box){ return prefix + box.dataset.task; }
  function load(){ boxes.forEach(box => box.checked = localStorage.getItem(key(box)) === '1'); update(); }
  function update(){
    boxes.forEach(b => b.closest('.task')?.classList.toggle('done', b.checked));
    const done = boxes.filter(b => b.checked).length;
    const pct = boxes.length ? Math.round(done / boxes.length * 100) : 0;
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = done + '/' + boxes.length + ' · ' + pct + '%';
    document.querySelectorAll('.task').forEach(x => x.classList.remove('next'));
    const next = boxes.find(b => !b.checked)?.closest('.task');
    if (next) next.classList.add('next');
  }
  boxes.forEach(box => box.addEventListener('change', () => {
    localStorage.setItem(key(box), box.checked ? '1' : '0'); update();
  }));
  document.querySelector('[data-next]')?.addEventListener('click', () => {
    const next = boxes.find(b => !b.checked)?.closest('.task');
    next?.scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    if (!confirm('Сбросить все галочки на этой странице?')) return;
    boxes.forEach(box => { localStorage.removeItem(key(box)); box.checked = false; }); update();
  });
  load();
})();
