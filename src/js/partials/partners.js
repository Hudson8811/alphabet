document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".partners")) {
    const partners = document.querySelectorAll(".partners-item"),
      partnersSelect = document.querySelector(".partners-select"),
      partnersTabs = document.querySelectorAll(".js-partners-tab"),
      mobile = window.matchMedia("(max-width: 767px)");

    const filterPartners = (category) => {
      partners.forEach((item) => {
        if (item.dataset.category === category) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    };

    document.querySelector(".partners").addEventListener("click", (e) => {
      if (mobile.matches) {
        if (e.target.classList.contains("partners-select")) {
          filterPartners(e.target.options[e.target.selectedIndex].value);
        }
      } else {
        if (e.target.closest(".js-partners-tab")) {
          filterPartners(e.target.closest(".js-partners-tab").dataset.category);

          partnersTabs.forEach((item) => {
            if (e.target.closest(".js-partners-tab") === item) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      }
    });

    new Swiper(".partners-tabs", {
      slidesPerView: 3.5,
      spaceBetween: 20,
      slideToClickedSlide: true,
      centeredSlides: true,
      freeMode: {
        enabled: true,
        sticky: true,
      },
      breakpoints: {
        800: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
      },
    });

    filterPartners(partnersSelect.options[partnersSelect.selectedIndex].value);
  }
});
