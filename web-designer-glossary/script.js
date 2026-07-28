document.addEventListener("DOMContentLoaded", () => {
	// 1. Swiper（カルーセル）の初期化
	const swiper = new Swiper(".mySwiper", {
		loop: true,
		// disableOnInteraction: true → ユーザーが自分で操作したら自動再生を止める
		// （読んでいる途中で勝手に切り替わらないようにするため）
		autoplay: { delay: 3000, disableOnInteraction: true },
		pagination: { el: ".swiper-pagination", clickable: true },
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	// 2. モーダル（<dialog>）の開閉制御
	const dialog = document.getElementById("myDialog");
	const openBtn = document.getElementById("openModalBtn");
	const closeBtn = document.getElementById("closeModalBtn");

	if (dialog && openBtn && closeBtn) {
		openBtn.addEventListener("click", () => dialog.showModal());
		closeBtn.addEventListener("click", () => dialog.close());

		// 背景（暗くなっている部分）をクリックしても閉じられるようにする。
		// Escキーで閉じるのは <dialog> がもともと持っている動き
		dialog.addEventListener("click", (e) => {
			if (e.target === dialog) dialog.close();
		});
	}

	// =========================================
	// スマホ用ハンバーガーメニューの開閉制御
	// =========================================
	const hamburgerBtn = document.getElementById("hamburgerBtn");
	const mobileNav = document.getElementById("mobileNav");
	const mobileNavOverlay = document.getElementById("mobileNavOverlay");
	const closeMobileNavBtn = document.getElementById("closeMobileNavBtn");

	// 実務テクニック：PC用のメニュー(ulの中身)をコピーしてスマホ用メニューに入れる
	const globalNavUl = document.querySelector(".global-nav ul");
	const mobileNavList = document.getElementById("mobileNavList");
	if (globalNavUl && mobileNavList) {
		mobileNavList.innerHTML = globalNavUl.innerHTML;
	}

	// CSSの設定に合わせて body に "nav-open" クラスを付け外しする
	const toggleMobileMenu = () => {
		document.body.classList.toggle("nav-open");
	};

	// ボタンや背景をクリックした時に発動
	if (hamburgerBtn) hamburgerBtn.addEventListener("click", toggleMobileMenu);
	if (closeMobileNavBtn)
		closeMobileNavBtn.addEventListener("click", toggleMobileMenu);
	if (mobileNavOverlay)
		mobileNavOverlay.addEventListener("click", toggleMobileMenu);

	// =========================================
	// 授業用ギミック：解説ハイライトの制御
	// =========================================
	const hintTargets = document.querySelectorAll(".hint-target");

	hintTargets.forEach((target) => {
		const title = target.getAttribute("data-hint-title");
		const desc = target.getAttribute("data-hint-desc");
		const pos = target.getAttribute("data-hint-pos") || "bottom";

		const popup = document.createElement("div");
		popup.className = `hint-popup pos-${pos}`;
		popup.innerHTML = `
			<span class="hint-popup-title">💡 ${title}</span>
			<span class="hint-popup-desc">${desc}</span>
		`;

		target.appendChild(popup);
	});

	document.addEventListener("keydown", (e) => {
		if (
			e.target.tagName.toLowerCase() === "input" ||
			e.target.tagName.toLowerCase() === "textarea"
		)
			return;

		if (e.key.toLowerCase() === "z") {
			document.body.classList.toggle("show-hints");
		}
	});

	const toggleHintBtn = document.getElementById("toggleHintBtn");
	if (toggleHintBtn) {
		toggleHintBtn.addEventListener("click", () => {
			document.body.classList.toggle("show-hints");
		});
	}
});
