import {Redirect, Route} from 'react-router-dom';



const ReviewerPrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => 
                    localStorage.getItem("reviewerToken") ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to="/loginpopup"/>
                    )                
            }
        />
    );
};

export default ReviewerPrivateRoute;