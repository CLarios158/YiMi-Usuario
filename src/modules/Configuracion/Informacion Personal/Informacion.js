import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Root, Container, Content, Text, Grid, Col, Row, ListItem, Left, Right, Button, Icon, Card, CardItem, Body, Thumbnail, ActionSheet, View} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

var BUTTONS = [
    {text: <Text style={{ color: 'black', fontSize: 15}}>                         Tomar Foto                         </Text>},
    {text: <Text style={{ color: 'black', fontSize: 15}}>       Seleccionar desde álbum de fotos       </Text>},
    {text: <Text style={{ color: 'black', fontSize: 15}}>                            Cancelar                            </Text>}
  ];
var CANCEL_INDEX = 4;

class Informacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loanding: false,
          nombre: '',
          apellido: '',
          curp: '',
          telefono: '',
          email: '',
          id_usuario: '',
          foto: ''
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.post('http://35.203.42.33:3000/consultar_usuario',{id_usuario: global.ID})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        id_usuario: element["id_usuario_out"], 
                        nombre: element["nombre_out"], 
                        apellido: element["apellido_out"], 
                        curp: element["curp_out"],
                        telefono: element["telefono_out"],
                        email: element["correo_out"],
                        foto: element["fotografia_out"],
                        loanding: true
                    });        
                });
                if(this.state.foto != ''){
                    this.state.foto = this.state.foto;
                }else{
                    this.setState({foto: "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg"});
                }
                //this.props.navigation.navigate('Informacion', {nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
                //correo: this.state.email, telefono: this.state.telefono, foto: this.state.foto})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        });
    }

    componentWillUnmount(){
        this.focusListener.remove();
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3]});

        if (!result.cancelled) {
            this.props.navigation.navigate('CargarFoto', {id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
            curp: this.state.curp, telefono: this.state.telefono, foto: result.uri});
        }else{
            //this.props.navigation.navigate('Informacion');
        }
    }

    pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({allowsEditing: true, aspect: [4, 3]});

        if (!result.cancelled) {
            this.props.navigation.navigate('CargarFoto', {id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
            curp: this.state.curp, telefono: this.state.telefono, foto: result.uri});
        }else{
            //this.props.navigation.navigate('Informacion');
        }
    }

    openCamera = () =>{
        this.props.navigation.navigate('Camera', {id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
        curp: this.state.curp, telefono: this.state.telefono});
    }

    goDeleteUser = () =>{
        this.props.navigation.navigate('EliminarCuenta',{id_usuario:this.state.id_usuario, telefono: this.state.telefono})
    }

    goChangePassword = () =>{
        this.props.navigation.navigate('Contrasena', {id_usuario: this.state.id_usuario, telefono: this.state.telefono});
    }

    goChangeSocial = () =>{
        this.props.navigation.navigate('CuentasRedes');
    }

    goChangeEmail = () =>{
        this.props.navigation.navigate('Correo', {id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
        curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto});
    }

    goChangePhone = () =>{
        this.props.navigation.navigate('Telefono', {id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
        curp: this.state.curp, telefono: this.state.telefono});
    }

    render() {
        if(this.state.loanding == true){
            return (
                <Root>
                    <Container>
                        <Content>
                            <Grid>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Thumbnail style={{height:50, width:50, borderRadius:50}}  source={this.state.foto ? {uri: this.state.foto} : null}/>
                                                                    <Text style={{fontSize:12, marginLeft:130}}>Editar foto de perfil</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={() =>
                                                                    ActionSheet.show(
                                                                    {
                                                                        options: BUTTONS,
                                                                        cancelButtonIndex: CANCEL_INDEX
                                                                    },
                                                                    buttonIndex => {
                                                                        if(buttonIndex === 0){
                                                                            {this.pickCamera()}
                                                                            
                                                                        }
                                                                        if (buttonIndex === 1) {
                                                                            
                                                                            {this.pickImage()}
                                                                        }
                                                                    }
                                                                    )} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{fontWeight:'bold'}}>Nombres (s):  </Text>
                                                                    <Text>{this.state.nombre}</Text>
                                                                </Left>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{fontWeight:'bold'}}>Apellido (s):  </Text>
                                                                    <Text>{this.state.apellido}</Text>
                                                                </Left>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{fontWeight:'bold'}}>CURP:   </Text>
                                                                    <Text>{this.state.curp}</Text>
                                                                </Left>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left style={{maxWidth:160}}>
                                                                    <Text>Número de teléfono</Text>                                                            
                                                                </Left>
                                                                <Right>
                                                                    <Text style={{fontSize:12}}>{this.state.telefono}</Text>
                                                                </Right>
                                                                <Right style={{maxWidth:50}}>
                                                                    <Button onPress={this.goChangePhone} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text>Cambiar la contraseña</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={this.goChangePassword} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>                                                    
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left style={{maxWidth:115}}>
                                                                    <Text>Correo</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Text style={{fontSize:12}}>{this.state.email}</Text>
                                                                </Right>                                                                
                                                                <Right style={{maxWidth:50}}> 
                                                                    <Button onPress={this.goChangeEmail} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text>Cuentas en redes sociales</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={this.goChangeSocial} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem style={{borderBottomWidth:0}}>
                                                                <Left>
                                                                    <Text>Eliminar mi cuenta</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={this.goDeleteUser} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </Col>
                                </Row>                       
                            </Grid> 
                        </Content>
                    </Container>
                </Root>
            );
        }else{
            return(
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                    <ActivityIndicator size={80} color="#ff8834" />
                </View>
            );
        }
    }
}

export default Informacion;