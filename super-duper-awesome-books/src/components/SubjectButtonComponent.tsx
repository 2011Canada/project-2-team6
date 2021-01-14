import { Button } from "@material-ui/core";

export const ButtonComponent = (props) => {
    const handleClick = () => {
        console.log(props.text);
    };

    return (
        <Button color="primary" onClick={handleClick} style={{color: '#299eb3'}}>{props.text}</Button>
    );
};

export default ButtonComponent