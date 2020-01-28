import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, H3, View} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAvoidingView } from 'react-native';
import axios from 'axios';


class InformacionAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.navigation.getParam('nombre'),
            apellido: this.props.navigation.getParam('apellido'),
            email: this.props.navigation.getParam('email'),
            curp: '',
            telefono: '',
            foto: this.props.navigation.getParam('foto')
        };
    }

    goValidateCode = () => {
        axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono: this.state.telefono});
        this.props.navigation.navigate('CodigoVerificacionAPI',{telefono: this.state.telefono, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, email: this.state.email, foto: this.state.foto});
    }

    onValidateInput= () =>{
        var validateCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var validateCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
        var validateNombres = /^[a-zA-Z\sñáéíóú]+$/;
        var validatePhone = /^[0-9]{10}$/;

        if (this.state.nombre.trim() === "") {
            this.setState(() => ({ nombreError: "Ingresa tu nombre" }));
        } else if(!validateNombres.test(this.state.nombre)){
            this.setState(() => ({ nombreError: "Formato Incorrecto" }));
        }else{
            this.setState(() => ({ nombreError: "" }));
        }

        if (this.state.apellido.trim() === "") {
            this.setState(() => ({ apellidoError: "Ingresa tu apellido" }));
        } else if(!validateNombres.test(this.state.apellido)){
            this.setState(() => ({ apellidoError: "Formato Incorrecto" }));
        }else{
            this.setState(() => ({ apellidoError: "" }));
        }

        if (this.state.email.trim() === "") {
            this.setState(() => ({ emailError: "Ingresa tu correo electrónico" }));
        } else if(!validateCorreo.test(this.state.email)){
            this.setState(() => ({ emailError: "Formato Incorrecto" }));
        } else{
            this.setState(() => ({ emailError: "" }));
        }


        if (this.state.telefono.trim() === "") {
            this.setState(() => ({ telefonoError: "Ingresa tu número teléfonico" }));
        } else if(!validatePhone.test(this.state.telefono)){
            this.setState(() => ({ telefonoError: "Favor de Ingresar 10 digitos" }));
        } else{
            this.setState(() => ({ telefonoError: "" }));
        }

        if (this.state.email.trim() != "" && this.state.apellido.trim() != "" && this.state.nombre.trim() != "" && this.state.telefono.trim() != ""
        && validateNombres.test(this.state.nombre) && validateCorreo.test(this.state.email) && validatePhone.test(this.state.telefono) && this.state.curp == "") {
            this.goValidateCode();
        }
        
        if(this.state.email.trim() != "" && this.state.apellido.trim() != "" && this.state.nombre.trim() != "" && this.state.telefono.trim() != ""
        && validateNombres.test(this.state.nombre) && validateCorreo.test(this.state.email) && validatePhone.test(this.state.telefono) && this.state.curp != ""){
            if(!validateCurp.test(this.state.curp)){
                this.setState(() => ({ curpError: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ curpError: "" }));
                this.goValidateCode();
            }
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
                    <Row>
                        <Col style={{marginLeft:20, marginBottom:5}}>
                            {!!this.state.nombreError && (
                                <Text style={{ color: "red", fontSize:11}}>{this.state.nombreError}</Text>
                            )}
                        </Col>
                    </Row>
                    <Row style={{marginBottom:15}}>
                        <Col style={{marginLeft:20, marginRight:20}}>
                            <Input value={this.state.apellido} onChangeText={apellido => this.setState({ apellido })} style = {{borderBottomWidth: 0.5}} placeholder='* Apellidos (s)'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:20, marginBottom:5}}>
                            {!!this.state.apellidoError && (
                                <Text style={{ color: "red", fontSize:11}}>{this.state.apellidoError}</Text>
                            )}
                        </Col>
                    </Row>
                    <Row style={{marginBottom:15}}>
                        <Col style={{marginLeft:20, marginRight:20}}>
                            <Input value={this.state.email} onChangeText={email => this.setState({ email })} style = {{borderBottomWidth: 0.5}} placeholder='* Correo Eléctronico'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:20, marginBottom:5}}>
                            {!!this.state.emailError && (
                                <Text style={{ color: "red", fontSize:11}}>{this.state.emailError}</Text>
                            )}
                        </Col>
                    </Row>
                    <Row style={{marginBottom:15}}>
                        <Col style={{marginLeft:20, marginRight:20}}>
                            <Input value={this.state.curp} onChangeText={curp => this.setState({ curp })} style = {{borderBottomWidth: 0.5}} placeholder='CURP'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:20, marginBottom:5}}>
                            {!!this.state.curpError && (
                                <Text style={{ color: "red", fontSize:11}}>{this.state.curpError}</Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:20, marginRight:20}}>
                            <Input value={this.state.telefono} onChangeText={telefono => this.setState({ telefono })} style = {{borderBottomWidth: 0.5}} keyboardType='numeric' placeholder='* Número teléfonico'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:20, marginBottom:5}}>
                            {!!this.state.telefonoError && (
                                <Text style={{ color: "red", fontSize:11}}>{this.state.telefonoError}</Text>
                            )}
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

export default InformacionAPI