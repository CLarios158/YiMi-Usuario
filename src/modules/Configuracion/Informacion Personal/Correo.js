import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, H3} from 'native-base';
import axios from 'axios';


class Correo extends Component {
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

  goUpdateEmail = () =>{
    this.props.navigation.navigate('Correo2',{id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido,
    curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto});
  }

  sendEmail = () =>{
    axios.post('http://35.203.42.33:3000/mail',{correo: this.state.email})
    .then(response=> {
      alert("Revisa tu correo, por favor. Te hemos enviado un correo de verificación.");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Correo electrónico actual</H3></Row>
            <Row style = {{marginLeft:20}}><Text>{this.state.email}</Text></Row>
            <Row style = {{marginLeft:20, marginRight:20}}><Text>Tu correo aún no está verificado. Te hemos enviado un correo de verificacion. ¿Recibiste?</Text></Row>
            <Row><Button transparent onPress={this.sendEmail}><Text style={{color:'gray'}}>Enviar de nuevo correo de verificación</Text></Button></Row>
            <Row style={{marginTop:35}}><Col><Button onPress={this.goUpdateEmail} block style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Cambiar tu correo electrónico</Text></Button></Col></Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Correo