import Validator from 'validator';
import isEmpty from './isEmpty';

const validateLoginInput= (data) => {
  let errors = {};
  //isEmpty is own function to check for null, undefined, empty object
  // due to Validate validate based on string so we need this extra step.
  //data.email = !isEmpty(data.email) ? data.email : '';

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  /*
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
 */

  if (Validator.isEmpty(data.username)) {
    errors.username = 'User name is required';
  }
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default  validateLoginInput;


