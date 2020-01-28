import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, CheckBox, Button, Grid, Col, Row, H3, Icon, Thumbnail} from 'native-base';
import * as Google from 'expo-google-app-auth';

import * as Facebook from 'expo-facebook';
import axios from 'axios';


class Registro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      id_usuario:'',
      telefono: '',
      nombre: '',
      apellido: '',
      email: '',
      foto: ''
    };
  }

  TerminosyCondiciones = () =>{
    this.props.navigation.navigate('Legal');
  }

  onValidateInput= () =>{
    var validatePhone = /^[0-9]{10}$/;
    if (this.state.telefono.trim() === "") {
      this.setState(() => ({ msgError: "Campo obligatorio" }));
    } else if(!validatePhone.test(this.state.telefono)){
      this.setState(() => ({ msgError: "Favor de ingresar 10 digitos" }));
    } else {
      this.SignIn();
    }
  }

  signInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "372701419748-ja7jlf6k03opndc3q6lndomu9a8u77h0.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          nombre: result.user.givenName,
          apellido: result.user.familyName,
          email: result.user.email,
          foto: result.user.photoUrl
        });
        axios.post('http://35.203.42.33:3000/validar_inicio_sesion_api',{correo: this.state.email})
        .then(response => {
          response.data.data.forEach(element => {
            if(element["respuesta"] == 0){
              this.props.navigation.navigate('InformacionAPI',{nombre: this.state.nombre, apellido: this.state.apellido, email: this.state.email, foto: this.state.foto})
            }else{
              global.ID =  element["id_usuario_out"]
              this.props.navigation.navigate('Inicio',{id_usuario: element["id_usuario_out"]})
            }   
          }); 
    
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  signFacebook = async () =>  {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2600565983332988', {
        permissions: ['public_profile','email','user_friends'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email,picture`);
        let result = await response.json();
        console.log(result)
        this.setState({
          nombre: result.first_name,
          apellido: result.last_name,
          email: result.email,
          foto: result.picture.data.url
        })

        axios.post('http://35.203.42.33:3000/validar_inicio_sesion_api',{correo: this.state.email})
        .then(response => {
          response.data.data.forEach(element => {
            console.log(element["respuesta"]);
            if(element["respuesta"] == 0){
              this.props.navigation.navigate('InformacionAPI',{nombre: this.state.nombre, apellido: this.state.apellido, email: this.state.email, foto: this.state.foto})
            }else{
              global.ID =  element["id_usuario_out"]
              this.props.navigation.navigate('Inicio',{id_usuario: element["id_usuario_out"]})
            }   
          }); 
    
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        }); 
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  SignIn = () => {
    axios.post('http://35.203.42.33:3000/validar_inicio_sesion',{id_rol: 4, campo: this.state.telefono, pass:''})
    .then(response => {
      response.data.data.forEach(element => {
        if(element["respuesta"] == 0){
          axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono: this.state.telefono});
          this.props.navigation.navigate('CodigoVerificacion',{telefono: this.state.telefono});
          this.setState({msgError: "", telefono: ''});
        }else{
          this.setState({msgError: "", telefono: ''});

          global.ID =  element["id_usuario_out"];
          this.props.navigation.navigate('Inicio',{id_usuario: global.ID});
        }   
      }); 
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  pass = () =>{
    this.props.navigation.navigate('ConfigurarContrasena');
  }


  render() {
    return (
      <Container>
        <Content>
            <Grid>
              <Row ><Col style = {{marginTop:150, marginBottom: 35, display: 'flex', justifyContent: 'center', alignItems:'center'}}><H3>Ingresa tu número de teléfono</H3></Col></Row>
              <Row>
                <Col style = {{display: 'flex', justifyContent: 'center', alignItems:'center', marginBottom:10}}>
                  <Input value={this.state.telefono} onChangeText={telefono => this.setState({ telefono })} maxLength={10} style = {{borderBottomWidth: 0.5, textAlign :'center'}} placeholder='Ingresa tu número de teléfono' keyboardType = "numeric"/>
                </Col> 
              </Row>
              <Row>
                  <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginBottom:5}}>
                  {!!this.state.msgError && (<Text style={{ color: "red", fontSize:11, marginBottom:10}}>{this.state.msgError}</Text>)}
                  </Col>
              </Row>
              <Row>
                <Col style={{width:20, marginLeft:80}}><CheckBox checked={true} style={{backgroundColor:'#ff8834', borderColor:'#ff8834'}}/></Col>
                <Col style={{marginRight:60}}><Button onPress={this.TerminosyCondiciones} transparent style={{height:20}}><Text style={{color:'gray'}}>Acepto términos y condiciones</Text></Button></Col>  
              </Row>
              <Button onPress={this.onValidateInput} block style = {{marginLeft: 80, marginRight: 80, marginTop:20, marginBottom:120, backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button>
              <Row>
                <Col style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                  <Text>─────────────────────</Text>
                  <Text>Conectate con tus redes sociales</Text>
                </Col>
              </Row>
              <Row>
                <Col marginLeft={120}><Button onPress={this.signFacebook} style={{height:90, width:90}} transparent><Icon name='logo-facebook' style={{fontSize: 60}}/></Button></Col>
                <Col marginRight={100}><Button onPress={this.signInGoogle} style={{height:90, width:95}} transparent><Thumbnail source= {require('../../image/google.png')}/></Button></Col>
              </Row>
            </Grid> 
        </Content>
      </Container>
    );
  }
}

export default Registro;
