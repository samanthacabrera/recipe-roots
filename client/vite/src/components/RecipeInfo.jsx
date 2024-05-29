function RecipeInfo({ title, memory, country, description, visibility, ingredients, directions, handleEdit, handleDelete, user, recipe }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 h-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                {user.clerk_id === recipe.user_clerk_id && (
                    <div>
                        <button onClick={handleEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">Edit Recipe</button>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Recipe</button>
                    </div>
                )}
            </div>
            <div className="mb-4">
                <p className="text-gray-800"><span className="font-bold">Country:</span> {country}</p>
                <p className="text-gray-800"><span className="font-bold">Description:</span> {description}</p>
                {/* <p className="text-gray-800"><span className="font-bold">Visibility:</span> {visibility}</p> */}
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul>
                    {ingredients && ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Directions</h2>
                <ol>
                    {directions && directions.map((direction, index) => (
                        <li key={index}>{direction.step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default RecipeInfo;
