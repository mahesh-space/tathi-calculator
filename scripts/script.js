const months = [
    {name: "Chaitra", index: 0},
    {name: "Vaishakha", index: 1},
    {name: "Jyeshtha", index: 2},
    {name: "Ashadha", index: 3},
    {name: "Shravana", index: 4},
    {name: "Bhadrapada", index: 5},
    {name: "Ashwin", index: 6},
    {name: "Kartika", index: 7},
    {name: "Margashirsha", index: 8},
    {name: "Pausha", index: 9},
    {name: "Magha", index: 10},
    {name: "Phalguna", index: 11}
];

let selectedStart = null;
let selectedEnd = null;
let currentInput = null;

// Modal Elements
const modal = document.getElementById("calendarModal");
const closeBtn = document.querySelector(".close");

// Open modal when Tithi input is clicked
document.getElementById("startTithi").addEventListener("click", () => {
    currentInput = "start";
    modal.style.display = "flex";
});

document.getElementById("endTithi").addEventListener("click", () => {
    currentInput = "end";
    modal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Create calendar
function createCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    months.forEach(month => {
        const card = document.createElement("div");
        card.className = "month-card";
        card.innerHTML = `
            <h3>${month.name}</h3>
            <div class="paksha">
                <h4>Krishna Paksha</h4>
                <div class="tithi-grid" id="m${month.index}-krishna"></div>
            </div>
            <div class="paksha">
                <h4>Shukla Paksha</h4>
                <div class="tithi-grid" id="m${month.index}-shukla"></div>
            </div>
        `;

        // Add Krishna Paksha days
        const krishnaGrid = card.querySelector(`#m${month.index}-krishna`);
        for(let i = 1; i <= 15; i++) {
            const btn = createTithiButton(month.index, 0, i);
            krishnaGrid.appendChild(btn);
        }

        // Add Shukla Paksha days
        const shuklaGrid = card.querySelector(`#m${month.index}-shukla`);
        for(let i = 1; i <= 15; i++) {
            const btn = createTithiButton(month.index, 1, i);
            shuklaGrid.appendChild(btn);
        }

        calendar.appendChild(card);
    });
}

// Create Tithi button
function createTithiButton(month, paksha, day) {
    const btn = document.createElement("button");
    btn.className = "tithi-btn";
    btn.textContent = day;
    btn.dataset.month = month;
    btn.dataset.paksha = paksha;
    btn.dataset.day = day;

    btn.addEventListener("click", () => {
        const tithi = `${months[month].name} ${paksha ? "Shukla" : "Krishna"} ${day}`;
        if(currentInput === "start") {
            selectedStart = {month, paksha, day};
            document.getElementById("startTithi").value = tithi;
        } else {
            selectedEnd = {month, paksha, day};
            document.getElementById("endTithi").value = tithi;
        }
        modal.style.display = "none";
    });

    return btn;
}

// Calculate interest
function calculateInterest() {
    if(!selectedStart || !selectedEnd) {
        alert("Please select both start and end Tithis.");
        return;
    }

    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const frequency = parseInt(document.getElementById("frequency").value);

    // Calculate total Tithis
    const startTithi = calculateTithiNumber(selectedStart.month, selectedStart.paksha, selectedStart.day);
    let endTithi = calculateTithiNumber(selectedEnd.month, selectedEnd.paksha, selectedEnd.day);
    if(endTithi < startTithi) endTithi += 360;
    const totalTithis = endTithi - startTithi;

    // Convert to solar years
    const days = totalTithis * (29.53 / 30);
    const years = days / 365.25;

    // Compound interest calculation
    const amount = principal * Math.pow(1 + rate / frequency, frequency * years);

    // Display results
    document.getElementById("result").innerHTML = `
        <h3>From ${months[selectedStart.month].name} ${selectedStart.paksha ? "Shukla" : "Krishna"} ${selectedStart.day}</h3>
        <h3>To ${months[selectedEnd.month].name} ${selectedEnd.paksha ? "Shukla" : "Krishna"} ${selectedEnd.day}</h3>
        <p>Total Tithis: ${totalTithis} (≈${days.toFixed(1)} days)</p>
        <p>Maturity Amount: ₹${amount.toFixed(2)}</p>
    `;
}

// Helper function to calculate Tithi number
function calculateTithiNumber(month, paksha, day) {
    return (month * 30) + (paksha * 15) + day;
}

// Initialize calendar on load
window.onload = createCalendar;