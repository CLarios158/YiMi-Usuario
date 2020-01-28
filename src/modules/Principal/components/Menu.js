import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'

class Menu extends Component {
    render() {
    return (
        <Ionicons name='md-menu' color='black' style={{zIndex: 9, position: 'absolute', top: 40, left: 20}} 
        size={32} onPress={()=>this.props.navigation.toggleDrawer()}/>
    );
  }
}

export default Menu