 // ======== Particles (lightweight starfield) ========
    (function(){
      const c = document.getElementById('particles');
      const ctx = c.getContext('2d');
      let w,h,stars=[]; const COUNT=120;
      function resize(){w= c.width = innerWidth; h= c.height = innerHeight}
      addEventListener('resize', resize); resize();
      function init(){stars = Array.from({length:COUNT},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+0.3,s:Math.random()*0.6+0.2}))}
      function tick(){ctx.clearRect(0,0,w,h); ctx.fillStyle='rgba(255,255,255,0.8)';
        for(const s of stars){ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); s.y+=s.s; if(s.y>h){s.y=0; s.x=Math.random()*w}}
        requestAnimationFrame(tick)
      }
      init(); tick();
    })();

    // ======== Mobile Menu Toggle ========
    const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
    const mobileMenu = document.querySelector('#mobile-menu');
    mobileMenuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('show'));

    // ======== Smooth Scroll for Navigation ========
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
      anchor.addEventListener('click',function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){target.scrollIntoView({behavior:'smooth', block:'start'}); if(mobileMenu.classList.contains('show')) mobileMenu.classList.remove('show');}
      })
    })

    // ======== Scroll Animation for Elements ========
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('animate-fadeInUp');
          // Animate skill bars when skills section reveals
          if(entry.target.closest('#skills')){
            entry.target.querySelectorAll('.progress-bar div').forEach((bar,i)=>{
              const to = bar.getAttribute('style').match(/--to:(\d+%)/);
              const width = to? to[1] : '0%';
              bar.style.transition = `width 1s ${0.2*i}s ease`; // stagger
              requestAnimationFrame(()=> bar.style.width = width);
            })
          }
          observer.unobserve(entry.target);
        }
      })
    },{threshold:0.2});
    animatedElements.forEach(el=>observer.observe(el));

    // ======== Project Cards: subtle 3D tilt ========
    document.querySelectorAll('[data-tilt]').forEach(card=>{
      card.addEventListener('mousemove', (e)=>{
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left; const y = e.clientY - r.top;
        const rx = ((y / r.height) - 0.5) * -6; // rotateX
        const ry = ((x / r.width) - 0.5) * 6;   // rotateY
        card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('mouseleave', ()=>{
        card.style.transform = '';
      });
    });

    // ======== Back to Top Button ========
    const backToTopBtn = document.querySelector('#back-to-top');
    window.addEventListener('scroll',()=>{
      if(window.scrollY>500){backToTopBtn.classList.add('show')} else {backToTopBtn.classList.remove('show')}
    });
    backToTopBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

    // ======== Demo Submit ========
    function demoSubmit(e){e.preventDefault(); alert('Thanks! This is a demo form.'); return false}
