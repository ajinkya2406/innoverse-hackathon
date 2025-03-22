// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

// Format transaction type
export const formatTransactionType = (type) => {
  const types = {
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
    payment: 'Payment',
    refund: 'Refund'
  };
  return types[type] || type;
};

// Format transaction status
export const formatTransactionStatus = (status) => {
  const statuses = {
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed'
  };
  return statuses[status] || status;
};

// Format event type
export const formatEventType = (type) => {
  const types = {
    academic: 'Academic',
    sports: 'Sports',
    cultural: 'Cultural',
    hackathon: 'Hackathon',
    other: 'Other'
  };
  return types[type] || type;
};

// Format event status
export const formatEventStatus = (status) => {
  const statuses = {
    upcoming: 'Upcoming',
    ongoing: 'Ongoing',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };
  return statuses[status] || status;
};

// Format user role
export const formatUserRole = (role) => {
  const roles = {
    admin: 'Administrator',
    parent: 'Parent',
    student: 'Student',
    vendor: 'Vendor'
  };
  return roles[role] || role;
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'warning',
    completed: 'success',
    failed: 'error',
    upcoming: 'info',
    ongoing: 'primary',
    cancelled: 'error'
  };
  return colors[status] || 'default';
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format phone number
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};
