import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NavBar from '../common/NavBar';

const ErrorPage = () => {
   const error = useRouteError();

   return (
      <>
         <NavBar />

         <div className="p-4">
            <h2>Oops</h2>
            <div>{isRouteErrorResponse(error) ? 'This page does not exist.' : 'An unexpected error occurred.'}</div>
         </div>
      </>
   );
};

export default ErrorPage;
