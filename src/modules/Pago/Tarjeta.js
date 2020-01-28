import React, { Component } from 'react';
import { Container, Content, Text, Grid, Col, Row, Input, Button} from 'native-base';
import {NetInfo, Dimensions, Alert, ScrollView, AsyncStorage} from 'react-native';
import axios from 'axios';


class Tarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
          num_tarjeta: '',
          fecha_vencimiento: '',
          ccv: ''
        };
    }

    addCard = () =>{
        console.log(global.ID)
        axios.post('http://35.203.42.33:3000/registrar_cuenta_bancaria',
        {id_rol:4, clabe: '', num_cuenta: '', num_tarjeta: this.state.num_tarjeta, nombre_propietario: '', 
        apellido_propietario: '', fecha_vencimiento: this.state.fecha_vencimiento, ccv: this.state.ccv, tipo_pago: null, tipo: 2, id_banco: null, id_usuario: global.ID})
        .then(response =>  { 
            Alert.alert(
                'Aviso',
                'Se registro tu tarjeta!',
                [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Pago')},
                ]
              );
            })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onValidateInput = () =>{
        var validateNumTarjeta = /^[0-9]{16}$/;
        var validateDate = /^(0?[1-9]|1[0-2])[/]([2-4][0-9])$/;

        if(this.state.num_tarjeta.trim() == ""){
            this.setState(() => ({ num_tarjetaError: "Ingresa tu Número de Tarjeta" }));
        }else if(!validateNumTarjeta.test(this.state.num_tarjeta)){
            this.setState(() => ({ num_tarjetaError: "El Número de Tarjeta debe contener 16 dígitos" }));
        }else{
            this.setState(() => ({ num_tarjetaError: "" }));
        }
        
        if(this.state.fecha_vencimiento.trim() == ""){
            this.setState(() => ({ fechaError: "Ingresa tu Fecha de Vencimiento" }));
        }else if(!validateDate.test(this.state.fecha_vencimiento)){
            this.setState(() => ({ fechaError: "Formato Incorrecto (MM/YY)" }));
        }else{
            this.setState(() => ({ fechaError: "" }));
        }  

        if(this.state.ccv.trim() == ""){
            this.setState(() => ({ ccvError: "Ingresa tu CCV" }));
        }else{
            this.setState(() => ({ ccvError: "" }));
        }  

        if(this.state.num_tarjeta.trim() != "" && this.state.fecha_vencimiento.trim() != "" && this.state.ccv.trim() != ""
        && validateDate.test(this.state.fecha_vencimiento) && validateNumTarjeta.test(this.state.num_tarjeta)){
            this.addCard();
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid style={{marginTop:10}}>
                        <Row>
                            <Col style={{marginRight:20, marginLeft:20}}>
                                <Input value={this.state.num_tarjeta} onChangeText={num_tarjeta => this.setState({ num_tarjeta })} keyboardType='numeric' maxLength={16}  placeholder="Número de tarjeta" style = {{borderBottomWidth: 0.5}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginBottom:5}}>
                                {!!this.state.num_tarjetaError && (<Text style={{ color: "red", fontSize:11, marginLeft:20}}>{this.state.num_tarjetaError}</Text>)}
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{marginRight:20, marginLeft:20}}>
                                <Input value={this.state.fecha_vencimiento} onChangeText={fecha_vencimiento => this.setState({ fecha_vencimiento })} keyboardType='numbers-and-punctuation' placeholder="Fecha de Vencimiento (MM/YY)" style = {{borderBottomWidth: 0.5}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginBottom:5}}>
                                {!!this.state.fechaError && (<Text style={{ color: "red", fontSize:11, marginLeft:20}}>{this.state.fechaError}</Text>)}
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{marginRight:20, marginLeft:20}}>
                                <Input value={this.state.ccv} onChangeText={ccv => this.setState({ ccv })} keyboardType='numeric' placeholder="CCV" maxLength={3} style = {{borderBottomWidth: 0.5}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginBottom:5}}>
                                {!!this.state.ccvError && (<Text style={{ color: "red", fontSize:11, marginLeft:20}}>{this.state.ccvError}</Text>)}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginTop:11, marginRight:20, marginLeft:20}}>
                                <Text style={{fontSize:11}}>
                                    Para su seguridad, preautorizaremos un cargo de hasta MX$10.00 en su tarjeta. 
                                    No se preocupe, solo se trata de una verificación y el dinero no se debitara de su cuenta.
                                </Text>
                            </Col>
                        </Row>
                        <Row style={{marginTop:35}}><Col><Button block onPress={this.onValidateInput} style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Agregar</Text></Button></Col></Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Tarjeta;