import {Redirect, Route} from 'react-router-dom';



const WorkShopPrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => 
                    localStorage.getItem("workShopToken") ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to="/loginpopup"/>
                    )                
            }
        />
    );
};

export default WorkShopPrivateRoute;