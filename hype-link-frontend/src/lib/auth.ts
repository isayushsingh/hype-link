const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === "true";

export const { signInWithGoogle, logOut } = useFirebase
  ? require("./firebase")  // Uses Firebase auth when enabled
  : require("./mockAuth");  // Uses Mock auth when disabled