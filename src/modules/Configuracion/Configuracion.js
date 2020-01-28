import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Header, Body, Card, CardItem, Title} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'

class Configuracion extends Component {

    backLogin = () =>{
        this.props.navigation.navigate('Registro');
    }
    
    backHome = () =>{
        this.props.navigation.navigate('Inicio');
    }

    goInformationPersonal = () =>{
        this.props.navigation.navigate('Informacion');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header style={{marginTop:24, backgroundColor: 'white', borderBottomColor:'lightgray' ,borderBottomWidth:0.5}}>
                        <Left>
                            <Button transparent style={{width:40, height:40}}>
                                <FontAwesome5 onPress={this.backHome} name='times' size={20} style={{color:'black'}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'black'}}>Configuración</Title>
                        </Body>
                    </Header>
                    <Grid>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text> Información Personal</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.goInformationPersonal} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
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
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text> Idioma</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
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
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text> Destinos Favoritos</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>                                  
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                           <Text onPress={this.backLogin}>Cerrar Sesión</Text>
                                                        </Left>
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
        );
    }
}

export default Configuracion;