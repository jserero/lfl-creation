/* =========================================================
   LFL Création — Logique du site
   Nav · Panier (localStorage, avec options de taille) ·
   Rendu produits · Filtres · Fiche produit complète ·
   Animations · Toast
   ========================================================= */
(function () {
  "use strict";

  const STORE_KEY = "lfl_cart_v2";
  const CART_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.2l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.3L21 7H6"/></svg>';
  const euro = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
  const byId = (id) => PRODUCTS.find((p) => p.id === id);

  /* clé panier = id, ou "id|optIndex" si une taille est choisie */
  function keyOf(id, oi) { return (oi === null || oi === undefined) ? id : id + "|" + oi; }
  function resolve(key) {
    const parts = String(key).split("|");
    const p = byId(parts[0]);
    if (!p) return null;
    const oi = parts.length > 1 ? parseInt(parts[1], 10) : null;
    const opt = (p.options && oi !== null) ? p.options[oi] : null;
    return {
      p: p, oi: oi, opt: opt,
      price: opt ? opt.price : p.price,
      name: p.name,
      sizeLabel: opt ? opt.label : "",
      emoji: p.emoji, grad: p.grad, img: p.img
    };
  }

  /* ---------------- Panier state ---------------- */
  function loadCart() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
  function saveCart(c) { try { localStorage.setItem(STORE_KEY, JSON.stringify(c)); } catch (e) {} }
  let cart = loadCart();

  function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function cartTotal() {
    return Object.entries(cart).reduce((sum, [k, q]) => {
      const r = resolve(k); return r ? sum + r.price * q : sum;
    }, 0);
  }
  function addToCart(id, qty, oi) {
    qty = qty || 1;
    const key = keyOf(id, oi);
    cart[key] = (cart[key] || 0) + qty;
    saveCart(cart); syncUI();
    const r = resolve(key);
    if (r) toast("« " + r.name + (r.sizeLabel ? " · " + r.sizeLabel : "") + " » ajouté au panier");
  }
  function setQty(key, q) { if (q <= 0) delete cart[key]; else cart[key] = q; saveCart(cart); syncUI(); }
  function removeFromCart(key) { delete cart[key]; saveCart(cart); syncUI(); }

  /* ---------------- Commandes (démo, localStorage) ---------------- */
  const ORDERS_KEY = "lfl_orders_v1";
  function loadOrders() { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch (e) { return []; } }
  function saveOrders(o) { try { localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); } catch (e) {} }
  function placeOrder(customer) {
    const keys = Object.keys(cart); if (!keys.length) return null;
    const items = keys.map((k) => { const r = resolve(k); return { name: r.name, size: r.sizeLabel, qty: cart[k], price: r.price }; });
    const order = {
      id: "LFL-" + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      customer: customer, items: items, total: cartTotal(), status: "Nouvelle"
    };
    const all = loadOrders(); all.push(order); saveOrders(all);
    cart = {}; saveCart(cart); syncUI();
    return order;
  }
  function fmtDate(iso) { try { return new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch (e) { return iso; } }

  /* ---------------- Badge compteur ---------------- */
  function syncUI() {
    const n = cartCount();
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = n; el.classList.toggle("is-visible", n > 0);
    });
    renderDrawer(); renderCartPage();
  }

  /* ---------------- Drawer panier ---------------- */
  function renderDrawer() {
    const body = document.getElementById("drawerBody");
    const foot = document.getElementById("drawerFoot");
    if (!body) return;
    const keys = Object.keys(cart);
    if (!keys.length) {
      body.innerHTML = `<div class="drawer__empty"><div class="em">🧺</div><p>Votre panier est vide.<br>Laissez-vous tenter par nos créations&nbsp;!</p><a href="boutique.html" class="btn btn--green" style="margin-top:16px">Voir la boutique</a></div>`;
      if (foot) foot.style.display = "none";
      return;
    }
    body.innerHTML = keys.map((k) => {
      const r = resolve(k); if (!r) return "";
      return `<div class="cart-line">
        <div class="cart-line__img"><img src="${r.img}" alt="${r.name}" onerror="this.style.display='none'"></div>
        <div class="cart-line__info">
          <strong>${r.name}</strong>
          ${r.sizeLabel ? `<div class="cart-line__size">${r.sizeLabel}</div>` : ""}
          <div class="price">${euro(r.price)}</div>
          <div class="qty" data-key="${k}">
            <button data-act="dec" aria-label="Retirer un">−</button>
            <span>${cart[k]}</span>
            <button data-act="inc" aria-label="Ajouter un">+</button>
          </div>
        </div>
        <button class="cart-line__remove" data-remove="${k}">Retirer</button>
      </div>`;
    }).join("");
    if (foot) {
      foot.style.display = "block";
      foot.innerHTML = `<div class="drawer__total"><span>Total</span><span class="t">${euro(cartTotal())}</span></div>
        <a href="panier.html" class="btn btn--dark btn--block">Commander</a>
        <p style="text-align:center;font-size:.8rem;color:var(--muted);margin-top:12px">🚚 Livraison gratuite à Paris &amp; Île-de-France</p>`;
    }
  }

  function openDrawer() {
    document.getElementById("drawer")?.classList.add("is-open");
    document.getElementById("overlay")?.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    document.getElementById("drawer")?.classList.remove("is-open");
    document.getElementById("overlay")?.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
    t.innerHTML = `<span class="em">✓</span> ${msg}`;
    requestAnimationFrame(() => t.classList.add("is-show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-show"), 2600);
  }

  /* ---------------- Carte produit ---------------- */
  function productCard(p) {
    const badge = p.badge ? `<span class="product__badge ${p.badgeClass}">${p.badge}</span>` : "";
    const cta = p.options
      ? `<a class="btn btn--green btn--sm" href="produit.html?id=${p.id}">Choisir la taille</a>`
      : `<button class="add-icon" data-add="${p.id}" aria-label="Ajouter au panier" title="Ajouter au panier">${CART_SVG}</button><button class="btn btn--green btn--sm" data-buy="${p.id}">Commander</button>`;
    return `<article class="product reveal">
      <a class="product__media grad ${p.grad || ''}" data-emoji="${p.emoji}" href="produit.html?id=${p.id}">
        ${badge}
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.closest('.product__media').classList.add('img-missing')">
      </a>
      <div class="product__body">
        <span class="product__cat">${p.cat}</span>
        <a href="produit.html?id=${p.id}"><h3 class="product__name">${p.name}</h3></a>
        <span class="product__meta">${p.cat === "Jus" ? p.people : "Pour " + p.people}</span>
        <p class="product__desc">${p.short}</p>
        <div class="product__foot">
          <div class="product__price">${p.from ? '<small>dès </small>' : ''}${euro(p.price)}</div>
        </div>
        <div class="product__actions">${cta}</div>
      </div>
    </article>`;
  }

  function renderProducts(container, list) { container.innerHTML = list.map(productCard).join(""); observeReveals(container); }
  function initHomeProducts() {
    const el = document.getElementById("homeProducts");
    if (el) renderProducts(el, PRODUCTS.slice(0, 8));
    const cor = document.getElementById("homeCorbeilles");
    if (cor) renderProducts(cor, PRODUCTS.filter((p) => p.cat === "Corbeilles").slice(0, 8));
  }

  function initShop() {
    const grid = document.getElementById("shopProducts");
    const filters = document.getElementById("shopFilters");
    if (!grid) return;
    let active = "Tout";
    const urlCat = new URLSearchParams(location.search).get("cat");
    if (urlCat && CATEGORIES.indexOf(urlCat) !== -1) active = urlCat;
    if (filters) {
      filters.innerHTML = CATEGORIES.map((c) => `<button class="chip ${c === active ? "is-active" : ""}" data-cat="${c}">${c}</button>`).join("");
      filters.addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        active = b.dataset.cat;
        filters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === b));
        draw();
      });
    }
    function draw() { renderProducts(grid, active === "Tout" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active)); }
    draw();
  }

  /* ---------------- Fiche produit ---------------- */
  function initProductPage() {
    const root = document.getElementById("productDetail");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const p = byId(id) || PRODUCTS[0];
    document.title = `${p.name} — LFL Création`;
    let sel = p.options ? 0 : null;

    const sizeBlock = p.options ? `
      <div class="pd__sizes">
        <span class="pd__label">Taille</span>
        <div class="pd__size-opts" id="pdSizes">
          ${p.options.map((o, i) => `<button class="pd__size ${i === 0 ? 'is-active' : ''}" data-oi="${i}">
            <span class="s-lbl">${o.label}</span><span class="s-prc">${euro(o.price)}</span>
          </button>`).join("")}
        </div>
      </div>` : "";

    const startPrice = p.options ? p.options[0].price : p.price;

    root.innerHTML = `
      <div class="pd">
        <div class="pd__media">
          <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">
        </div>
        <div>
          <div class="breadcrumb"><a href="boutique.html">Boutique</a> · ${p.cat}</div>
          <span class="pd__cat">${p.cat}</span>
          <h1>${p.name}</h1>
          <p class="pd__lead">${p.short}</p>
          <div class="pd__price" id="pdPrice">${euro(startPrice)} <span class="pd__unit">· ${p.people}</span></div>
          <p class="pd__desc">${p.desc}</p>
          ${sizeBlock}
          <div class="pd__specs">
            <div class="pd__spec"><span class="l">Pour</span><span class="v">${p.people}</span></div>
            <div class="pd__spec"><span class="l">Occasions</span><span class="v">${p.occasions.join(" · ")}</span></div>
            <div class="pd__spec"><span class="l">Livraison</span><span class="v">${p.delai}</span></div>
          </div>
          <div class="pd__compo">
            <span class="pd__label">Composition</span>
            <ul class="pd__list">${p.inside.map((i) => `<li><span class="ck">✓</span> ${i}</li>`).join("")}</ul>
          </div>
          ${p.conseil ? `<div class="pd__note"><strong>Bon à savoir</strong><p>${p.conseil}</p></div>` : ""}
          <div class="pd__buy">
            <div class="qty" id="pdQty" data-q="1"><button data-act="dec">−</button><span>1</span><button data-act="inc">+</button></div>
            <button class="btn btn--dark" id="pdAdd">${CART_SVG} Ajouter au panier</button>
            <button class="btn btn--green" id="pdBuy">Commander</button>
          </div>
          <a class="pd__deliv" href="index.html#livraison">🚚 <strong>Livraison à domicile</strong> — gratuite à Paris &amp; Île-de-France</a>
          <p class="pd__reassure">🚚 Livraison gratuite à Paris &amp; Île-de-France · 🍓 100 % frais Rungis · 💚 Sans sucre ajouté</p>
        </div>
      </div>`;

    const priceEl = document.getElementById("pdPrice");
    function refreshPrice() {
      const pr = p.options ? p.options[sel].price : p.price;
      priceEl.innerHTML = `${euro(pr)} <span class="pd__unit">· ${p.options ? p.options[sel].label : p.people}</span>`;
    }
    const sizes = document.getElementById("pdSizes");
    if (sizes) {
      sizes.addEventListener("click", (e) => {
        const b = e.target.closest(".pd__size"); if (!b) return;
        sel = parseInt(b.dataset.oi, 10);
        sizes.querySelectorAll(".pd__size").forEach((x) => x.classList.toggle("is-active", x === b));
        refreshPrice();
      });
    }
    const qtyEl = document.getElementById("pdQty");
    qtyEl.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      let q = parseInt(qtyEl.dataset.q, 10);
      q = b.dataset.act === "inc" ? q + 1 : Math.max(1, q - 1);
      qtyEl.dataset.q = q; qtyEl.querySelector("span").textContent = q;
    });
    document.getElementById("pdAdd").addEventListener("click", () => {
      addToCart(p.id, parseInt(qtyEl.dataset.q, 10), sel);
      openDrawer();
    });
    document.getElementById("pdBuy").addEventListener("click", () => {
      addToCart(p.id, parseInt(qtyEl.dataset.q, 10), sel);
      location.href = "panier.html";
    });

    const rel = document.getElementById("relatedProducts");
    if (rel) renderProducts(rel, PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat).concat(PRODUCTS.filter((x) => x.cat !== p.cat)).slice(0, 4));
  }

  /* ---------------- Page panier ---------------- */
  function renderCartPage() {
    const root = document.getElementById("cartPage");
    if (!root) return;
    const keys = Object.keys(cart);
    if (!keys.length) {
      root.innerHTML = `<div class="drawer__empty" style="padding:80px 0"><div class="em" style="font-size:3.4rem">🧺</div>
        <h2 style="margin:14px 0 6px">Votre panier est vide</h2>
        <p>Découvrez nos corbeilles, créations et jus.</p>
        <a href="boutique.html" class="btn btn--green" style="margin-top:20px">Voir la boutique</a></div>`;
      return;
    }
    const lines = keys.map((k) => {
      const r = resolve(k); const q = cart[k];
      return `<div class="cart-line" style="align-items:center">
        <div class="cart-line__img" style="width:64px;height:64px"><img src="${r.img}" alt="${r.name}" onerror="this.style.display='none'"></div>
        <div class="cart-line__info">
          <strong style="font-size:1.15rem">${r.name}</strong>
          <div class="price">${euro(r.price)}${r.sizeLabel ? " · " + r.sizeLabel : ""}</div>
          <div class="qty" data-key="${k}"><button data-act="dec">−</button><span>${q}</span><button data-act="inc">+</button></div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-display);font-weight:800;font-size:1.2rem">${euro(r.price * q)}</div>
          <button class="cart-line__remove" data-remove="${k}">Retirer</button>
        </div>
      </div>`;
    }).join("");
    const total = cartTotal();
    root.innerHTML = `
      <div class="cart-layout">
        <div>${lines}</div>
        <aside style="background:var(--ivory-2);border-radius:var(--radius);padding:28px;align-self:start">
          <h3 style="font-size:1.4rem;margin-bottom:18px">Récapitulatif</h3>
          <div style="display:flex;justify-content:space-between;margin-bottom:10px"><span>Sous-total</span><strong>${euro(total)}</strong></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:10px;color:var(--muted)"><span>Livraison</span><span>Offerte 🎉</span></div>
          <div style="border-top:1px solid var(--line);margin:16px 0;padding-top:16px;display:flex;justify-content:space-between;align-items:baseline">
            <span>Total</span><span style="font-family:var(--font-display);font-size:1.7rem;font-weight:800">${euro(total)}</span></div>
          <button class="btn btn--green btn--block" id="checkoutBtn">Passer la commande</button>
          <p style="font-size:.82rem;color:var(--muted);margin-top:12px;text-align:center">🚚 Livraison gratuite à Paris &amp; Île-de-France</p>
        </aside>
      </div>
      <form id="checkoutForm" class="checkout" style="display:none">
        <h3 style="font-size:1.5rem;margin-bottom:6px">Vos informations de livraison</h3>
        <p class="section-lead" style="margin:0 0 18px">Nous vous recontactons pour confirmer le créneau. Paiement à la livraison ou sur devis.</p>
        <div class="checkout__grid">
          <div class="field"><label>Nom complet</label><input name="name" type="text" required placeholder="Votre nom"></div>
          <div class="field"><label>Téléphone</label><input name="phone" type="tel" required placeholder="06 12 34 56 78"></div>
          <div class="field"><label>E-mail</label><input name="email" type="email" required placeholder="vous@exemple.fr"></div>
          <div class="field"><label>Date de livraison souhaitée</label><input name="date" type="date"></div>
          <div class="field field--full"><label>Adresse de livraison</label><input name="address" type="text" required placeholder="N°, rue, code postal, ville"></div>
          <div class="field field--full"><label>Message (optionnel)</label><textarea name="note" rows="3" placeholder="Précisions, occasion…"></textarea></div>
        </div>
        <button class="btn btn--green btn--block" type="submit" style="margin-top:8px">Confirmer ma commande</button>
      </form>`;
    document.getElementById("checkoutBtn")?.addEventListener("click", () => {
      const f = document.getElementById("checkoutForm");
      f.style.display = "block";
      f.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("checkoutForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const order = placeOrder({
        name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"),
        date: fd.get("date"), address: fd.get("address"), note: fd.get("note")
      });
      if (!order) return;
      root.innerHTML = `<div class="drawer__empty" style="padding:70px 0">
        <div class="em" style="font-size:3.4rem">✅</div>
        <h2 style="margin:14px 0 6px">Merci ${order.customer.name.split(" ")[0] || ""} !</h2>
        <p>Votre commande <strong>${order.id}</strong> (${euro(order.total)}) est enregistrée.<br>Nous vous recontactons au ${order.customer.phone} pour confirmer la livraison.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:22px">
          <a href="compte.html#commandes" class="btn btn--green">Voir mes commandes</a>
          <a href="boutique.html" class="btn btn--ghost">Continuer mes achats</a>
        </div></div>`;
    });
    const cu = currentUser();
    const cf = document.getElementById("checkoutForm");
    if (cu && cf) { cf.name.value = cu.name || ""; cf.email.value = cu.email || ""; cf.phone.value = cu.phone || ""; cf.address.value = cu.address || ""; }
  }

  /* ---------------- Comptes clients (démo, localStorage) ---------------- */
  const USERS_KEY = "lfl_users_v1", SESSION_KEY = "lfl_session";
  function loadUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch (e) { return {}; } }
  function saveUsers(u) { try { localStorage.setItem(USERS_KEY, JSON.stringify(u)); } catch (e) {} }
  function currentUser() {
    let e = ""; try { e = localStorage.getItem(SESSION_KEY) || ""; } catch (x) {}
    const u = loadUsers(); e = e.toLowerCase();
    return (e && u[e]) ? Object.assign({ email: e }, u[e]) : null;
  }
  function logout() { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} renderAccount(); toast("Vous êtes déconnecté·e."); }

  function renderAccount() {
    const authEl = document.getElementById("accountAuth");
    const ordEl = document.getElementById("accountOrders");
    if (!authEl && !ordEl) return;
    const user = currentUser();

    if (authEl) {
      if (user) {
        authEl.innerHTML = `
          <div class="acc-panel">
            <div class="acc-hello">
              <div><span class="eyebrow" style="justify-content:flex-start">Connecté·e</span><h3 style="font-size:1.5rem">Bonjour ${user.name || user.email} 👋</h3><p style="color:var(--muted)">${user.email}</p></div>
              <button class="btn btn--ghost btn--sm" id="accLogout">Se déconnecter</button>
            </div>
            <form id="accDetails" class="acc-form">
              <div class="field"><label>Nom complet</label><input name="name" type="text" value="${user.name || ''}" placeholder="Votre nom"></div>
              <div class="field"><label>Téléphone</label><input name="phone" type="tel" value="${user.phone || ''}" placeholder="06 12 34 56 78"></div>
              <div class="field field--full"><label>Adresse de livraison</label><input name="address" type="text" value="${user.address || ''}" placeholder="N°, rue, code postal, ville"></div>
              <button class="btn btn--dark" type="submit">Enregistrer mes informations</button>
            </form>
          </div>`;
        authEl.querySelector("#accLogout").addEventListener("click", logout);
        authEl.querySelector("#accDetails").addEventListener("submit", (e) => {
          e.preventDefault(); const fd = new FormData(e.target); const u = loadUsers();
          u[user.email] = Object.assign({}, u[user.email], { name: fd.get("name"), phone: fd.get("phone"), address: fd.get("address") });
          saveUsers(u); toast("Informations enregistrées ✓"); renderAccount();
        });
      } else {
        authEl.innerHTML = `
          <div class="acc-grid">
            <div class="acc-card">
              <h3>Se connecter</h3>
              <form id="accLogin">
                <div class="field"><label>E-mail</label><input name="email" type="email" required placeholder="vous@exemple.fr"></div>
                <div class="field"><label>Mot de passe</label><input name="password" type="password" required placeholder="Votre mot de passe"></div>
                <button class="btn btn--green btn--block" type="submit">Se connecter</button>
              </form>
            </div>
            <div class="acc-card">
              <h3>Créer un compte</h3>
              <form id="accRegister">
                <div class="field"><label>Nom complet</label><input name="name" type="text" required placeholder="Votre nom"></div>
                <div class="field"><label>E-mail</label><input name="email" type="email" required placeholder="vous@exemple.fr"></div>
                <div class="field"><label>Mot de passe</label><input name="password" type="password" required minlength="4" placeholder="Choisissez un mot de passe"></div>
                <div class="field"><label>Confirmer le mot de passe</label><input name="confirm" type="password" required placeholder="Confirmez"></div>
                <button class="btn btn--dark btn--block" type="submit">Créer mon compte</button>
              </form>
            </div>
          </div>`;
        authEl.querySelector("#accLogin").addEventListener("submit", (e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          const email = (fd.get("email") || "").toLowerCase(); const u = loadUsers();
          if (u[email] && u[email].password === fd.get("password")) {
            try { localStorage.setItem(SESSION_KEY, email); } catch (x) {}
            toast("Bienvenue " + (u[email].name || "") + " !"); renderAccount();
          } else { toast("E-mail ou mot de passe incorrect."); }
        });
        authEl.querySelector("#accRegister").addEventListener("submit", (e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          const email = (fd.get("email") || "").toLowerCase(); const u = loadUsers();
          if (fd.get("password") !== fd.get("confirm")) { toast("Les mots de passe ne correspondent pas."); return; }
          if (u[email]) { toast("Un compte existe déjà avec cet e-mail. Connectez-vous."); return; }
          u[email] = { name: fd.get("name"), password: fd.get("password"), phone: "", address: "" };
          saveUsers(u); try { localStorage.setItem(SESSION_KEY, email); } catch (x) {}
          toast("Compte créé, bienvenue !"); renderAccount();
        });
      }
    }

    if (ordEl) {
      let orders = loadOrders().slice().reverse();
      if (user) orders = orders.filter((o) => (o.customer.email || "").toLowerCase() === user.email);
      if (!orders.length) {
        ordEl.innerHTML = `<div class="acc-empty"><p>${user ? "Vous n'avez pas encore de commande." : "Connectez-vous pour retrouver vos commandes, ou passez commande."}</p><a href="boutique.html" class="btn btn--green" style="margin-top:14px">Découvrir la boutique</a></div>`;
      } else {
        ordEl.innerHTML = orders.map((o) => `<div class="order-card">
          <div class="order-card__head">
            <div><strong>${o.id}</strong><span class="order-date">${fmtDate(o.date)}</span></div>
            <div class="order-card__meta"><span class="order-status">${o.status}</span><span class="order-total">${euro(o.total)}</span></div>
          </div>
          <ul class="order-items">${o.items.map((i) => `<li>${i.qty} × ${i.name}${i.size ? " · " + i.size : ""} <span>${euro(i.price * i.qty)}</span></li>`).join("")}</ul>
        </div>`).join("");
      }
    }
  }

  /* ---------------- Admin : espace propriétaire (démo) ---------------- */
  function renderAdmin() {
    const app = document.getElementById("adminApp");
    if (!app) return;
    const PASS = "lfl2024"; // démo — à remplacer par une vraie authentification serveur
    function gate() {
      app.innerHTML = `<div class="admin-gate">
        <div class="ic" style="font-size:2rem">🔒</div>
        <h2 style="margin:10px 0 4px">Espace propriétaire</h2>
        <p class="section-lead" style="margin:0 auto 18px">Réservé à La Ferme de Longchamp. Saisissez le mot de passe.</p>
        <form id="adminLogin" style="max-width:320px;margin:0 auto">
          <div class="field"><input type="password" id="adminPass" placeholder="Mot de passe" required></div>
          <button class="btn btn--dark btn--block" type="submit">Se connecter</button>
          <p style="font-size:.78rem;color:var(--muted);margin-top:10px">Démo : mot de passe <strong>lfl2024</strong></p>
        </form>
      </div>`;
      document.getElementById("adminLogin").addEventListener("submit", (e) => {
        e.preventDefault();
        if (document.getElementById("adminPass").value === PASS) { sessionStorage.setItem("lfl_admin", "1"); dash(); }
        else toast("Mot de passe incorrect");
      });
    }
    function dash() {
      const orders = loadOrders().slice().reverse();
      const ca = orders.reduce((s, o) => s + o.total, 0);
      const rows = orders.length ? orders.map((o) => `<tr>
        <td><strong>${o.id}</strong></td>
        <td>${fmtDate(o.date)}</td>
        <td>${o.customer.name}<br><span class="muted">${o.customer.phone}</span></td>
        <td>${o.customer.address || ""}</td>
        <td>${o.items.map((i) => i.qty + "× " + i.name + (i.size ? " (" + i.size + ")" : "")).join("<br>")}</td>
        <td><strong>${euro(o.total)}</strong></td>
      </tr>`).join("") : `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px">Aucune commande pour l'instant.</td></tr>`;
      app.innerHTML = `
        <div class="admin-stats">
          <div class="stat"><span class="stat__n">${orders.length}</span><span class="stat__l">Commandes</span></div>
          <div class="stat"><span class="stat__n">${euro(ca)}</span><span class="stat__l">Chiffre d'affaires</span></div>
          <div class="stat"><span class="stat__n">${orders.filter((o) => o.status === "Nouvelle").length}</span><span class="stat__l">À traiter</span></div>
          <button class="btn btn--ghost btn--sm" id="adminLogout" style="align-self:center">Se déconnecter</button>
        </div>
        <div class="admin-table-wrap"><table class="admin-table">
          <thead><tr><th>N°</th><th>Date</th><th>Client</th><th>Adresse</th><th>Articles</th><th>Total</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
        <p style="font-size:.8rem;color:var(--muted);margin-top:16px">⚠️ Démo : les commandes sont stockées dans ce navigateur. Pour un vrai suivi multi-clients, il faut connecter un serveur/base de données.</p>`;
      document.getElementById("adminLogout").addEventListener("click", () => { sessionStorage.removeItem("lfl_admin"); gate(); });
    }
    if (sessionStorage.getItem("lfl_admin") === "1") dash(); else gate();
  }

  /* ---------------- Reveal ---------------- */
  let io;
  function observeReveals(scope) {
    if (!("IntersectionObserver" in window)) { (scope || document).querySelectorAll(".reveal").forEach((e) => e.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    (scope || document).querySelectorAll(".reveal:not(.in)").forEach((e) => io.observe(e));
  }

  /* ---------------- Clics globaux ---------------- */
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) { addToCart(add.dataset.add); openDrawer(); return; }
    const buy = e.target.closest("[data-buy]");
    if (buy) { addToCart(buy.dataset.buy); location.href = "panier.html"; return; }
    const remove = e.target.closest("[data-remove]");
    if (remove) { removeFromCart(remove.dataset.remove); return; }
    const qtyBtn = e.target.closest(".qty [data-act]");
    if (qtyBtn && qtyBtn.closest("[data-key]")) {
      const wrap = qtyBtn.closest("[data-key]"); const key = wrap.dataset.key; const cur = cart[key] || 0;
      setQty(key, qtyBtn.dataset.act === "inc" ? cur + 1 : cur - 1); return;
    }
    if (e.target.closest("[data-open-cart]")) { e.preventDefault(); openDrawer(); return; }
    if (e.target.closest("[data-close-cart]") || e.target.id === "overlay") { closeDrawer(); return; }
  });

  /* ---------------- Nav mobile ---------------- */
  function initNav() {
    const toggle = document.querySelector(".nav__toggle");
    const links = document.querySelector(".nav__links");
    toggle?.addEventListener("click", () => links?.classList.toggle("is-open"));
    const page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__links a").forEach((a) => { if (a.getAttribute("href") === page) a.classList.add("is-active"); });
  }

  /* ---------------- Formulaires (démo) ---------------- */
  function initForms() {
    document.querySelectorAll("form[data-newsletter]").forEach((f) => f.addEventListener("submit", (e) => { e.preventDefault(); f.reset(); toast("Merci ! Vous êtes inscrit·e à notre newsletter."); }));
    document.querySelectorAll("form[data-contact]").forEach((f) => f.addEventListener("submit", (e) => { e.preventDefault(); f.reset(); toast("Message envoyé ! Nous vous répondrons vite. (démo)"); }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav(); initHomeProducts(); initShop(); initProductPage(); initForms();
    renderAccount(); renderAdmin();
    observeReveals(document); syncUI();
  });

  window.LFL = { addToCart, openDrawer, closeDrawer };
})();

/* ---------- Bouton WhatsApp flottant (toutes les pages) ---------- */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var a = document.createElement("a");
    a.href = "https://wa.me/33769694462";
    a.target = "_blank"; a.rel = "noopener noreferrer";
    a.className = "wa-float"; a.setAttribute("aria-label", "Contacter LFL sur WhatsApp"); a.title = "WhatsApp";
    a.innerHTML = '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 .6A15.4 15.4 0 0 0 2.8 24.1L.6 31.4l7.5-2A15.4 15.4 0 1 0 16 .6zm0 28.1c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.4 1.2 1.2-4.3-.3-.5A12.6 12.6 0 1 1 16 28.7zm7-9.4c-.4-.2-2.3-1.1-2.6-1.3-.3-.1-.6-.2-.9.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.9-2-1.2-2.8-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4z"/></svg>';
    document.body.appendChild(a);
  });
})();
