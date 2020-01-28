import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Text, Input, Button, Grid, Col, Row, H3} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

class Contraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry1: true,
      respuesta: '',
      contrasena: '',
      id_usuario: this.props.navigation.getParam('id_usuario'),
      telefono: this.props.navigation.getParam('telefono')
    };
  }

  updatePassword = () => {
    axios.put('http://35.203.42.33:3000/modificar_contrasena',{id_usuario:this.state.id_usuario, pass: this.state.contrasena})
    .then(response => {
      Alert.alert(
        'Aviso',
        'Se ha actualizado tu contraseña con éxito!',
        [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Informacion')},
        ]
      );
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onValidateInput= () =>{
    var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;
    
    if(this.state.contrasena.trim() == ""){
      this.setState(() => ({ contrasenaError1: "Ingresa tu contraseña" }));
    }else if(!validateContrasena.test(this.state.contrasena)){
      this.setState(() => ({ contrasenaError1: "Formato Incorrecto" }));
    }else{
      this.setState(() => ({ contrasenaError1: "" }));
      this.updatePassword();
    }
        
  }

  onIconPress1 = () =>{
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Configurar Contraseña</H3></Row>
            <Row style = {{marginBottom: 15, marginLeft:20, marginRight:20}}>
                <Text style={{textAlign:'justify'}}>Puedes iniciar la sesión de {this.state.telefono} en la app YiMi.</Text>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasena} onChangeText={contrasena => this.setState({ contrasena })} secureTextEntry={this.state.secureTextEntry1} style = {{borderBottomWidth: 0.5}} placeholder='Contraseña'></Input>
              </Col>
              <Col style={{marginTop:20, position:'absolute', marginLeft:350}}>
                <TouchableOpacity onPress={this.onIconPress1} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom:5}}>
                {!!this.state.contrasenaError1 && (<Text style={{ color: "red", fontSize:11, marginLeft:15}}>{this.state.contrasenaError1}</Text>)}
              </Col>
            </Row>
            <Row>
              <Col style={{marginTop:10, marginLeft:20}}>
                <Text onPress={this.sendCode} style={{fontSize:14}}>La contraseña debe ser de 6 dígitos e incluir al menos una letra o un número.</Text>
              </Col>
            </Row>
            <Row style={{marginTop:35}}><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Confirmar</Text></Button></Col></Row>
          </Grid> 
        </Content>
      </Container>
    );
  }
}

export default Contraseña