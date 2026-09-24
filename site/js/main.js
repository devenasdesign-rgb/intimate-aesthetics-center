/* Центр интимной эстетики — общий layout и микроанимации */
(function () {
  "use strict";

  const IMG = "assets/img/";
  const page = document.body.dataset.page || "";

  /* ---------- данные ---------- */
  const DIRECTIONS = [
    { id: "bos", n: "01", title: "БОС-терапия", desc: "Диагностика и восстановление мышц", mod: "rose", art: "line-bos.png", href: "bos.html", tw: "none", dw: "151px", meta: "Основное направление" },
    { id: "audio", n: "02", title: "Аудиотренировки интимных мышц", desc: "Практики для самостоятельных занятий", mod: "lilac", art: "line-audio.png", href: "soon.html?s=audio", tw: "264px", dw: "195px", meta: "3 аудио бесплатно" },
    { id: "books", n: "03", title: "Книги", desc: "Кортизоловое тело и Art book", mod: "sand", art: "line-books.png", href: "books.html", tw: "252px", dw: "177px", meta: "Аудиоглава бесплатно" },
    { id: "libido", n: "04", title: "Либидо и питание", desc: "Связь тела, энергии и рациона", mod: "peach", art: "line-libido.png", href: "soon.html?s=libido", tw: "208px", dw: "210px", meta: "3 рецепта бесплатно" },
    { id: "bowls", n: "05", title: "Тибетские чаши и камертоны", desc: "Расслабление и восстановление", mod: "mint", art: "line-bowls.png", href: "soon.html?s=bowls", tw: "196px", dw: "164px", meta: "3 практики бесплатно" },
    { id: "fitness", n: "06", title: "Фитнес мышц тазового дна", desc: "Тонус и бережное укрепление", mod: "sky", art: "line-fitness.png", href: "soon.html?s=fitness", tw: "181px", dw: "210px", meta: "3 тренировки бесплатно" },
    { id: "birth", n: "07", title: "Мягкие роды", desc: "Подготовка и поддержка тела", mod: "violet", art: "line-birth.png", href: "soon.html?s=birth", tw: "300px", dw: "210px", meta: "3 материала бесплатно" },
    { id: "museum", n: "08", title: "Музей Кегеля", desc: "Бесплатная база знаний", mod: "mist", art: "line-museum.png", href: "soon.html?s=museum", tw: "300px", dw: "210px", meta: "Полностью бесплатно" }
  ];
  window.DIRECTIONS = DIRECTIONS;

  const G = { rose: "var(--g-rose)", lilac: "var(--g-lilac)", sand: "var(--g-sand)", peach: "var(--g-peach)", mint: "var(--g-mint)", sky: "var(--g-sky)", violet: "var(--g-violet)", mist: "var(--g-mist)" };
  const BD = { rose: "var(--b-rose)", lilac: "var(--b-lilac)", sand: "var(--b-sand)", peach: "var(--b-peach)", mint: "var(--b-mint)", sky: "var(--b-sky)", violet: "var(--b-violet)", mist: "var(--b-mist)" };

  const chevron = '<img class="chev" src="' + IMG + 'chevron.svg" alt="" aria-hidden="true">';
  const miniDir = (d, i) =>
    '<a class="mini-dir" href="' + d.href + '" style="--g:' + G[d.mod] + ';--bd:' + BD[d.mod] + (i !== undefined ? ";--i:" + i : "") + '">' +
    '<span class="mini-dir__num">' + d.n + "</span>" +
    '<span class="mini-dir__name">' + d.title + "</span>" +
    '<span class="mini-dir__meta">' + d.meta + "</span>" +
    '<img src="' + IMG + d.art + '" alt="" loading="lazy"></a>';

  const megaLink = (href, title, sub, mod, n) =>
    '<a class="mega-link" href="' + href + '" style="--g:' + G[mod] + '"><span class="mega-link__dot">' + n + "</span><span><b>" + title + "</b><small>" + sub + '</small></span><span class="arr">→</span></a>';

  /* ---------- header ---------- */
  const NAV = [
    { key: "dirs", label: "Направления", href: "directions.html" },
    { key: "books", label: "Книги", href: "books.html" },
    { key: "museum", label: "Музей Кегеля", href: "soon.html?s=museum" },
    { key: "about", label: "О центре", href: "index.html#about" },
    { key: "contacts", label: "Контакты", href: "index.html#contacts" }
  ];
  const activeKey = { directions: "dirs", bos: "dirs", books: "books", book: "books" }[page];

  const headerHTML =
    '<header class="site-header" id="top">' +
    '<div class="container header-bar">' +
    '<a class="logo" href="index.html" aria-label="Центр интимной эстетики — на главную">' +
    '<img src="' + IMG + 'logo.svg" alt="">' +
    '<span class="logo__text"><span>Центр интимной</span><span>эстетики</span></span></a>' +
    '<nav class="nav" aria-label="Основное меню">' +
    NAV.map((it) =>
      '<div class="nav__item" data-nav="' + it.key + '">' +
      '<a class="nav__link' + (activeKey === it.key ? " is-active" : "") + '" href="' + it.href + '"' +
      (it.key !== "contacts" ? ' aria-haspopup="true" aria-expanded="false"' : "") + ">" +
      it.label + (it.key !== "contacts" ? chevron : "") + "</a></div>"
    ).join("") +
    "</nav>" +
    '<div class="header-actions">' +
    '<button class="icon-btn" type="button" data-login aria-label="Личный кабинет"><span class="icon-user"></span></button>' +
    '<button class="btn btn--xs" type="button" data-login>Войти</button>' +
    '<button class="burger" type="button" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span></button>' +
    "</div></div>" +
    megaHTML() +
    "</header>" +
    '<div class="mega-backdrop"></div>' +
    mobileMenuHTML();

  function megaHTML() {
    const paid = DIRECTIONS.filter((d) => !["books", "museum"].includes(d.id));
    return (
      '<div class="mega" aria-hidden="true"><div class="mega__panel"><div class="container mega__inner">' +
      /* направления */
      '<div class="mega__section mega__section--dirs" data-mega="dirs">' +
      "<div>" +
      '<div class="mega__title"><h3>Выбери путь к себе</h3><a class="link-arrow" href="directions.html">Все направления <span class="arr">→</span></a></div>' +
      '<div class="mega-grid" data-stagger>' + DIRECTIONS.map((d) => miniDir(d)).join("") + "</div>" +
      "</div>" +
      '<div class="mega-promo" data-stagger>' +
      '<span class="badge-free">Free внутри каждого</span>' +
      '<div class="mega-promo__text"><div class="h-card">3 материала бесплатно</div><p>Попробуйте направление, прежде чем открыть доступ на месяц</p></div>' +
      '<img src="' + IMG + 'hero-main.png" alt="">' +
      '<a class="btn btn--sm" href="directions.html">Начать <span class="arr">→</span></a>' +
      "</div></div>" +
      /* книги */
      '<div class="mega__section mega__section--list" data-mega="books">' +
      '<div class="mega-intro" data-stagger><h3>Книги</h3><p>Авторские книги Екатерины Паньшиной. У каждой — бесплатная аудиоглава.</p><a class="btn btn--sm" href="books.html">Выбрать книгу <span class="arr">→</span></a></div>' +
      '<div class="mega-links" data-stagger>' +
      megaLink("book-cortisol.html", "Кортизоловое тело", "Методы снижения кортизола", "sky", "01") +
      megaLink("book-artbook.html", "Art book", "Эротических фантазий", "rose", "02") +
      megaLink("book-cortisol.html#audio", "Бесплатная аудиоглава", "Слушайте прямо на сайте", "violet", "03") +
      "</div>" +
      '<div class="mega-photo" style="--g:var(--g-sand)"><img src="' + IMG + 'book-cortisol.jpg" alt=""><span><b>Печатная + аудио</b>3 500 ₽ — заказ в один клик</span></div>' +
      "</div>" +
      /* музей */
      '<div class="mega__section mega__section--list" data-mega="museum">' +
      '<div class="mega-intro" data-stagger><h3>Музей Кегеля</h3><p>Бесплатная база знаний: тренажёры для мышц тазового дна, принцип их действия и рекомендации.</p><a class="btn btn--sm" href="soon.html?s=museum">Открыть музей <span class="arr">→</span></a></div>' +
      '<div class="mega-links" data-stagger>' +
      megaLink("soon.html?s=museum", "База знаний", "Статьи о мышцах тазового дна", "mist", "01") +
      megaLink("soon.html?s=museum", "Каталог тренажёров", "Фото, принцип действия, категории", "sky", "02") +
      megaLink("soon.html?s=museum", "Как выбрать тренажёр", "Рекомендации специалиста", "mint", "03") +
      "</div>" +
      '<div class="mega-photo" style="--g:var(--g-mist)"><img src="' + IMG + 'photo-06756.jpg" alt=""><span><b>Бесплатно</b>Вся экспертная база открыта</span></div>' +
      "</div>" +
      /* о центре */
      '<div class="mega__section mega__section--list" data-mega="about">' +
      '<div class="mega-intro" data-stagger><h3>О центре</h3><p>Отдельный кабинет, спокойная атмосфера и современное оборудование в Екатеринбурге.</p><a class="btn btn--sm" href="index.html#about">Узнать больше <span class="arr">→</span></a></div>' +
      '<div class="mega-links" data-stagger>' +
      megaLink("index.html#about", "Центр и пространство", "Кабинет, услуги, программы", "violet", "01") +
      megaLink("index.html#specialist", "О специалисте", "Екатерина Паньшина", "rose", "02") +
      megaLink("index.html#reviews", "Отзывы", "Истории клиенток", "lilac", "03") +
      "</div>" +
      '<div class="mega-photo" style="--g:var(--g-violet)"><img src="' + IMG + 'interior-3.jpg" alt=""><span><b>Приватность</b>Только вы и специалист</span></div>' +
      "</div>" +
      "</div></div></div>"
    );
  }

  function mobileMenuHTML() {
    let i = 0;
    const s = () => ' data-mstagger style="--i:' + i++ + '"';
    const acc = (title, body) =>
      '<div class="m-acc"' + s() + '><button class="m-acc__head" type="button" aria-expanded="false">' + title + '<span class="plus"></span></button><div class="m-acc__body"><div>' + body + "</div></div></div>";
    const list = (items) => '<div class="m-acc__list">' + items.map((a) => megaLink(a[0], a[1], a[2], a[3], a[4])).join("") + "</div>";
    return (
      '<div class="m-menu" aria-hidden="true"><span class="m-menu__blob m-menu__blob--1"></span><span class="m-menu__blob m-menu__blob--2"></span><div class="m-menu__scroll">' +
      acc("Направления", '<div class="m-dirs">' + DIRECTIONS.map((d) => miniDir(d)).join("") + "</div>") +
      acc("Книги", list([["books.html", "Все книги", "Выберите книгу", "sand", "01"], ["book-cortisol.html", "Кортизоловое тело", "Методы снижения кортизола", "sky", "02"], ["book-artbook.html", "Art book", "Эротических фантазий", "rose", "03"]])) +
      acc("Музей Кегеля", list([["soon.html?s=museum", "База знаний", "Статьи о мышцах тазового дна", "mist", "01"], ["soon.html?s=museum", "Каталог тренажёров", "Фото и принцип действия", "sky", "02"]])) +
      acc("О центре", list([["index.html#about", "Центр и пространство", "Кабинет, услуги, программы", "violet", "01"], ["index.html#specialist", "О специалисте", "Екатерина Паньшина", "rose", "02"], ["index.html#reviews", "Отзывы", "Истории клиенток", "lilac", "03"]])) +
      '<a class="m-link-plain" href="index.html#contacts"' + s() + ">Контакты</a>" +
      '<div class="m-menu__foot"' + s() + '><button class="btn" type="button" data-login>Войти в кабинет <span class="arr">→</span></button>' +
      '<div class="m-contacts"><a href="tel:+79030812616">+7 (903) 081-26-16</a><a href="#">Telegram</a><a href="#">WhatsApp</a></div></div>' +
      "</div></div>"
    );
  }

  const footerHTML =
    '<footer class="site-footer"><div class="container">' +
    '<div class="footer-grid">' +
    '<div class="footer-brand"><h4>Центр интимной эстетики</h4><p>Екатеринбург, ул. Онежская 4,<br>офис 238</p>' +
    '<div class="footer-socials"><a href="tel:+79030812616">+7 (903) 081-26-16</a><a href="#">Telegram</a><a href="#">WhatsApp</a></div></div>' +
    '<div class="footer-col"><h5>Направления</h5><ul>' +
    '<li><a href="bos.html">БОС-терапия</a></li><li><a href="soon.html?s=fitness">Тазовое дно</a></li><li><a href="soon.html?s=bowls">Тибетские чаши</a></li><li><a href="soon.html?s=libido">Либидо, питание и нутрициология</a></li><li><a href="soon.html?s=birth">Мягкие роды</a></li></ul></div>' +
    '<div class="footer-col"><h5>Платформа</h5><ul><li><a href="books.html">Книги</a></li><li><a href="soon.html?s=museum">Музей Кегеля</a></li><li><a href="index.html#about">О центре</a></li><li><a href="#" data-login>Личный кабинет</a></li></ul></div>' +
    '<div class="footer-col"><h5>Документы</h5><ul><li><a href="soon.html?s=docs">Оферта</a></li><li><a href="soon.html?s=docs">Политика</a></li><li><a href="soon.html?s=docs">Возврат</a></li><li><a href="soon.html?s=docs">Согласие на обработку данных</a></li></ul></div>' +
    "</div>" +
    '<div class="footer-bottom"><span>© 2026 Центр интимной эстетики</span><span>Материалы не заменяют консультацию врача</span></div>' +
    "</div></footer>";

  const modalHTML =
    '<div class="modal" id="login" role="dialog" aria-modal="true" aria-labelledby="login-title" aria-hidden="true">' +
    '<div class="modal__backdrop" data-close></div>' +
    '<div class="modal__card">' +
    '<img class="modal__flower" src="' + IMG + 'lotus-cut-1.png" alt="">' +
    '<button class="modal__close" type="button" data-close aria-label="Закрыть">×</button>' +
    '<h3 id="login-title">Вход<br>в кабинет</h3>' +
    "<p>Купленные направления, срок доступа и открытая библиотека материалов</p>" +
    '<form data-login-form><label class="field"><span>Телефон</span><input type="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel"></label>' +
    '<button class="btn" type="submit">Получить код <span class="arr">→</span></button></form>' +
    '<p class="modal__note">Нажимая кнопку, вы соглашаетесь с политикой обработки данных</p>' +
    "</div></div>";

  const headerSlot = document.querySelector("[data-header]");
  if (headerSlot) headerSlot.outerHTML = headerHTML;
  const footerSlot = document.querySelector("[data-footer]");
  if (footerSlot) footerSlot.outerHTML = footerHTML;
  const BOOKING_OPTIONS = [
    ["diag", "Первичная диагностика на аппарате БОС Callibri — 10 000 ₽"],
    ["training", "Тренировка мышц в центре — 7 000 ₽"],
    ["online", "Онлайн-консультация по мышцам тазового дна — 7 000 ₽"],
    ["sex", "Сексологические и психологические запросы — 5 000 ₽"],
    ["pack-base", "Пакет «Базовое здоровье» — 40 000 ₽"],
    ["pack-ext", "Пакет «Расширенный» — 60 000 ₽"],
    ["help", "Не знаю, помогите выбрать"]
  ];
  const bookingHTML =
    '<div class="modal modal--booking" id="booking" role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-hidden="true">' +
    '<div class="modal__backdrop" data-close></div>' +
    '<div class="modal__card">' +
    '<img class="modal__flower" src="' + IMG + 'lotus-cut-1.png" alt="">' +
    '<button class="modal__close" type="button" data-close aria-label="Закрыть">×</button>' +
    '<div class="booking__form-wrap">' +
    '<h3 id="booking-title">Запись<br>на диагностику</h3>' +
    "<p>Оставьте контакты — мы перезвоним, подберём удобное время и ответим на вопросы</p>" +
    '<form class="booking__form" data-booking-form novalidate>' +
    '<label class="field"><span>Имя</span><input name="name" type="text" autocomplete="given-name" placeholder="Как к вам обращаться" required></label>' +
    '<label class="field"><span>Телефон</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" required></label>' +
    '<label class="field"><span>Формат</span><select name="format">' +
    BOOKING_OPTIONS.map((o) => '<option value="' + o[0] + '">' + o[1] + "</option>").join("") +
    "</select></label>" +
    '<div class="field"><span>Как удобнее связаться</span><div class="seg">' +
    '<label><input type="radio" name="contact" value="call" checked><i>Звонок</i></label>' +
    '<label><input type="radio" name="contact" value="tg"><i>Telegram</i></label>' +
    '<label><input type="radio" name="contact" value="wa"><i>WhatsApp</i></label>' +
    "</div></div>" +
    '<label class="check"><input type="checkbox" name="agree" required><span>Соглашаюсь на обработку персональных данных</span></label>' +
    '<button class="btn" type="submit">Записаться <span class="arr">→</span></button>' +
    '<p class="booking__error" role="alert" hidden>Заполните имя, телефон и отметьте согласие</p>' +
    "</form></div>" +
    '<div class="booking__done" hidden><span class="bubble bubble--big" aria-hidden="true"></span><h3>Спасибо!</h3><p>Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p><button class="btn btn--ghost" type="button" data-close>Хорошо</button></div>' +
    "</div></div>";

  /* заказ книги: заявка уходит сообщением в WhatsApp на номер центра */
  const ORDER_PHONE = "79030812616";
  const orderHTML =
    '<div class="modal modal--booking" id="order" role="dialog" aria-modal="true" aria-labelledby="order-title" aria-hidden="true">' +
    '<div class="modal__backdrop" data-close></div>' +
    '<div class="modal__card">' +
    '<button class="modal__close" type="button" data-close aria-label="Закрыть">×</button>' +
    '<div class="booking__form-wrap">' +
    '<h3 id="order-title">Заказ книги</h3>' +
    '<p class="order__product" data-order-product></p>' +
    '<form class="booking__form" data-order-form novalidate>' +
    '<label class="field"><span>Имя</span><input name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться" required></label>' +
    '<label class="field"><span>Телефон</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" required></label>' +
    '<label class="field"><span>Город и адрес доставки</span><input name="address" type="text" autocomplete="street-address" placeholder="Можно уточнить позже"></label>' +
    '<label class="field"><span>Комментарий</span><input name="comment" type="text" placeholder="Например, подпись автора"></label>' +
    '<label class="check"><input type="checkbox" name="agree" required><span>Соглашаюсь на обработку персональных данных</span></label>' +
    '<button class="btn" type="submit">Отправить заявку <span class="arr">→</span></button>' +
    '<p class="booking__error" role="alert" hidden>Заполните имя, телефон и отметьте согласие</p>' +
    "</form></div>" +
    '<div class="booking__done" hidden><span class="bubble bubble--big" aria-hidden="true"></span><h3>Почти готово</h3>' +
    "<p>Мы открыли WhatsApp с вашей заявкой — нажмите «Отправить», и Екатерина свяжется с вами.</p>" +
    '<a class="btn" data-order-wa target="_blank" rel="noopener">Открыть WhatsApp <span class="arr">→</span></a>' +
    '<p class="modal__note">Не открылся WhatsApp? Позвоните: <a href="tel:+' + ORDER_PHONE + '">+7 (903) 081-26-16</a></p>' +
    "</div></div></div>";

  document.body.insertAdjacentHTML("beforeend", modalHTML + bookingHTML + orderHTML);

  /* ---------- карточки направлений ---------- */
  document.querySelectorAll("[data-dir-grid]").forEach((grid) => {
    grid.innerHTML = DIRECTIONS.map((d, i) =>
      '<a class="dir-card dir-card--' + d.mod + '" href="' + d.href + '" data-reveal style="--d:' + (0.06 * i).toFixed(2) + 's">' +
      '<img class="dir-card__art art-' + d.id + '" src="' + IMG + d.art + '" alt="" loading="lazy">' +
      '<span class="dir-card__num">' + d.n + "</span>" +
      '<h3 class="dir-card__title" style="max-width:' + d.tw + '">' + d.title + "</h3>" +
      '<p class="dir-card__desc" style="--dw:' + d.dw + '">' + d.desc + "</p>" +
      '<span class="dir-card__arr" aria-hidden="true">→</span></a>'
    ).join("");
  });

  /* ---------- шапка: скролл ---------- */
  const header = document.querySelector(".site-header");
  const onScrollHeader = () => header && header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScrollHeader();

  /* ---------- мега-меню ---------- */
  const mega = document.querySelector(".mega");
  const backdrop = document.querySelector(".mega-backdrop");
  let megaTimer = null;
  let currentMega = null;

  function openMega(key) {
    clearTimeout(megaTimer);
    if (!mega) return;
    const section = mega.querySelector('[data-mega="' + key + '"]');
    if (!section) return closeMega();
    if (currentMega !== key) {
      mega.querySelectorAll(".mega__section").forEach((s) => s.classList.toggle("is-active", s === section));
      document.querySelectorAll(".nav__item").forEach((n) => {
        const on = n.dataset.nav === key;
        n.classList.toggle("is-open", on);
        const link = n.querySelector(".nav__link");
        if (link.hasAttribute("aria-expanded")) link.setAttribute("aria-expanded", on);
      });
      if (mega.classList.contains("is-open")) { /* перезапуск каскада при переключении */
        mega.classList.remove("is-open"); void mega.offsetWidth;
      }
    }
    currentMega = key;
    mega.classList.add("is-open");
    mega.setAttribute("aria-hidden", "false");
    backdrop.classList.add("is-on");
  }
  function closeMega() {
    if (!mega) return;
    currentMega = null;
    mega.classList.remove("is-open");
    mega.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("is-on");
    document.querySelectorAll(".nav__item").forEach((n) => {
      n.classList.remove("is-open");
      const link = n.querySelector(".nav__link");
      if (link.hasAttribute("aria-expanded")) link.setAttribute("aria-expanded", "false");
    });
  }
  const scheduleClose = () => { clearTimeout(megaTimer); megaTimer = setTimeout(closeMega, 180); };

  document.querySelectorAll(".nav__item").forEach((item) => {
    const key = item.dataset.nav;
    item.addEventListener("mouseenter", () => (key === "contacts" ? scheduleClose() : openMega(key)));
    item.querySelector(".nav__link").addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " " || e.key === "ArrowDown") && key !== "contacts") {
        e.preventDefault();
        currentMega === key ? closeMega() : openMega(key);
      }
    });
  });
  if (header) header.addEventListener("mouseleave", scheduleClose);
  if (mega) mega.addEventListener("mouseenter", () => clearTimeout(megaTimer));
  if (backdrop) backdrop.addEventListener("click", closeMega);

  /* ---------- мобильное меню ---------- */
  const burger = document.querySelector(".burger");
  const mMenu = document.querySelector(".m-menu");
  function toggleMenu(force) {
    const open = typeof force === "boolean" ? force : !document.body.classList.contains("is-menu-open");
    document.body.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("is-locked", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    mMenu.setAttribute("aria-hidden", !open);
  }
  if (burger) burger.addEventListener("click", () => toggleMenu());
  document.querySelectorAll(".m-acc__head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const acc = btn.parentElement;
      const open = !acc.classList.contains("is-open");
      acc.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });
  if (mMenu) mMenu.addEventListener("click", (e) => { if (e.target.closest("a")) toggleMenu(false); });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- модальные окна: вход и запись ---------- */
  const modal = document.getElementById("login");
  const booking = document.getElementById("booking");
  let openedModal = null;
  let lastFocus = null;
  function openModal(el, focusSel) {
    lastFocus = document.activeElement;
    toggleMenu(false);
    closeMega();
    openedModal = el;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    setTimeout(() => { const f = el.querySelector(focusSel || "input"); if (f) f.focus(); }, 250);
  }
  function closeModal() {
    if (!openedModal) return;
    openedModal.classList.remove("is-open");
    openedModal.setAttribute("aria-hidden", "true");
    openedModal = null;
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }
  const order = document.getElementById("order");
  function openOrder(btn) {
    order.querySelector(".booking__form-wrap").hidden = false;
    order.querySelector(".booking__done").hidden = true;
    order.querySelector(".booking__error").hidden = true;
    order.dataset.product = btn.dataset.order;
    order.querySelector("[data-order-product]").textContent = btn.dataset.order;
    openModal(order);
  }
  function openBooking(format) {
    booking.querySelector(".booking__form-wrap").hidden = false;
    booking.querySelector(".booking__done").hidden = true;
    booking.querySelector(".booking__error").hidden = true;
    if (format) booking.querySelector('select[name="format"]').value = format;
    booking.querySelector("#booking-title").innerHTML = format && format.startsWith("pack") ? "Запись<br>на пакет" : format === "online" ? "Запись<br>на консультацию" : "Запись<br>на диагностику";
    openModal(booking);
  }
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-order]");
    if (o) { e.preventDefault(); openOrder(o); return; }
    const b = e.target.closest("[data-booking]");
    if (b) { e.preventDefault(); openBooking(b.dataset.booking); return; }
    const t = e.target.closest("[data-login]");
    if (t) { e.preventDefault(); openModal(modal); }
    if (e.target.closest("[data-close]")) closeModal();
  });
  modal.querySelector("[data-login-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.querySelector(".btn").innerHTML = "Код отправлен ✓";
  });

  /* маска телефона: +7 (999) 999-99-99 */
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener("input", () => {
      let d = input.value.replace(/\D/g, "");
      if (d.startsWith("8")) d = "7" + d.slice(1);
      if (!d.startsWith("7")) d = "7" + d;
      d = d.slice(0, 11);
      const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
      let out = "+7";
      if (p[0]) out += " (" + p[0];
      if (p[0].length === 3) out += ")";
      if (p[1]) out += " " + p[1];
      if (p[2]) out += "-" + p[2];
      if (p[3]) out += "-" + p[3];
      input.value = d.length > 1 ? out : "";
    });
  });

  booking.querySelector("[data-booking-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const ok = f.name.value.trim().length > 1 && f.phone.value.replace(/\D/g, "").length === 11 && f.agree.checked;
    f.querySelector(".booking__error").hidden = ok;
    f.querySelectorAll("input[required]").forEach((i) => {
      const bad = i.type === "checkbox" ? !i.checked : i.name === "phone" ? i.value.replace(/\D/g, "").length !== 11 : i.value.trim().length < 2;
      i.closest("label").classList.toggle("is-invalid", !ok && bad);
    });
    if (!ok) return;
    // TODO: подключить отправку заявки (CRM, Telegram-бот или почта)
    booking.querySelector(".booking__form-wrap").hidden = true;
    booking.querySelector(".booking__done").hidden = false;
    f.reset();
  });
  order.querySelector("[data-order-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const phoneOk = f.phone.value.replace(/\D/g, "").length === 11;
    const ok = f.name.value.trim().length > 1 && phoneOk && f.agree.checked;
    f.querySelector(".booking__error").hidden = ok;
    f.name.closest("label").classList.toggle("is-invalid", f.name.value.trim().length < 2);
    f.phone.closest("label").classList.toggle("is-invalid", !phoneOk);
    f.agree.closest("label").classList.toggle("is-invalid", !f.agree.checked);
    if (!ok) return;
    const text = [
      "Здравствуйте! Хочу заказать книгу.",
      "Заказ: " + order.dataset.product,
      "Имя: " + f.name.value.trim(),
      "Телефон: " + f.phone.value,
      f.address.value.trim() && "Доставка: " + f.address.value.trim(),
      f.comment.value.trim() && "Комментарий: " + f.comment.value.trim()
    ].filter(Boolean).join("\n");
    const url = "https://wa.me/" + ORDER_PHONE + "?text=" + encodeURIComponent(text);
    order.querySelector("[data-order-wa]").href = url;
    window.open(url, "_blank", "noopener");
    order.querySelector(".booking__form-wrap").hidden = true;
    order.querySelector(".booking__done").hidden = false;
    f.reset();
  });

  /* бесплатная аудиоглава: плеер включается, когда в data-audio-src есть ссылка */
  document.querySelectorAll("[data-audio]").forEach((card) => {
    const src = card.dataset.audioSrc;
    const btn = card.querySelector(".audio__play");
    const status = card.querySelector(".audio__status");
    if (!src) { card.classList.add("is-empty"); btn.disabled = true; return; }
    const audio = new Audio(src);
    audio.preload = "none";
    btn.addEventListener("click", () => (audio.paused ? audio.play() : audio.pause()));
    audio.addEventListener("play", () => { card.classList.add("is-playing"); btn.setAttribute("aria-label", "Пауза"); });
    audio.addEventListener("pause", () => { card.classList.remove("is-playing"); btn.setAttribute("aria-label", "Слушать"); });
    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      card.style.setProperty("--progress", (audio.currentTime / audio.duration) * 100 + "%");
      const t = Math.floor(audio.currentTime);
      status.textContent = Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (openedModal) closeModal();
    else if (document.body.classList.contains("is-menu-open")) toggleMenu(false);
    else closeMega();
  });

  /* ---------- вкладки ---------- */
  const mobileTabs = window.matchMedia("(max-width: 760px)");
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll(".tab")];
    const panels = [...root.querySelectorAll(".tab-panel")];
    const tabList = root.querySelector(".tabs");
    const panelsHome = root.querySelector(".tab-panels");

    /* на телефоне панель стоит сразу под своей вкладкой, остальные вкладки уходят ниже */
    const layout = () => {
      panels.forEach((p, i) => {
        if (mobileTabs.matches) tabs[i].after(p);
        else panelsHome.appendChild(p);
      });
    };
    layout();
    mobileTabs.addEventListener("change", layout);

    const select = (i, fromUser) => {
      tabs.forEach((t, j) => { t.classList.toggle("is-active", i === j); t.setAttribute("aria-selected", i === j); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => p.classList.toggle("is-active", i === j));
      if (fromUser && mobileTabs.matches) {
        const top = tabs[i].getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 12;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i, true));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
          tabs[n].focus(); select(n);
        }
      });
    });
    if (tabList) tabList.setAttribute("aria-orientation", "horizontal");
  });

  /* ---------- подсказка прокрутки для отзывов на телефоне ---------- */
  const swipeTrack = document.querySelector(".reviews-grid");
  if (swipeTrack && "IntersectionObserver" in window) {
    const nudge = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        nudge.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (swipeTrack.scrollWidth - swipeTrack.clientWidth < 40) return;
        swipeTrack.scrollTo({ left: 46, behavior: "smooth" });
        setTimeout(() => swipeTrack.scrollTo({ left: 0, behavior: "smooth" }), 700);
      });
    }, { threshold: .4 });
    nudge.observe(swipeTrack);
  }

  /* ---------- слайдер отзывов ---------- */
  document.querySelectorAll("[data-slider]").forEach((wrap) => {
    const track = wrap.querySelector(".reviews");
    wrap.querySelectorAll("[data-dir]").forEach((b) =>
      b.addEventListener("click", () => {
        const card = track.firstElementChild;
        const step = card ? card.getBoundingClientRect().width + 24 : 300;
        track.scrollBy({ left: step * Number(b.dataset.dir), behavior: "smooth" });
      })
    );
  });

  /* ---------- свет за курсором на плашках ---------- */
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".dir-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });

  /* ---------- появление при скролле ---------- */
  if (/[?&]static\b/.test(location.search)) document.documentElement.classList.add("is-static"); // режим для скриншотов
  const revealEls = document.querySelectorAll("[data-reveal], .split-line");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- параллакс и лёгкий отклик на курсор ---------- */
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  const pointerEls = [...document.querySelectorAll("[data-pointer]")];
  let px = 0, py = 0, ticking = false;
  function frame() {
    ticking = false;
    if (window.innerWidth < 1180) { /* на планшетах и телефонах без параллакса */
      parallax.concat(pointerEls).forEach((el) => (el.style.translate = ""));
      return;
    }
    const vh = window.innerHeight;
    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const k = parseFloat(el.dataset.parallax) || 0.1;
      const center = r.top + r.height / 2 - vh / 2;
      const pk = parseFloat(el.dataset.pointer || 0);
      el.style.translate = (px * pk).toFixed(1) + "px " + (-center * k + py * pk).toFixed(1) + "px";
    });
    pointerEls.forEach((el) => {
      if (el.hasAttribute("data-parallax")) return;
      const pk = parseFloat(el.dataset.pointer) || 8;
      el.style.translate = (px * pk).toFixed(1) + "px " + (py * pk).toFixed(1) + "px";
    });
  }
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  if (!reduce) {
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("pointermove", (e) => {
        px = e.clientX / window.innerWidth - 0.5;
        py = e.clientY / window.innerHeight - 0.5;
        request();
      }, { passive: true });
    }
    frame();
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- страница-заглушка ---------- */
  const soonTitle = document.querySelector("[data-soon-title]");
  if (soonTitle) {
    const s = new URLSearchParams(location.search).get("s");
    const d = DIRECTIONS.find((x) => x.id === s);
    const names = { docs: "Документы" };
    soonTitle.textContent = d ? d.title : names[s] || "Раздел";
    const art = document.querySelector("[data-soon-art]");
    if (d && art) { art.src = IMG + d.art; art.hidden = false; }
    const card = document.querySelector("[data-soon-card]");
    if (d && card) card.style.setProperty("--g", G[d.mod]);
  }
})();
