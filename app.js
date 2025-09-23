const APP_VERSION = "v1.9.116";
/* World Time Zones v1.9.85 */
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

    function persist() { storage.set({ version: window.__APP_VERSION__, ...state }); }
    function loadPersisted() { const obj = storage.get(); if (obj) state = { ...state, ...obj }; }

    function toISODate(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function applyTheme(index) { document.documentElement.setAttribute("data-theme", String(index)); }

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
        const timeFmt = state.timeFormat === "12"
            ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz })
            : new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz });
        const timeStr = timeFmt.format(dt);
        return { dateStr, timeStr, dt };
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
            //node.classList.toggle('hour night', true);
            $(".city-name", node).textContent = row.city;
            $(".city-sub", node).textContent = labelForRowSub(state.dateISO, row.tz);

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

                const { dateStr, timeStr, dt } = formatCell(state.dateISO, h, row.tz);
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
                { city: "Tokyo, Japan", tz: "Asia/Tokyo" }
            ];
        }

        render();

        window.addEventListener("resize", () => {
            updateFocusBar();
        });
    }

    init();
})();



// v1.9.85 — DOM-first Follow the Sun (east → west) that does NOT depend on state
(function () {
    function parseOffset(txt) {
        // Accept "UTC+5", "UTC+05:30", "GMT-3", etc.
        var m = /(UTC|GMT)\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?/i.exec(txt || "");
        if (!m) return null;
        var sign = m[2] === '-' ? -1 : 1;
        var h = parseInt(m[3] || '0', 10);
        var mm = parseInt(m[4] || '0', 10);
        return sign * (h + mm / 60);
    }
    function rowLabel(row) {
        var name = row.querySelector('.city-name, .city .name, .city, .label, .name');
        var t = (name ? name.textContent : row.textContent) || "";
        return t.trim().replace(/\s+/g, ' ').toLowerCase();
    }
    function tzFromRow(row) {
        // try data attributes first
        if (row.dataset) {
            if (row.dataset.tz) return row.dataset.tz;
            if (row.dataset.timezone) return row.dataset.timezone;
        }
        // try elements carrying tz
        var tzEl = row.querySelector('[data-tz],[data-timezone]');
        if (tzEl) {
            return tzEl.getAttribute('data-tz') || tzEl.getAttribute('data-timezone');
        }
        return null;
    }
    function offsetForRow(row, atNoon) {
        // 1) try parsing from visible meta like "Sep 17 • UTC+3"
        var sub = row.querySelector('.city-sub, .meta');
        var off = parseOffset(sub ? sub.textContent : row.textContent);
        if (off !== null) return off;
        // 2) fallback: compute from tz via Intl if available
        var tz = tzFromRow(row);
        if (tz) {
            try {
                var dtf = new Intl.DateTimeFormat('en-US', {
                    timeZone: tz, hour12: false,
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                });
                var parts = dtf.formatToParts(new Date(atNoon));
                var map = {}; for (var i = 0; i < parts.length; i++) { map[parts[i].type] = parts[i].value; }
                var localUTC = Date.UTC(+map.year, +map.month - 1, +map.day, +map.hour, +map.minute, +map.second);
                return Math.round((localUTC - atNoon) / 60000) / 60; // return in hours (can be fractional)
            } catch (e) { }
        }
        return 0;
    }
    function noonEpoch() {
        var iso = (document.getElementById('dateSelect') && document.getElementById('dateSelect').value) || null;
        var d = iso ? (function () { var p = iso.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0); })()
            : (function () { var dd = new Date(); return new Date(dd.getFullYear(), dd.getMonth(), dd.getDate(), 12, 0, 0); })();
        return d.getTime();
    }
    function _doFollowSort() {
        // find rows container (try #timeGrid, .grid .rows, or parent of first .row)
        var container = document.getElementById('timeGrid') ||
            document.querySelector('.grid .rows') ||
            (function () { var r = document.querySelector('.row'); return r ? r.parentElement : null; })();
        if (!container) return;
        var rows = Array.prototype.slice.call(container.querySelectorAll(':scope > .row, .row')); // be generous
        if (!rows.length) return;
        var atNoon = noonEpoch();
        rows.forEach(function (r) {
            r.__off = offsetForRow(r, atNoon);
            r.__lab = rowLabel(r);
        });
        rows.sort(function (a, b) { return (b.__off - a.__off) || a.__lab.localeCompare(b.__lab); });
        rows.forEach(function (r) { container.appendChild(r); });
        _wtb_syncOrderFromDOM();
        if (window._wtb_saveOrderLabels) _wtb_saveOrderLabels();
        if (window._wtb_saveOrderCookie) { _wtb_saveOrderCookie(); }
        // try to persist if available
        if (window.persist) try { persist(); } catch (e) { }
    }
    // public entry points
    window.followTheSunSort = function () { _doFollowSort(); };
    window.followTheSunSoft = function () { _doFollowSort(); };
    // bind defensively
    (function bind() {
        var b = document.getElementById('followSunBtn');
        if (b) b.onclick = function (e) { e && e.preventDefault(); _doFollowSort(); };
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', bind, { once: true });
        }
    })();
})();

// v1.9.85 — persist current DOM order (state + cookie fallback)
function _wtb_syncOrderFromDOM() {
    try {
        var container = document.getElementById('timeGrid') ||
            document.querySelector('.grid .rows') ||
            (function () { var r = document.querySelector('.row'); return r ? r.parentElement : null; })();
        if (!container) return;
        var domRows = Array.prototype.slice.call(container.querySelectorAll(':scope > .row, .row'));
        if (!domRows.length) return;
        // Build order and light payload
        var order = [], payload = [];
        domRows.forEach(function (r) {
            var labelEl = r.querySelector('.city-name, .city .name, .city, .label, .name');
            var label = labelEl ? labelEl.textContent.trim() : '';
            var tz = '';
            if (r.dataset) tz = r.dataset.tz || r.dataset.timezone || '';
            if (!tz) {
                var el = r.querySelector('[data-tz],[data-timezone]');
                if (el) tz = el.getAttribute('data-tz') || el.getAttribute('data-timezone') || '';
            }
            order.push((label || '').toLowerCase() + '|' + (tz || '').toLowerCase());
            payload.push({ city: label, tz: tz });
        });
        // Reorder state.rows if present
        if (window.state && Array.isArray(state.rows)) {
            function key(o) {
                var label = (o.city || o.label || '').toLowerCase();
                var tz = (o.tz || o.timeZone || o.timezone || '').toLowerCase();
                return label + '|' + tz;
            }
            state.rows.sort(function (a, b) {
                return order.indexOf(key(a)) - order.indexOf(key(b));
            });
            if (typeof persist === 'function') { persist(); return; }
        }
        // Fallback cookie write (expires in ~180 days)
        var json = encodeURIComponent(JSON.stringify(payload));
        var exp = new Date(); exp.setDate(exp.getDate() + 180);
        document.cookie = 'wtb_rows=' + json + '; expires=' + exp.toUTCString() + '; path=/';
    } catch (e) {/* ignore */ }
}


// v1.9.85 — explicit order save & restore
(function () {
    function _wtb_rowKeyFromObj(o) {
        var label = (o && (o.city || o.label || '')).toLowerCase();
        var tz = (o && (o.tz || o.timeZone || o.timezone || '')).toLowerCase();
        return label + '|' + tz;
    }
    function _wtb_rowKeyFromEl(r) {
        var labelEl = r.querySelector('.city-name, .city .name, .city, .label, .name');
        var label = labelEl ? labelEl.textContent.trim().toLowerCase() : '';
        var tz = '';
        if (r.dataset) tz = (r.dataset.tz || r.dataset.timezone || '');
        if (!tz) {
            var el = r.querySelector('[data-tz],[data-timezone]');
            if (el) tz = (el.getAttribute('data-tz') || el.getAttribute('data-timezone') || '');
        }
        return (label || '') + '|' + (tz || '').toLowerCase();
    }
    function _wtb_container() {
        return document.getElementById('timeGrid') ||
            document.querySelector('.grid .rows') ||
            document.querySelector('.rows') ||
            (function () { var r = document.querySelector('.row'); return r ? r.parentElement : null; })();
    }
    function _wtb_saveOrderCookie() {
        var c = _wtb_container(); if (!c) return;
        var rows = Array.prototype.slice.call(c.querySelectorAll(':scope > .row, .row'));
        if (!rows.length) return;
        var order = rows.map(_wtb_rowKeyFromEl);
        var exp = new Date(); exp.setDate(exp.getDate() + 180);
        document.cookie = 'wtb_order=' + encodeURIComponent(JSON.stringify(order)) + '; expires=' + exp.toUTCString() + '; path=/';
    }
    function _wtb_readOrderCookie() {
        var m = document.cookie.match(/(?:^|; )wtb_order=([^;]+)/);
        if (!m) return null;
        try { return JSON.parse(decodeURIComponent(m[1])); } catch (e) { return null; }
    }
    function _wtb_applyOrderToState(order) {
        if (!order || !window.state || !Array.isArray(state.rows) || !state.rows.length) return false;
        state.rows.sort(function (a, b) {
            return order.indexOf(_wtb_rowKeyFromObj(a)) - order.indexOf(_wtb_rowKeyFromObj(b));
        });
        return true;
    }
    // 1) wrap render so every render saves order cookie
    function _wrapRender() {
        if (!window.render || window.render.__wtbWrapped) return;
        var orig = window.render;
        function wrapped() {
            var r = orig.apply(this, arguments);
            try { _wtb_saveOrderCookie(); } catch (e) { }
            return r;
        }
        wrapped.__wtbWrapped = true;
        window.render = wrapped;
    }
    // 2) on startup, try to apply cookie order before first paint
    function _applyEarly() {
        var order = _wtb_readOrderCookie();
        if (order) {
            var changed = _wtb_applyOrderToState(order);
            if (changed && typeof window.render === 'function') { try { window.render(); } catch (e) { } }
        }
    }
    // bind
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { _wrapRender(); _applyEarly(); });
    } else { _wrapRender(); _applyEarly(); }
    // also save order when leaving the page (last chance)
    window.addEventListener('beforeunload', function () { try { _wtb_saveOrderCookie(); } catch (e) { } });
    // expose for Follow-the-Sun call sites
    window._wtb_saveOrderCookie = _wtb_saveOrderCookie;
})();


// v1.9.85 — ultra-direct order persistence (label-based), DOM-first
(function () {
    function container() {
        return document.getElementById('timeGrid') ||
            document.querySelector('.grid .rows') ||
            document.querySelector('.rows') ||
            (function () { var r = document.querySelector('.row'); return r ? r.parentElement : null; })();
    }
    function labelOfRow(r) {
        var el = r.querySelector('.city-name, .city .name, .city, .label, .name');
        return (el ? el.textContent : r.textContent).trim();
    }
    function readDomOrderLabels() {
        var c = container(); if (!c) return [];
        return Array.prototype.slice.call(c.querySelectorAll(':scope > .row, .row'))
            .map(labelOfRow);
    }
    function writeOrder(order) {
        try { localStorage.setItem('wtb_order_labels', JSON.stringify(order)); } catch (e) { }
        try {
            var exp = new Date(); exp.setDate(exp.getDate() + 180);
            document.cookie = 'wtb_order_labels=' + encodeURIComponent(JSON.stringify(order)) + '; expires=' + exp.toUTCString() + '; path=/';
        } catch (e) { }
    }
    function readOrder() {
        try {
            var ls = localStorage.getItem('wtb_order_labels');
            if (ls) return JSON.parse(ls);
        } catch (e) { }
        var m = document.cookie.match(/(?:^|; )wtb_order_labels=([^;]+)/);
        if (m) { try { return JSON.parse(decodeURIComponent(m[1])); } catch (e) { } }
        return null;
    }
    function applyOrderToDOM(order) {
        var c = container(); if (!c || !order || !order.length) return false;
        var rows = Array.prototype.slice.call(c.querySelectorAll(':scope > .row, .row'));
        if (!rows.length) return false;
        var map = new Map();
        rows.forEach(function (r) { map.set(labelOfRow(r), r); });
        var moved = false;
        order.forEach(function (lbl) {
            var el = map.get(lbl);
            if (el) { c.appendChild(el); moved = true; }
        });
        return moved;
    }
    function syncStateToDOMByLabels() {
        try {
            if (!window.state || !Array.isArray(state.rows) || !state.rows.length) return;
            var order = readDomOrderLabels();
            if (!order.length) return;
            state.rows.sort(function (a, b) {
                var la = (a.city || a.label || ''); var lb = (b.city || b.label || '');
                return order.indexOf(la) - order.indexOf(lb);
            });
            if (typeof persist === 'function') persist();
        } catch (e) { }
    }
    // Reapply saved order after first paint, then sync+save again
    function onReady() {
        setTimeout(function () {
            var order = readOrder();
            if (order && order.length) {
                var moved = applyOrderToDOM(order);
                if (moved) {
                    syncStateToDOMByLabels();
                    writeOrder(readDomOrderLabels());
                }
            }
        }, 0);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
    else onReady();
    // Always save after Follow Sun sorts, if hook exists
    window._wtb_saveOrderLabels = function () { writeOrder(readDomOrderLabels()); };
})();


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

