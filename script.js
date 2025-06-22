function sct()
{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
sct();
function cursormove() {
   
   let main= document.querySelector("main");
   let crsr= document.querySelector(".cursor");
   main.addEventListener("mousemove", (e) => {
       crsr.style.left = e.pageX + "px";
       crsr.style.top = e.pageY + "px";
       crsr.style.display = "block";
   });
}
cursormove();
function navcollapse() {
    // let nav = document.querySelector("nav");
    // let main = document.querySelector("main");

    // main.addEventListener("scrollend", () => {
    //   nav.style.transform = "translateY(-100%)";
    //   nav.style.transition = "transform 0.3s ease-in-out";
    // });
    // main.addEventListener("scroll", () => {
    //   nav.style.transform = "translateY(0%)";
    //   nav.style.transition = "transform 0.3s ease-in-out";
    // });/

    var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav-scroll").style.top = "0";
  } else {
    document.getElementById("nav-scroll").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}
}
navcollapse();
function oopll() {
  const $cards = document.querySelectorAll(".credit-card");

  $cards.forEach(($card) => {
    let bounds;
    let lastShadowOffsetX = 0;
    let lastShadowOffsetY = 0;
    let lastShadowBlur = 0;

    function moveToMouse(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
      const rotationX = center.y / 50;
      const rotationY = -center.x / 50;
      const shadowOffsetX = -rotationY * 5;
      const shadowOffsetY = rotationX * 5;
      const shadowBlur = 20 + distance / 120;

      lastShadowOffsetX = shadowOffsetX;
      lastShadowOffsetY = shadowOffsetY;
      lastShadowBlur = shadowBlur;

      gsap.to($card, {
        scale: 1.1,
        rotationX,
        rotationY,
        transformPerspective: 500,
        ease: "power2.out",
        boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 6px rgba(72, 65, 56, .4)`
      });

      gsap.to($card.querySelector(".glare"), {
        autoAlpha: 1,
        backgroundImage: `
          radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            rgba(255, 255, 255, 0.33),
            rgba(0, 0, 0, 0.06)
          )
        `
      });
    }

    $card.addEventListener("mouseenter", () => {
      bounds = $card.getBoundingClientRect();
      document.addEventListener("mousemove", moveToMouse);
      gsap.to($card, {
        scale: 1.1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6
      });
    });

    $card.addEventListener("mouseleave", () => {
      document.removeEventListener("mousemove", moveToMouse);

      gsap.to($card, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to($card, {
        boxShadow: `${lastShadowOffsetX}px ${lastShadowOffsetY}px ${lastShadowBlur}px 0 rgba(72, 65, 56, .4)`,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          gsap.to($card, {
            boxShadow: `0px 0px ${lastShadowBlur}px 0 rgba(0, 0, 0, 0)`,
            duration: 1.2
          });
        }
      });

      gsap.to($card.querySelector(".glare"), {
        autoAlpha: 0,
        duration: 0.6
      });
    });
  });
}
oopll();