 
        // Initialize AOS
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-in-out',
        });

        // Notification functionality
        let notificationCount = 3;

        function toggleNotifications() {
            const container = document.getElementById('notificationContainer');
            if (container.style.display === 'none') {
                container.style.display = 'block';
                // Mark notifications as read
                document.querySelectorAll('.notification.new').forEach(notification => {
                    notification.classList.remove('new');
                });
                updateNotificationBadge(0);
            } else {
                container.style.display = 'none';
            }
        }

        function closeNotification(notificationId) {
            const notification = document.getElementById(notificationId);
            notification.style.animation = 'slideOutLeft 0.5s ease';
            setTimeout(() => {
                notification.remove();
                const remainingNotifications = document.querySelectorAll('.notification').length;
                if (remainingNotifications === 0) {
                    document.getElementById('notificationContainer').style.display = 'none';
                }
            }, 500);
        }

        function updateNotificationBadge(count) {
            const badge = document.getElementById('notificationBadge');
            if (count > 0) {
                badge.textContent = count;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }

        // Add new notification from shipping department
        function addShippingNotification(message, orderId) {
            const container = document.getElementById('notificationContainer');
            const notificationId = 'notification_' + Date.now();
            
            const notification = document.createElement('div');
            notification.className = 'notification new';
            notification.id = notificationId;
            notification.innerHTML = `
                <button class="notification-close" onclick="closeNotification('${notificationId}')">×</button>
                <div class="notification-header">
                    <span class="notification-title">رسالة جديدة من قسم الشحن</span>
                    <span class="notification-time">الآن</span>
                </div>
                <div class="notification-content">
                    <strong>قسم الشحن:</strong> ${message} - الطلب #${orderId}
                </div>
            `;
            
            container.insertBefore(notification, container.firstChild);
            notificationCount++;
            updateNotificationBadge(notificationCount);
            
            // Auto show notifications
            container.style.display = 'block';
            
            // Show browser notification if supported
            if (Notification.permission === 'granted') {
                new Notification('رسالة جديدة من قسم الشحن', {
                    body: message,
                    icon: '/favicon.ico'
                });
            }
        }

        // Search functionality
        function quickSearch(category) {
            const searchInput = document.getElementById('searchInput');
            let searchTerm = '';
            
            switch(category) {
                case 'electronics':
                    searchTerm = 'electronics';
                    break;
                case 'textiles':
                    searchTerm = 'textile';
                    break;
                case 'machinery':
                    searchTerm = 'machinery';
                    break;
            }
            
            searchInput.value = searchTerm;
            alert(`البحث عن: ${searchTerm}`);
        }

        function viewDetails(hsCode) {
            alert(`عرض تفاصيل الكود: ${hsCode}`);
        }

        function exportData() {
            alert('جاري تحضير ملف Excel للتصدير...');
        }

        // Sidebar toggle functionality
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const toggleButton = document.getElementById('sidebarToggle');
            const toggleIcon = toggleButton.querySelector('i');
            
            sidebar.classList.toggle('hidden');
            
            if (sidebar.classList.contains('hidden')) {
                mainContent.classList.remove('mr-64');
                mainContent.classList.add('mr-0');
                toggleIcon.className = 'fas fa-bars';
            } else {
                mainContent.classList.remove('mr-0');
                mainContent.classList.add('mr-64');
                toggleIcon.className = 'fas fa-times';
            }
        }

        // Request notification permission
        document.addEventListener('DOMContentLoaded', function() {
            if (Notification.permission === 'default') {
                Notification.requestPermission();
            }
            
            console.log('HS Code Database page loaded successfully');
            
            // Simulate receiving new notification from shipping department
            setTimeout(() => {
                addShippingNotification('تم تحديث موعد الاستلام من المخزن إلى 26/7', 'ORD-2025-008');
            }, 10000); // After 10 seconds
        });

        // Add CSS animation for slide out
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideOutLeft {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);