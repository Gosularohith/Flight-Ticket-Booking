// Mock Flight Data
const airlines = [
    { name: 'SkyBound Elite', code: 'SB', logo: '✈️' },
    { name: 'AeroLux', code: 'AL', logo: '🚀' },
    { name: 'CloudNine', code: 'CN', logo: '☁️' },
    { name: 'Horizon Air', code: 'HA', logo: '🌅' }
];

const cities = ['London', 'New York', 'Dubai', 'Singapore', 'Tokyo'];

// DOM Elements
const searchForm = document.getElementById('search-form');
const homePage = document.getElementById('home-page');
const resultsPage = document.getElementById('results-page');
const flightsContainer = document.getElementById('flights-container');
const backBtn = document.getElementById('back-to-search');
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const cancelBooking = document.getElementById('cancel-booking');
const successScreen = document.getElementById('success-screen');
const heroImg = document.getElementById('hero-img');

// Set Hero Image
heroImg.src = 'C:/Users/gosul/.gemini/antigravity/brain/5333673e-5430-4d62-9038-b00aeedb9788/airline_hero_background_1776514325202.png';

// State
let selectedFlight = null;

// Initialization
document.getElementById('search-date').valueAsDate = new Date();

// Helper: Generate Random Flights
function generateFlights(from, to) {
    const flights = [];
    const numFlights = 4 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numFlights; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const depHour = 6 + Math.floor(Math.random() * 14);
        const duration = 5 + Math.floor(Math.random() * 10);
        const price = 450 + Math.floor(Math.random() * 2000);
        
        flights.push({
            id: Math.random().toString(36).substr(2, 9),
            airline: airline,
            from: from,
            to: to,
            departure: `${depHour}:00`,
            arrival: `${(depHour + duration) % 24}:30`,
            duration: `${duration}h 30m`,
            price: price
        });
    }
    return flights.sort((a, b) => a.price - b.price);
}

// Render Flight Card
function createFlightCard(flight) {
    const card = document.createElement('div');
    card.className = 'flight-card glass fade-in';
    card.innerHTML = `
        <div class="airline-info">
            <div class="airline-logo">${flight.airline.logo}</div>
            <div>
                <div style="font-weight: 700;">${flight.airline.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${flight.airline.code}-${Math.floor(Math.random()*900+100)}</div>
            </div>
        </div>
        <div class="time-info text-right">
            <div class="time">${flight.departure}</div>
            <div class="city">${flight.from}</div>
        </div>
        <div class="flight-path">
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${flight.duration}</div>
            <div class="path-line"></div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Non-stop</div>
        </div>
        <div class="time-info text-left">
            <div class="time">${flight.arrival}</div>
            <div class="city">${flight.to}</div>
        </div>
        <div class="price-booking">
            <div class="price">$${flight.price}</div>
            <button class="btn btn-primary" onclick="openBooking('${flight.id}')">Select</button>
        </div>
    `;
    return card;
}

// Event Listeners
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('from-city').value;
    const to = document.getElementById('to-city').value;
    
    if (from === to) {
        alert("Departure and destination cannot be the same.");
        return;
    }

    const flights = generateFlights(from, to);
    flightsContainer.innerHTML = '';
    flights.forEach(f => {
        const card = createFlightCard(f);
        flightsContainer.appendChild(card);
    });

    homePage.classList.add('hidden');
    resultsPage.style.display = 'block';
    document.getElementById('search-title').innerText = `Flights from ${from} to ${to}`;
    
    // Globally Store Flights for Selection
    window.currentFlights = flights;
});

backBtn.addEventListener('click', () => {
    resultsPage.style.display = 'none';
    homePage.classList.remove('hidden');
});

window.openBooking = (flightId) => {
    selectedFlight = window.currentFlights.find(f => f.id === flightId);
    document.getElementById('target-dest').innerText = selectedFlight.to;
    bookingModal.style.display = 'flex';
};

cancelBooking.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('p-name').value;
    
    // Close modal and show success screen
    bookingModal.style.display = 'none';
    successScreen.style.display = 'flex';
    
    // Generate Ticket Preview
    const ticketPreview = document.getElementById('ticket-preview');
    ticketPreview.innerHTML = `
        <div style="border-bottom: 1px dashed var(--glass-border); padding-bottom: 1rem; margin-bottom: 1rem;">
            <div style="font-size: 0.75rem; color: var(--text-secondary);">PASSENGER</div>
            <div style="font-weight: 700; font-size: 1.25rem;">${name.toUpperCase()}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
            <div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">FROM</div>
                <div style="font-weight: 700;">${selectedFlight.from}</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 0.75rem; color: var(--text-secondary);">TO</div>
                <div style="font-weight: 700;">${selectedFlight.to}</div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">FLIGHT</div>
                <div style="font-weight: 700;">${selectedFlight.airline.code}${Math.floor(Math.random()*900+100)}</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">DATE</div>
                <div style="font-weight: 700;">${document.getElementById('search-date').value}</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 0.75rem; color: var(--text-secondary);">PASSENGERS</div>
                <div style="font-weight: 700;">${document.getElementById('passengers').value}</div>
            </div>
        </div>
        <div style="margin-top: 2rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; text-align: center;">
            <div style="font-size: 0.75rem; color: var(--primary);">TOTAL PAID</div>
            <div style="font-size: 1.5rem; font-weight: 800;">$${selectedFlight.price * parseInt(document.getElementById('passengers').value)}</div>
        </div>
    `;
});
