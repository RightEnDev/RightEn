const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
      screens: {
        Home: 'home',
        Profile: 'user/:id',  // Matches myapp://user/123
        Settings: 'settings',
      },
    },
  };
  
  export default linking;