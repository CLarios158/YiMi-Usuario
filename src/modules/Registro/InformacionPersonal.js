import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, H3} from 'native-base';
import { KeyboardAvoidingView } from 'react-native';

class InformacionPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nombre: '',
          apellido: '',
          email: '',
          curp: '',
          telefono: this.props.navigation.getParam('telefono')
        };
    }

    onValidateInput= () =>{
        var validateCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var validateCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
        var validateNombres = /^[a-zA-Z\sñáéíóú]+$/;

        if (this.state.nombre.trim() === "") {
            this.setState(() => ({ nombreError: "Ingresa tu nombre" }));
        } else if(!validateNombres.test(this.state.nombre)){
            this.setState(() => ({ nombreError: "Formato Incorrecto"}));
        } else {
            this.setState(() => ({ nombreError: "" }));
        }

        if (this.state.apellido.trim() === "") {
            this.setState(() => ({ apellidoError: "Ingresa tu apellido" }));
        } else if(!validateNombres.test(this.state.apellido)){
            this.setState(() => ({ apellidoError: "Formato Incorrecto" }));
        }else {
            this.setState(() => ({ apellidoError: "" }));
        }

        if(validateCorreo.test(this.state.email) && this.state.email.trim() != ""){
            this.setState(() => ({ emailError: "" }));
        }else if (this.state.email.trim() == ""){
            this.setState(() => ({ emailError: "Ingresa tu Correo" }));  
        }else{
            this.setState(() => ({ emailError: "Formato Incorrecto" }));
        }

        if (this.state.apellido.trim() != "" && validateNombres.test(this.state.apellido) && this.state.nombre.trim() != "" && validateNombres.test(this.state.nombre)  && this.state.email.trim() != ""  && validateCorreo.test(this.state.email) && this.state.curp == "") {
            this.props.navigation.navigate('ConfigurarContrasena',{nombre: this.state.nombre, apellido: this.state.apellido,
            email: this.state.email, curp: this.state.curp, telefono: this.state.telefono, foto: ''});
        }

        if(this.state.apellido.trim() != "" && validateNombres.test(this.state.apellido) && this.state.nombre.trim() != "" && validateNombres.test(this.state.nombre)  && this.state.email.trim() != ""  && validateCorreo.test(this.state.email) && this.state.curp != "" && validateCurp.test(this.state.curp)){
            this.setState(() => ({ curpError: "" }));
            this.props.navigation.navigate('ConfigurarContrasena',{nombre: this.state.nombre, apellido: this.state.apellido,
            email: this.state.email, curp: this.state.curp, telefono: this.state.telefono, foto: ''});
        }else if(this.state.curp.trim() == "" ){
            this.setState(() => ({ curpError: "" }));
        }else if(!validateCurp.test(this.state.curp)){
            this.setState(() => ({ curpError: "Formato Incorrecto" }));
        }
    }

    render() {
    return (
      <Container>
        <Content>
            <KeyboardAvoidingView style={{flex: 1}}  behavior="padding" enabled>
            <Grid>
                <Row><Col style = {{marginTop: 90, marginBottom: 10, marginLeft:20}}><H3>Información Personal</H3></Col></Row>
                <Row><Col style = {{marginLeft:20, marginBottom:15}}><Text>* Campos requeridos</Text></Col></Row>
                <Row style={{marginBottom:15}}>
                    <Col style={{marginLeft:20, marginRight:20}}>
                        <Input  value={this.state.nombre} onChangeText={nombre => this.setState({ nombre })} style = {{borderBottomWidth: 0.5}} placeholder='* Nombre (s)'></Input>
                    </Col>
                </Row>
                <Row style={{marginTop:0}}> 
                    <Col style={{marginLeft:20}}>
                        {!!this.state.nombreError && (<Text style={{ color: "red", fontSize:11}}>{this.state.nombreError}</Text>)}
                    </Col>
                </Row>
                <Row style={{marginBottom:15}}>
                    <Col style={{marginLeft:20, marginRight:20}}>
                        <Input value={this.state.apellido} onChangeText={apellido => this.setState({ apellido })}  style = {{borderBottomWidth: 0.5}} placeholder='* Apellidos (s)'></Input>
                    </Col>
                </Row>
                <Row style={{marginTop:0}}>
                    <Col style={{marginLeft:20}}>
                        {!!this.state.apellidoError && (<Text style={{ color: "red", fontSize:11}}>{this.state.apellidoError}</Text>)}
                    </Col>
                </Row>
                <Row style={{marginBottom:15}}>
                    <Col style={{marginLeft:20, marginRight:20}}>
                        <Input value={this.state.email} onChangeText={email => this.setState({ email })}  style = {{borderBottomWidth: 0.5}} placeholder='* Correo Eléctronico'></Input>
                    </Col>
                </Row>
                <Row>
                    <Col style={{marginLeft:20}}>
                        {!!this.state.emailError && (<Text style={{ color: "red", fontSize:11}}>{this.state.emailError}</Text>)}
                    </Col>
                </Row>
                <Row>
                    <Col style={{marginLeft:20, marginRight:20}}>
                        <Input value={this.state.curp} onChangeText={curp => this.setState({ curp })} style = {{borderBottomWidth: 0.5}} placeholder='CURP'></Input>
                        {!!this.state.curpError && (<Text style={{ color: "red", fontSize:11}}>{this.state.curpError}</Text>)}
                    </Col>
                </Row>
                <Row style={{marginTop:35}}><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button></Col></Row>
            </Grid> 
            </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

export default InformacionPersonal