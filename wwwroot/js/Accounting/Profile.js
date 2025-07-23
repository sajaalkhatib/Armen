// Profile Accounting JavaScript

// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Notification toggle
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('show');

    // Close when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.relative')) {
            dropdown.classList.remove('show');
        }
    });
}

// Mark notification as read
function markAsRead(notification) {
    notification.classList.remove('unread');
    updateNotificationCount();
}

// Update notification count
function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-dropdown .badge');
    const topBadge = document.querySelector('nav .bg-red-500');

    if (unreadCount > 0) {
        badge.textContent = `${unreadCount} ????`;
        topBadge.textContent = unreadCount;
    } else {
        badge.textContent = '?? ???? ??????? ?????';
        topBadge.style.display = 'none';
    }
}

// Profile functions
function editProfile() {
    const inputs = document.querySelectorAll('.form-input:not([disabled])');
    inputs.forEach(input => {
        input.style.background = 'white';
        input.style.borderColor = '#f59e0b';
    });
    alert('????? ???? ????? ????????? ??????? ???????');
}

function saveChanges() {
    alert('?? ??? ????????? ?????!');
}

function changePassword() {
    alert('???? ?????? ????? ????? ???? ??????');
}

function generateReport() {
    alert('???? ????? ??????? ??????...');
}

function exportData() {
    alert('???? ????? ????????...');
}

function viewPendingTasks() {
    window.location.href = '/Accounting/Dashboard';
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Accounting Profile page loaded successfully');

    // Simulate real-time notifications
    setTimeout(() => {
        console.log('New notification received');
    }, 30000);
});