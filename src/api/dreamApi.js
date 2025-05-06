// Mock data store
let dreams = [
  {
    id: '1',
    title: 'Flying Over Mountains',
    description: 'I was soaring through the sky, feeling the wind in my hair. The mountains below looked majestic and peaceful. I was soaring through the sky, feeling the wind in my hair. The mountains below looked majestic and peaceful.I was soaring through the sky, feeling the wind in my hair. The mountains below looked majestic and peaceful.I was soaring through the sky, feeling the wind in my hair. The mountains below looked majestic and peaceful.',
    status: 'answered',
    tags: ['flying', 'mountains', 'freedom'],
    createdAt: '2024-03-15T10:30:00Z',
    isFavourite: true,
    userId: 'user1',
    user: {
      name: 'John Doe',
      country: 'US',
      avatar: 'JD'
    },
    moderatorReply: {
      content: 'Flying dreams often symbolize freedom, ambition, and a desire to rise above challenges. The mountains represent obstacles you\'ve overcome or goals you\'re striving to achieve. This dream suggests you\'re feeling empowered and confident in your current life journey.',
      createdAt: '2024-03-15T11:30:00Z',
      moderator: {
        name: 'Dr. Sarah Chen',
        avatar: 'SC'
      }
    }
  },
  {
    id: '2',
    title: 'Ocean Adventure',
    description: 'Swimming with dolphins in crystal clear waters. The ocean was calm and the sun was setting.',
    status: 'pending',
    tags: ['ocean', 'dolphins', 'swimming'],
    createdAt: '2024-03-14T15:45:00Z',
    isFavourite: false,
    userId: 'user1',
    user: {
      name: 'John Doe',
      country: 'US',
      avatar: 'JD'
    }
  },
  {
    id: '3',
    title: 'Ancient Temple',
    description: 'Exploring an ancient temple filled with mysterious artifacts and hidden passages.',
    status: 'answered',
    tags: ['temple', 'exploration', 'mystery'],
    createdAt: '2024-03-13T09:15:00Z',
    isFavourite: true,
    userId: 'user2',
    user: {
      name: 'Jane Smith',
      country: 'UK',
      avatar: 'JS'
    },
    moderatorReply: {
      content: 'Ancient temples in dreams often represent your spiritual journey or quest for knowledge. The hidden passages suggest there are aspects of yourself or your life that you\'re still discovering. This dream indicates you\'re in a period of self-discovery and personal growth.',
      createdAt: '2024-03-13T10:15:00Z',
      moderator: {
        name: 'Prof. Michael Brown',
        avatar: 'MB'
      }
    }
  },
  {
    id: '4',
    title: 'Lost City',
    description: 'A deep dive into the ruins of a forgotten era.',
    status: 'answered',
    tags: ['adventure', 'ruins', 'mystery'],
    createdAt: '2024-03-13T09:25:00Z',
    isFavourite: false,
    userId: 'user3',
    user: {
      name: 'Alice Brown',
      country: 'USA',
      avatar: 'AB'
    }
  },
  {
    id: '5',
    title: 'Hidden Pyramid',
    description: 'Unearthing secrets buried beneath the sands.',
    status: 'answered',
    tags: ['temple', 'ancient', 'artifacts'],
    createdAt: '2024-03-13T09:35:00Z',
    isFavourite: true,
    userId: 'user4',
    user: {
      name: 'Tom Clark',
      country: 'Egypt',
      avatar: 'TC'
    }
  },
  {
    id: '6',
    title: 'Forgotten Ruins',
    description: 'Following the clues of ancient civilizations.',
    status: 'answered',
    tags: ['exploration', 'ruins', 'lost'],
    createdAt: '2024-03-13T09:45:00Z',
    isFavourite: false,
    userId: 'user5',
    user: {
      name: 'Emma Wilson',
      country: 'Greece',
      avatar: 'EW'
    }
  },
  {
    id: '7',
    title: 'Desert Tomb',
    description: 'Wandering through dark corridors and echoing halls.',
    status: 'answered',
    tags: ['temple', 'desert', 'mystery'],
    createdAt: '2024-03-13T09:55:00Z',
    isFavourite: true,
    userId: 'user6',
    user: {
      name: 'John Doe',
      country: 'India',
      avatar: 'JD'
    }
  },
  {
    id: '8',
    title: 'Sunken Shrine',
    description: 'Discovering relics with mysterious inscriptions.',
    status: 'answered',
    tags: ['shrine', 'artifacts', 'mystery'],
    createdAt: '2024-03-13T10:05:00Z',
    isFavourite: false,
    userId: 'user7',
    user: {
      name: 'Maria Garcia',
      country: 'Peru',
      avatar: 'MG'
    }
  },
  {
    id: '9',
    title: 'Sacred Cavern',
    description: 'An expedition into a realm lost in time.',
    status: 'answered',
    tags: ['cave', 'sacred', 'exploration'],
    createdAt: '2024-03-13T10:15:00Z',
    isFavourite: true,
    userId: 'user8',
    user: {
      name: 'Luke Evans',
      country: 'Italy',
      avatar: 'LE'
    }
  },
  {
    id: '10',
    title: 'Haunted Monastery',
    description: 'Tracking legends carved in stone.',
    status: 'answered',
    tags: ['haunted', 'temple', 'ancient'],
    createdAt: '2024-03-13T10:25:00Z',
    isFavourite: false,
    userId: 'user9',
    user: {
      name: 'Liam Smith',
      country: 'UK',
      avatar: 'LS'
    }
  },
  {
    id: '11',
    title: 'Mystic Fortress',
    description: 'Exploring sacred grounds untouched for centuries.',
    status: 'answered',
    tags: ['fortress', 'mystic', 'sacred'],
    createdAt: '2024-03-13T10:35:00Z',
    isFavourite: true,
    userId: 'user10',
    user: {
      name: 'Olivia Johnson',
      country: 'China',
      avatar: 'OJ'
    }
  },
  {
    id: '12',
    title: 'Enchanted Garden',
    description: 'Opening doors long sealed by time.',
    status: 'answered',
    tags: ['garden', 'enchanted', 'hidden'],
    createdAt: '2024-03-13T10:45:00Z',
    isFavourite: false,
    userId: 'user11',
    user: {
      name: 'Emma Wilson',
      country: 'Italy',
      avatar: 'EW'
    }
  },
  {
    id: '13',
    title: 'Abandoned Palace',
    description: 'Unraveling the history of a forgotten kingdom.',
    status: 'answered',
    tags: ['palace', 'ruins', 'history'],
    createdAt: '2024-03-13T10:55:00Z',
    isFavourite: true,
    userId: 'user12',
    user: {
      name: 'Tom Clark',
      country: 'China',
      avatar: 'TC'
    }
  },
  {
    id: '14',
    title: 'Floating Through Space',
    description: 'I was weightless, drifting between stars with planets in view.',
    status: 'answered',
    tags: ['space', 'stars', 'freedom'],
    createdAt: '2024-03-13T11:05:00Z',
    isFavourite: false,
    userId: 'user13',
    user: {
      name: 'Nina Hart',
      country: 'Canada',
      avatar: 'NH'
    },
    moderatorReply: {
      content: 'Space dreams often reflect feelings of isolation or a desire for freedom from earthly constraints. The weightlessness suggests you\'re feeling unburdened or free from responsibilities. This dream might indicate you\'re seeking perspective on your life\'s direction or feeling disconnected from your daily routine.',
      createdAt: '2024-03-13T12:05:00Z',
      moderator: {
        name: 'Dr. Sarah Chen',
        avatar: 'SC'
      }
    }
  },
  {
    id: '15',
    title: 'Talking Animals',
    description: 'The forest animals gathered around to share ancient wisdom.',
    status: 'pending',
    tags: ['animals', 'forest', 'magic'],
    createdAt: '2024-03-13T11:15:00Z',
    isFavourite: true,
    userId: 'user14',
    user: {
      name: 'Carlos Diaz',
      country: 'Mexico',
      avatar: 'CD'
    }
  },
  {
    id: '16',
    title: 'Underwater Castle',
    description: 'Exploring a majestic crystal castle deep beneath the sea.',
    status: 'answered',
    tags: ['castle', 'underwater', 'fantasy'],
    createdAt: '2024-03-13T11:25:00Z',
    isFavourite: true,
    userId: 'user15',
    user: {
      name: 'Akira Tanaka',
      country: 'Japan',
      avatar: 'AT'
    }
  },
  {
    id: '17',
    title: 'Endless Library',
    description: 'A massive library with books that wrote themselves.',
    status: 'answered',
    tags: ['library', 'infinite', 'knowledge'],
    createdAt: '2024-03-13T11:35:00Z',
    isFavourite: false,
    userId: 'user16',
    user: {
      name: 'Grace Lee',
      country: 'South Korea',
      avatar: 'GL'
    }
  },
  {
    id: '18',
    title: 'Time Travel',
    description: 'Jumping across different centuries and meeting famous historical figures.',
    status: 'answered',
    tags: ['time', 'history', 'adventure'],
    createdAt: '2024-03-13T11:45:00Z',
    isFavourite: true,
    userId: 'user17',
    user: {
      name: 'John Doe',
      country: 'US',
      avatar: 'JD'
    },
    moderatorReply: {
      content: 'Time travel dreams often represent your mind processing past experiences or future possibilities. Meeting historical figures suggests you\'re seeking wisdom or guidance from established knowledge. This dream indicates you\'re in a period of reflection and learning from both past experiences and historical wisdom.',
      createdAt: '2024-03-13T12:45:00Z',
      moderator: {
        name: 'Prof. Michael Brown',
        avatar: 'MB'
      }
    }
  }
];

export const fetchDreams = async (page = 1, limit = 10) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedDreams = dreams.slice(start, end);
  
  return {
    dreams: paginatedDreams,
    total: dreams.length,
    page,
    limit,
    totalPages: Math.ceil(dreams.length / limit)
  };
};

export const getMyDreams = async ({ page = 1, limit = 10 }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would use the auth token to get the current user's ID
  const currentUserId = 'user1';
  
  const myDreams = dreams.filter(dream => dream.userId === currentUserId);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedDreams = myDreams.slice(start, end);
  
  return {
    dreams: paginatedDreams,
    total: myDreams.length,
    page,
    limit,
    totalPages: Math.ceil(myDreams.length / limit)
  };
};

export const getFavouriteDreams = async (page = 1, limit = 10) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const favouriteDreams = dreams.filter(dream => dream.isFavourite);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedDreams = favouriteDreams.slice(start, end);
  
  return {
    dreams: paginatedDreams,
    total: favouriteDreams.length,
    page,
    limit,
    totalPages: Math.ceil(favouriteDreams.length / limit)
  };
};

export const toggleFavourite = async (dreamId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dreamIndex = dreams.findIndex(dream => dream.id === dreamId);
  if (dreamIndex === -1) {
    throw new Error('Dream not found');
  }
  
  dreams[dreamIndex] = {
    ...dreams[dreamIndex],
    isFavourite: !dreams[dreamIndex].isFavourite
  };
  
  return dreams[dreamIndex];
};

export const addDream = async (dreamData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newDream = {
    id: Date.now().toString(),
    ...dreamData,
    status: 'pending',
    isFavourite: false,
    userId: 'user1', // In a real app, this would come from the auth token
    createdAt: new Date().toISOString(),
    user: {
      name: 'Current User',
      country: 'US',
      avatar: 'CU'
    }
  };
  
  dreams.unshift(newDream);
  return newDream;
  };
  