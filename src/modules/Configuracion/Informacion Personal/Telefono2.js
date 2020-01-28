import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, Button, Grid, Col, Row, H3, Item, Label} from 'native-base';
import axios from 'axios';

class Telefono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: '',
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      curp: this.props.navigation.getParam('curp'),
      email: this.props.navigation.getParam('correo'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      foto: this.props.navigation.getParam('foto')
    };
  }

  onValidateInput= () =>{
    var validatePhone = /^[0-9]{10}$/;
    if (this.state.telefono.trim() == "") {
      this.setState(() => ({ msgError: "Campo obligatorio" }));
    } else if(!validatePhone.test(this.state.telefono)){
      this.setState(() => ({ msgError: "Favor de Ingresar 10 digitos" }));
    } else {
      this.goSendCode();  
    }
  }

  goSendCode = () => {
    axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono:this.state.telefono});
    this.props.navigation.navigate('Codigo', {id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
    curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto})
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Cambiar número de teléfono</H3></Row>
            <Row style = {{marginBottom: 15, marginLeft:20, marginRight:20}}><Text>Ingrese el  nuevo número de teléfono que usaras en tu cuenta.</Text></Row>
            <Row>
              <Col style={{marginRight:20, marginLeft:20}}>
                <Input value={this.state.telefono} onChangeText={telefono => this.setState({ telefono })} style = {{borderBottomWidth: 0.5}} keyboardType='numeric' maxLength={10} placeholder="Ingresa tu número de teléfono"/>
              </Col>
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginBottom:5}}>
                {!!this.state.msgError && (
                  <Text style={{ color: "red", fontSize:11}}>{this.state.msgError}</Text>
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

export default Telefono