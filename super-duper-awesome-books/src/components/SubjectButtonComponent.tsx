import { Button } from "@material-ui/core";

export const ButtonComponent = (props) => {
   

    return (
        <Button color="primary" style={{color: '#299eb3'}}>{props.text}</Button>
    );
};

export default ButtonComponent