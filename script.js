// Add animations on scroll and modal functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add the new dropdown toggle function
  window.toggleDropdown = function(id) {
    const dropdown = document.getElementById(id);
    const title = dropdown.previousElementSibling;
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    title.classList.toggle("active");
  }

  // Add animations on scroll
  const animateElements = document.querySelectorAll('.animate__animated');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.dataset.animation);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
  });

  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Modal functionality for rooms and amenities
  const modals = document.querySelectorAll('.modal');
  const modalButtons = document.querySelectorAll('.room-button, .amenity-button');
  const closeButtons = document.querySelectorAll('.close');

  // Open modal
  modalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = 'flex';
    });
  });

  // Close modal when clicking the close button
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modals.forEach((modal) => {
        modal.style.display = 'none';
      });
    });
  });

  // Close modal when clicking outside the modal
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Close modal and scroll to booking form when "Book Now" is clicked in the modal
  const modalBookNowButtons = document.querySelectorAll('.modal-content .cta-button');
  modalBookNowButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = button.closest('.modal');
      modal.style.display = 'none'; // Close the modal

      // Scroll to the booking form
      const bookingForm = document.getElementById('contact');
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Booking form submission
  document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookingDetails = Object.fromEntries(formData.entries());
    console.log('Booking Details:', bookingDetails); // Replace with your submission logic
    alert('Thank you for your booking! We will contact you shortly.');
    e.target.reset();
  });

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const sunIcon = darkModeToggle.querySelector('.fa-sun');
  const moonIcon = darkModeToggle.querySelector('.fa-moon');

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Toggle between sun and moon icons
    if (document.body.classList.contains('dark-mode')) {
      sunIcon.style.display = 'none'; // Hide sun
      moonIcon.style.display = 'block'; // Show moon
    } else {
      sunIcon.style.display = 'block'; // Show sun
      moonIcon.style.display = 'none'; // Hide moon
    }
  });

  // Testimonials Carousel
  let testimonialIndex = 0;
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');

  function showTestimonials() {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove('fade');
    });

    // Show the current slide
    testimonialSlides[testimonialIndex].classList.add('fade');

    // Move to the next slide
    testimonialIndex++;

    // Reset index if it exceeds the number of slides
    if (testimonialIndex >= testimonialSlides.length) {
      testimonialIndex = 0;
    }

    // Change slide every 5 seconds
    setTimeout(showTestimonials, 5000);
  }

  // Start the testimonial carousel
  showTestimonials();
});