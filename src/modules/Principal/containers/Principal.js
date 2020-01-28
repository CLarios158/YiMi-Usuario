import React, { Component } from 'react';
import { Container, Content, Text} from 'native-base';
import Menu from '../components/Menu';

class Principal extends Component {
  render() {
    return (
      <Container>
        <Content>
            <Menu navigation={this.props.navigation}/>
            <Text style={{marginTop:90}}>Pantalla de Inicio</Text> 
        </Content>
      </Container>
    );
  }
}

export default Principal;