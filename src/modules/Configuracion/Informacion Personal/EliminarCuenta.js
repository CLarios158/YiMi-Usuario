import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, H3} from 'native-base';
import { Alert } from 'react-native';

class Contraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_usuario:  this.props.navigation.getParam('id_usuario'),
      telefono: this.props.navigation.getParam('telefono')
    }
  }

  showAlert = () =>{
    Alert.alert(
      'Aviso',
      'Esto significa que se eliminarán todos los datos',
      [
      {text: 'Cancelar'},
      {text: 'Eliminar Cuenta', onPress: () => this.props.navigation.navigate('CodigoVerifiacionEliminarCuenta',{id_usuario: this.state.id_usuario, telefono: this.state.telefono})},
      ]
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Eliminar cuenta actual</H3></Row>
            <Row style = {{marginBottom: 30, marginLeft:20}}><Text>Eliminar cuenta vinculada a: {this.state.telefono}</Text></Row>
            <Row style = {{marginLeft:20}}><Text>Se eliminará la siguiente información y no se podrá recuperar:</Text></Row>
            <Row style = {{marginTop: 5, marginLeft:20}}><Text>* Información de viajes.</Text></Row>
            <Row style = {{marginLeft:20}}><Text>* Información de facturas, cupones, etc.</Text></Row>
            <Row style = {{marginLeft:20}}><Text>* Información personal.</Text></Row>
            <Row style={{marginTop:35}}><Col><Button onPress={this.showAlert} block danger style = {{marginLeft: 20, marginRight: 20}}><Text>Eliminar Cuenta</Text></Button></Col></Row>
          </Grid> 
        </Content>
      </Container>
    );
  }
}

export default Contraseña