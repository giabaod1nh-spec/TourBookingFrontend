// Tour data
const tours = [
    {
        id: 1,
        title: "Mountain Trek Adventure",
        price: 599,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&q=80&w=800",
        description: "3 days of mountain trekking and camping"
    },
    {
        id: 2,
        title: "Beach Paradise Tour",
        price: 799,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&q=80&w=800",
        description: "5 days of island hopping and snorkeling"
    },
    {
        id: 3,
        title: "Cultural City Explorer",
        price: 499,
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&q=80&w=800",
        description: "4 days exploring historical landmarks"
    },
    {
        id: 4,
        title: "Safari Adventure",
        price: 899,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&q=80&w=800",
        description: "6 days wildlife safari experience"
    }
];

let currentBooking = null;

// Initialize the application
function initApp() {
    const toursGrid = document.getElementById('toursGrid');
    if (toursGrid) {
        const fragment = document.createDocumentFragment();
        displayTours(fragment);
        toursGrid.appendChild(fragment);
    }
    setupEventHandlers();
}

// Display tours in the grid using document fragment
function displayTours(fragment) {
    tours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.className = 'tour-card';
        tourCard.innerHTML = `
            <img src="${tour.image}" alt="${tour.title}" class="tour-image" loading="lazy">
            <div class="tour-content">
                <h3 class="tour-title">${tour.title}</h3>
                <p class="tour-description">${tour.description}</p>
                <p class="tour-price">$${tour.price}</p>
                <button class="btn book-btn" data-tour-id="${tour.id}">Book Now</button>
            </div>
        `;
        fragment.appendChild(tourCard);
    });
}

// Setup event handlers using event delegation
function setupEventHandlers() {
    const bookingModal = document.getElementById('bookingModal');
    const paymentModal = document.getElementById('paymentModal');
    const body = document.body;

    body.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('book-btn')) {
            const tourId = parseInt(target.dataset.tourId);
            currentBooking = tours.find(tour => tour.id === tourId);
            bookingModal.style.display = 'flex'; // Changed from 'block' to 'flex'
            bookingModal.dataset.tourId = tourId;
        }

        if (target.classList.contains('close')) {
            target.closest('.modal').style.display = 'none';
        }

        if (target === bookingModal || target === paymentModal) {
            target.style.display = 'none';
        }
    });

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    setupCardValidation();
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = {
        tourId: currentBooking.id,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        guests: parseInt(document.getElementById('guests').value)
    };

    // Calculate total price
    const totalPrice = currentBooking.price * formData.guests;
    
    // Update payment summary
    const paymentSummary = document.getElementById('paymentSummary');
    paymentSummary.innerHTML = `
        <h3>${currentBooking.title}</h3>
        <p>Date: ${formData.date}</p>
        <p>Guests: ${formData.guests}</p>
        <p>Price per person: $${currentBooking.price}</p>
        <p class="total">Total: $${totalPrice}</p>
    `;

    // Hide booking modal and show payment modal
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'flex'; // Changed from 'block' to 'flex'
}

function handlePaymentSubmit(e) {
    e.preventDefault();
    
    const paymentData = {
        cardName: document.getElementById('cardName').value,
        cardNumber: document.getElementById('cardNumber').value,
        expiryDate: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value
    };

    // Here you would typically send this data to a payment processor
    console.log('Payment submitted:', paymentData);
    
    // Show success message
    alert('Payment successful! Your tour has been booked.');
    
    // Reset forms and close modal
    e.target.reset();
    document.getElementById('bookingForm').reset();
    document.getElementById('paymentModal').style.display = 'none';
    currentBooking = null;
}

function setupCardValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');

    cardNumber.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16);
    });

    expiryDate.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value
    };

    console.log('Contact form submitted:', formData);
    alert('Message sent successfully!');
    e.target.reset();
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);