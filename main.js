import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

document.addEventListener("DOMContentLoaded", () => {
	const albumSwipers = document.querySelectorAll(".albums .swiper");

	albumSwipers.forEach((swiper) => {
		const baseConfig = {
			allowTouchMove: false,
			slidesPerView: "auto",
			spaceBetween: 0,
			speed: 35000,
			loop: true,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
			},
			centeredSlides: true,
		};

		const finalConfig = swiper.classList.contains("reverse")
			? {
					...baseConfig,
					autoplay: {
						...baseConfig.autoplay,
						reverseDirection: true,
					},
			  }
			: baseConfig;

		new Swiper(swiper, finalConfig);
	});

	if (!!document.querySelector(".heros .swiper")) {
		const heroSwiper = new Swiper(".heros .swiper", {
			effect: "fade",
			loop: true,
			fadeEffect: {
				crossFade: true,
			},
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			navigation: {
				nextEl: ".heros .swiper-button-next",
				prevEl: ".heros .swiper-button-prev",
			},
		});

		function addActiveClass() {
			document.querySelectorAll(".swiper-slide h2, .swiper-slide h3, .swiper-slide p").forEach((elment) => {
				elment.classList.remove("active");
			});

			const activeSlide = heroSwiper.slides[heroSwiper.activeIndex];

			const elements = [
				activeSlide.querySelector("h2"),
				activeSlide.querySelector("h3"),
				activeSlide.querySelector("p"),
			];

			const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

			elements.reduce((promise, element) => {
				return promise.then(() => {
					if (element) {
						element.classList.add("active");
					}
					return delay(300);
				});
			}, Promise.resolve());
		}

		addActiveClass();
		heroSwiper.on("slideChangeTransitionEnd", () => {
			setTimeout(addActiveClass, 100);
		});
	}
});
