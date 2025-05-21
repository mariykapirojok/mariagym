document.addEventListener('DOMContentLoaded', () => {
  const navIcon = document.querySelector('.nav-icon');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const overlay = document.querySelector('.overlay');
  const scheduleOverlay = document.querySelector('.schedule-overlay');
  const trainerOverlay = document.querySelector('.trainer-overlay');
  const bookingOverlay = document.querySelector('.booking-overlay');
  const subscriptionOverlay = document.querySelector('.subscription-overlay');
  const popupClose = document.querySelector('.popup-close');
  const scheduleClose = document.querySelector('.schedule-close');
  const trainerClose = document.querySelector('.trainer-close');
  const bookingClose = document.querySelector('.booking-close');
  const subscriptionClose = document.querySelector('.close-subscription');
  const priceBooks = document.querySelectorAll('.price-book');
  const scheduleBooks = document.querySelectorAll('.schedule-book');
  const trainerBooks = document.querySelectorAll('.trainer-book');
  const bookingOpen = document.querySelector('.booking-open');
  const aboutCta = document.querySelector('.about-cta');

  // Проверка на наличие элементов
  if (!navIcon || !navMenu || !overlay || !scheduleOverlay || !trainerOverlay || !bookingOverlay || !subscriptionOverlay) {
    console.error('Один или несколько необходимых элементов не найден');
    return;
  }

  // Мобильное меню
  navIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Обработчик отправки форм
  const handleFormSubmit = (form, successMessage, requiresTel = true) => {
    if (!form) {
      console.error('Форма не найдена');
      return;
    }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Валидация
      if (!data.name?.trim()) {
        alert('Пожалуйста, введите имя');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        alert('Пожалуйста, введите корректный email');
        return;
      }
      if (requiresTel && !data.tel?.trim()) {
        alert('Пожалуйста, введите номер телефона');
        return;
      }

      try {
        // Имитация отправки
        console.log('Отправка данных:', data);

        // Показ сообщения об успехе и сброс формы
        alert(successMessage);
        form.reset();

        // Закрытие попапа
        const parentOverlay = form.closest('.overlay, .schedule-overlay, .trainer-overlay, .booking-overlay, .subscription-overlay');
        if (parentOverlay) {
          parentOverlay.classList.remove('fade-in');
          parentOverlay.classList.add('fade-out');
          setTimeout(() => {
            parentOverlay.style.display = 'none';
            parentOverlay.classList.remove('fade-out');
          }, 400);
        }
      } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка при отправке. Попробуйте снова.');
      }
    });
  };

  // Инициализация форм
  const forms = [
    { id: 'price-form', message: 'Заявка на абонемент успешно отправлена!' },
    { id: 'schedule-form', message: 'Заявка на занятие успешно отправлена!' },
    { id: 'trainer-form', message: 'Заявка к тренеру успешно отправлена!' },
    { id: 'booking-form', message: 'Заявка на тренировку успешно отправлена!' },
    { id: 'contact-form', message: 'Сообщение успешно отправлено!', requiresTel: false },
    { id: 'subscription-form', message: 'Заявка на абонемент успешно отправлена!' }
  ];

  forms.forEach(({ id, message, requiresTel }) => {
    const form = document.getElementById(id);
    if (form) {
      handleFormSubmit(form, message, requiresTel);
    } else {
      console.error(`Форма с ID ${id} не найдена`);
    }
  });

  // Попап для абонементов
  priceBooks.forEach(button => {
    button.addEventListener('click', () => {
      const plan = button.closest('.price-card').dataset.plan;
      overlay.querySelector('.popup-details').textContent = `Вы выбрали абонемент: ${plan}`;
      overlay.querySelector('.popup-plan').value = plan;
      overlay.style.display = 'flex';
      overlay.classList.add('fade-in');
    });
  });

  // Попап для расписания
  scheduleBooks.forEach(button => {
    button.addEventListener('click', () => {
      const classEl = button.closest('.schedule-class');
      const className = classEl.dataset.class;
      const day = classEl.dataset.day;
      const time = classEl.dataset.time;
      const trainer = classEl.dataset.trainer;
      const details = `${className} (${day}, ${time}, тренер: ${trainer})`;
      scheduleOverlay.querySelector('.schedule-details').textContent = `Вы выбрали занятие: ${details}`;
      scheduleOverlay.querySelector('.schedule-class').value = details;
      scheduleOverlay.style.display = 'flex';
      scheduleOverlay.classList.add('fade-in');
    });
  });

  // Попап для тренеров
  trainerBooks.forEach(button => {
    button.addEventListener('click', () => {
      const trainer = button.closest('.trainer-card').dataset.trainer;
      trainerOverlay.querySelector('.trainer-details').textContent = `Вы выбрали тренера: ${trainer}`;
      trainerOverlay.querySelector('.trainer-name').value = trainer;
      trainerOverlay.style.display = 'flex';
      trainerOverlay.classList.add('fade-in');
    });
  });

  // Попап для записи из Hero
  bookingOpen.addEventListener('click', () => {
    bookingOverlay.style.display = 'flex';
    bookingOverlay.classList.add('fade-in');
  });

  // Попап для абонементов из секции "О нас"
  aboutCta.addEventListener('click', () => {
    subscriptionOverlay.style.display = 'flex';
    subscriptionOverlay.classList.add('fade-in');
  });

  // Закрытие попапов
  popupClose.addEventListener('click', () => {
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.classList.remove('fade-out');
    }, 400);
  });

  scheduleClose.addEventListener('click', () => {
    scheduleOverlay.classList.remove('fade-in');
    scheduleOverlay.classList.add('fade-out');
    setTimeout(() => {
      scheduleOverlay.style.display = 'none';
      scheduleOverlay.classList.remove('fade-out');
    }, 400);
  });

  trainerClose.addEventListener('click', () => {
    trainerOverlay.classList.remove('fade-in');
    trainerOverlay.classList.add('fade-out');
    setTimeout(() => {
      trainerOverlay.style.display = 'none';
      trainerOverlay.classList.remove('fade-out');
    }, 400);
  });

  bookingClose.addEventListener('click', () => {
    bookingOverlay.classList.remove('fade-in');
    bookingOverlay.classList.add('fade-out');
    setTimeout(() => {
      bookingOverlay.style.display = 'none';
      bookingOverlay.classList.remove('fade-out');
    }, 400);
  });

  subscriptionClose.addEventListener('click', () => {
    subscriptionOverlay.classList.remove('fade-in');
    subscriptionOverlay.classList.add('fade-out');
    setTimeout(() => {
      subscriptionOverlay.style.display = 'none';
      subscriptionOverlay.classList.remove('fade-out');
    }, 400);
  });

  // Анимация секций при прокрутке
  const sections = document.querySelectorAll('.section-animate');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach(section => observer.observe(section));
});