import React from "react";

function CTA() {
const navigate = useNavigate();
  const navToUploadForm = () => {
    navigate('/upload');
  };

    return (
        <section className="w-1/2 p-8 md:p-32 space-y-4">
            <p>Feeling inspired? Share your own family recipe.</p>
            <button onClick={navToUploadForm} className="btn-light">Upload a recipe</button>
        </section>
    )
}

export default CTA