"use strict";

const imgDiv = document.querySelector(".p-content");
const todoImg = document.querySelector(".todo-img");
const todo = document.querySelector(".todo");
const pongImg = document.querySelector(".pong-img");
const ecommerceImg = document.querySelector(".ecommerce-img");
const nav = document.querySelector(".nav");
const intro = document.querySelector(".intro");
const content = document.querySelector(".content");
const skillHead = document.querySelector(".s-head");
const projectHead = document.querySelector(".p-head");
const aboutHead = document.querySelector(".a-head");
const skills = document.querySelectorAll(".s-1-div");
const oDiv = document.querySelectorAll(".o-div");
const gitDiv = document.querySelector(".git-div");
const aDiv = document.querySelector(".a-t-div");
const formDiv = document.querySelector(".form-div");
const links = document.querySelectorAll(".links");
const github = document.querySelector(".github");
const resume = document.querySelector(".resume");
const submit = document.querySelector(".submit");
const names = document.querySelector(".names");
const mail = document.querySelector(".email");
const area = document.querySelector(".area");

//Carousel
function carousel(imgNum, name, div) {
  //adding the images in the carousel
  div.insertAdjacentHTML(
    "beforeend",
    `
    <i class="fa-solid fa-chevron-left next left"></i><img src="./Images/${name}/${name}-1.png"
    alt="" class="img" data-id="0"><i class="fa-solid fa-chevron-right next right"></i>
    `
  );

  for (let i = 2; i <= imgNum; i++) {
    div.insertAdjacentHTML(
      "beforeend",
      `
            <img src="./Images/${name}/${name}-${i}.png" alt="" class="img rest" style="transform: translateX(${
        (i - 1) * 100
      }%);" data-id="${i - 1}">
            `
    );
  }
  // making the carousel function
  imgDiv.addEventListener("click", (e) => {
    let img = e.target.closest(`.${name}`).querySelectorAll(".img");
    if (
      e.target.classList.contains("right") &&
      Number(img[imgNum - 1].dataset.id) !== 0
    ) {
      for (let i = 0; i < imgNum; i++) {
        let k = Number(img[i].dataset.id);
        k -= 1;
        img[i].dataset.id = k;
        img[i].style.transform = `translateX(${k * 100}%)`;
      }
    } else if (
      e.target.classList.contains("left") &&
      Number(img[0].dataset.id) !== 0
    ) {
      for (let i = 0; i < imgNum; i++) {
        let j = Number(img[i].dataset.id);
        j += 1;
        img[i].dataset.id = j;
        img[i].style.transform = `translateX(${j * 100}%)`;
      }
    }
  });
}

//pong images
carousel(3, "pong", pongImg);
//ecommerce images
carousel(4, "ecommerce", ecommerceImg);

//Fixed navbar
function fixedNav() {
  //fix
  const observer = new IntersectionObserver(
    (entries) => {
      let [e] = entries;
      if (!e.isIntersecting && e.boundingClientRect.top <= 0) {
        nav.classList.add("fixed");
        content.style.marginTop = `${
          nav.getBoundingClientRect().bottom - nav.getBoundingClientRect().top
        }px`;
      }
    },
    {
      threshold: 1,
    }
  );
  observer.observe(nav);

  //unfix
  const introObserver = new IntersectionObserver((entries) => {
    let [k] = entries;
    if (k.isIntersecting) {
      nav.classList.remove("fixed");
      content.style.marginTop = "0";
    }
  });
  introObserver.observe(intro);
}

fixedNav();

//Lazy loading
function lazyLoad(section) {
  const others = (innerDiv, outerDiv, action) => {
    if (section.classList.contains(outerDiv)) {
      let j = section.querySelector(innerDiv);
      j.classList.remove(action);
    }
  };
  const lazy = new IntersectionObserver(
    (entries) => {
      let [l] = entries;
      if (l.isIntersecting) {
        others(".s-div", "s-1-div", "slide");
        others(".p-in-div", "o-div", "slide");
        section.classList.remove("opacity");
        lazy.unobserve(l.target);
      }
    },
    {
      threshold: 0.75,
    }
  );
  lazy.observe(section);
}

const arr = [
  skillHead,
  projectHead,
  aboutHead,
  gitDiv,
  formDiv,
  aDiv,
  ...skills,
  ...oDiv,
];
arr.forEach((e) => {
  lazyLoad(e);
});

//Smooth Scrolling
links.forEach((arr) => {
  arr.addEventListener("click", () => {
    document.querySelectorAll(`#${arr.textContent}`).forEach((k) => {
      k.scrollIntoView({ behavior: "smooth" });
    });
  });
});

//GitHub / Resume
const gitres = () => {
  github.addEventListener("click", () => {
    window.open("https://github.com/Rum2y", "_blank");
  });
  resume.addEventListener("click", () => {
    window.open("./resume/Resume.pdf");
  });
};

gitres();

const sendEmail = () => {
  const params = {
    name: names.value,
    email: mail.value,
    message: area.value,
  };

  const serviceID = "service_g6tayas";
  const templateID = "template_b55q8fi";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      names.value = "";
      mail.value = "";
      area.value = "";
      alert(`Message sent successfully. I'll reach out as soon as possible!`);
      console.log(res);
    })
    .catch((err) => console.error(err));
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  sendEmail();
});
