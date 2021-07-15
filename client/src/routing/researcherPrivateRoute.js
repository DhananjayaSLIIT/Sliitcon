import {Redirect, Route} from 'react-router-dom';



const ResearcherPrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => 
                    localStorage.getItem("researcherToken") ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to="/loginpopup"/>
                    )                
            }
        />
    );
};

export default ResearcherPrivateRoute;