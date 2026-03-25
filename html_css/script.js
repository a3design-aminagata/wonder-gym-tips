document.addEventListener("DOMContentLoaded", () => {
	const body = document.body;
	const hamburgerBtn = document.querySelector(".hamburger-btn");
	const closeBtn = document.querySelector(".mobile-nav__close");
	const overlay = document.querySelector(".mobile-nav__overlay");
	const mobileNav = document.querySelector(".mobile-nav");
	const mobileLinks = document.querySelectorAll(".mobile-nav__list a");

	if (!hamburgerBtn || !mobileNav) return;

	const openNav = () => {
		body.classList.add("nav-open");
		hamburgerBtn.setAttribute("aria-expanded", "true");
		mobileNav.setAttribute("aria-hidden", "false");
	};

	const closeNav = () => {
		body.classList.remove("nav-open");
		hamburgerBtn.setAttribute("aria-expanded", "false");
		mobileNav.setAttribute("aria-hidden", "true");
	};

	hamburgerBtn.addEventListener("click", () => {
		if (body.classList.contains("nav-open")) {
			closeNav();
		} else {
			openNav();
		}
	});

	closeBtn?.addEventListener("click", closeNav);
	overlay?.addEventListener("click", closeNav);
	mobileLinks.forEach((link) => link.addEventListener("click", closeNav));

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeNav();
		}
	});

	// スムーススクロール（PCナビ + モバイルナビ共通）
	const navLinks = document.querySelectorAll(
		'.global-nav a[href^="#"], .mobile-nav__list a[href^="#"]'
	);

	const smoothScroll = (event) => {
		const link = event.currentTarget;
		const targetId = link.getAttribute("href");
		if (!targetId || targetId === "#") return;

		const targetEl = document.querySelector(targetId);
		if (!targetEl) return;

		event.preventDefault();
		targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

		// モバイルの場合は閉じる
		if (body.classList.contains("nav-open")) {
			closeNav();
		}
	};

	navLinks.forEach((link) => link.addEventListener("click", smoothScroll));
});
