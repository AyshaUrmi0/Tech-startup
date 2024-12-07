import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Layout/Loading";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location=useLocation()
   

    if(loading){
        return <Loading></Loading>
    }
    if (!user) {
        return (
          <Navigate to="/login" state={{ from: location }} replace />
        );
      }
    
      return children;
};

export default PrivateRoute;