import * as yup from 'yup';

// Login validation schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Registration validation schema
export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup
    .string()
    .oneOf(['admin', 'parent', 'student', 'vendor'], 'Invalid role')
    .required('Role is required'),
});

// Profile update validation schema
export const profileUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: yup.string(),
  studentId: yup.string().when('role', {
    is: 'student',
    then: yup.string().required('Student ID is required'),
  }),
  parentId: yup.string().when('role', {
    is: 'student',
    then: yup.string(),
  }),
});

// Event creation validation schema
export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  date: yup
    .date()
    .required('Event date is required')
    .min(new Date(), 'Event date must be in the future'),
  registrationDeadline: yup
    .date()
    .required('Registration deadline is required')
    .max(yup.ref('date'), 'Deadline must be before event date'),
  capacity: yup
    .number()
    .required('Capacity is required')
    .min(1, 'Capacity must be at least 1'),
  fee: yup
    .number()
    .required('Fee is required')
    .min(0, 'Fee cannot be negative'),
  type: yup
    .string()
    .oneOf(['academic', 'sports', 'cultural', 'hackathon', 'other'], 'Invalid event type')
    .required('Event type is required'),
});

// Wallet transaction validation schema
export const transactionSchema = yup.object().shape({
  amount: yup
    .number()
    .required('Amount is required')
    .min(1, 'Amount must be at least 1'),
  description: yup
    .string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters'),
});

// Vendor profile validation schema
export const vendorProfileSchema = yup.object().shape({
  businessName: yup
    .string()
    .required('Business name is required')
    .min(2, 'Business name must be at least 2 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  services: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one service is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  address: yup
    .string()
    .required('Address is required'),
});

// Password change validation schema
export const passwordChangeSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .notOneOf([yup.ref('currentPassword')], 'New password must be different'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
