import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, H3} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { sha256 } from 'react-native-sha256';
import axios from 'axios';

class Contraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry1: true,
      secureTextEntry2: true,
      contrasena: '',
      contrasena2:'',
      nombre: '',
      apellido: '',
      curp: '',
      telefono: '',
      email: '',
      id_usuario: '',
      foto: '',
      pass:''
    };
  }

  modificarContrasena = () => {
    console.log('ENR')
    axios.put('http://34.95.33.177:3000/modificar_usuario',{fk_id_usuario:this.state.id_usuario, nombre: this.state.nombre,
    apellido:this.state.apellido, correo:this.state.email, telefono:this.state.telefono, pass:this.state.contrasena2, curp:this.state.curp,
    foto: this.state.foto, ciudad:null, tipo_conductor:null})
    .then(response => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onValidateInput= () =>{
    sha256("hola").then(hash => {
      console.log(hash)
     });
    if (this.state.contrasena.trim() === "") {
        this.setState(() => ({ nameError: "Campo obligatorio" }));
    } else {
      this.setState(() => ({ nameError: "" }));  
    }
    if (this.state.contrasena2.trim() === "") {
      this.setState(() => ({ nameError2: "Campo obligatorio" }));
    } else {
      this.setState(() => ({ nameError2: "" }));  
    }
    if (this.state.contrasena.trim() != sha256("jose")){
      this.setState(() => ({ nameError2: "La contraseña no coincide" }));
    }else{
      if(this.state.contrasena.trim() != "" && this.state.contrasena2.trim()) {
        //this.modificarContrasena();
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
            <Text style={{fontSize:0}}> {this.state.id_usuario = navigation.getParam('id_usuario'), this.state.nombre = navigation.getParam('nombre'),
            this.state.apellido = navigation.getParam('apellido'), this.state.telefono = navigation.getParam('telefono'), this.state.email = navigation.getParam('correo'),
            this.state.curp = navigation.getParam('curp'),this.state.foto = navigation.getParam('foto')} </Text>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Cambiar Contraseña</H3></Row>
            <Row style = {{marginBottom: 1, marginLeft:20, marginRight:20}}>
              <Text style={{textAlign:'justify'}}>Ingrese la contraseña anterior. La nueva contraseña debera
              tener 6 digitos e incluir al menos una letra o un números.</Text>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasena} onChangeText={contrasena => this.setState({ contrasena })} secureTextEntry={this.state.secureTextEntry1} style = {{borderBottomWidth: 0.5}} placeholder='Contraseña Anterior'></Input>
              </Col>
              <Col style={{marginTop:20, position:'absolute', marginLeft:350}}>
                <TouchableOpacity onPress={this.onIconPress1} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom:5}}>
                {!!this.state.nameError && (
                  <Text style={{ color: "red", fontSize:11, marginLeft:15}}>{this.state.nameError}</Text>
                )}
              </Col>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasena2} onChangeText={contrasena2 => this.setState({ contrasena2 })} secureTextEntry={this.state.secureTextEntry2} style = {{borderBottomWidth: 0.5}} placeholder='Contraseña Nueva'></Input>
              </Col>
              <Col style={{marginTop:20, position:'absolute', marginLeft:350}}>
                <TouchableOpacity onPress={this.onIconPress2} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom:5}}>
                {!!this.state.nameError2 && (
                  <Text style={{ color: "red", fontSize:11, marginLeft:15}}>{this.state.nameError2}</Text>
                )}
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