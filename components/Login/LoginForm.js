import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function LoginForm({ onSubmit, credentialsInvalid }) {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const { username: usernameIsInvalid, password: passwordIsInvalid } =
    credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'username':
        setEnteredUsername(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      username: enteredUsername,
      password: enteredPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label='Username'
          onUpdateValue={updateInputValueHandler.bind(this, 'username')}
          value={enteredUsername}
          isInvalid={usernameIsInvalid}
        />
        <Input
          label='Password'
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>Log In</Button>
        </View>
      </View>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
