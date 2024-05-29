function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Recipe Roots</h1>
      <p className="text-lg md:text-xl font-bold mb-8 text-center">
        A platform dedicated to preserving culture through recipes.
      </p>
      <div className="text-center">
        <div className="text-lg font-bold mb-6">1. Celebrate culinary heritage</div>
        <p className="text-sm text-gray-600 mb-6">
          Rediscover the flavors of your ancestors, passed down through generations.
        </p>
        <div className="text-lg font-bold mb-6">2. Connect generations through food</div>
        <p className="text-sm text-gray-600 mb-6">
          Bridge the gap between past and present, sharing stories and traditions with loved ones.
        </p>
        <div className="text-lg font-bold mb-6">3. Preserve cultural diversity</div>
        <p className="text-sm text-gray-600 mb-6">
          Explore a world of flavors, honoring the unique heritage of communities worldwide.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
