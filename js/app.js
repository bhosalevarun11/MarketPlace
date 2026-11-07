/**
 * LUMA – Professional Talent Directory Engine
 * Pure Vanilla JavaScript • Client-side Filtering & Consultation Booking
 */

// State Management
let currentProfiles = [...LUMA_PROFILES];
let activeCategory = "all";
let activeTier = "";
let savedProfileIds = JSON.parse(localStorage.getItem("luma_favorites") || "[]");
let demoBookings = JSON.parse(localStorage.getItem("luma_bookings") || "null");

// Initialize default bookings if empty
if (!demoBookings) {
    demoBookings = [...INITIAL_DEMO_BOOKINGS];
    localStorage.setItem("luma_bookings", JSON.stringify(demoBookings));
}

// DOM Elements
const profilesGrid = document.getElementById("profilesGrid");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const citySelect = document.getElementById("citySelect");
const tierSelect = document.getElementById("tierSelect");
const sortSelect = document.getElementById("sortSelect");
const chipButtons = document.querySelectorAll(".chip-btn");
const savedBadge = document.getElementById("savedBadge");
const bookingsCountBadge = document.getElementById("bookingsCountBadge");
const activeFiltersSummary = document.getElementById("activeFiltersSummary");

// Modals
const profileModal = document.getElementById("profileModal");
const profileDetailsBody = document.getElementById("profileDetailsBody");
const closeProfileModal = document.getElementById("closeProfileModal");

const bookingModal = document.getElementById("bookingModal");
const bookingFormStep = document.getElementById("bookingFormStep");
const bookingConfirmStep = document.getElementById("bookingConfirmStep");
const bookingProfilePreview = document.getElementById("bookingProfilePreview");
const bookingTargetId = document.getElementById("bookingTargetId");
const bookDate = document.getElementById("bookDate");
const bookTime = document.getElementById("bookTime");
const bookingForm = document.getElementById("bookingForm");
const closeBookingModal = document.getElementById("closeBookingModal");
const confirmDetailsBox = document.getElementById("confirmDetailsBox");
const doneConfirmBtn = document.getElementById("doneConfirmBtn");
const viewBookingsFromConfirmBtn = document.getElementById("viewBookingsFromConfirmBtn");

const myBookingsModal = document.getElementById("myBookingsModal");
const bookingsHistoryList = document.getElementById("bookingsHistoryList");
const closeBookingsModal = document.getElementById("closeBookingsModal");
const openBookingsBtn = document.getElementById("openBookingsBtn");

const savedModal = document.getElementById("savedModal");
const savedProfilesList = document.getElementById("savedProfilesList");
const closeSavedModal = document.getElementById("closeSavedModal");
const openSavedBtn = document.getElementById("openSavedBtn");

const toastPopup = document.getElementById("toastPopup");
const toastMessage = document.getElementById("toastMessage");

// Format Currency (INR)
function formatINR(val) {
    return "₹" + Number(val).toLocaleString("en-IN");
}

// Toast Notification
let toastTimer = null;
function showToast(msg, iconClass = "fa-solid fa-circle-check") {
    clearTimeout(toastTimer);
    const icon = toastPopup.querySelector(".toast-icon");
    icon.className = `toast-icon ${iconClass}`;
    toastMessage.textContent = msg;
    toastPopup.classList.add("show");
    toastTimer = setTimeout(() => {
        toastPopup.classList.remove("show");
    }, 3000);
}

// Update Badges
function updateBadges() {
    savedBadge.textContent = savedProfileIds.length;
    bookingsCountBadge.textContent = demoBookings.length;
}

// ==================== RENDER PROFILES ====================
function renderProfiles(list) {
    profilesGrid.innerHTML = "";
    resultsCount.textContent = `Showing ${list.length} consultants`;

    if (list.length === 0) {
        profilesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background:#fff; border-radius:14px; border:1px solid #eddfe5;">
                <i class="fa-regular fa-folder-open" style="font-size: 3rem; color: #542047; margin-bottom: 1rem;"></i>
                <h3 style="font-family:'Cormorant Garamond',serif; font-size:1.8rem; color:#35152F; margin-bottom:0.4rem;">No matching talent found</h3>
                <p style="color:#6e596a; font-size:0.9rem; margin-bottom:1.4rem;">Try searching a different city or clearing your filters.</p>
                <button class="btn btn-primary-plum" onclick="resetAllFilters(event)">Reset All Filters</button>
            </div>
        `;
        return;
    }

    list.forEach(p => {
        const isSaved = savedProfileIds.includes(p.id);
        const tierClass = p.tier.toLowerCase();

        const card = document.createElement("div");
        card.className = "profile-card";
        card.onclick = (e) => {
            if (!e.target.closest("button")) {
                openProfileDetails(p.id);
            }
        };

        card.innerHTML = `
            <div class="card-img-wrapper">
                <span class="card-tier-pill ${tierClass}">${p.tier}</span>
                <button class="card-save-btn ${isSaved ? 'active' : ''}" data-id="${p.id}" title="${isSaved ? 'Remove from saved' : 'Save profile'}">
                    <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
                <img src="${p.image}" alt="${p.name} - ${p.role}" loading="lazy" />
                <span class="card-availability-tag">
                    <span class="avail-dot"></span> ${p.availability}
                </span>
            </div>

            <div class="card-content">
                <div class="card-header-line">
                    <h3 class="card-name">
                        ${p.name}
                        ${p.verified ? '<i class="fa-solid fa-circle-check verified-icon" title="Verified Consultant"></i>' : ''}
                    </h3>
                </div>

                <div class="card-role-title" style="font-size:0.8rem; font-weight:600; color:#542047; margin-bottom:0.25rem;">
                    ${p.role}
                </div>

                <div class="card-meta-loc">
                    <span>${p.age} Yrs</span> • <span><i class="fa-solid fa-location-dot"></i> ${p.location}</span>
                </div>

                <div class="card-rating-line">
                    <span class="card-stars">★★★★★</span>
                    <span class="card-rating-val">${p.rating.toFixed(1)}</span>
                    <span class="card-reviews-num">(${p.reviewsCount} reviews)</span>
                </div>

                <p class="card-bio-snippet">${p.description}</p>

                <div class="card-bottom-row">
                    <div class="card-price-row">
                        <span class="price-tier-label">${p.tier} Tier</span>
                        <span class="price-number">${formatINR(p.price)}</span>
                    </div>

                    <div class="card-buttons-pair">
                        <button class="btn-card-view" data-id="${p.id}">
                            View Profile
                        </button>
                        <button class="btn-card-book" data-id="${p.id}">
                            Book Session
                        </button>
                    </div>
                </div>
            </div>
        `;

        card.querySelector(".card-save-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFavorite(p.id);
        });

        card.querySelector(".btn-card-view").addEventListener("click", (e) => {
            e.stopPropagation();
            openProfileDetails(p.id);
        });

        card.querySelector(".btn-card-book").addEventListener("click", (e) => {
            e.stopPropagation();
            openBookingModal(p.id);
        });

        profilesGrid.appendChild(card);
    });
}

// Toggle Favorite in localStorage
function toggleFavorite(id) {
    const idx = savedProfileIds.indexOf(id);
    if (idx > -1) {
        savedProfileIds.splice(idx, 1);
        showToast("Consultant removed from favorites", "fa-regular fa-heart");
    } else {
        savedProfileIds.push(id);
        showToast("Consultant saved to favorites!", "fa-solid fa-heart");
    }
    localStorage.setItem("luma_favorites", JSON.stringify(savedProfileIds));
    updateBadges();
    applyFilters();
}

// ==================== FILTERING & SORTING ====================
function applyFilters() {
    let result = [...LUMA_PROFILES];

    // 1. Keyword search
    const query = (searchInput.value || "").trim().toLowerCase();
    clearSearchBtn.style.display = query ? "block" : "none";

    if (query) {
        result = result.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.role.toLowerCase().includes(query) ||
            p.location.toLowerCase().includes(query) ||
            p.city.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    // 2. City
    const city = citySelect.value;
    if (city) {
        result = result.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }

    // 3. Price Tier
    const tier = tierSelect.value || activeTier;
    if (tier) {
        result = result.filter(p => p.tier.toLowerCase() === tier.toLowerCase());
    }

    // 4. Category
    if (activeCategory && activeCategory !== "all") {
        result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // 5. Sorting
    const sortVal = sortSelect.value;
    if (sortVal === "price_asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price_desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (sortVal === "rating") {
        result.sort((a, b) => b.rating - a.rating);
    } else if (sortVal === "newest") {
        result.sort((a, b) => b.id.localeCompare(a.id));
    } else {
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    currentProfiles = result;
    renderProfiles(currentProfiles);
    renderActiveFiltersSummary();
}

// Active Filters Indicator
function renderActiveFiltersSummary() {
    activeFiltersSummary.innerHTML = "";
    const activeFilters = [];

    if (searchInput.value.trim()) activeFilters.push(`"${searchInput.value.trim()}"`);
    if (citySelect.value) activeFilters.push(citySelect.value);
    if (tierSelect.value || activeTier) activeFilters.push(`${tierSelect.value || activeTier} Tier`);
    if (activeCategory !== "all") activeFilters.push(activeCategory);

    if (activeFilters.length > 0) {
        activeFilters.forEach(f => {
            const span = document.createElement("span");
            span.className = "active-filter-tag";
            span.innerHTML = `${f} <i class="fa-solid fa-xmark"></i>`;
            span.onclick = () => resetAllFilters();
            activeFiltersSummary.appendChild(span);
        });
    }
}

// Reset All Filters
function resetAllFilters(e) {
    if (e) e.preventDefault();
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    citySelect.value = "";
    tierSelect.value = "";
    sortSelect.value = "popular";
    activeCategory = "all";
    activeTier = "";

    chipButtons.forEach((btn, idx) => {
        btn.classList.toggle("active", idx === 0);
    });

    applyFilters();
    showToast("Filters reset to default", "fa-solid fa-arrows-rotate");
}

// Event Listeners for Filters
searchInput.addEventListener("input", applyFilters);
clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    applyFilters();
    searchInput.focus();
});
citySelect.addEventListener("change", applyFilters);
tierSelect.addEventListener("change", () => {
    activeTier = "";
    chipButtons.forEach(b => {
        if (b.dataset.tier) b.classList.remove("active");
    });
    applyFilters();
});
sortSelect.addEventListener("change", applyFilters);

// Chip buttons click
chipButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.dataset.filter !== undefined) {
            chipButtons.forEach(b => {
                if (b.dataset.filter !== undefined) b.classList.remove("active");
            });
            btn.classList.add("active");
            activeCategory = btn.dataset.filter;
        } else if (btn.dataset.tier !== undefined) {
            if (activeTier === btn.dataset.tier) {
                btn.classList.remove("active");
                activeTier = "";
                tierSelect.value = "";
            } else {
                chipButtons.forEach(b => {
                    if (b.dataset.tier !== undefined) b.classList.remove("active");
                });
                btn.classList.add("active");
                activeTier = btn.dataset.tier;
                tierSelect.value = activeTier;
            }
        }
        applyFilters();
    });
});

// ==================== PROFILE DETAILS MODAL ====================
function openProfileDetails(id) {
    const profile = LUMA_PROFILES.find(p => p.id === id);
    if (!profile) return;

    profileDetailsBody.innerHTML = `
        <div class="details-split-layout">
            <div class="details-gallery-col">
                <img src="${profile.gallery[0]}" class="details-main-img" id="detailsMainImg" alt="${profile.name} - ${profile.role}" />
                <div class="details-thumbs-row">
                    ${profile.gallery.map((img, i) => `
                        <img src="${img}" class="details-thumb ${i === 0 ? 'active' : ''}" onclick="switchDetailThumb(this, '${img}')" />
                    `).join("")}
                </div>
            </div>

            <div class="details-info-col">
                <div class="details-title-row">
                    <h2 class="details-name">
                        ${profile.name}
                        ${profile.verified ? '<i class="fa-solid fa-circle-check verified-icon" title="Verified Consultant"></i>' : ''}
                    </h2>
                    <div style="font-size:0.95rem; font-weight:600; color:#542047; margin-bottom:0.25rem;">
                        ${profile.role}
                    </div>
                    <div class="card-meta-loc">
                        <span>${profile.age} Years Old</span> • <span><i class="fa-solid fa-location-dot"></i> ${profile.location}</span>
                    </div>
                </div>

                <div class="details-badges-bar">
                    <span class="card-tier-pill ${profile.tier.toLowerCase()}">${profile.tier} Tier</span>
                    <span class="card-availability-tag" style="position:static; display:inline-flex;">
                        <span class="avail-dot"></span> ${profile.availability}
                    </span>
                    <span class="active-filter-tag"><i class="fa-solid fa-certificate"></i> Verified Talent</span>
                </div>

                <div class="details-price-box">
                    <span class="details-price-sub">${profile.priceBand} Consultation Band</span>
                    <div class="details-price-val">${formatINR(profile.price)} <span style="font-size:0.85rem; font-weight:500; color:#6e596a;">/ consulting session</span></div>
                </div>

                <p class="details-desc">${profile.description}</p>

                <div class="details-slots-box">
                    <h5>Available Consultation Windows</h5>
                    <div class="slots-pill-group">
                        ${profile.timeSlots.map(slot => `<span class="slot-pill"><i class="fa-regular fa-clock"></i> ${slot}</span>`).join("")}
                    </div>
                </div>

                <button class="btn btn-primary-plum btn-book-prominent" onclick="closeDetailsAndBook('${profile.id}')">
                    <i class="fa-regular fa-calendar-check"></i> Schedule Consultation Session
                </button>

                <div class="details-reviews-box">
                    <h5>Client Endorsements (${profile.rating.toFixed(1)} ★)</h5>
                    ${profile.reviews.map(r => `
                        <div class="review-item">
                            <strong>${r.author}</strong> <span style="color:#f39c12;">★ ${r.rating}</span> <span style="color:#888; font-size:0.75rem;">• ${r.date}</span>
                            <p style="margin-top:0.2rem; color:#444;">${r.text}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `;

    profileModal.style.display = "flex";
}

window.switchDetailThumb = function(thumb, src) {
    document.getElementById("detailsMainImg").src = src;
    document.querySelectorAll(".details-thumb").forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
};

function closeDetailsAndBook(id) {
    profileModal.style.display = "none";
    openBookingModal(id);
}

closeProfileModal.addEventListener("click", () => {
    profileModal.style.display = "none";
});

// ==================== CONSULTATION BOOKING MODAL & WORKFLOW ====================
function openBookingModal(id) {
    const profile = LUMA_PROFILES.find(p => p.id === id);
    if (!profile) return;

    bookingTargetId.value = profile.id;

    bookingProfilePreview.innerHTML = `
        <img src="${profile.image}" class="preview-thumb" alt="${profile.name}" />
        <div class="preview-info">
            <strong>${profile.name} — ${profile.role}</strong>
            <span><i class="fa-solid fa-location-dot"></i> ${profile.location} • ${formatINR(profile.price)}</span>
        </div>
    `;

    bookTime.innerHTML = profile.timeSlots.map(slot => `<option value="${slot}">${slot}</option>`).join("");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    bookDate.value = tomorrow.toISOString().split("T")[0];

    bookingFormStep.style.display = "block";
    bookingConfirmStep.style.display = "none";

    bookingModal.style.display = "flex";
}

closeBookingModal.addEventListener("click", () => {
    bookingModal.style.display = "none";
});

// Submit Consultation Booking
bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pid = bookingTargetId.value;
    const profile = LUMA_PROFILES.find(p => p.id === pid);
    if (!profile) return;

    const dateVal = bookDate.value;
    const timeVal = bookTime.value;
    const custName = document.getElementById("customerName").value || "Client Name";
    const custEmail = document.getElementById("customerEmail").value || "client@example.com";
    const notesVal = document.getElementById("bookNotes").value || "Initial strategy consultation";

    const newBooking = {
        id: "LUMA-BK-" + Math.floor(1000 + Math.random() * 9000),
        profileId: profile.id,
        profileName: profile.name,
        profileImage: profile.image,
        role: profile.role,
        location: profile.location,
        rate: profile.price,
        date: dateVal,
        timeSlot: timeVal,
        customerName: custName,
        customerEmail: custEmail,
        notes: notesVal,
        status: "Confirmed",
        bookedAt: new Date().toISOString()
    };

    demoBookings.unshift(newBooking);
    localStorage.setItem("luma_bookings", JSON.stringify(demoBookings));
    updateBadges();

    confirmDetailsBox.innerHTML = `
        <div class="confirm-detail-row">
            <span style="color:#6e596a;">Booking Reference:</span>
            <strong style="color:#542047; font-family:monospace;">${newBooking.id}</strong>
        </div>
        <div class="confirm-detail-row">
            <span style="color:#6e596a;">Consultant:</span>
            <strong>${newBooking.profileName} (${newBooking.role})</strong>
        </div>
        <div class="confirm-detail-row">
            <span style="color:#6e596a;">Date & Time:</span>
            <strong>${newBooking.date} • ${newBooking.timeSlot}</strong>
        </div>
        <div class="confirm-detail-row">
            <span style="color:#6e596a;">Consultation Fee:</span>
            <strong style="color:#542047;">${formatINR(newBooking.rate)}</strong>
        </div>
        <div class="confirm-detail-row">
            <span style="color:#6e596a;">Status:</span>
            <span class="history-status-badge Confirmed">Confirmed</span>
        </div>
    `;

    bookingFormStep.style.display = "none";
    bookingConfirmStep.style.display = "block";

    showToast(`Consultation ${newBooking.id} confirmed!`, "fa-solid fa-calendar-check");
});

doneConfirmBtn.addEventListener("click", () => {
    bookingModal.style.display = "none";
});

viewBookingsFromConfirmBtn.addEventListener("click", () => {
    bookingModal.style.display = "none";
    openBookingsModal();
});

// ==================== MY BOOKINGS MODAL ====================
function openBookingsModal() {
    bookingsHistoryList.innerHTML = "";

    if (demoBookings.length === 0) {
        bookingsHistoryList.innerHTML = `
            <div style="text-align:center; padding:2.5rem 1rem; color:#6e596a;">
                <i class="fa-regular fa-calendar-xmark" style="font-size:2.5rem; color:#542047; margin-bottom:0.8rem;"></i>
                <p>No booked consultations found. Click "Book Session" on any profile to test the scheduling flow.</p>
            </div>
        `;
    } else {
        demoBookings.forEach((b) => {
            const item = document.createElement("div");
            item.className = "history-item";
            item.innerHTML = `
                <div class="history-item-left">
                    <img src="${b.profileImage}" class="history-thumb" alt="${b.profileName}" />
                    <div class="history-info">
                        <strong>${b.profileName}</strong>
                        <div style="font-size:0.75rem; color:#542047;">${b.role || 'Consultant'}</div>
                        <span><i class="fa-regular fa-calendar"></i> ${b.date} • <i class="fa-regular fa-clock"></i> ${b.timeSlot}</span>
                        <div style="margin-top:2px;">
                            <span class="history-id">${b.id}</span> • <span>${formatINR(b.rate)}</span>
                        </div>
                    </div>
                </div>

                <div style="display:flex; align-items:center; gap:0.6rem;">
                    <span class="history-status-badge ${b.status}">${b.status}</span>
                    ${b.status !== 'Cancelled' ? `
                        <button class="btn-cancel-booking" onclick="cancelDemoBooking('${b.id}')">
                            Cancel
                        </button>
                    ` : ''}
                </div>
            `;
            bookingsHistoryList.appendChild(item);
        });
    }

    myBookingsModal.style.display = "flex";
}

window.cancelDemoBooking = function(bid) {
    const booking = demoBookings.find(b => b.id === bid);
    if (booking) {
        booking.status = "Cancelled";
        localStorage.setItem("luma_bookings", JSON.stringify(demoBookings));
        openBookingsModal();
        showToast(`Consultation ${bid} marked as Cancelled.`, "fa-solid fa-ban");
    }
};

openBookingsBtn.addEventListener("click", openBookingsModal);
closeBookingsModal.addEventListener("click", () => {
    myBookingsModal.style.display = "none";
});

// ==================== SAVED FAVORITES MODAL ====================
function openSavedModalView() {
    savedProfilesList.innerHTML = "";
    const saved = LUMA_PROFILES.filter(p => savedProfileIds.includes(p.id));

    if (saved.length === 0) {
        savedProfilesList.innerHTML = `
            <div style="text-align:center; padding:2.5rem 1rem; color:#6e596a;">
                <i class="fa-regular fa-heart" style="font-size:2.5rem; color:#542047; margin-bottom:0.8rem;"></i>
                <p>You haven't saved any consultants yet. Click the heart icon on any card to save it here.</p>
            </div>
        `;
    } else {
        saved.forEach(p => {
            const item = document.createElement("div");
            item.className = "history-item";
            item.innerHTML = `
                <div class="history-item-left">
                    <img src="${p.image}" class="history-thumb" alt="${p.name}" />
                    <div class="history-info">
                        <strong>${p.name}</strong>
                        <div style="font-size:0.75rem; color:#542047;">${p.role}</div>
                        <span><i class="fa-solid fa-location-dot"></i> ${p.location} • ${formatINR(p.price)}</span>
                    </div>
                </div>

                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <button class="btn btn-outline-plum" style="padding:0.35rem 0.7rem; font-size:0.78rem;" onclick="savedModal.style.display='none'; openProfileDetails('${p.id}')">
                        View
                    </button>
                    <button class="btn btn-primary-plum" style="padding:0.35rem 0.7rem; font-size:0.78rem;" onclick="savedModal.style.display='none'; openBookingModal('${p.id}')">
                        Book
                    </button>
                </div>
            `;
            savedProfilesList.appendChild(item);
        });
    }

    savedModal.style.display = "flex";
}

openSavedBtn.addEventListener("click", openSavedModalView);
closeSavedModal.addEventListener("click", () => {
    savedModal.style.display = "none";
});

// Close modals on backdrop click
[profileModal, bookingModal, myBookingsModal, savedModal].forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});

// Escape key to close modals
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        [profileModal, bookingModal, myBookingsModal, savedModal].forEach(m => m.style.display = "none");
    }
});

// Initial Page Load
updateBadges();
applyFilters();
