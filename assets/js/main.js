document.querySelector('.menu-btn')?.addEventListener('click',()=>document.querySelector('.menu')?.classList.toggle('open'));
const lb=document.querySelector('.lightbox');
document.querySelectorAll('[data-full]').forEach(btn=>btn.addEventListener('click',()=>{if(!lb)return;lb.hidden=false;lb.querySelector('img').src=btn.dataset.full;lb.querySelector('img').alt=btn.dataset.caption||'';lb.querySelector('p').textContent=btn.dataset.caption||'';}));
lb?.querySelector('button')?.addEventListener('click',()=>{lb.hidden=true;lb.querySelector('img').src='';});
lb?.addEventListener('click',e=>{if(e.target===lb){lb.hidden=true;lb.querySelector('img').src='';}});
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>{window.dlTrack?.(el.dataset.track);}));


// Menú distritos: funciona por hover, click y teclado sin desaparecer al bajar el mouse
(function(){
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dd => {
    const btn = dd.querySelector('button');
    let timer;
    const open = () => { clearTimeout(timer); dd.classList.add('open'); btn?.setAttribute('aria-expanded','true'); };
    const close = () => { timer = setTimeout(() => { dd.classList.remove('open'); btn?.setAttribute('aria-expanded','false'); }, 180); };
    dd.addEventListener('mouseenter', open);
    dd.addEventListener('mouseleave', close);
    dd.addEventListener('focusin', open);
    dd.addEventListener('focusout', close);
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
})();
