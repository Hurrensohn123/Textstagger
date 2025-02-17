window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });


  // Generic function to create ScrollTriggers for each animation
  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  // Define animations
  // Text fly-in from left
  $("[text-fly-in-left]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      xPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.02
    });
    createScrollTrigger($(this), tl);
  });

 // Characters cycling effect
$("[text-code-typing]").each(function () {
  let chars = $(this).find(".char");
  let tl = gsap.timeline({ paused: true });
  let possibleChars = "+/0._[]-@£$%&*()".split(""); // Split into individual characters

  chars.each(function (index, element) {
    let origText = element.textContent; // Store original text
    let randDuration = gsap.utils.random(0.5, 2, 0.1); // Random duration between 0.5 to 2 seconds, snapping to 0.1 intervals

    // Start with the random characters effect
    tl.to(element, {
      duration: 0.1,
      repeat: Math.floor(randDuration / 0.1) - 1, // calculate repeats
      repeatDelay: 0.05,
      onRepeat: function() { // Update text with random character on each repeat
        element.textContent = possibleChars[Math.floor(Math.random() * possibleChars.length)];
      },
      onComplete: function() { // Set text to original after all repeats
        element.textContent = origText;
      }
    }, index * 0.05); // Stagger start times of each character
  });

  createScrollTrigger($(this), tl);
});

  // Set initial state
  gsap.set("[text-split]", { opacity: 1 });
});
