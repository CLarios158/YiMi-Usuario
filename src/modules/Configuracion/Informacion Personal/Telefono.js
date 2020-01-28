import React, { Component } from 'react';
import { Container, Content, Text, Form, Button, Grid, Col, H3, Row} from 'native-base';


class Telefono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: this.props.navigation.getParam('telefono'),
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      curp: this.props.navigation.getParam('curp'),
      email: this.props.navigation.getParam('correo'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      foto: this.props.navigation.getParam('foto')
    };
  }

  goChangePhone = () =>{
    this.props.navigation.navigate('Telefono2', {id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
    curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto})
  }  

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Cambiar número de teléfono</H3></Row>
            <Row style = {{marginBottom: 15, marginLeft:20, marginRight:20}}><Text>Tu número de teléfono actual es: {this.state.telefono}</Text></Row>
            <Row style = {{marginLeft:20, marginRight:20}}><Text style={{textAlign:'justify'}}>Importante: El dinero que hayas aculado queda registrado en la cuenta. Después de modificar tú numero de teléfono deberás iniciar sesión con tu nuevo número.</Text></Row>
            <Row style={{marginTop:35}}><Col><Button onPress={this.goChangePhone} block style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Cambiar número de teléfono</Text></Button></Col></Row>
          </Grid> 
        </Content>
      </Container>
    );
  }
}

export default Telefono