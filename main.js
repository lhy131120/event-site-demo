import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";


document.addEventListener("DOMContentLoaded", () => {
	const swipers = document.querySelectorAll(".albums .swiper");

	swipers.forEach((swiper) => {
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
	// const swiper = new Swiper(albumsSwiper, {
	// 	allowTouchMove: false,
	// 	slidesPerView: "auto",
	// 	speed: 15000,
	// 	loop: true,
	// 	autoplay: {
	// 		delay: 0,
	// 		disableOnInteraction: false,
	// 	},
	// 	centeredSlides: true,
	// });
});
