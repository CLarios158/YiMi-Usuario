import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, Button, Grid, Col, Row, H3} from 'native-base';
import axios from 'axios';

class CodigoVerificacion extends Component {
    constructor(props) {
      super(props);
      this.secondTextInputRef = React.createRef();
      this.state = {
        telefono: this.props.navigation.getParam('telefono'),
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        error:''
      };
    }

    checkCode = () => {
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
          this.props.navigation.navigate('InformacionPersonal',{telefono: this.state.telefono})
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }

    sendCode  = () => {
      axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono: this.state.telefono});
      alert("Se ha enviado un nuevo código de verificación");
    }
    
    render() {
    return (
      <Container>
        <Content>
          <Form>
            <Grid>
              <Row style = {{marginTop: 90, marginBottom: 10,marginLeft:10}}><H3>Código de verificación</H3></Row>
              <Row style = {{marginBottom: 50, marginLeft:10}}><Text>El código de verificación se ha enviado al: {this.state.telefono}</Text></Row>
              <Row style = {{marginBottom: 10, marginLeft:10}}><Text>Ingrese el código de 6 dígitos:</Text></Row>
              <Row>
                <Col><Input value={this.state.input1} getRef={input => {this.firstRef = input;}} onSubmitEditing={() => {this.secondRef._root.focus();}} returnKeyType={"next"} onChangeText={input1 => this.setState({ input1 })} keyboardType='numeric' maxLength={1} style={{marginLeft:10, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
                <Col><Input value={this.state.input2} ref={input => {this.secondRef = input;}} onSubmitEditing={() => {this.thirdRef._root.focus();}} returnKeyType={"next"} onChangeText={input2 => this.setState({ input2 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
                <Col><Input value={this.state.input3} ref={input => {this.thirdRef = input;}} onSubmitEditing={() => {this.fourthRef._root.focus();}} returnKeyType={"next"} onChangeText={input3 => this.setState({ input3 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
                <Col><Input value={this.state.input4} ref={input => {this.fourthRef = input;}} onSubmitEditing={() => {this.fifthRef._root.focus();}} returnKeyType={"next"} onChangeText={input4 => this.setState({ input4 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
                <Col><Input value={this.state.input5} ref={input => {this.fifthRef = input;}} onSubmitEditing={() => {this.sixthRef._root.focus();}} returnKeyType={"next"} onChangeText={input5 => this.setState({ input5 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
                <Col><Input value={this.state.input6} ref={input => {this.sixthRef = input;}} onSubmitEditing={() => {this.seventhRef._root.focus();}} returnKeyType={"next"} onChangeText={input6 => this.setState({ input6 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}} /></Col>
              </Row>
              <Row style={{marginTop:10}}>
                <Col><Button transparent onPress={this.sendCode}><Text style={{color:'black'}}>No recibí el código ></Text></Button></Col>
                <Col style={{marginTop:15}}><Text style={{ color: "red", fontSize:11}}>{this.state.error}</Text></Col>
              </Row>
              <Row style={{marginTop:40}}>
                    <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85}}>
                        <Button onPress={this.checkCode} block style={{backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button>
                    </Col>
                </Row>
            </Grid>       
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CodigoVerificacion