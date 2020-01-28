import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';


class CentroSeguridad extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id_usuario: global.ID,
          comprobacion:''
        };
    }

    addContact = () =>{
        this.props.navigation.navigate('AgregarContacto');
    }

    listContact = () =>{
        this.props.navigation.navigate('ListaContacto');
    }

    componentDidMount(){
        axios.post('http://35.203.42.33:3000/consultar_contacto_confianza',{id_usuario: this.state.id_usuario})
        .then(response =>  {
            response.data.data.forEach(element => {
                console.log(element['nombre_contacto_out']);
                this.setState({comprobacion: element['nombre_contacto_out']});
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
        console.log(this.state.comprobacion)
        if(this.state.comprobacion == ''){
            this.setState({comprobacion: 1});
        }else{
            this.setState({comprobacion: 0});
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{marginTop:30}}><Col style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold'}}>Permite con tu familia y amigos sigan tu viaje</Text></Col></Row>
                        <Row style={{marginLeft:5, marginRight:5, marginBottom:15}}><Col><Text style={{textAlign:'center'}}>"Contactos de Confianza" te permite compartir el estatus de tu viaje con familiares y amigos en un sólo clic.</Text></Col></Row>
                        <Row><Col style={{flex:1, justifyContent:'center', alignItems:'center'}}><FontAwesome5 name='users' size={210} /></Col></Row>
                        {this.state.comprobacion == 1 
                        ? <Row style={{marginTop:70}}><Col><Button block onPress={this.addContact} style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Agregar Contactos de Confianza</Text></Button></Col></Row>
                        : <Row style={{marginTop:70}}><Col><Button block onPress={this.listContact} style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Agregar Contactos de Confianza</Text></Button></Col></Row>
                        }
                        
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default CentroSeguridad;