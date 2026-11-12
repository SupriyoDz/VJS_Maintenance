/* ==========================================================================
   Vedic Jagritii Sangam - Main JavaScript
   ========================================================================== */

/* ===== SITE CONFIGURATION ===== */
window.SITE_CONFIG = Object.assign(
  {
    anandamayeeLogoUrl: "",

    // Upcoming Programmes grid: link to a CSV file (see public/programmes.csv for the format).
    // Connected to live Google Sheet (published as CSV):
    programmesCsvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSMP2yAIWyluWnd1f7xDbhVGvIRiCUQO2slNDw4Ix8ZXCaeP-7nuUOA_a3J2KBLIPoPkhUh38t-qdV2/pub?output=csv",

    // true = hide rows whose date has already passed (only when the date can be read)
    hidePastProgrammes: true,

    // Real-time auto-refresh interval in minutes while the page stays open
    // (Set to 0 to disable background interval; tab focus refresh is always active)
    refreshIntervalMinutes: 5,
  },
  window.SITE_CONFIG || {}
);

/* ===== MAIN APPLICATION LOGIC ===== */
(function () {
        var $ = function (i) {
            return document.getElementById(i);
          },
          b = $("burger"),
          m = $("menu"),
          n = $("nav");
        var s = function () {
          if (n) n.classList.toggle("scrolled", window.scrollY > 8);
        };
        window.addEventListener("scroll", s, { passive: true });
        s();
        if (b && m) {
          b.addEventListener("click", function () {
            b.setAttribute("aria-expanded", m.classList.toggle("open"));
          });
        }
        var yr = $("yr");
        if (yr) yr.textContent = new Date().getFullYear();
        try {
          var se = JSON.parse(localStorage.getItem("vjs_session") || "null"),
            lg = document.querySelector(".nav-actions .btn-outline-dark");
          if (se && Date.now() - se.t < 432e5 && lg) {
            lg.textContent = "Logout";
            lg.title = "Signed in as " + se.name;
            lg.href = "#";
            lg.addEventListener("click", function (e) {
              e.preventDefault();
              localStorage.removeItem("vjs_session");
              location.href = "home.html";
            });
          }
        } catch (x) {}
        document.querySelectorAll("form.fm").forEach(function (f) {
          f.addEventListener("submit", function (e) {
            if (f.hasAttribute("data-custom")) return;
            e.preventDefault();
            var o = f.querySelector(".ok");
            o.classList.add("show");
            o.scrollIntoView({ block: "nearest", behavior: "smooth" });
            f.reset();
          });
        });

        const D_COORDS = [
          {
            id: 1,
            n: "Sourav Chatterjee",
            r: "Programme Coordinator",
            a: "Zone A",
            p: "+91 00000 00001",
            e: "sourav@example.org",
          },
          {
            id: 2,
            n: "Anita Mukherjee",
            r: "Health Coordinator",
            a: "Zone B",
            p: "+91 00000 00002",
            e: "anita@example.org",
          },
          {
            id: 3,
            n: "Debashis Roy",
            r: "Pujo Coordinator",
            a: "Zone A",
            p: "+91 00000 00003",
            e: "debashis@example.org",
          },
          {
            id: 4,
            n: "Mitali Ghosh",
            r: "Education Coordinator",
            a: "Zone C",
            p: "+91 00000 00004",
            e: "mitali@example.org",
          },
          {
            id: 5,
            n: "Rajesh Banerjee",
            r: "Seva Coordinator",
            a: "Zone B",
            p: "+91 00000 00005",
            e: "rajesh@example.org",
          },
        ];
        const D_PROGS = [];
        const MS = [
          "Oct 2026",
          "Nov 2026",
          "Dec 2026",
          "Jan 2027",
          "Feb 2027",
          "Mar 2027",
          "Apr 2027",
          "May 2027",
          "Jun 2027",
          "Jul 2027",
          "Aug 2027",
          "Sep 2027",
        ];
        const D_EV = [
          [0, "Sharad Navaratri Durga Puja", "pujo", "Date TBC"],
          [0, "Kojagari Lakshmi Puja", "pujo", "Date TBC"],
          [0, "Free Health Check-up Camp", "health", "24 Oct"],
          [1, "Kali Puja & Deepavali", "pujo", "8 Nov"],
          [1, "Annual Vedic Doot Meet", "meet", "Week 3"],
          [2, "Winter Blanket Seva Drive", "seva", "20 Dec"],
          [2, "Gita Study Circle Intensive", "education", "Week 4"],
          [3, "Makar Sankranti Seva", "seva", "14 Jan"],
          [3, "Republic Day Cultural Evening", "culture", "26 Jan"],
          [4, "Saraswati Puja", "pujo", "Date TBC"],
          [4, "Student Scholarship Day", "education", "Week 3"],
          [5, "Dol Jatra / Holi", "pujo", "Date TBC"],
          [5, "Free Health Camp", "health", "Week 2"],
          [6, "Poila Baisakh Celebration", "culture", "Mid Apr"],
          [6, "Ram Navami", "pujo", "Date TBC"],
          [7, "Summer Youth Camp", "education", "Week 2"],
          [8, "International Yoga Day", "health", "21 Jun"],
          [8, "Tree Plantation Seva", "seva", "Week 4"],
          [9, "Rath Yatra", "pujo", "Date TBC"],
          [9, "Guru Purnima", "pujo", "Date TBC"],
          [10, "Independence Day Seva", "seva", "15 Aug"],
          [10, "Janmashtami", "pujo", "Date TBC"],
          [11, "Teachers Day Honour", "education", "5 Sep"],
          [11, "Annual General Meeting", "meet", "Week 4"],
        ].map((a) => ({ mo: a[0], t: a[1], c: a[2], w: a[3] }));
        const D_PUJOS = [
          {
            d: "Oct",
            m: "2026",
            tag: "Main Festival",
            t: "Sharad Durga Puja",
            p: "Five days of Devi worship: daily aarti, anjali, sandhi puja, bhog and cultural evenings.",
            tm: "Daily, morning to night",
            v: "Vedic Jagritii Sangam Temple Hall",
            en: "Free",
            ad: "",
            co: 3,
            desc: "Five days of worship of Goddess Durga with the community. Each day brings morning puja, anjali, bhog for everyone and an evening aarti followed by cultural programmes. Exact dates are confirmed with the community closer to the festival.",
            ag: "Morning - Puja and anjali\nAfternoon - Bhog and prasad\nEvening - Sandhya aarti\nNight - Cultural programme",
            ex: "Dress code is traditional wear\nRegister early to reserve bhog\nVolunteers are welcome",
          },
          {
            d: "Oct",
            m: "2026",
            tag: "Lakshmi Puja",
            t: "Kojagari Lakshmi Puja",
            p: "A full-moon evening of prayers to Goddess Lakshmi for prosperity and wellbeing.",
            tm: "Evening",
            v: "Vedic Jagritii Sangam Temple Hall",
            en: "Free",
            ad: "",
            co: 3,
            desc: "A full-moon night dedicated to Goddess Lakshmi, with prayers, bhajans and prasad for all families who attend.",
            ag: "Evening - Lakshmi puja\nLater - Bhajans and aarti\nNight - Prasad",
            ex: "Bring a small offering if you wish\nOpen to all families",
          },
          {
            d: "Nov",
            m: "2026",
            tag: "Deepavali",
            t: "Kali Puja & Deepavali",
            p: "A night of lamps and mantras, welcoming light into every home.",
            tm: "Evening onwards",
            v: "Vedic Jagritii Sangam Temple Hall",
            en: "Free",
            ad: "",
            co: 3,
            desc: "A night of lamps, mantras and Kali Puja as we celebrate Deepavali together.",
            ag: "Evening - Lamp lighting\nNight - Kali Puja\nLate night - Aarti and prasad",
            ex: "Earthen lamps will be provided",
          },
          {
            d: "Feb",
            m: "2027",
            tag: "Vidya",
            t: "Saraswati Puja",
            p: "Blessings for learning and the arts, with special puja for children and students.",
            tm: "Morning",
            v: "Vedic Jagritii Sangam Temple Hall",
            en: "Free",
            ad: "",
            co: 3,
            desc: "Worship of Goddess Saraswati for learning and the arts, with a special puja for children and students.",
            ag: "Morning - Saraswati puja\nLater - Anjali for students\nAfternoon - Prasad",
            ex: "Children bring their books and pens for blessing\nOpen to all students",
          },
        ];
        let S = {};
        try {
          S = JSON.parse(localStorage.getItem("vjs_content") || "{}");
        } catch (e) {}
        const COORDS = S.coords || D_COORDS,
          PROGS = S.progs || D_PROGS,
          EV = S.ev || D_EV,
          PUJOS = S.pujos || D_PUJOS;
        let mx = Math.max(0, ...PROGS.map((p) => p.id || 0));
        PROGS.forEach((p) => {
          if (!p.id) p.id = ++mx;
        });
        [PUJOS, EV].forEach((a) => {
          let m = Math.max(0, ...a.map((x) => x.id || 0));
          a.forEach((x) => {
            if (!x.id) x.id = ++m;
          });
        });
        const esc = (x) =>
          String(x == null ? "" : x).replace(
            /[&<>"]/g,
            (c) =>
              ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
          );
        const CAT = {
          pujo: ["Pujo", "#7A1E2C"],
          seva: ["Seva", "#2E7D32"],
          education: ["Education", "#1565C0"],
          health: ["Health", "#C0392B"],
          culture: ["Culture", "#A87F10"],
          meet: ["Meeting", "#6A4C93"],
        };
        const ini = (n) =>
          n
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2);
        const SUP = "support@example.org";
      })();

/* ===== MOBILE SESSION / AUTH ===== */
(function () {
        try {
          var s = JSON.parse(localStorage.getItem("vjs_session") || "null"),
            l = document.getElementById("mlogin"),
            m = document.getElementById("menu");
          if (!s || !s.role || !l || !m) return;
          var a = s.role == "admin",
            li = document.createElement("li");
          li.innerHTML =
            '<a href="' +
            (a ? "master-admin.html" : "doot-report.html") +
            '">' +
            (a ? "Admin Dashboard" : "My Report") +
            "</a>";
          m.insertBefore(li, l.parentNode);
          l.textContent = "Logout";
          l.href = "home.html";
          l.addEventListener("click", function () {
            try {
              localStorage.removeItem("vjs_session");
            } catch (e) {}
          });
        } catch (e) {}
      })();

/* ===== LOGO CONFIGURATION HANDLER ===== */
/* Applies SITE_CONFIG logo URL(s) to every logo element; falls back to default if the link fails. */
      (function () {
        var url = (window.SITE_CONFIG || {}).anandamayeeLogoUrl;
        if (!url || !String(url).trim()) return;
        url = String(url).trim();
        document.querySelectorAll(".js-anandamayee-logo").forEach(function (el) {
          var fallback = el.getAttribute("href");
          var probe = new Image();
          probe.onload = function () {
            el.setAttribute("href", url);
          };
          probe.onerror = function () {
            el.setAttribute("href", fallback);
            console.warn("Anandamayee logo URL failed to load, using default:", url);
          };
          probe.src = url;
        });
      })();

/* ===== UPCOMING PROGRAMMES CAROUSEL & CSV LOADER ===== */
/* Upcoming programmes carousel: reads SITE_CONFIG.programmesCsvUrl, else the embedded CSV. */
      (function () {
        var cfg = window.SITE_CONFIG || {};
        var track = document.getElementById("programme-grid");
        var status = document.getElementById("programme-grid-status");
        var count = document.getElementById("programme-grid-count");
        var ctrl = document.getElementById("pg-ctrl");
        var btnPrev = document.getElementById("pg-prev");
        var btnNext = document.getElementById("pg-next");
        var btnToggle = document.getElementById("pg-toggle");
        var section = document.getElementById("programme-grid-section");
        if (!track) return;

        var INTERVAL = cfg.carouselIntervalMs || 3500; /* time between moves */
        var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
        var timer = null, hoverPause = false, userPaused = reduce;

        /* ---------- CSV ---------- */
        function parseCSV(text) {
          var rows = [], row = [], f = "", q = false, i, c;
          text = String(text).replace(/^\uFEFF/, "");
          for (i = 0; i < text.length; i++) {
            c = text[i];
            if (q) {
              if (c === '"') {
                if (text[i + 1] === '"') { f += '"'; i++; } else q = false;
              } else f += c;
            } else if (c === '"') q = true;
            else if (c === ",") { row.push(f); f = ""; }
            else if (c === "\n" || c === "\r") {
              if (c === "\r" && text[i + 1] === "\n") i++;
              row.push(f); f = ""; rows.push(row); row = [];
            } else f += c;
          }
          if (f !== "" || row.length) { row.push(f); rows.push(row); }
          return rows.filter(function (r) {
            return r.some(function (x) { return x.trim() !== ""; });
          });
        }
        var ALIAS = {
          date: ["date", "day", "when"],
          programme: ["programme", "program", "title", "event", "name"],
          time: ["time", "timing"],
          venue: ["venue", "location", "place"],
          coordinator: ["coordinator", "contact", "incharge"],
          category: ["category", "type", "tag"],
          link: ["link", "url", "details", "detailslink"],
          description: ["description", "desc", "about", "notes"]
        };
        function toObjects(rows) {
          if (!rows.length) return [];
          var heads = rows[0].map(function (h) {
            return h.toLowerCase().replace(/[^a-z0-9]/g, "");
          });
          var idx = {};
          Object.keys(ALIAS).forEach(function (k) {
            for (var a = 0; a < ALIAS[k].length; a++) {
              var p = heads.indexOf(ALIAS[k][a]);
              if (p > -1) { idx[k] = p; break; }
            }
          });
          return rows.slice(1).map(function (r) {
            var o = {};
            Object.keys(ALIAS).forEach(function (k) {
              o[k] = idx[k] > -1 ? (r[idx[k]] || "").trim() : "";
            });
            return o;
          });
        }

        /* ---------- helpers ---------- */
        function toDate(d) {
          d = (d || "").trim();
          var m = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.exec(d);
          if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
          var m2 = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/.exec(d);
          if (m2) return new Date(+m2[3], +m2[2] - 1, +m2[1]);
          var t = new Date(Date.parse(d));
          return isNaN(t.getTime()) ? null : t;
        }
        function safeLink(u) {
          u = (u || "").trim();
          return u && !/^(javascript|data|vbscript):/i.test(u) ? u : "";
        }
        function el(tag, cls, text) {
          var n = document.createElement(tag);
          if (cls) n.className = cls;
          if (text != null) n.textContent = text;
          return n;
        }

        /* ---------- render ---------- */
        function render(csvText) {
          var items = toObjects(parseCSV(csvText)).filter(function (o) {
            return o.programme || o.date;
          });
          if (cfg.hidePastProgrammes !== false) {
            var cut = Date.now() - 864e5;
            items = items.filter(function (o) {
              var t = toDate(o.date);
              return !t || t.getTime() >= cut;
            });
          }
          items.sort(function (a, b) {
            var x = toDate(a.date), y = toDate(b.date);
            return !x || !y ? 0 : x - y;
          });
          track.innerHTML = "";
          if (!items.length) {
            showEmpty("New programmes will be announced soon.");
            return;
          }
          status.hidden = true;
          items.forEach(function (o) {
            var card = el("article", "pg-card");
            var dt = toDate(o.date), band;
            if (dt) {
              band = el("div", "pg-date");
              band.appendChild(el("b", "", String(dt.getDate())));
              band.appendChild(
                el("span", "", dt.toLocaleString("en-GB", { month: "short" }) + " " + dt.getFullYear())
              );
            } else {
              band = el("div", "pg-date raw");
              band.appendChild(el("b", "", o.date || "Date to be announced"));
            }
            card.appendChild(band);
            var body = el("div", "pg-body");
            if (o.category) body.appendChild(el("span", "pg-tag", o.category));
            body.appendChild(el("h4", "", o.programme || "Programme"));
            if (o.description) body.appendChild(el("p", "pg-desc", o.description));
            var meta = el("div", "pg-meta");
            if (o.time) meta.appendChild(el("div", "", "\uD83D\uDD58 " + o.time));
            if (o.venue) meta.appendChild(el("div", "", "\uD83D\uDCCD " + o.venue));
            if (o.coordinator) meta.appendChild(el("div", "", "\uD83D\uDC64 " + o.coordinator));
            if (meta.children.length) body.appendChild(meta);
            var href = safeLink(o.link);
            card.appendChild(body);
            track.appendChild(card);
          });
          count.textContent = items.length + (items.length === 1 ? " programme" : " programmes");
          track.scrollLeft = 0;
          updateControls();
        }

        /* ---------- carousel movement ---------- */
        function canScroll() {
          return track.scrollWidth > track.clientWidth + 8;
        }
        function stepSize() {
          var c = track.firstElementChild;
          if (!c) return 0;
          var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
          return c.getBoundingClientRect().width + gap;
        }
        function move(dir) {
          if (!canScroll()) return;
          var max = track.scrollWidth - track.clientWidth;
          var cur = track.scrollLeft;
          if (dir > 0) {
            if (cur >= max - 4) track.scrollTo({ left: 0 });
            else track.scrollBy({ left: stepSize() });
          } else {
            if (cur <= 4) track.scrollTo({ left: max });
            else track.scrollBy({ left: -stepSize() });
          }
        }
        function tick() {
          if (!userPaused && !hoverPause && !document.hidden) move(1);
        }
        function setToggle() {
          btnToggle.innerHTML = userPaused ? "&#9654;" : "&#10074;&#10074;";
          btnToggle.setAttribute("aria-label", userPaused ? "Start auto-scroll" : "Pause auto-scroll");
        }
        function updateControls() {
          var moving = canScroll();
          btnPrev.style.display = btnNext.style.display = btnToggle.style.display = moving ? "" : "none";
          if (moving && !timer) timer = setInterval(tick, INTERVAL);
          if (!moving && timer) { clearInterval(timer); timer = null; }
          setToggle();
        }

        btnNext.addEventListener("click", function () { move(1); });
        btnPrev.addEventListener("click", function () { move(-1); });
        btnToggle.addEventListener("click", function () {
          userPaused = !userPaused;
          setToggle();
        });
        /* pause while the visitor is interacting with the carousel */
        section.addEventListener("mouseenter", function () { hoverPause = true; });
        section.addEventListener("mouseleave", function () { hoverPause = false; });
        section.addEventListener("focusin", function () { hoverPause = true; });
        section.addEventListener("focusout", function () { hoverPause = false; });
        section.addEventListener("touchstart", function () { hoverPause = true; }, { passive: true });
        section.addEventListener("touchend", function () {
          setTimeout(function () { hoverPause = false; }, 4000);
        }, { passive: true });
        track.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
        });
        window.addEventListener("resize", updateControls);

        /* ---------- load data ---------- */
        function showEmpty(message) {
          track.innerHTML = "";
          status.textContent = message || "New programmes will be announced soon.";
          status.hidden = false;
          if (count) count.textContent = "";
          if (ctrl) ctrl.style.display = "none";
        }

        function getFreshUrl(rawUrl) {
          // Append timestamp query parameter to bypass browser/CDN cache for real-time updates
          var sep = rawUrl.indexOf("?") === -1 ? "?" : "&";
          return rawUrl + sep + "_t=" + Date.now();
        }

        function loadProgrammes() {
          var currentCfg = window.SITE_CONFIG || cfg || {};
          var url = (currentCfg.programmesCsvUrl || "").trim();
          if (!url) {
            showEmpty("New programmes will be announced soon.");
            return;
          }

          fetch(getFreshUrl(url), { cache: "no-store" })
            .then(function (r) {
              if (!r.ok) throw new Error("HTTP " + r.status);
              return r.text();
            })
            .then(function (text) {
              if (!text || !text.trim()) {
                showEmpty("New programmes will be announced soon.");
                return;
              }
              render(text);
            })
            .catch(function (e) {
              console.warn("Programmes CSV could not be fetched:", e);
              showEmpty("New programmes will be announced soon.");
            });
        }

        // Initial load
        loadProgrammes();

        // Real-time tab re-focus check: refresh whenever user or admin switches back to this tab
        document.addEventListener("visibilitychange", function () {
          if (!document.hidden && (window.SITE_CONFIG || cfg).programmesCsvUrl) {
            loadProgrammes();
          }
        });

        // Periodic background refresh if refreshIntervalMinutes is configured
        var refreshMins = parseInt((window.SITE_CONFIG || cfg).refreshIntervalMinutes, 10);
        if (!isNaN(refreshMins) && refreshMins > 0) {
          setInterval(function () {
            if (!document.hidden && (window.SITE_CONFIG || cfg).programmesCsvUrl) {
              loadProgrammes();
            }
          }, refreshMins * 60 * 1000);
        }
      })();
