import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'
import { create } from '../user/api-user.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function Signin(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })

  const clickSubmit = () => {
    let err = ''
    if (values.email.trim().length == 0){
      err += 'Email'
    }
    
    if (values.password.trim().length == 0){
      err += err.length == 0 ? 'Password': ' and Password'
    }
    
    if (err.length > 0) {
      err += err.length > 5 ? " are required" : " is required"
      setValues({ ...values, error: err})
      return 
    }

    // const tempUser = {
    //   name: "Test",
    //   email: values.email || undefined,
    //   password: values.password || undefined
    // }
    // create(tempUser).then((data) => {
    //   if (data.error) {
    //     setValues({ ...values, error: data.error })
    //     return 
    //   } 
    // })

    if (!values.password) {
      setValues({ ...values, error: 'Password is required'})
      return 
     
    }
    let error = ''
    if (values.password && values.password.length < 8) {
      error = 'Password must have at least 8 characters'
    }
    if (values.password && !values.password.match(/[a-z]/g)) {
      if (error.length == 0 ){
        error = 'Password must have at least one lowercase letter'
      }
      else {
        error += ', one lowercase letter'
      }
    }
    if (values.password && !values.password.match(/[A-Z]/g)) {
      if (error.length == 0 ){
        error = 'Password must have at least one uppercase letter'
      }
      else {
        error += ', one uppercase letter'
      }
    }
  
    if (values.password && !values.password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      if (error.length == 0 ){
        error = 'Password must have at least one special character'
      }
      else {
        error += ', one special character'
      }
    }
    if (values.password && !values.password.match(/[0-9]/g)) {
      if (error.length == 0 ){
        error = 'Password must have at least one number letter'
      }
      else {
        error += ', one number letter'
      }
    }
  
    if (error.length > 0){
      setValues({ ...values, error: error + '.'})
      return 
    }

    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = props.location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
  if (redirectToReferrer) {
      return (<Redirect to={from}/>)
  }

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}
