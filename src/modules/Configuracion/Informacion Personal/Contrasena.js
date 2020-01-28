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
      secureTextEntry2: true,
      secureTextEntry3: true,
      respuesta: '',
      contrasenaold: '',
      contrasenanew:'',
      contrasenanew2:'',
      id_usuario: this.props.navigation.getParam('id_usuario'),
      telefono: this.props.navigation.getParam('telefono')
    };
  }

  updatePassword = () => {
    axios.put('http://35.203.42.33:3000/modificar_contrasena',{id_usuario:this.state.id_usuario, pass: this.state.contrasenanew2})
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

    if(this.state.contrasenaold.trim() == ""){
      this.setState(() => ({ contrasenaError1: "Ingresa tu contraseña" }));
    }else if(!validateContrasena.test(this.state.contrasenaold)){
      this.setState(() => ({ contrasenaError1: "Formato Incorrecto" }));
    }else{ 
      axios.post('http://35.203.42.33:3000/validar_contrasena',{id_usuario:this.state.id_usuario, pass: this.state.contrasenaold})
      .then(response => {
        response.data.data.forEach(element => {this.setState({respuesta: element["respuesta"]});
        }); 
        if(this.state.respuesta != 0){        
          this.setState(() => ({ contrasenaError1: "" }));
        }else {
          this.setState(() => ({ contrasenaError1: "La contraseña es incorrecta" }));
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }); 
    }

    if(this.state.contrasenanew.trim() == ""){
      this.setState(() => ({ contrasenaError2: "Ingresa tu contraseña" }));
    }else if(!validateContrasena.test(this.state.contrasenanew)){
      this.setState(() => ({ contrasenaError2: "Formato Incorrecto" }));
    }else{
      this.setState(() => ({ contrasenaError2: "" }));
    }
    
    if(this.state.contrasenanew2.trim() == ""){
      this.setState(() => ({ contrasenaError3: "Ingresa tu contraseña" }));
    }else if(!validateContrasena.test(this.state.contrasenanew2)){
      this.setState(() => ({ contrasenaError3: "Formato Incorrecto" }));
    }else{
      this.setState(() => ({ contrasenaError3: "" }));
    }

    if(this.state.contrasenanew != this.state.contrasenanew2 && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)){      
      this.setState(() => ({ contrasenaError3: "La contraseña nueva no coindice" }));
    }

    if(this.state.contrasenaold.trim() != "" && this.state.contrasenanew.trim() != "" && this.state.contrasenanew2.trim() != ""
    && validateContrasena.test(this.state.contrasenaold) && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)
    && this.state.respuesta != 0){
      this.updatePassword();
    }
        
  }

  sendCode = () =>{
    axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono:this.state.telefono});
    this.props.navigation.navigate('CodigoContrasena', {id_usuario: this.state.id_usuario,telefono: this.state.telefono});
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

  onIconPress3 = () =>{
    this.setState({
      secureTextEntry3: !this.state.secureTextEntry3
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Cambiar Contraseña</H3></Row>
            <Row style = {{marginBottom: 1, marginLeft:20, marginRight:20}}>
              <Text style={{textAlign:'justify'}}>Ingrese la contraseña anterior. La nueva contraseña deberá tener 6 dígitos e incluir al menos una letra o un número.</Text>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasenaold} onChangeText={contrasenaold => this.setState({ contrasenaold })} secureTextEntry={this.state.secureTextEntry1} style = {{borderBottomWidth: 0.5}} placeholder='Contraseña Anterior'></Input>
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
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasenanew} onChangeText={contrasenanew => this.setState({ contrasenanew })} secureTextEntry={this.state.secureTextEntry2} style = {{borderBottomWidth: 0.5}} placeholder='Contraseña Nueva'></Input>
              </Col>
              <Col style={{marginTop:20, position:'absolute', marginLeft:350}}>
                <TouchableOpacity onPress={this.onIconPress2} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom:5}}>
                {!!this.state.contrasenaError2 && (<Text style={{ color: "red", fontSize:11, marginLeft:15}}>{this.state.contrasenaError2}</Text>)}
              </Col>
            </Row>
            <Row>
              <Col style={{marginLeft:20, marginRight:20}}>
                <Input value={this.state.contrasenanew2} onChangeText={contrasenanew2 => this.setState({ contrasenanew2 })} secureTextEntry={this.state.secureTextEntry3} style = {{borderBottomWidth: 0.5}} placeholder='Confirmar Contraseña Nueva'></Input>
              </Col>
              <Col style={{marginTop:20, position:'absolute', marginLeft:350}}>
                <TouchableOpacity onPress={this.onIconPress3} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom:5}}>
                {!!this.state.contrasenaError3 && (<Text style={{ color: "red", fontSize:11, marginLeft:15}}>{this.state.contrasenaError3}</Text>)}
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom:5, marginLeft:20, marginTop:3}}>
                <Text onPress={this.sendCode} style={{color:'gray', fontSize:14}}>Olvidé mi contraseña ></Text>
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