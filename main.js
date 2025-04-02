import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger);

	const sectionAlbums = document.querySelector(".albums");
	const albumSwipers = document.querySelectorAll(".albums .swiper");
	const albumCols = gsap.utils.toArray(".albums .row > *");

	const tl_swiper = gsap.timeline({
		scrollTrigger: {
			trigger: sectionAlbums,
			start: "top 85%",
			end: "bottom 75%",
			scrub: 1,
		},
	});

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
			on: {
				afterInit: function () {
					tl_swiper.fromTo(
						swiper,
						{ opacity: 0 },
						{
							opacity: 1,
							duration: 2,
							ease: "power2.out",
						},
						"+=0.05"
					);
				},
			},
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

	albumCols.forEach((col, index) => {
		let tl_albumCols = gsap.timeline({
			scrollTrigger: {
				trigger: col,
				start: "top 90%",
				end: "bottom bottom",
				scrub: 1,
				// markers: true,
			},
		});
		tl_albumCols.fromTo(col, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.Out" }, index * 1);
	});

	if (!!document.querySelector(".heros .swiper")) {
		const heroSwiper = new Swiper(".heros .swiper", {
			effect: "fade",
			loop: true,
			fadeEffect: {
				crossFade: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
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

	const sectionCatalogue = document.querySelector(".catalogue");
	const catalogueItems = gsap.utils.toArray(".catalogue .col");
	const tl_catalogue = gsap.timeline({
		// scrollTrigger: {
		// 	trigger: sectionCatalogue,
		// 	start: "top 85%",
		// 	end: "bottom top",
		// 	scrub: true,
		// 	markers: 1,
		// },
	});

	catalogueItems.forEach((col, index) => {
		tl_catalogue.fromTo(col, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, index * 0.3);
	});

	const sectionBlk = gsap.utils.toArray(".titleBlk");

	sectionBlk.forEach((blk, index) => {
		const items = blk.querySelectorAll("h2, h3");

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: blk,
				start: "top 85%",
				end: "bottom 75%",
				scrub: 1,
			},
		});

		tl.fromTo(blk, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" });
		items.forEach((item, itemIndex) => {
			tl.fromTo(
				item,
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
				"+=0.05" // 前一個動畫完成後延遲 0.05 秒
			);
		});
	});

	const recentCards = gsap.utils.toArray(".recent .col");
	recentCards.forEach((card, index) => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: card,
				start: "top 85%",
				end: "bottom 80%",
				scrub: 1,
			},
		});
		tl.fromTo(
			card,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
			`+=${0.25 * index}`
		);
	});

	const sectionOnline = document.querySelector(".online");
	const onlineCols = gsap.utils.toArray(".online .row > *");
	let tl_online = gsap.timeline({
		scrollTrigger: {
			trigger: sectionOnline,
			start: "top 90%",
			end: "bottom 85%",
			scrub: 1,
		},
	});

	onlineCols.forEach((col, idx) => {
		tl_online.fromTo(col, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=1");
	});

	const sectionFollow = document.querySelector(".follow");
	const followCols = gsap.utils.toArray(".follow .col");
	let tl_follow = gsap.timeline({
		scrollTrigger: {
			trigger: sectionFollow,
			start: "top 85%",
			end: "50% 80%",
			scrub: 1,
		},
	});

	console.log(followCols);

	followCols.forEach((col, index) => {
		let config = index === 0 ? { opacity: 0, x: "-100" } : { opacity: 0, x: "100" };
		tl_follow.fromTo(
			col,
			config,
			{ opacity: 1, x: 0, duration: 1.2, ease: "power4.in", onComplete: () => {
        if(index === 1 && window.innerWidth > 992) {
          console.log(col.querySelector("div"))
          // col.querySelector("div").style.borderLeft = "0!important";
          setTimeout(() => {
            col.querySelector("div").style.borderLeft = `0!important`;
          }, 100);
        } 
      } },
			index * 1
		);
	});
});
