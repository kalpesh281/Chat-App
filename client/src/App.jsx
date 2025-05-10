function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center px-4">
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4 animate-fade-in">
          Welcome to Our Chat App!
        </h1>
        <p className="text-lg mb-8 max-w-md">
          Your personalized experience starts here. Let's explore something
          awesome together.
        </p>
        <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-purple-100 transition-all duration-300">
          Get Started
        </button>
      </div>
    </>
  );
}

export default App;
