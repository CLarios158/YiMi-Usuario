import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Item, Label, Input, H3} from 'native-base';
import axios from 'axios';
import { Alert } from 'react-native';

class Correo2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: this.props.navigation.getParam('telefono'),
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      curp: this.props.navigation.getParam('curp'),
      email: '',
      id_usuario: this.props.navigation.getParam('id_usuario'),
      foto: this.props.navigation.getParam('foto')
    };
  }

  updateEmail = () => {
    axios.post('http://35.203.42.33:3000/mail',{correo: this.state.email})
    .then(response=> {
      axios.put('http://35.203.42.33:3000/modificar_usuario',{id_usuario:this.state.id_usuario, nombre: this.state.nombre,apellido:this.state.apellido, correo:this.state.email, num_telefono:this.state.telefono, curp:this.state.curp,
      foto: this.state.foto, id_ciudad:null, id_tipo_conductor:null})
      .then(response => {
        Alert.alert(
          'Aviso',
          'Se ha actualizado tu correo electrónico con éxito!',
          [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Informacion')},
          ]
        );
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
  
  onValidateInput= () =>{
    var validateCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.email.trim() === "") {
      this.setState(() => ({ nameError: "Campo obligatorio" }));
    } else if(!validateCorreo.test(this.state.email)) {
      this.setState(() => ({ nameError: "Formato Incorrecto" })); 
    }else{
      this.updateEmail();  
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:20}}><H3>Ingresa correo electrónico nuevo</H3></Row>
            <Row style = {{marginLeft:20, marginRight:20}}><Text style={{textAlign:'justify'}}>Por favor, ingresa un correo electrónico real como verificación de seguridad. Después te enviaremos un correo para verificar.</Text></Row>
            <Row>
              <Col style={{marginRight:20, marginLeft:20}}>
                <Input  value={this.state.email} onChangeText={email => this.setState({ email })} placeholder="Correo Electrónico" style = {{borderBottomWidth: 0.5}}/>
              </Col>
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginBottom:5}}>
                {!!this.state.nameError && (<Text style={{ color: "red", fontSize:11}}>{this.state.nameError}</Text>)}
              </Col>
            </Row>
            <Row style={{marginTop:30}}><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Confirmar</Text></Button></Col></Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Correo2