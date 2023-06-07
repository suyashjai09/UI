import { emit } from "process";

const validateEmail = (email: String) => {
    if (email.trim().length === 0) {
        return 'Email required';
    }
    else {
        if (String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
        return '';
        else 
          return 'Enter valid email';
    }
}
export default validateEmail;