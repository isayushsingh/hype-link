export const mockUser = {
    uid: "12345",
    name: "John Doe",
    email: "johndoe@example.com",
    profilePic: "https://via.placeholder.com/150",
  };
  
  export const signInWithGoogle = async () => {
    console.log("Mock Login: Simulating Google Sign-In...");
    localStorage.setItem("user", JSON.stringify(mockUser));
    return mockUser;
  };
  
  export const logOut = async () => {
    console.log("Mock Logout: User logged out.");
    localStorage.removeItem("user");
  };