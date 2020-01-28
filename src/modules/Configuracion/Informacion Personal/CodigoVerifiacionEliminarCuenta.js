import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, H3, View} from 'native-base';
import { SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

class CodigoVerificacion extends Component {
  isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      telefono: this.props.navigation.getParam('telefono'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: ''
    };
  }

  componentDidMount(){
    this.isMounted = true;
    axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono:this.state.telefono});
  }

  componentWillUnmount() {
    this.isMounted= false;
  }

  validateCode = () => {
    const input1 = this.state.input1;
    const input2 = this.state.input2;
    const input3 = this.state.input3;
    const input4 = this.state.input4;
    const input5 = this.state.input5;
    const input6 = this.state.input6;
    const codigoV = input1+input2+input3+input4+input5+input6;

    axios.post('http://35.203.42.33:3000/validar_codigo',{telefono: this.state.telefono, codigo: codigoV})
    .then(response => {
      if(response.data.respuesta == 0){
        this.setState({error: 'El código de verificación es incorrecto',input1:'',input2:'',input3:'',input4:'',input5:'',input6:''})
      }else{
        this.deleteAccount();
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  deleteAccount = () => {
    axios.post('http://35.203.42.33:3000/eliminar_usuario',{id_usuario: this.state.id_usuario})
    .then(response => {
      this.handleOpen();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  onValidateInput= () =>{
    if (this.state.input1.trim() === "" && this.state.input2.trim() === "" && this.state.input3.trim() === "" && this.state.input4.trim() === "" && this.state.input5.trim() === "" && this.state.input6.trim() === "") {
      this.setState(() => ({ nameError: "Campos obligatorio" }));
    } else {
      this.validateCode();
    }
  }

  sendCode = () =>{
    axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono:this.state.telefono});
    alert("Se ha enviado un nuevo código de verificación");
  }

  handleOpen = () => {
    this.setState({ show: true })
  }
 
  handleClose = () => {
    this.goRegistro();
  }

  goRegistro = () =>{
    this.props.navigation.navigate('Registro');
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:10}}><H3>Código de verificación</H3></Row>
            <Row style = {{marginBottom: 50, marginLeft:10}}><Text>El código de verificación se ha enviado al: {this.state.telefono}</Text></Row>
            <Row style = {{marginBottom: 10, marginLeft:10}}><Text>Ingrese el código de 6 dígitos:</Text></Row>
            <Row>
              <Col><Input value={this.state.input1} onChangeText={input1 => this.setState({ input1 })} keyboardType='numeric' maxLength={1} style={{marginLeft:10, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
              <Col><Input value={this.state.input2} onChangeText={input2 => this.setState({ input2 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
              <Col><Input value={this.state.input3} onChangeText={input3 => this.setState({ input3 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
              <Col><Input value={this.state.input4} onChangeText={input4 => this.setState({ input4 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
              <Col><Input value={this.state.input5} onChangeText={input5 => this.setState({ input5 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
              <Col><Input value={this.state.input6} onChangeText={input6 => this.setState({ input6 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
            </Row>
            <Row style={{marginTop:10}}>
              <Col><Button transparent onPress={this.sendCode}><Text style={{color:'black'}}>No recibí el código ></Text></Button></Col>
              <Col style={{marginTop:15}}><Text style={{ color: "red", fontSize:11}}>{this.state.error}{this.state.nameError}</Text></Col>
            </Row>
            <Row style={{marginTop:40}}>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85}}>
                <Button onPress={this.onValidateInput} block style={{backgroundColor:'#ff8834'}}><Text>Validar</Text></Button>
                
              </Col>
            </Row>
            <View>
              <SCLAlert show={this.state.show} onRequestClose={this.handleClose} theme="success" title="Éxito"subtitle="Cuenta Eliminada" headerIconComponent={<Ionicons name="ios-checkmark-circle" size={50} color="white" />}>
                <SCLAlertButton theme="success" onPress={this.handleClose}>Aceptar</SCLAlertButton>
              </SCLAlert>
            </View>
            </Grid>
        </Content>
      </Container>
    );
  }
}

export default CodigoVerificacion