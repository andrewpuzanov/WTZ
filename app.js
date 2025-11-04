const APP_VERSION = "v1.9.228";
/* World Time Zones v1.9.228 */
const LOCAL_TZ = (Intl.DateTimeFormat().resolvedOptions().timeZone) || 'UTC';
(() => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const CITY_TZ = {
        "New York, USA": "America/New_York",
        "Los Angeles, USA": "America/Los_Angeles",
        "Chicago, USA": "America/Chicago",
        "Denver, USA": "America/Denver",
        "Toronto, Canada": "America/Toronto",
        "Vancouver, Canada": "America/Vancouver",
        "Mexico City, Mexico": "America/Mexico_City",

        "London, UK": "Europe/London",
        "Dublin, Ireland": "Europe/Dublin",
        "Lisbon, Portugal": "Europe/Lisbon",
        "Madrid, Spain": "Europe/Madrid",
        "Paris, France": "Europe/Paris",
        "Berlin, Germany": "Europe/Berlin",
        "Rome, Italy": "Europe/Rome",
        "Zurich, Switzerland": "Europe/Zurich",
        "Stockholm, Sweden": "Europe/Stockholm",
        "Oslo, Norway": "Europe/Oslo",
        "Copenhagen, Denmark": "Europe/Copenhagen",
        "Warsaw, Poland": "Europe/Warsaw",
        "Bucharest, Romania": "Europe/Bucharest",
        "Athens, Greece": "Europe/Athens",
        "Helsinki, Finland": "Europe/Helsinki",
        "Istanbul, Türkiye": "Europe/Istanbul",
        "Moscow, Russia": "Europe/Moscow",

        "Dubai, UAE": "Asia/Dubai",
        "Tel Aviv, Israel": "Asia/Jerusalem",
        "Riyadh, Saudi Arabia": "Asia/Riyadh",
        "Tehran, Iran": "Asia/Tehran",
        "Karachi, Pakistan": "Asia/Karachi",
        "Mumbai, India": "Asia/Kolkata",
        "New Delhi, India": "Asia/Kolkata",
        "Dhaka, Bangladesh": "Asia/Dhaka",
        "Bangkok, Thailand": "Asia/Bangkok",
        "Jakarta, Indonesia": "Asia/Jakarta",
        "Singapore, Singapore": "Asia/Singapore",
        "Kuala Lumpur, Malaysia": "Asia/Kuala_Lumpur",
        "Hong Kong, China": "Asia/Hong_Kong",
        "Taipei, Taiwan": "Asia/Taipei",
        "Seoul, South Korea": "Asia/Seoul",
        "Tokyo, Japan": "Asia/Tokyo",
        "Shanghai, China": "Asia/Shanghai",
        "Beijing, China": "Asia/Shanghai",

        "Sydney, Australia": "Australia/Sydney",
        "Melbourne, Australia": "Australia/Melbourne",
        "Perth, Australia": "Australia/Perth",
        "Auckland, New Zealand": "Pacific/Auckland",

        "Johannesburg, South Africa": "Africa/Johannesburg",
        "Cairo, Egypt": "Africa/Cairo",
        "Nairobi, Kenya": "Africa/Nairobi",

        "Sao Paulo, Brazil": "America/Sao_Paulo",
        "Buenos Aires, Argentina": "America/Argentina/Buenos_Aires",
        "Santiago, Chile": "America/Santiago",

        "Honolulu, USA": "Pacific/Honolulu",
        "Anchorage, USA": "America/Anchorage",
        "Phoenix, USA": "America/Phoenix",
        "Reykjavik, Iceland": "Atlantic/Reykjavik"
        ,
        "Cherkasy": "Europe/Kyiv",
        "Chernihiv": "Europe/Kyiv",
        "Chernivtsi": "Europe/Kyiv",
        "Dnipro": "Europe/Kyiv",
        "Donetsk": "Europe/Kyiv",
        "Ivano-Frankivsk": "Europe/Kyiv",
        "Kharkiv": "Europe/Kyiv",
        "Kherson": "Europe/Kyiv",
        "Khmelnytskyi": "Europe/Kyiv",
        "Kropyvnytskyi (Kirovohrad Oblast)": "Europe/Kyiv",
        "Kyiv": "Europe/Kyiv",
        "Luhansk": "Europe/Kyiv",
        "Lutsk (Volyn Oblast)": "Europe/Kyiv",
        "Lviv": "Europe/Kyiv",
        "Mykolaiv": "Europe/Kyiv",
        "Odesa": "Europe/Kyiv",
        "Poltava": "Europe/Kyiv",
        "Rivne": "Europe/Kyiv",
        "Sumy": "Europe/Kyiv",
        "Ternopil": "Europe/Kyiv",
        "Uzhhorod (Zakarpattia Oblast)": "Europe/Kyiv",
        "Vinnytsia": "Europe/Kyiv",
        "Zaporizhzhia": "Europe/Kyiv",
        "Zhytomyr": "Europe/Kyiv",
        "Simferopol": "Europe/Simferopol",
        "Seattle": "America/Los_Angeles",
        "Seattle, USA": "America/Los_Angeles"
    };
// v1.9.224 — Abbreviation → IANA tz (with names)
const ABBREV_TZ = {
  UTC:{abbr:"UTC",name:"Coordinated Universal Time",tz:"Etc/UTC"},
  GMT:{abbr:"GMT",name:"Greenwich Mean Time",tz:"Etc/UTC"},

  BST:{abbr:"BST",name:"British Summer Time",tz:"Europe/London"},
  WET:{abbr:"WET",name:"Western European Time",tz:"Europe/Lisbon"},
  WEST:{abbr:"WEST",name:"Western European Summer Time",tz:"Europe/Lisbon"},

  CET:{abbr:"CET",name:"Central European Time",tz:"Europe/Berlin"},
  CEST:{abbr:"CEST",name:"Central European Summer Time",tz:"Europe/Berlin"},

  EET:{abbr:"EET",name:"Eastern European Time",tz:"Europe/Athens"},
  EEST:{abbr:"EEST",name:"Eastern European Summer Time",tz:"Europe/Athens"},

  MSK:{abbr:"MSK",name:"Moscow Time",tz:"Europe/Moscow"},

  IST:{abbr:"IST",name:"India Standard Time",tz:"Asia/Kolkata"},
  JST:{abbr:"JST",name:"Japan Standard Time",tz:"Asia/Tokyo"},
  KST:{abbr:"KST",name:"Korea Standard Time",tz:"Asia/Seoul"},

  PST:{abbr:"PST",name:"Pacific Standard Time",tz:"America/Los_Angeles"},
  PDT:{abbr:"PDT",name:"Pacific Daylight Time",tz:"America/Los_Angeles"},

  MST:{abbr:"MST",name:"Mountain Standard Time",tz:"America/Denver"},
  MDT:{abbr:"MDT",name:"Mountain Daylight Time",tz:"America/Denver"},

  CST:{abbr:"CST",name:"Central Standard Time",tz:"America/Chicago"},
  CDT:{abbr:"CDT",name:"Central Daylight Time",tz:"America/Chicago"},

  EST:{abbr:"EST",name:"Eastern Standard Time",tz:"America/New_York"},
  EDT:{abbr:"EDT",name:"Eastern Daylight Time",tz:"America/New_York"},

  AKST:{abbr:"AKST",name:"Alaska Standard Time",tz:"America/Anchorage"},
  AKDT:{abbr:"AKDT",name:"Alaska Daylight Time",tz:"America/Anchorage"},
  HST:{abbr:"HST",name:"Hawaii–Aleutian Standard Time",tz:"Pacific/Honolulu"},

  AEST:{abbr:"AEST",name:"Australian Eastern Standard Time",tz:"Australia/Sydney"},
  AEDT:{abbr:"AEDT",name:"Australian Eastern Daylight Time",tz:"Australia/Sydney"},
  ACST:{abbr:"ACST",name:"Australian Central Standard Time",tz:"Australia/Adelaide"},
  ACDT:{abbr:"ACDT",name:"Australian Central Daylight Time",tz:"Australia/Adelaide"},
  AWST:{abbr:"AWST",name:"Australian Western Standard Time",tz:"Australia/Perth"},

  NZST:{abbr:"NZST",name:"New Zealand Standard Time",tz:"Pacific/Auckland"},
  NZDT:{abbr:"NZDT",name:"New Zealand Daylight Time",tz:"Pacific/Auckland"}
};


    // DOM
    const grid = $("#timeGrid");
    const rowTemplate = $("#rowTemplate");
    const datePicker = $("#datePicker");
    const todayBtn = $("#resetDateBtn");
    const addCityForm = $("#addCityForm");
    const cityInput = $("#cityInput");
    const cityList = $("#cityList");
    const timeFormatSelect = $("#timeFormatSelect");
    const themeSelect = $("#themeSelect");
    const customTzBtn = $("#customTzBtn");
    // Sorting guards: only allow sorting on (a) drag-and-drop or (b) Follow the Sun.
    // Also allow during initial load to restore previously saved order.
    window.__wtbInitPhase = true;
    window.__wtbAllowSort = false;


    // Storage
    const STORAGE_KEY = "wtb_lite_state";
    const storage = {
        get() {
            try { const s = localStorage.getItem(STORAGE_KEY); if (s) return JSON.parse(s); } catch (e) { }
            const match = document.cookie.match(new RegExp('(^| )' + STORAGE_KEY + '=([^;]+)'));
            if (match) { try { return JSON.parse(decodeURIComponent(match[2])); } catch (e) { } }
            return null;
        },
        set(obj) {
            const s = JSON.stringify(obj);
            try { localStorage.setItem(STORAGE_KEY, s); }
            catch (e) {
                const d = new Date(); d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
                document.cookie = STORAGE_KEY + '=' + encodeURIComponent(s) + ';expires=' + d.toUTCString() + ';path=/';
            }
        }
    };

    // State
    let state = {
        dateISO: toISODate(new Date()),
        rows: [],
        timeFormat: "24",
        theme: 6,
        focusHour: new Date().getHours()
    };

    function persist() { const { dateISO, ...rest } = state; storage.set({ version: window.__APP_VERSION__, ...rest }); }
    function loadPersisted() { const obj = storage.get(); if (obj) state = { ...state, ...obj }; state.dateISO = toISODate(new Date()); }

    function toISODate(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function applyTheme(index) { document.documentElement.setAttribute("data-theme", String(index)); }

    function syncNowBadgeFont(headerEl) {
        try {
            const cityEl = headerEl.querySelector('.city-name');
            const badge = headerEl.querySelector('.now-badge');
            if (!cityEl || !badge) return;
            const cs = window.getComputedStyle(cityEl);
            const apply = (el) => {
                el.style.fontFamily = cs.fontFamily;
                el.style.fontSize = cs.fontSize;
                el.style.fontWeight = cs.fontWeight;
                el.style.lineHeight = cs.lineHeight;
                el.style.letterSpacing = cs.letterSpacing;
                el.style.textTransform = cs.textTransform;
            };
            apply(badge);
            badge.querySelectorAll('.now-time, .now-ampm').forEach(apply);
        } catch (_) {}
    }


    function fillNowBadge(el, tz) {
        try {
            const parts = new Intl.DateTimeFormat(undefined, {
                hour: '2-digit', minute: '2-digit',
                hour12: (state.timeFormat !== '24'),
                timeZone: tz
            }).formatToParts(new Date());
            const hh = parts.find(p => p.type === 'hour')?.value ?? '';
            const mm = parts.find(p => p.type === 'minute')?.value ?? '';
            const dp = parts.find(p => p.type === 'dayPeriod')?.value ?? '';
            el.innerHTML = "";
            const l1 = document.createElement("div");
            l1.className = "now-time";
            l1.innerHTML = `${hh}<span class="blink-colon">:</span>${mm}`;
            el.appendChild(l1);
            if (state.timeFormat === '12') {
                const l2 = document.createElement("div");
                l2.className = "now-ampm";
                l2.textContent = String(dp || '').toUpperCase();
                el.appendChild(l2);
            }
        } catch (e) { el.textContent = ""; }
    }
    let __nowTicker = null;
    function ensureNowTicker() {
        if (__nowTicker) return;
        __nowTicker = setInterval(() => {
            try {
                document.querySelectorAll('.row').forEach(rowEl => {
                    const tz = rowEl.getAttribute('data-tz');
                    const el = rowEl.querySelector('.now-badge');
                    if (tz && el) fillNowBadge(el, tz);
                });
            } catch (_) {}
        }, 30000);
    }


    function labelForRowSub(dateISO, tz) {
        const dt = makeZoned(dateISO, 12, tz);
        const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset', year: 'numeric', month: 'short', day: '2-digit' }).formatToParts(dt);
        const tzName = parts.find(p => p.type === 'timeZoneName')?.value ?? '';
        const dateStr = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeZone: tz }).format(dt);
        return `${dateStr} • ${tzName}`;
    }

    function makeZoned(dateISO, hour, tz) {
        const [y, m, d] = dateISO.split("-").map(Number);
        return new Date(Date.UTC(y, m - 1, d, hour, 0, 0));
    }

    // v1.9.85 — produce a comparable GMT offset token for a zone on a given date
    function offsetToken(dateISO, tz) {
        try {
            const dt = makeZoned(dateISO, 12, tz);
            const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset', year: 'numeric', month: 'short', day: '2-digit' }).formatToParts(dt);
            const token = parts.find(p => p.type === 'timeZoneName')?.value || '';
            return token;
        } catch (e) { return ''; }
    }


    // v1.9.85 — Google Calendar helper
    function z2(n) { return String(n).padStart(2, '0'); }
    function makeGCalUrl(tz, isoDate, hour, minutes) {
        minutes = minutes || 0;
        const y = +isoDate.slice(0, 4), m = +isoDate.slice(5, 7), d = +isoDate.slice(8, 10);
        let h = +hour, min = +minutes;
        let endH = h + 1, endD = d, endM = m, endY = y;
        if (endH >= 24) {
            endH -= 24; const dt = new Date(y, m - 1, d); dt.setDate(dt.getDate() + 1);
            endY = dt.getFullYear(); endM = dt.getMonth() + 1; endD = dt.getDate();
        }
        const startStr = String(y) + z2(m) + z2(d) + "T" + z2(h) + z2(min) + "00";
        const endStr = String(endY) + z2(endM) + z2(endD) + "T" + z2(endH) + z2(min) + "00";
        const u = new URL("https://calendar.google.com/calendar/render");
        u.searchParams.set("action", "TEMPLATE");
        u.searchParams.set("ctz", tz);
        u.searchParams.set("dates", startStr + "/" + endStr);
        u.searchParams.set("text", "Meeting");
        return u.toString();
    }
    function formatCell(dateISO, hour, tz) {
        const dt = makeZoned(dateISO, hour, tz);
        const dateStr = new Intl.DateTimeFormat(undefined, { month: 'short', day: '2-digit', timeZone: tz }).format(dt);
        if (state.timeFormat === "12") {
            const parts = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz }).formatToParts(dt);
            const h = parts.find(p => p.type === 'hour')?.value ?? '';
            const m = parts.find(p => p.type === 'minute')?.value ?? '';
            const dp = String(parts.find(p => p.type === 'dayPeriod')?.value || '').toUpperCase();
            const timeStr = `${h}:${m}`;
            return { dateStr, timeStr, ampm: dp, dt };
        } else {
            const timeStr = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(dt);
            return { dateStr, timeStr, ampm: '', dt };
        }
    }

    function getCellWidth() {
        const firstRow = $(".row", grid);
        if (!firstRow) return 50;
        const tl = $(".timeline", firstRow);
        return Math.round(tl.scrollWidth / 24);
    }

    function updateFocusBar() {
        const bar = $(".focus-bar", grid) || (() => {
            const el = document.createElement("div");
            el.className = "focus-bar";
            grid.appendChild(el);
            return el;
        })();

        const firstRow = $(".row", grid);
        if (!firstRow) return;
        const tl = $(".timeline", firstRow);
        const tlRect = tl.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();
        const cellW = getCellWidth();
        const leftWithinGrid = (tlRect.left - gridRect.left) + state.focusHour * cellW;
        bar.style.left = `${leftWithinGrid}px`;
        bar.style.width = `${cellW}px`;
    }

    function attachDnD(node, idx) {
        const handle = $(".row-header", node);
        const row = node;

        handle.addEventListener("dragstart", (e) => {
            e.dataTransfer.effectAllowed = "move";
            try { e.dataTransfer.setData("text/plain", String(idx)); } catch (_) { }
            row.classList.add("dragging");
            grid._dragFrom = idx;
        });

        handle.addEventListener("dragend", () => {
            row.classList.remove("dragging");
            grid._dragFrom = null;
            $$(".row", grid).forEach(r => r.classList.remove("drop-before", "drop-after"));
        });

        row.addEventListener("dragover", (e) => {
            if (grid._dragFrom == null) return;
            e.preventDefault();
            const rect = row.getBoundingClientRect();
            const after = (e.clientY - rect.top) > rect.height / 2;
            $$(".row", grid).forEach(r => r.classList.remove("drop-before", "drop-after"));
            row.classList.add(after ? "drop-after" : "drop-before");
            grid._dragOver = { idx, after };
        });

        row.addEventListener("dragleave", () => {
            row.classList.remove("drop-before", "drop-after");
        });

        row.addEventListener("drop", (e) => {
            e.preventDefault();
            const from = grid._dragFrom;
            const over = grid._dragOver || { idx, after: false };
            if (from == null) return;
            let to = over.idx + (over.after ? 1 : 0);
            if (to > from) to--; // adjust for removal
            if (to === from || to < 0 || to > state.rows.length) return;

            const item = state.rows.splice(from, 1)[0];
            state.rows.splice(to, 0, item);
            persist();
            render();
        });
    }

    function render() {
        datePicker.value = state.dateISO;
        timeFormatSelect.value = state.timeFormat;
        themeSelect.value = String(state.theme);
        applyTheme(state.theme);

        grid.innerHTML = "";
        state.rows.forEach((row, idx) => {
            const node = rowTemplate.content.firstElementChild.cloneNode(true);
            node.setAttribute("data-index", String(idx));
            node.setAttribute("data-tz", row.tz);
            //node.classList.toggle('hour night', true);
            $(".city-name", node).textContent = row.city;
            $(".city-sub", node).textContent = labelForRowSub(state.dateISO, row.tz);
            const badge = $(".row-header .now-badge", node); if (badge) { fillNowBadge(badge, row.tz); syncNowBadgeFont($(".row-header", node)); }
            const headerEl = $(".row-header", node);
            if (headerEl) {
                let badge = headerEl.querySelector(".now-badge");
                if (!badge) { badge = document.createElement("div"); badge.className = "now-badge"; headerEl.appendChild(badge); }
                fillNowBadge(badge, row.tz);
            }

            // v1.9.85 - mark local machine zone
            try {
                const subEl = $(".city-sub", node);
                var isYourZone = (String(row.tz).toLowerCase() === String(LOCAL_TZ || '').toLowerCase()) || (offsetToken(state.dateISO, row.tz) === offsetToken(state.dateISO, LOCAL_TZ));
                if (subEl && isYourZone) {
                    // prevent duplicates
                    if (!subEl.querySelector('.your-zone-flag')) {
                        const strong = document.createElement('strong');
                        strong.className = 'your-zone-flag';
                        strong.textContent = ' (your zone)';
                        subEl.appendChild(strong);
                    }
                }
                node.classList.toggle('is-your-zone', isYourZone);

                if (isYourZone) {
                    $(".remove-div", node).classList.toggle('row-zone-remove', true);
                    $(".row-header", node).classList.toggle('row-zone-remove', true);
                }
            } catch (_) { }
            const tl = $(".timeline", node);

            for (let h = 0; h < 24; h++) {
                const hourEl = document.createElement("div");
                hourEl.className = "hour";
                // tag hour index and click-to-calendar
                hourEl.setAttribute('data-hour', String(h));
                hourEl.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    const tz = row.tz;
                    const y = parseInt(hourEl.getAttribute('data-y') || '0', 10);
                    const m = parseInt(hourEl.getAttribute('data-m') || '0', 10);
                    const d = parseInt(hourEl.getAttribute('data-d') || '0', 10);
                    const hh = parseInt(hourEl.getAttribute('data-h') || String(h), 10);
                    const mm = parseInt(hourEl.getAttribute('data-min') || '0', 10);
                    const url = makeGCalUrlFromParts(tz, y, m, d, hh, mm);
                    try { window.open(url, "_blank", "noopener,noreferrer"); } catch (_) { location.href = url; }
                });


                const dLabel = document.createElement("div");
                dLabel.className = "date";
                const tLabel = document.createElement("div");
                tLabel.className = "time";

                const { dateStr, timeStr, ampm, dt } = formatCell(state.dateISO, h, row.tz);
                dLabel.textContent = dateStr;
                tLabel.textContent = timeStr;
                
                // expose precise local date/time for this cell (used by GCal integration)
                try {
                    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: row.tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(dt);
                    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
                    hourEl.setAttribute('data-y', map.year);
                    hourEl.setAttribute('data-m', map.month);
                    hourEl.setAttribute('data-d', map.day);
                    hourEl.setAttribute('data-h', map.hour);
                    hourEl.setAttribute('data-min', map.minute || '0');
                } catch (e) { }


                // Day (08–18) vs Night coloring per city
                try {
                    const localHour = parseInt(new Intl.DateTimeFormat('en-US', { hour: '2-digit', hour12: false, timeZone: row.tz }).format(dt), 10);
                    hourEl.classList.add((localHour >= 8 && localHour <= 18) ? "day" : "night");
                } catch (_) { }

                hourEl.appendChild(dLabel);
                hourEl.appendChild(tLabel);
                if (state.timeFormat === "12") {
                    const aLabel = document.createElement("div");
                    aLabel.className = "ampm";
                    aLabel.textContent = ampm;
                    hourEl.appendChild(aLabel);
                }
                try {
                    const localHour = parseInt(new Intl.DateTimeFormat('en-US', { hour: '2-digit', hour12: false, timeZone: row.tz }).format(dt), 10);
                    hourEl.classList.add((localHour >= 8 && localHour <= 18) ? 'day' : 'night');
                } catch (e) {
                    hourEl.classList.add('night');
                }
                tl.appendChild(hourEl);
            }

            // Mouse-driven focus
            tl.addEventListener("mousemove", (e) => {
                const rect = tl.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const col = Math.min(23, Math.max(0, Math.floor((x / rect.width) * 24)));
                if (col !== state.focusHour) {
                    state.focusHour = col;
                    updateFocusBar();
                    debouncedPersist();
                }
            });
            tl.addEventListener("click", persist);

            $(".remove-row", node).addEventListener("click", () => {
                state.rows.splice(idx, 1);
                persist();
                render();
            });

            attachDnD(node, idx);
            grid.appendChild(node);
        });

        updateFocusBar();
    }

    let persistTimer = null;
    function debouncedPersist() { clearTimeout(persistTimer); persistTimer = setTimeout(persist, 500); }

    // smart city completion + tz detection
    let debounceTimer = null;
    let smartCache = new Map();
    function debounce(fn, ms) { return (...a) => { clearTimeout(debounceTimer); debounceTimer = setTimeout(() => fn(...a), ms); }; }

    const smartSearch = debounce(async function (query) {
        if (!query || query.length < 2) { refreshCityDatalist([], query); return; }
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=8&q=${encodeURIComponent(query)}`;
            const resp = await fetch(url, { headers: { "Accept": "application/json" } });
            if (!resp.ok) throw new Error("geocode failed");
            const data = await resp.json();
            const suggestions = data.map(item => {
                const addr = item.address || {};
                const name = addr.city || addr.town || addr.village || addr.hamlet || addr.municipality || addr.county || item.display_name.split(",")[0];
                const region = addr.state || addr.region || addr.county || addr.province || "";
                const country = addr.country || "";
                const label = [name, region, country].filter(Boolean).join(", ");
                return { label, lat: parseFloat(item.lat), lon: parseFloat(item.lon) };
            })
                .filter((s, i, arr) => arr.findIndex(t => t.label.toLowerCase() == s.label.toLowerCase()) == i);
            refreshCityDatalist(suggestions, query);
        } catch (e) {
            refreshCityDatalist([], query);
        }
    }, 300);

    async function lookupTimezone(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("tz fetch failed");
        const data = await resp.json();
        if (!data.timezone) throw new Error("no timezone");
        return data.timezone;
    }

    function refreshCityDatalist(suggestions = [], queryValue = "") {
        cityList.innerHTML = "";
        const builtins = Object.keys(CITY_TZ).sort().map(city => ({ label: city, builtin: true }));
        const merged = [...builtins];

        for (const s of suggestions) {
            if (!builtins.find(b => b.label.toLowerCase() === s.label.toLowerCase())) {
                merged.push({ label: s.label, lat: s.lat, lon: s.lon, builtin: false });
            }
        }

        
        // Include abbreviation entries as pseudo-cities with full labels
        if (typeof ABBREV_TZ !== 'undefined' && ABBREV_TZ) {
            Object.keys(ABBREV_TZ).forEach(code => {
                const cfg = ABBREV_TZ[code];
                const label = cfg.abbr + " (" + cfg.name + ")";
                if (!merged.find(e => e.label.toLowerCase() === label.toLowerCase())) {
                    merged.push({ label: label, builtin: true, abbr: code, tz: cfg.tz });
                }
            });
        }
merged.forEach(entry => {
            const opt = document.createElement("option");
            opt.value = entry.label;
            if (entry.builtin) opt.label = CITY_TZ[entry.label];
            cityList.appendChild(opt);
        });

        if (queryValue && !merged.find(e => e.label.toLowerCase() === queryValue.toLowerCase())) {
            const direct = document.createElement("option");
            direct.value = queryValue;
            cityList.appendChild(direct);
        }

        smartCache = new Map();
        for (const s of suggestions) smartCache.set(s.label.toLowerCase(), s);
    }

    async function addCitySmart(name) {
    // v1.9.227 — accept abbreviations typed/selected (case-insensitive)
    try{
        const raw = String(name||'').trim();
        if(raw){
            const mm = raw.match(/^([A-Za-z]{2,5})(?:\s*\(|$)/);
            if(mm){
                const code = mm[1].toUpperCase();
                if(typeof ABBREV_TZ!=='undefined' && ABBREV_TZ && Object.prototype.hasOwnProperty.call(ABBREV_TZ, code)){
                    const cfg = ABBREV_TZ[code];
                    pushCity({ city: cfg.abbr + " (" + cfg.name + ")", tz: cfg.tz });
                    return;
                }
            }
        }
    }catch(e){}

    // v1.9.224 — Accept abbreviations in the same input (case-insensitive)
    try {
        const raw = String(name||'').trim();
        if (raw) {
            const code = raw.toUpperCase();
            if (ABBREV_TZ && Object.prototype.hasOwnProperty.call(ABBREV_TZ, code)) {
                const cfg = ABBREV_TZ[code];
                // Add as "ABBR (Full Name)"
                pushCity({ city: cfg.abbr + " (" + cfg.name + ")", tz: cfg.tz });
                return;
            }
            // Also accept "ABBR (Name)" typed by user
            const m = raw.match(/^([A-Za-z]{2,5})\s*\(/);
            if (m) {
                const code2 = m[1].toUpperCase();
                if (ABBREV_TZ && Object.prototype.hasOwnProperty.call(ABBREV_TZ, code2)) {
                    const cfg2 = ABBREV_TZ[code2];
                    pushCity({ city: cfg2.abbr + " (" + cfg2.name + ")", tz: cfg2.tz });
                    return;
                }
            }
        }
    } catch(e) {}

        if (CITY_TZ[name]) { pushCity({ city: name, tz: CITY_TZ[name] }); return; }

        let sug = smartCache.get(name.toLowerCase());
        if (!sug) {
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=1&q=${encodeURIComponent(name)}`;
                const resp = await fetch(url);
                const data = await resp.json();
                if (data && data[0]) {
                    sug = { label: name, lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
                }
            } catch (e) { }
        }
        if (!sug) { alert("City not found. Try adding with a custom time zone."); return; }

        try {
            const tz = await lookupTimezone(sug.lat, sug.lon);
            pushCity({ city: name, tz });
        } catch (e) {
            alert("Found the city but couldn't determine time zone automatically. Add with custom time zone instead.");
        }
    }

    function pushCity(entry) {
        if (state.rows.some(r => r.city.toLowerCase() === entry.city.toLowerCase())) return;
        state.rows.push(entry);
        persist();
        render();
    }

    // Events
    addCityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = cityInput.value.trim();
        if (!value) return;
        addCitySmart(value);
        cityInput.value = "";
    });

    cityInput.addEventListener("change", () => {
        const value = cityInput.value.trim();
        if (!value) return;
        addCitySmart(value);
        cityInput.value = "";
    });

    cityInput.addEventListener("input", () => {
        smartSearch(cityInput.value.trim());
    });

    cityInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = cityInput.value.trim();
            if (value) {
                addCitySmart(value);
                cityInput.value = "";
            }
        }
    });

    customTzBtn?.addEventListener("click", () => {
        const city = prompt("City display name (e.g., San Francisco, USA):");
        if (!city) return;
        const tz = prompt("Enter IANA time zone (e.g., America/Los_Angeles). Tip: check https://en.wikipedia.org/wiki/List_of_tz_database_time_zones");
        if (!tz) return;
        try { new Intl.DateTimeFormat(undefined, { timeZone: tz }).format(new Date()); }
        catch (e) { alert("That doesn't look like a valid IANA time zone."); return; }
        pushCity({ city, tz });
    });

    datePicker.addEventListener("change", () => {
        state.dateISO = datePicker.value || toISODate(new Date());
        persist();
        render();
    });

    todayBtn.addEventListener("click", () => {
        state.dateISO = toISODate(new Date());
        persist();
        render();
    });

    timeFormatSelect.addEventListener("change", () => {
        state.timeFormat = timeFormatSelect.value;
        persist();
        render();
        ensureNowTicker();
        setTimeout(function(){ window.__wtbInitPhase = false; }, 0);
        ensureNowTicker();
    });

    themeSelect.addEventListener("change", () => {
        state.theme = parseInt(themeSelect.value, 10);
        applyTheme(state.theme);
        persist();
    });

    function init() {
        loadPersisted();
        if (!Number.isInteger(state.theme) || state.theme < 0 || state.theme > 8) { state.theme = 6; }
        refreshCityDatalist();
        applyTheme(state.theme);

        if (state.rows.length === 0) {
            state.rows = [
                { city: "Bucharest, Romania", tz: "Europe/Bucharest" },
                { city: "London, UK", tz: "Europe/London" },
                { city: "New York, USA", tz: "America/New_York" },
                { city: "Tokyo, Japan", tz: "Asia/Tokyo" },
                { city: "Los Angeles, USA", tz: "America/Los_Angeles" },
                { city: "Berlin, Germany", tz: "Europe/Berlin" },
                { city: "Warsaw, Poland", tz: "Europe/Warsaw" },
                { city: "Kyiv, Ukraine", tz: "Europe/Kyiv" }
            ];
        }

        render();
        ensureNowTicker();
        setTimeout(function(){ window.__wtbInitPhase = false; }, 0);

        window.addEventListener("resize", () => {
            try { document.querySelectorAll(".row-header").forEach(syncNowBadgeFont); } catch (_) {}
            updateFocusBar();
        });
    }

    init();

    // v1.9.202 — Follow the Sun (on-demand, state-first)
    (function(){
        function _container() {
            return document.getElementById('timeGrid') ||
                document.querySelector('.grid .rows') ||
                document.querySelector('.rows') ||
                (function () { var r = document.querySelector('.row'); return r ? r.parentElement : null; })();
        }
        function _rowLabel(el) {
            var labelEl = el.querySelector('.city-name, .city .name, .city, .label, .name');
            return labelEl ? labelEl.textContent.trim() : '';
        }
        function _rowTZ(el) {
            if (el.dataset) { return el.dataset.tz || el.dataset.timezone || ''; }
            var node = el.querySelector('[data-tz],[data-timezone]');
            return node ? (node.getAttribute('data-tz') || node.getAttribute('data-timezone') || '') : '';
        }
        function _nowEpoch() { return Date.now(); }
        function _offsetForRow(el, atNow) {
            try {
                var tz = _rowTZ(el) || 'UTC';
                var fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
                var parts = fmt.formatToParts(new Date(atNow));
                var tzn = parts.find(function(p){ return p.type==='timeZoneName'; });
                var label = tzn ? tzn.value : '';
                // Expected forms: 'GMT+7', 'GMT+07:00', 'UTC-05', etc.
                var m = label.match(/([+-])(\d{1,2})(?::?(\d{2}))?/);
                if (!m) {
                    // Fallback: try to compute offset via two formatters (utc vs tz) on the same instant
                    var utc = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit' }).format(new Date(atNow));
                    var loc = new Intl.DateTimeFormat('en-US', { timeZone: tz,   hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit' }).format(new Date(atNow));
                    var toMin = function(s){ return parseInt(s.slice(0,2),10)*60 + parseInt(s.slice(3,5),10); };
                    var diff = toMin(loc) - toMin(utc);
                    // Normalize to range [-720, +840] accounting for day wrap
                    if (diff > 720) diff -= 1440; if (diff < -720) diff += 1440;
                    return diff; // already minutes from UTC
                }
                var sign = m[1] === '-' ? -1 : 1;
                var hh = parseInt(m[2], 10) || 0;
                var mm = parseInt(m[3] || '0', 10) || 0;
                return sign * (hh*60 + mm);
            } catch(e) { return 0; }
        }
        function _syncStateToDOMByLabels() {
            if (!window.state || !Array.isArray(state.rows)) return;
            var c = _container(); if (!c) return;
            var labels = Array.prototype.slice.call(c.querySelectorAll(':scope > .row, .row'))
                          .map(_rowLabel);
            state.rows.sort(function(a,b){
                var la = (a.city || a.label || '');
                var lb = (b.city || b.label || '');
                return labels.indexOf(la) - labels.indexOf(lb);
            });
        }
        function _followOnce() {
            var c = _container(); if (!c) return;
            var rows = Array.prototype.slice.call(c.querySelectorAll(':scope > .row, .row'));
            if (!rows.length) return;
            var atNow = _nowEpoch();
            rows.forEach(function(r){
                r.__off = _offsetForRow(r, atNow);
                r.__lab = _rowLabel(r);
            });
            // Only sort when explicitly requested
            rows.sort(function(a,b){ return (b.__off - a.__off) || a.__lab.localeCompare(b.__lab); });
            rows.forEach(function(r){ c.appendChild(r); });
            _syncStateToDOMByLabels();
            try { persist(); } catch(e){}
        }
        function _bind() {
            var btn = document.getElementById('followSunBtn');
            if (!btn) return;
            btn.addEventListener('click', function(){
                _followOnce();
            });
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _bind);
        else _bind();
        // Optional global for programmatic trigger
        window.followTheSunOnce = _followOnce;
    })();

// v1.9.220 — Persist DOM order after Follow the Sun (uses the same state + storage as DnD)
(function(){
  function container(){ return document.getElementById('timeGrid') || document.querySelector('.rows'); }
  function rowsInDOM(){ var c = container(); return c ? Array.prototype.slice.call(c.querySelectorAll(':scope > .row, .row')) : []; }
  function captureAndPersist(){
    try {
      var els = rowsInDOM(); if (!els.length) return;
      if (!state || !Array.isArray(state.rows) || !state.rows.length) return;
      // Use pre-render data-index to map DOM order to existing objects
      var idxs = els.map(function(el){ var v = el.getAttribute('data-index'); return v==null? -1 : parseInt(v,10); });
      var ordered = []; idxs.forEach(function(i){ if (Number.isInteger(i) && i>=0 && i<state.rows.length) ordered.push(state.rows[i]); });
      if (ordered.length) { state.rows = ordered; persist(); if (typeof render==='function') render(); }
    } catch(e){}
  }
  // Expose a console helper that closes over the real 'state' in this IIFE
  window.WTB = Object.assign({}, window.WTB||{}, { saveOrderFromDOM: captureAndPersist });
  // Hook Follow-the-Sun button to persist after its own handler runs
  function bind(){
    var btn = document.getElementById('followSunBtn'); if (!btn) return;
    btn.addEventListener('click', function(){ setTimeout(captureAndPersist, 0); setTimeout(captureAndPersist, 120); });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', bind); else bind();
})();
})();




// Follow-the-Sun DOM helpers removed in v1.9.201.
// Ordering is now persisted ONLY via state.rows in localStorage (wtb_lite_state).
window._wtb_saveOrderLabels = function(){};
// v1.9.85 — robust Google Calendar helpers
function z2(n) { return String(n).padStart(2, '0'); }
function makeGCalUrlFromParts(tz, y, m, d, h, min) {
    min = min || 0;
    let endH = h + 1, endD = d, endM = m, endY = y;
    if (endH >= 24) {
        endH -= 24; const dt = new Date(y, m - 1, d); dt.setDate(dt.getDate() + 1);
        endY = dt.getFullYear(); endM = dt.getMonth() + 1; endD = dt.getDate();
    }
    const startStr = String(y) + z2(m) + z2(d) + "T" + z2(h) + z2(min) + "00";
    const endStr = String(endY) + z2(endM) + z2(endD) + "T" + z2(endH) + z2(min) + "00";
    const u = new URL("https://calendar.google.com/calendar/render");
    u.searchParams.set("action", "TEMPLATE");
    u.searchParams.set("ctz", tz);
    u.searchParams.set("dates", startStr + "/" + endStr);
    u.searchParams.set("text", "Meeting");
    return u.toString();
}
const _WTB_MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
function parseCellDateTime(cell, fallbackISO) {
    // cell text usually like "Sep 18\n08:00" or "Sep 17 08:00"
    const txt = (cell.textContent || "").replace(/\s+/g, ' ').trim();
    const m = txt.match(/([A-Za-z]{3})\s+(\d{1,2}).*?(\d{1,2}):(\d{2})/);
    let year;
    if (fallbackISO && /^\d{4}-\d{2}-\d{2}$/.test(fallbackISO)) {
        year = +fallbackISO.slice(0, 4);
    } else {
        const d = new Date(); year = d.getFullYear();
    }
    if (m) {
        const mon = _WTB_MONTHS[m[1].toLowerCase()] || 1;
        const day = +m[2];
        const hour = +m[3], min = +m[4];
        return { y: year, m: mon, d: day, h: hour, min: min };
    }
    // fallback: use fallbackISO date and data-hour
    const hr = parseInt(cell.getAttribute('data-hour') || "0", 10);
    const y = +fallbackISO.slice(0, 4), mo = +fallbackISO.slice(5, 7), da = +fallbackISO.slice(8, 10);
    return { y: y, m: mo, d: da, h: hr, min: 0 };
}



// v1.9.227 — Ensure datalist shows full labels for abbreviations
(function(){
  function buildAbbrevOptions(dl){
    if (!dl || !window.ABBREV_TZ) return;
    // Remove any pure-abbr dupes
    const toRemove = [];
    dl.querySelectorAll("option").forEach(op => {
      const v = (op.getAttribute("value")||"").trim();
      const m = v.match(/^([A-Za-z]{2,5})$/);
      if(m && ABBREV_TZ[m[1].toUpperCase()]) toRemove.push(op);
    });
    toRemove.forEach(op => op.remove());
    // Add/normalize with "ABBR (Full Name)"
    Object.keys(ABBREV_TZ).forEach(k => {
      const cfg = ABBREV_TZ[k];
      const label = cfg.abbr + " (" + cfg.name + ")";
      // Find existing normalized option
      let op = Array.from(dl.querySelectorAll("option")).find(o => (o.value||"").toLowerCase() === label.toLowerCase());
      if(!op){
        op = document.createElement("option");
        op.value = label;
        op.textContent = label;
        dl.appendChild(op);
      }else{
        op.value = label;
        op.textContent = label;
      }
    });
  }
  function init(){
    const dl = document.getElementById("cityList");
    buildAbbrevOptions(dl);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

