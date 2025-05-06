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