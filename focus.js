"use strict";

const aimLn = document.getElementById("aimLines");
const aimC1 = document.getElementById("aimCircle1");
const aimC2 = document.getElementById("aimCircle2");
const portal = document.getElementById("mask-circle");

let portalRadius = 15;
let previousX = 0;
let rot1 = 0;
let rot2 = 0;
let isExpanded = false;

window.addEventListener("mousemove", (e) => {
  const { pageX, pageY } = e;
  portal.setAttribute("cx", pageX);
  portal.setAttribute("cy", pageY);

  aimLn.setAttribute("transform", `translate(${pageX} ${pageY})`);

  if (pageX > previousX) { rot1++; rot2--; } else { rot1--; rot2++; }

  [aimC1, aimC2].forEach((c, i) => {
    c.setAttribute("cx", pageX);
    c.setAttribute("cy", pageY);
    const rot = i === 0 ? rot1 : rot2;
    c.setAttribute("transform", `rotate(${rot} ${pageX} ${pageY})`);
  });

  previousX = pageX;
});

function animatePortal(target, step = 1) {
  if ((target > portalRadius && portalRadius < target) ||
      (target < portalRadius && portalRadius > target)) {
    portalRadius += target > portalRadius ? step : -step;
    portal.setAttribute("r", `${portalRadius}%`);
    requestAnimationFrame(() => animatePortal(target, step));
  }
}

document.addEventListener("click", () => {
  isExpanded = !isExpanded;
  animatePortal(isExpanded ? 100 : 15, 1);
});
