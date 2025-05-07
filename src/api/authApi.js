// Dummy user data
const users = [
  {
    id: 1,
    email: 'moderator@example.com',
    password: 'password123',
    role: 'moderator',
    name: 'John Doe'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const signupUser = async (name, email, password) => {
  await delay(1000); // Simulate network delay
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    throw new Error('Email already registered');
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  
  return {
    success: true,
    message: 'Registration successful. Please login.'
  };
};

export const loginUser = async (email, password) => {
  await delay(1000); // Simulate network delay
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      token: 'dummy-jwt-token-' + Math.random()
    };
  }
  
  throw new Error('Invalid credentials');
};

export const logoutUser = async () => {
  await delay(500);
  return { success: true };
};

export const getUserProfile = async (userId) => {
  await delay(500);
  const user = users.find(u => u.id === userId);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  throw new Error('User not found');
}; 