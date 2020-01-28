import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, H3} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

class ConfigurarContraseña extends Component {

  constructor(props) {
    super(props);
    global.ID = '';
    this.state = {
      secureTextEntry1: true,
      secureTextEntry2: true,
      contrasena: '',
      contrasena2: '',
      nombre: '',
      apellido: '',
      email: '',
      curp: '',
      telefono: '',
      id_usuario: '',
      foto: ''
    };
  }

  InsertUser = () =>{
    axios.post('http://35.203.42.33:3000/registrar_usuario',
    {id_rol:4, nombre: this.state.nombre, apellido: this.state.apellido, correo: this.state.email,
    telefono:this.state.telefono, pass: this.state.contrasena, curp: this.state.curp, foto: this.state.foto, ciudad: null, tipo_conductor: null})
    .then(response =>  {
      response.data.data.forEach(element => {
        console.log(element);
        this.setState({
           id_usuario: element["id_usuario_out"]
        })
        global.ID = 9/*this.state.id_usuario*/; 
        this.props.navigation.navigate('Inicio',{id_usuario: this.state.id_usuario});
     }); 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });         
  }

  onValidateInput= () =>{
    var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;

    if(this.state.contrasena.trim() != ""){
      if (validateContrasena.test(this.state.contrasena)) {
        this.setState(() => ({ contrasenaError: "" }));
      } else {
        this.setState(() => ({ contrasenaError: "Formato Invalido" }));
      }
    }else{
      this.setState(() => ({ contrasenaError: "Ingresa tu contraseña" }));
    }
    
    if (this.state.contrasena2.trim() != "") {
      if(validateContrasena.test(this.state.contrasena2)){
        this.setState(() => ({ contrasena2Error: "" }));
      } else{
        this.setState(() => ({ contrasena2Error: "Formato Invalido" }));
      }
    } else {
      this.setState(() => ({ contrasena2Error: "Ingresa tu contraseña" }));
    }

    if(validateContrasena.test(this.state.contrasena2) && validateContrasena.test(this.state.contrasena)){
      if (this.state.contrasena.trim() != this.state.contrasena2.trim()){
        this.setState(() => ({ contrasena2Error: "La contraseña no coincide" }));
      }else{
        this.InsertUser();
      }
    }
  }

  onIconPress1 = () =>{
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1
    });
  }

  onIconPress2 = () =>{
    this.setState({
      secureTextEntry2: !this.state.secureTextEntry2
    });
  }
  
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
          <Grid>
            <Text style={{fontSize:0}}>{this.state.telefono = navigation.getParam('telefono'),
            this.state.nombre = navigation.getParam('nombre'),this.state.apellido = navigation.getParam('apellido'),
            this.state.email = navigation.getParam('email'),this.state.curp = navigation.getParam('curp'), this.state.foto = navigation.getParam('foto')}</Text>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Configurar Contraseña</H3></Row>
            <Row><Col style = {{marginLeft:20, marginBottom:15}}><Text>* Campos requeridos</Text></Col></Row>
            <Row style={{marginBottom:15}}>
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasena} onChangeText={contrasena => this.setState({ contrasena })} secureTextEntry={this.state.secureTextEntry1} style = {{borderBottomWidth: 0.5}} placeholder='* Contraseña'></Input>
              </Col>
              <Col style={{marginTop:20, position:'absolute', marginLeft:350}}>
                <TouchableOpacity onPress={this.onIconPress1} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginBottom:5}}>
                {!!this.state.contrasenaError && (
                  <Text style={{ color: "red", fontSize:11}}>{this.state.contrasenaError}</Text>
                )}
              </Col>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasena2} onChangeText={contrasena2 => this.setState({ contrasena2 })} secureTextEntry={this.state.secureTextEntry2}  style = {{borderBottomWidth: 0.5}} placeholder='* Confirmar Contraseña'></Input>
              </Col>
              <Col style={{marginTop:20, position:'absolute', marginLeft:350}}>
                <TouchableOpacity onPress={this.onIconPress2} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
                </Col>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginBottom:5}}>
                {!!this.state.contrasena2Error && (
                  <Text style={{ color: "red", fontSize:11}}>{this.state.contrasena2Error}</Text>
                )}
              </Col>
            </Row>
            <Row style={{marginTop:35}}><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button></Col></Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default ConfigurarContraseña