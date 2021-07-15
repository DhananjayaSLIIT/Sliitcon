import {Redirect, Route} from 'react-router-dom';



const AdminPrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => 
                    localStorage.getItem("adminToken") ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to="/loginpopup"/>
                    )                
            }
        />
    );
};

export default AdminPrivateRoute;