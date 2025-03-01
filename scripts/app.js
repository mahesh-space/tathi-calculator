const months = [
    "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha",
    "Shravana", "Bhadrapada", "Ashwin", "Kartika",
    "Margashirsha", "Pausha", "Magha", "Phalguna"
];

let chart;

// Initialize dropdowns
function initDropdowns() {
    const monthSelects = document.querySelectorAll('.tithi-select[id$="Month"]');
    const daySelects = document.querySelectorAll('.tithi-select[id$="Day"]');

    // Populate months
    monthSelects.forEach(select => {
        months.forEach((month, index) => {
            const option = new Option(month, index);
            select.add(option);
        });
    });

    // Populate days (1-15)
    daySelects.forEach(select => {
        for(let i = 1; i <= 15; i++) {
            const option = new Option(i, i);
            select.add(option);
        }
    });
}

function getTithiNumber(month, paksha, day) {
    return (month * 30) + (paksha * 15) + day;
}

function calculate() {
    // Get tithi values
    const startMonth = parseInt(document.getElementById('startMonth').value);
    const startPaksha = parseInt(document.getElementById('startPaksha').value);
    const startDay = parseInt(document.getElementById('startDay').value);
    
    const endMonth = parseInt(document.getElementById('endMonth').value);
    const endPaksha = parseInt(document.getElementById('endPaksha').value);
    const endDay = parseInt(document.getElementById('endDay').value);

    // Calculate tithi numbers
    const startTithi = getTithiNumber(startMonth, startPaksha, startDay);
    const endTithi = getTithiNumber(endMonth, endPaksha, endDay);
    
    // Handle year transition
    let tathis = endTithi - startTithi;
    if(tathis < 0) tathis += 360;  // Assume next year

    // Financial calculations
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const frequency = parseInt(document.getElementById('frequency').value);
    
    // Convert tathis to years
    const days = tathis * (29.53/30);  // 1 tithi ≈ 0.9843 days
    const years = days / 365.25;
    
    // Compound interest calculation
    const amount = principal * Math.pow(1 + rate/frequency, frequency * years);
    
    // Display results
    document.getElementById('result').innerHTML = `
        <h3>Maturity Amount: ₹${amount.toFixed(2)}</h3>
        <p>Time Period: ${tathis} Tathis (≈${days.toFixed(1)} days)</p>
    `;

    // Update chart
    updateChart(principal, rate, tathis, frequency);
}

function updateChart(P, r, T, n) {
    const ctx = document.getElementById('chart').getContext('2d');
    if(chart) chart.destroy();

    const dataPoints = [];
    for(let t = 0; t <= T; t++) {
        const years = (t * 0.9843) / 365.25;
        dataPoints.push(P * Math.pow(1 + r/n, n * years));
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: T+1}, (_, i) => i),
            datasets: [{
                label: 'Amount Growth',
                data: dataPoints,
                borderColor: '#d97706',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Tathis Elapsed' }},
                y: { title: { display: true, text: 'Amount (₹)' }}
            }
        }
    });
}

// Initialize on load
window.onload = initDropdowns;