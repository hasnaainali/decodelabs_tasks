const pages = {
    dashboard: document.getElementById('dashboard-page'),
    analytics: document.getElementById('analytics-page'),
    customers: document.getElementById('customers-page'),
    projects: document.getElementById('projects-page'),
    contact: document.getElementById('contact-page')
};
const navLinks = document.querySelectorAll('.nav-links li');
const pageTitle = document.getElementById('pageTitle');

function switchPage(pageName) {
    Object.values(pages).forEach(page => { if (page) page.classList.remove('active-page'); });
    if (pages[pageName]) pages[pageName].classList.add('active-page');
    const titles = { dashboard: 'Dashboard Overview', analytics: 'Analytics Dashboard', customers: 'Customer Management', projects: 'Project Portfolio', contact: 'Contact Support' };
    pageTitle.textContent = titles[pageName] || 'Dashboard';
    navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('data-page') === pageName) link.classList.add('active'); });
    if (window.innerWidth <= 767 && sidebar.classList.contains('active')) sidebar.classList.remove('active');
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        if (pageName) switchPage(pageName);
    });
});

const menuToggle = document.getElementById('mobile-menu');
const sidebar = document.getElementById('sidebar');
if (menuToggle) {
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
}

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 767 && !sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}
updateDate();

let toastTimeout = null;
function showToast(message, isError = false) {
    if (toastTimeout) clearTimeout(toastTimeout);
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.style.background = isError ? '#c62828' : '#2e7d32';
    toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    toastTimeout = setTimeout(() => toast.remove(), 3000);
}

const refreshBtn = document.getElementById('refreshChartBtn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        const bars = document.querySelectorAll('#dashboard-page .bar');
        const newHeights = [52, 71, 48, 83, 96, 70, 44];
        bars.forEach((bar, index) => { if (newHeights[index]) bar.style.height = newHeights[index] + 'px'; });
        const barValues = ['$5.2k', '$7.1k', '$4.8k', '$8.3k', '$9.6k', '$7.0k', '$4.4k'];
        const barSpans = document.querySelectorAll('#dashboard-page .bar-item span:last-child');
        barSpans.forEach((span, idx) => { if (barValues[idx]) span.textContent = barValues[idx]; });
        showToast('Chart data refreshed successfully!');
    });
}

const addActivityBtn = document.getElementById('addActivityBtn');
const activityList = document.getElementById('activityList');
if (addActivityBtn && activityList) {
    addActivityBtn.addEventListener('click', () => {
        const activities = ['🔔 Support ticket #102 resolved', '📈 Monthly goal reached! +18% growth', '🤝 New partnership with TechStart', '💡 Dashboard UI updated', '⭐ User feedback: 4.8 stars', '💰 New payment received: $12,450', '📊 Q2 report generated'];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        const newLi = document.createElement('li');
        newLi.innerHTML = `<i class="fas fa-bolt"></i> ${randomActivity}`;
        activityList.prepend(newLi);
        if (activityList.children.length > 6) activityList.removeChild(activityList.lastChild);
        showToast('New activity added!');
    });
}

let customers = [
    { name: 'John Martinez', email: 'john.m@email.com', plan: 'Enterprise Plan', date: '2025-01-15', status: 'active' },
    { name: 'Sarah Williams', email: 'sarah.w@email.com', plan: 'Pro Plan', date: '2025-02-03', status: 'active' },
    { name: 'Michael Chen', email: 'michael.c@email.com', plan: 'Basic Plan', date: '2025-03-20', status: 'inactive' },
    { name: 'Emma Davis', email: 'emma.d@email.com', plan: 'Enterprise Plan', date: '2025-01-28', status: 'active' },
    { name: 'Robert Wilson', email: 'robert.w@email.com', plan: 'Pro Plan', date: '2025-02-14', status: 'active' }
];

function renderCustomers() {
    const customerList = document.getElementById('customerList');
    if (!customerList) return;
    customerList.innerHTML = '';
    customers.forEach(customer => {
        const customerDiv = document.createElement('div');
        customerDiv.className = 'customer-card';
        customerDiv.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <div><h4>${customer.name}</h4><p>${customer.email} | ${customer.plan}</p><small>Joined: ${new Date(customer.date).toLocaleDateString()}</small></div>
            <span class="customer-status ${customer.status}">${customer.status === 'active' ? 'Active' : 'Inactive'}</span>
        `;
        customerList.appendChild(customerDiv);
    });
    document.getElementById('totalCustomers').textContent = customers.length;
    document.getElementById('activeCustomers').textContent = customers.filter(c => c.status === 'active').length;
}

const modal = document.getElementById('customerModal');
const addCustomerBtn = document.getElementById('addCustomerBtn');
const modalClose = document.querySelector('.modal-close');

if (addCustomerBtn) {
    addCustomerBtn.addEventListener('click', () => { modal.style.display = 'block'; });
}
if (modalClose) {
    modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
}
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

const customerForm = document.getElementById('customerForm');
if (customerForm) {
    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('custName').value;
        const email = document.getElementById('custEmail').value;
        const plan = document.getElementById('custPlan').value;
        const date = document.getElementById('custDate').value;
        const status = document.getElementById('custStatus').value;
        if (!name || !email || !date) { showToast('Please fill all fields!', true); return; }
        customers.unshift({ name, email, plan, date, status });
        renderCustomers();
        modal.style.display = 'none';
        customerForm.reset();
        showToast(`Customer ${name} added successfully!`);
    });
}

let projects = [
    { name: 'Website Redesign 2025', desc: 'Complete overhaul of company website with new UI/UX', progress: 75, deadline: '2025-06-30', icon: 'fa-rocket' },
    { name: 'Analytics Dashboard v2.0', desc: 'Building advanced analytics features with real-time data', progress: 45, deadline: '2025-08-15', icon: 'fa-chart-line' },
    { name: 'Mobile App Launch', desc: 'iOS & Android app development for customer portal', progress: 90, deadline: '2025-05-10', icon: 'fa-mobile-alt' },
    { name: 'Security Enhancement', desc: 'Implementing 2FA and advanced encryption protocols', progress: 30, deadline: '2025-09-01', icon: 'fa-shield-alt' },
    { name: 'Cloud Migration', desc: 'Moving all services to AWS cloud infrastructure', progress: 60, deadline: '2025-07-20', icon: 'fa-cloud-upload-alt' }
];

function renderProjects() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;
    projectsList.innerHTML = '';
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-card';
        projectDiv.innerHTML = `
            <div class="project-icon"><i class="fas ${project.icon}"></i></div>
            <div class="project-info">
                <h4>${project.name}</h4>
                <p>${project.desc}</p>
                <div class="project-progress"><div class="progress-bar" style="width: ${project.progress}%"></div><span>${project.progress}%</span></div>
                <small>Deadline: ${new Date(project.deadline).toLocaleDateString()}</small>
            </div>
        `;
        projectsList.appendChild(projectDiv);
    });
}

const addProjectBtn = document.getElementById('addProjectBtn');
if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
        const newProjects = [
            { name: 'AI Integration', desc: 'Machine learning implementation for predictions', progress: 15, deadline: '2025-12-15', icon: 'fa-brain' },
            { name: 'Mobile App Beta', desc: 'Beta testing phase for mobile application', progress: 85, deadline: '2025-05-25', icon: 'fa-mobile-alt' },
            { name: 'SEO Optimization', desc: 'Improving search engine rankings', progress: 40, deadline: '2025-08-10', icon: 'fa-chart-line' }
        ];
        const random = newProjects[Math.floor(Math.random() * newProjects.length)];
        projects.unshift(random);
        renderProjects();
        showToast(`New project "${random.name}" added!`);
    });
}

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!firstName || !lastName || !phone || !email || !message) {
            formFeedback.innerHTML = '<span style="color:#c62828;"><i class="fas fa-exclamation-circle"></i> Please fill all fields!</span>';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            formFeedback.innerHTML = '<span style="color:#c62828;"><i class="fas fa-envelope"></i> Enter valid email!</span>';
            return;
        }
        formFeedback.innerHTML = '<span style="color:#2e7d32;"><i class="fas fa-check-circle"></i> Thanks ' + firstName + '! Our team will respond within 24h.</span>';
        setTimeout(() => { contactForm.reset(); formFeedback.innerHTML = ''; }, 2500);
        showToast('Message sent successfully!');
    });
}

window.addEventListener('resize', () => { if (window.innerWidth >= 768) sidebar.classList.remove('active'); });
renderCustomers();
renderProjects();