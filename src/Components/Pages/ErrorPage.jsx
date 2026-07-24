// import "animate.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4">
     
      <div className="animate__animated animate__bounce">
        <img
          src="https://i.ibb.co.com/7jxYptg/6325254.jpg"
          alt="404 Not Found"
          className="w-full max-w-md mx-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
        />
      </div>
   
      <div className="animate__animated animate__fadeInDown animate__delay-1s mt-6">
        <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400">Oops! Page Not Found</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Sorry, the page you’re looking for doesn’t exist.</p>
      </div>
   
      <div className="animate__animated animate__fadeInUp animate__delay-2s mt-6">
        <button
          onClick={handleGoHome}
          className="px-6 py-3 font-semibold text-white transition-colors bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg shadow-md"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
