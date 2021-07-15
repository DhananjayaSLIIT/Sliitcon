import {Redirect, Route} from 'react-router-dom';



const EditorPrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => 
                    localStorage.getItem("editorToken") ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to="/loginpopup"/>
                    )                
            }
        />
    );
};

export default EditorPrivateRoute;